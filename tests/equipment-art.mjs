// Snapshot every tool used by the ten veterinary cases in a disposable, muted browser.
import {createServer} from "node:http";
import {readFile,writeFile,mkdtemp} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {tmpdir} from "node:os";
import {spawn} from "node:child_process";
import assert from "node:assert/strict";

const root=resolve("."),mime={".html":"text/html",".js":"text/javascript",".css":"text/css",".png":"image/png",".svg":"image/svg+xml"};
const server=createServer(async(req,res)=>{
  try{const pathname=new URL(req.url,"http://localhost").pathname,path=resolve(root,"."+decodeURIComponent(pathname==="/"?"/index.html":pathname));
    if(!path.startsWith(root+sep)){res.writeHead(403).end();return}res.setHeader("Content-Type",mime[extname(path)]||"application/octet-stream");res.end(await readFile(path));
  }catch{res.writeHead(404).end()}
});
await new Promise(done=>server.listen(0,"127.0.0.1",done));
const profile=await mkdtemp(resolve(tmpdir(),"annabeth-equipment-qa-")),origin=`http://127.0.0.1:${server.address().port}`;
const chrome=spawn("C:/Program Files/Google/Chrome/Application/chrome.exe",["--headless=new","--disable-gpu","--mute-audio","--no-first-run","--remote-debugging-port=9244",`--user-data-dir=${profile}`,origin],{stdio:"ignore",windowsHide:true});
const sleep=ms=>new Promise(done=>setTimeout(done,ms));
let ws,id=0;const pending=new Map();
const send=(method,params={})=>new Promise((resolve,reject)=>{const call=++id,timer=setTimeout(()=>{pending.delete(call);reject(Error("CDP timeout"))},20000);pending.set(call,{resolve,reject,timer});ws.send(JSON.stringify({id:call,method,params}))});
const evaluate=async expression=>{const result=await send("Runtime.evaluate",{expression,awaitPromise:true,returnByValue:true});if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result.value};
try{
  let page;for(let i=0;i<80;i++){try{page=(await(await fetch("http://127.0.0.1:9244/json")).json()).find(item=>item.type==="page");if(page)break}catch{}await sleep(150)}
  assert(page,"Disposable Chrome did not start");ws=new WebSocket(page.webSocketDebuggerUrl);await new Promise((done,fail)=>{ws.onopen=done;ws.onerror=fail});
  ws.onmessage=event=>{const message=JSON.parse(event.data),call=pending.get(message.id);if(call){clearTimeout(call.timer);pending.delete(message.id);message.error?call.reject(Error(message.error.message)):call.resolve(message.result)}};
  await send("Runtime.enable");await send("Emulation.setDeviceMetricsOverride",{width:1250,height:1550,deviceScaleFactor:1,mobile:false});
  for(let i=0;i<60&&!(await evaluate("typeof careCases!=='undefined'"));i++)await sleep(100);
  assert(await evaluate("typeof careCases!=='undefined'"),"Game equipment did not load");
  const audit=await evaluate(`(()=>{
    const keys=[...new Set(careCases.flatMap(item=>item.plan))],place={bandage:"bandage-wrap.png",wrap:"support-wrap.png",ribbon:"ribbon-bow.png",crystal:"healing-crystals.svg",blanket:"cozy-blanket.png"};
    const grid=document.createElement("div");grid.className="equipment-audit-grid";
    const style=document.createElement("style");style.textContent='.equipment-audit-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;padding:16px;background:#e8ddf5}.equipment-audit-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;height:172px;border:2px solid #c8b5db;border-radius:18px;background:#fffdf5;color:#493562;font:700 15px Arial}.equipment-audit-tile .care-tool{width:180px;height:112px;min-height:112px;margin-bottom:8px}.equipment-audit-tile small{font-size:12px;color:#735d8b}.equipment-audit-tile .dental-mirror-svg{width:90px;height:90px}';
    document.head.append(style);
    for(const key of keys){const item=careTools[key],tile=document.createElement("div"),tool=document.createElement("button");tile.className="equipment-audit-tile";tool.className="care-tool";tool.dataset.tool=key;
      tool.innerHTML=key==="mirror"?dentalMirrorSvg:clinicToolSvg[key]|| (item.art?'<img class="care-tool-art" src="assets/'+item.art+'" alt="">':place[key]?'<img class="care-tool-art" src="assets/'+place[key]+'" alt="">':key==="tweezers"?'<img class="care-tool-art" src="assets/tweezers-open.png" alt="">':'<span>'+item.icon+'</span>');
      const label=document.createElement("strong");label.textContent=item.name;const code=document.createElement("small");code.textContent=key;
      tile.append(tool,label,code);grid.append(tile);
    }
    document.body.replaceChildren(grid);return{tools:keys,emoji:keys.filter(key=>!!grid.querySelector('[data-tool="'+key+'"] > span')),missing:keys.filter(key=>!grid.querySelector('[data-tool="'+key+'"] > *'))};
  })()`);
  await sleep(500);
  assert.equal(audit.tools.length,29,"all 29 active case tools need a visual audit");
  assert.deepEqual(audit.emoji,[],"vet kit must not use emoji stand-ins");
  assert.deepEqual(audit.missing,[],"every kit choice needs artwork");
  assert.deepEqual(await evaluate('[...document.querySelectorAll(".equipment-audit-grid img")].filter(img=>!img.complete||img.naturalWidth===0).map(img=>img.src)'),[],"all equipment image assets must load");
  const result=await send("Page.captureScreenshot",{format:"png",captureBeyondViewport:true});
  await writeFile(resolve(root,"qa-equipment-audit.png"),Buffer.from(result.data,"base64"));
  console.log(JSON.stringify(audit,null,2));
}finally{if(ws?.readyState===1){try{await send("Browser.close")}catch{}ws.close()}chrome.kill();server.close()}
