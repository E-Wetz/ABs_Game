// Disposable, muted browser check. It never opens or edits the family's browser profile.
import {createServer} from "node:http";
import {readFile,writeFile,mkdtemp} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {tmpdir} from "node:os";
import {spawn} from "node:child_process";
import assert from "node:assert/strict";

const root=resolve("."),mime={".html":"text/html",".js":"text/javascript",".css":"text/css",".png":"image/png",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"};
const server=createServer(async(req,res)=>{
  try{
    const pathname=new URL(req.url,"http://localhost").pathname;
    const path=resolve(root,"."+decodeURIComponent(pathname==="/"?"/index.html":pathname));
    if(!path.startsWith(root+sep)){res.writeHead(403).end();return}
    res.setHeader("Content-Type",mime[extname(path)]||"application/octet-stream");res.end(await readFile(path));
  }catch{res.writeHead(404).end()}
});
await new Promise(done=>server.listen(0,"127.0.0.1",done));
const origin=`http://127.0.0.1:${server.address().port}`,profile=await mkdtemp(resolve(tmpdir(),"annabeth-map-qa-"));
const chrome=spawn("C:/Program Files/Google/Chrome/Application/chrome.exe",[
  "--headless=new","--disable-gpu","--mute-audio","--no-first-run",`--remote-debugging-port=9242`,`--user-data-dir=${profile}`,origin
],{stdio:"ignore",windowsHide:true});
const sleep=ms=>new Promise(done=>setTimeout(done,ms));
let ws,callId=0;const pending=new Map(),errors=[];
const send=(method,params={})=>new Promise((resolve,reject)=>{
  const id=++callId,timer=setTimeout(()=>{pending.delete(id);reject(Error("CDP timeout: "+method))},20000);
  pending.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params}));
});
const evaluate=async expression=>{
  const result=await send("Runtime.evaluate",{expression,awaitPromise:true,returnByValue:true,userGesture:true});
  if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);
  return result.result.value;
};
const shot=async name=>{
  const data=await send("Page.captureScreenshot",{format:"png"});
  await writeFile(resolve(root,`qa-map-${name}.png`),Buffer.from(data.data,"base64"));
};
try{
  let page;
  for(let i=0;i<80;i++){
    try{page=(await(await fetch("http://127.0.0.1:9242/json")).json()).find(item=>item.type==="page");if(page)break}catch{}
    await sleep(150);
  }
  assert(page,"Disposable Chrome did not start");ws=new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((done,fail)=>{ws.onopen=done;ws.onerror=fail});
  ws.onmessage=event=>{
    const message=JSON.parse(event.data),call=pending.get(message.id);
    if(call){clearTimeout(call.timer);pending.delete(message.id);message.error?call.reject(Error(message.error.message)):call.resolve(message.result)}
    if(message.method==="Runtime.exceptionThrown")errors.push(message.params.exceptionDetails.exception?.description||message.params.exceptionDetails.text);
  };
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride",{width:1180,height:820,deviceScaleFactor:1,mobile:false});
  for(let i=0;i<50&&!(await evaluate("!!window.MagicalHospital"));i++)await sleep(100);
  assert(await evaluate("!!window.MagicalHospital"),"App did not load");
  const seed=(stars,completedActivities)=>JSON.stringify({stars,gems:0,missions:0,sound:false,story:{completedActivities,currentOutfit:"doctor"},mastery:{}});
  await evaluate(`localStorage.setItem("annabeth-magical-hospital-v1",${JSON.stringify(seed(0,[]))});location.reload()`);
  await sleep(550);await evaluate('document.querySelector("#worldButton").click()');
  assert.equal(await evaluate('document.querySelectorAll(".map-stop").length'),6);
  assert.equal(await evaluate('document.querySelector(".map-stop.current").dataset.stop'),"hospital");
  assert.equal(await evaluate('document.querySelectorAll(".map-route-leg.traveled").length'),0);
  assert.equal(await evaluate('new Set([...document.querySelectorAll(".map-stop")].flatMap(node=>mapStops.find(stop=>stop.id===node.dataset.stop).games)).size'),21);
  const scene=await evaluate('(()=>{const a=document.querySelector("#mapScene").getBoundingClientRect(),b=document.querySelector("#worldMap").getBoundingClientRect();return{w:a.width,h:a.height,containerW:b.width,containerH:b.height}})()');
  assert(scene.w<=scene.containerW+2&&scene.h<=scene.containerH+2,"Full map should fit viewport");
  await shot("new-journey");
  await evaluate('document.querySelector(".map-stop[data-stop=forest]").click()');
  assert.equal(await evaluate('document.querySelectorAll("#mapStopPanel .map-panel-game").length'),4);
  assert.equal(await evaluate('document.querySelector("#mapStopPanel").hidden'),false);
  await evaluate('document.querySelector("#mapStopPanel .map-panel-game[data-game=search]").click()');
  assert.equal(await evaluate('document.querySelector("#activityScreen").classList.contains("active")'),true,"Map tile should launch a game");
  await evaluate('document.querySelector("#activityBackButton").click()');
  assert.equal(await evaluate('document.querySelector("#mapStopPanel").hidden'),true,"Map panel should close after play");
  await evaluate(`localStorage.setItem("annabeth-magical-hospital-v1",${JSON.stringify(seed(28,["paw","search","color","nursery","horn","shapes"]))});location.reload()`);
  await sleep(550);await evaluate('document.querySelector("#worldButton").click()');
  assert.equal(await evaluate('document.querySelector(".map-stop.current").dataset.stop'),"dragon");
  assert.equal(await evaluate('document.querySelectorAll(".map-route-leg.traveled").length'),3);
  assert.equal(await evaluate('document.querySelectorAll(".map-stop.visited").length'),6);
  await evaluate('document.querySelector(".map-stop[data-stop=castle]").click()');
  assert.equal(await evaluate('document.querySelector(".map-panel-game[data-game=shapes]").classList.contains("locked")'),false);
  assert.equal(await evaluate('document.querySelector(".map-panel-game[data-game=pattern]").classList.contains("locked")'),true);
  await shot("journey-progress");
  await send("Emulation.setDeviceMetricsOverride",{width:820,height:1180,deviceScaleFactor:1,mobile:true});
  await sleep(350);await evaluate('document.querySelector("#mapStopPanel .map-panel-close").click()');
  const portrait=await evaluate('(()=>{const a=document.querySelector("#mapScene").getBoundingClientRect(),b=document.querySelector("#worldMap").getBoundingClientRect();return{w:a.width,h:a.height,containerW:b.width,containerH:b.height,markers:[...document.querySelectorAll(".map-stop")].map(item=>{const r=item.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}})}})()');
  assert(portrait.w<=portrait.containerW+2&&portrait.h<=portrait.containerH+2,"Portrait map should fit viewport");
  assert(portrait.markers.every(item=>item.w>=44&&item.h>=44),"Map touch targets should remain large");
  await shot("ipad-portrait");
  assert.deepEqual(errors,[],"Browser exceptions");
  console.log(JSON.stringify({passed:true,scene,portrait,errors},null,2));
}finally{
  if(ws?.readyState===1){try{await send("Browser.close")}catch{}ws.close()}
  chrome.kill();server.close();
}
