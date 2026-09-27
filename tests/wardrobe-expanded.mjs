// Focused wardrobe regression. Runs in a disposable, muted browser profile.
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
const origin=`http://127.0.0.1:${server.address().port}`;
const require=createRequire(import.meta.url);
const {chromium}=require("C:/Users/emw0009/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const candidates=["C:/Program Files/Google/Chrome/Application/chrome.exe","C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"];
let browser;
for(const executablePath of candidates){
  try{browser=await chromium.launch({headless:true,executablePath,args:["--mute-audio","--no-first-run"]});break}catch{}
}
if(!browser)throw Error("Chrome or Edge could not be launched");
const page=await browser.newPage({viewport:{width:1180,height:820}});
const errors=[];
page.on("pageerror",error=>errors.push(error.message));
page.on("response",response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`)});

try{
  await page.goto(origin,{waitUntil:"domcontentloaded",timeout:90000});
  await page.waitForFunction(()=>window.MagicalHospital);
  await page.evaluate(()=>{
    localStorage.setItem("annabeth-magical-hospital-v1",JSON.stringify({
      stars:119,gems:12,missions:0,sound:false,
      story:{completedActivities:[],customLook:{},careHistory:[],currentOutfit:"doctor"},
      mastery:{}
    }));
    location.reload();
  });
  await page.waitForFunction(()=>window.MagicalHospital);
  await page.evaluate(()=>openWorld());
  await page.click("#wardrobeButton");
  await page.waitForFunction(()=>document.querySelector("#wardrobeDialog")?.open);

  assert.equal(await page.locator("#outfitGrid .outfit-card").count(),24,"wardrobe contains 24 finished looks");
  assert.equal(await page.locator("#wardrobeDialog svg,#wardrobeDialog .dressup-art-layer").count(),0,"finished looks do not use floating layers");
  assert.equal(await page.locator('.outfit-card[data-outfit="moonlight"].locked').count(),1,"120-star look is locked at 119");
  assert.equal(await page.locator('.outfit-card[data-outfit="auroravet"].locked').count(),1,"300-star look is locked at 119");

  await page.evaluate(()=>{MagicalHospital.getState().stars=120;MagicalHospital.save();renderWardrobe()});
  assert.equal(await page.locator('.outfit-card[data-outfit="moonlight"].locked').count(),0,"Moonlight unlocks at 120");
  await page.click('.outfit-card[data-outfit="moonlight"]');
  assert.equal(await page.locator("#avatarPreview").getAttribute("data-outfit"),"moonlight");

  await page.evaluate(()=>{MagicalHospital.getState().stars=300;MagicalHospital.save();renderWardrobe()});
  assert.equal(await page.locator("#outfitGrid .outfit-card.locked").count(),0,"all looks unlock at 300");
  const imagesLoaded=await page.evaluate(()=>Promise.all(
    [...document.querySelectorAll("#outfitGrid .outfit-card")].map(card=>new Promise(resolve=>{
      const match=getComputedStyle(card.querySelector("span")).backgroundImage.match(/url\(["']?(.*?)["']?\)/);
      if(!match){resolve(false);return}
      const image=new Image();image.onload=()=>resolve(image.naturalWidth>0&&image.naturalHeight>0);image.onerror=()=>resolve(false);image.src=match[1];
    }))
  ));
  assert.deepEqual(imagesLoaded,Array(24).fill(true),"every finished-look image loads");

  await page.click('.outfit-card[data-outfit="auroravet"]');
  assert.equal(await page.locator("#avatarPreview").getAttribute("data-outfit"),"auroravet");
  assert.equal(await page.evaluate(()=>MagicalHospital.getState().story.currentOutfit),"auroravet");
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem("annabeth-magical-hospital-v1")).story.currentOutfit),"auroravet");
  await page.screenshot({path:resolve(root,"qa-wardrobe-expanded.png"),fullPage:false});

  await page.reload({waitUntil:"domcontentloaded"});
  await page.waitForFunction(()=>window.MagicalHospital);
  assert.equal(await page.evaluate(()=>MagicalHospital.getState().story.currentOutfit),"auroravet","selected look survives reload");
  await page.evaluate(()=>startAdventure("paw"));
  assert.equal(await page.locator("#activityAvatarReady").getAttribute("data-outfit"),"auroravet","selected look appears during play");
  assert.deepEqual(errors,[],"no browser or asset errors");
  console.log("PASS 24 finished looks; 120-300 star unlocks; image loading; selection persistence; play avatar");
}finally{
  await browser.close();
  server.close();
}
