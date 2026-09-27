// Check new coloring art and saved finger strokes in a disposable, muted browser.
import {createServer} from "node:http";
import {readFile} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {createRequire} from "node:module";
import assert from "node:assert/strict";

const root=resolve(".");
const mime={".html":"text/html",".js":"text/javascript",".css":"text/css",".png":"image/png",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"};
const server=createServer(async(req,res)=>{
  try{
    const pathname=new URL(req.url,"http://localhost").pathname;
    const path=resolve(root,"."+decodeURIComponent(pathname==="/"?"/index.html":pathname));
    if(!path.startsWith(root+sep)){res.writeHead(403).end();return}
    res.setHeader("Content-Type",mime[extname(path)]||"application/octet-stream");
    res.end(await readFile(path));
  }catch{res.writeHead(404).end()}
});
await new Promise(done=>server.listen(0,"127.0.0.1",done));
const {chromium}=createRequire(import.meta.url)("C:/Users/emw0009/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",args:["--mute-audio","--no-first-run"]});
const page=await browser.newPage({viewport:{width:1024,height:768}});
const errors=[];
page.on("pageerror",error=>errors.push(error.message));
page.on("response",response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`)});
try{
  await page.goto(`http://127.0.0.1:${server.address().port}`,{waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>window.MagicalHospital);
  await page.evaluate(()=>{
    localStorage.setItem("annabeth-magical-hospital-v1",JSON.stringify({stars:99,gems:5,missions:0,sound:false,story:{completedActivities:[],customLook:{},coloringPages:{}},mastery:{}}));
    location.reload();
  });
  await page.waitForFunction(()=>window.MagicalHospital);
  await page.evaluate(()=>startAdventure("color"));
  assert.equal(await page.locator(".template-button").count(),35,"twelve existing and twenty-three new pages are selectable");
  const newIds=["mouse","hedgehog","fawn","lamb","duckling","seal","penguin","koala","raccoon","squirrel","elephant","giraffe","whale","dolphin","turtle","frog","ladybug","hamster","otter","peacock","annabeth-unicorn","annabeth-bunny","annabeth-fox"];
  const loaded=await page.evaluate(ids=>Promise.all(ids.map(id=>new Promise(resolve=>{
    const image=new Image();image.onload=()=>resolve(image.width>=1400&&image.height>=900);image.onerror=()=>resolve(false);image.src=`assets/coloring-${id}-v1.png`;
  }))),newIds);
  assert.deepEqual(loaded,Array(newIds.length).fill(true),"all new pages load at coloring resolution");
  await page.waitForFunction(async()=>{
    const registration=await navigator.serviceWorker.getRegistration();
    return Boolean(registration?.active&&await caches.match("./assets/coloring-annabeth-fox-v1.png"));
  },null,{timeout:90000});
  await page.getByRole("button",{name:"Annabeth and Nova coloring page"}).click();
  await page.waitForTimeout(300);
  const rect=await page.locator(".paint-canvas").boundingBox();
  await page.mouse.move(rect.x+rect.width*.5,rect.y+rect.height*.5);
  await page.mouse.down();await page.mouse.move(rect.x+rect.width*.57,rect.y+rect.height*.56,{steps:8});await page.mouse.up();
  assert((await page.evaluate(()=>MagicalHospital.getState().story.coloringPages?.["annabeth-unicorn"]||"")).startsWith("data:image/webp"),"Annabeth page saves color");
  await page.getByRole("button",{name:"Annabeth and Bramble coloring page"}).click();
  await page.getByRole("button",{name:"Annabeth and Nova coloring page"}).click();
  await page.waitForTimeout(300);
  assert.equal(await page.evaluate(()=>{
    const canvas=document.querySelector(".paint-canvas"),data=canvas.getContext("2d").getImageData(0,0,canvas.width,canvas.height).data;
    for(let i=3;i<data.length;i+=4)if(data[i])return true;
    return false;
  }),true,"saved color returns after changing pages");
  assert.deepEqual(errors,[],"no page or asset errors");
  console.log("PASS 35 pages; 23 new illustrations load; offline cache installs; Annabeth scene paints and restores on iPad viewport");
}finally{await browser.close();server.close()}
