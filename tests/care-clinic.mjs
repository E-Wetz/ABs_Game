// Run in a disposable, muted Chrome profile. Never connects to the player's browser.
import {createServer} from "node:http";
import {readFile} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {createRequire} from "node:module";
import assert from "node:assert/strict";
import {runInNewContext} from "node:vm";

const root=resolve(".");
const debug=label=>{if(process.env.CARE_QA_DEBUG)console.log("QA phase:",label)};
const precache=runInNewContext((await readFile(resolve(root,"sw.js"),"utf8"))+";ASSETS",{self:{addEventListener(){}}});
for(const asset of precache)await readFile(resolve(root,asset==="./"?"index.html":asset));
debug("cache checked");
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
await new Promise(r=>server.listen(0,"127.0.0.1",r));
const origin=`http://127.0.0.1:${server.address().port}`;
const require=createRequire(import.meta.url);
const {chromium}=require("C:/Users/emw0009/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");
const browser=await chromium.launch({headless:true,executablePath:"C:/Program Files/Google/Chrome/Application/chrome.exe",args:["--mute-audio","--no-first-run"]});
debug("browser launched");
const page=await browser.newPage({viewport:{width:1180,height:820}});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const session=await page.context().newCDPSession(page),errors=[];
const send=(method,params={})=>session.send(method,params);
const evaluate=expression=>page.evaluate(expression);
const until=async(predicate,label)=>{
  for(let i=0;i<100;i++){if(await evaluate(predicate))return;await sleep(80)}
  throw Error("Timed out: "+label);
};
const screenshot=name=>page.screenshot({path:resolve(root,`qa-care-${name}.png`)});
try{
  page.on("pageerror",error=>errors.push(error.message));
  page.on("response",response=>{if(response.status()>=400)errors.push(response.url())});
  await page.goto(origin,{waitUntil:"domcontentloaded",timeout:90000});
  debug("page loaded");
  await send("Runtime.enable");await send("Network.enable");
  await send("Emulation.setDeviceMetricsOverride",{width:1180,height:820,deviceScaleFactor:1,mobile:false});
  await until("!!window.MagicalHospital","app loaded");
  await Promise.all([
    page.waitForNavigation({waitUntil:"domcontentloaded",timeout:90000}),
    evaluate(`localStorage.setItem("annabeth-magical-hospital-v1",JSON.stringify({stars:99,gems:12,missions:0,sound:false,story:{completedActivities:[],customLook:{},careHistory:[]},mastery:{}}));location.reload()`)
  ]);
  await until("!!window.MagicalHospital","muted app");
  await until("!!document.querySelector('#worldButton')","world button ready");
  debug("muted app ready");
  // Helpers drive the public UI and real pointer handlers, never call progress/completion functions.
  await evaluate(`window.careQA={
    dispatch(type,x,y,target,pointerType="mouse"){
      const view=document.querySelector(".care-treatment"),r=view.getBoundingClientRect();
      (target||view).dispatchEvent(new PointerEvent(type,{bubbles:true,pointerId:1,pointerType,buttons:type==="pointerup"?0:1,clientX:r.left+view.clientLeft+view.clientWidth*x/100,clientY:r.top+view.clientTop+view.clientHeight*y/100}));
    },
    marks(){return [...document.querySelectorAll(".care-condition")].map(el=>({tool:el.dataset.resolvesWith,art:el.dataset.art,opacity:Number(el.style.opacity)}))},
    snapshot(){
      const view=document.querySelector(".care-treatment"),care=document.querySelector(".care-clinic"),r=view.getBoundingClientRect();
      return {step:Number(care.dataset.step),tool:care.dataset.tool,family:view.dataset.family,x:Number(view.dataset.targetX),y:Number(view.dataset.targetY),bg:view.style.backgroundImage,marks:this.marks(),rect:{x:r.x,y:r.y,w:r.width,h:r.height},canvas:!!view.querySelector("canvas"),placed:view.querySelectorAll(".care-applied-layer .placed").length};
    }
  }`);
  const results=[];
  const screenPoint=async(x,y)=>evaluate(`(()=>{const v=document.querySelector(".care-treatment"),r=v.getBoundingClientRect();return{x:r.left+v.clientLeft+v.clientWidth*${x}/100,y:r.top+v.clientTop+v.clientHeight*${y}/100}})()`);
  const mouse=async(type,p)=>{await page.mouse.move(p.x,p.y);if(type==="mousePressed")await page.mouse.down();else if(type==="mouseReleased")await page.mouse.up()};
  const caseIndexes=process.env.CARE_QA_NATIVE_ONLY?[]:process.env.CARE_QA_CASES?process.env.CARE_QA_CASES.split(",").map(Number):Array.from({length:10},(_,i)=>i);
  for(const index of caseIndexes){
    const start=await evaluate(`(()=>{
      MagicalHospital.getState().story.careHistory=Array.from({length:10},(_,i)=>i).filter(i=>i!==${index});
      document.querySelector("#worldButton").click();
      document.querySelector('.activity-card[data-game="paw"]').click();
      const speaker=document.querySelector("#activitySpeakButton").getBoundingClientRect();
      return {name:document.querySelector(".care-treatment").dataset.ailment,hintInitially:!!document.querySelector(".care-tool-glow.hint-visible"),speakerVisible:speaker.width>=40&&speaker.height>=40,...careQA.snapshot()};
    })()`);
    await sleep(250);
    assert.equal(start.canvas,false,"old reveal canvas removed");
    assert.equal(start.hintInitially,false,"correct vet tool should not glow before Annabeth has a chance to listen and choose");
    assert.equal(start.speakerVisible,true,"larger clinic layout must retain the replay-narration button");
    assert.equal(await evaluate('[...document.querySelectorAll(".care-tool")].every(tool=>!!tool.querySelector("svg,img"))'),true,"every actual kit choice must be pictured equipment, not emoji");
    const loaded=await evaluate(`new Promise(r=>{const i=new Image();i.onload=()=>r([i.naturalWidth,i.naturalHeight]);i.onerror=()=>r(null);i.src=document.querySelector(".care-treatment").style.backgroundImage.slice(5,-2)})`);
    assert(loaded,"missing base image: "+start.name);
    assert(Math.abs(loaded[0]/loaded[1]-.75)<.02,"base must be 3:4");
    const count=await evaluate(`[...document.querySelectorAll(".care-condition,.care-debris")].filter(el=>Number(getComputedStyle(el).opacity)>.9).length`);
    assert(count>0||start.name==="Dim Horn","ailment missing before first tool");
    if(index===9){assert.equal(count,4,"four smaller germs must be visible");assert.equal(await evaluate('document.querySelector(".care-mouth-germ").style.width'),"7%")}
    assert(start.rect.x>=0&&start.rect.y>=0&&start.rect.y+start.rect.h<=820,"treatment outside viewport");
    await screenshot(`${index}-before`);
    for(let step=0;step<4;step++){
      await until(`document.querySelector(".care-clinic")?.dataset.step==="${step}"&&!document.querySelector(".care-tool-glow").disabled`,"next tool");
      if(index===0&&step===0){
        await evaluate('(()=>{const wrong=document.querySelector(".care-tool:not(.care-tool-glow)");wrong.click();wrong.click()})()');
        assert.equal(await evaluate('document.querySelector(".care-tool-glow").classList.contains("hint-visible")'),true,"two misses should reveal the kind tool hint");
      }
      await evaluate('document.querySelector(".care-tool-glow").click()');
      const s=await evaluate("careQA.snapshot()");
      assert.equal(s.bg,start.bg,"base changed on step "+step);
      assert.equal(s.step,step);
      assert.equal(await evaluate('document.querySelectorAll(".care-gesture-tool .tool-badge-icon").length'),0,"vet tools must never sit inside a circular badge");
      assert.equal(await evaluate('document.querySelectorAll(".care-gesture-tool.raw-icon-tool").length'),0,"all case equipment must render as an actual pictured tool, never an emoji substitute");
      if(s.family==="holdStill"||s.family==="placeItem")assert.equal(await evaluate('document.querySelectorAll(".care-target").length'),0,"hold/placement steps must not draw a circle over the patient");
      if(s.family==="injection"){
        assert.equal(await evaluate('getComputedStyle(document.querySelector(".care-shot-target")).borderRadius'),"0px","shot placement cue must not be a circular target");
        assert.equal(await evaluate('getComputedStyle(document.querySelector(".syringe-press")).borderRadius'),"0px","plunger hit area must not draw a circle around the syringe");
      }
      if(s.family==="holdStill")assert.equal(await evaluate('document.querySelectorAll(".care-gesture-tool .clinic-tool-svg").length'),1,"stethoscope and thermometer need their own tool art");
      if(s.tool==="stethoscope")assert.deepEqual(await evaluate('(()=>{const tool=document.querySelector(".care-gesture-tool");return ["earpieces","yoke","tube","diaphragm"].map(part=>!!tool.querySelector(".stethoscope-"+part))})()'),[true,true,true,true],"stethoscope art needs visible earpieces, Y-shaped metal branches, tubing, and chestpiece");
      if(s.family==="holdStill"&&index===2){
        const point=await screenPoint(s.x,s.y);await mouse("mousePressed",point);await sleep(350);await screenshot(`2-${s.tool}-held`);await mouse("mouseReleased",point);
        if(s.tool==="stethoscope")assert(await evaluate(`(()=>{const r=document.querySelector(".care-gesture-tool .stethoscope-diaphragm").getBoundingClientRect();return Math.hypot(r.x+r.width/2-${point.x},r.y+r.height/2-${point.y})<16})()`),"stethoscope diaphragm must meet the exam spot");
        if(step===0){
          assert.equal(await evaluate('document.querySelector(".care-patient").dataset.emotion'),"hopeful","Bramble should react before the whole treatment step finishes");
          assert.equal(await evaluate('getComputedStyle(document.querySelector(".care-patient")).transitionProperty.includes("background-position")'),false,"expression sprite must not tween through sliced faces");
        }
      }
      // A click alone must not complete scanning, wiping, removal, or placement.
      if(["inspectDetail","wipeScrub","wipeDebris","tapDebris","earDrops"].includes(s.family)){
        await evaluate(`careQA.dispatch("pointerdown",${s.x},${s.y});careQA.dispatch("pointerup",${s.x},${s.y})`);
        assert.equal(await evaluate('document.querySelector(".care-meter i").style.width'),"0%");
      }
      if(s.family==="injection"){
        // Real hit testing: a wrong placement does nothing, docking alone does not give medicine.
        for(const target of [{x:12,y:20},{x:s.x,y:s.y}]){
          await mouse("mousePressed",await screenPoint(48,84));await mouse("mouseMoved",await screenPoint(target.x,target.y));await mouse("mouseReleased",await screenPoint(target.x,target.y));
          assert.equal(await evaluate('document.querySelector(".care-meter i").style.width'),"0%");
        }
        assert.equal(await evaluate('document.querySelector(".care-syringe").dataset.phase'),"ready");
        const p=await evaluate('(()=>{const r=document.querySelector(".syringe-press").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
        await mouse("mousePressed",p);await sleep(650);await mouse("mouseReleased",p);
        const paused=await evaluate('document.querySelector(".care-meter i").style.width');
        assert(parseFloat(paused)>0&&parseFloat(paused)<100,"short press must only partially inject");
        await sleep(300);assert.equal(await evaluate('document.querySelector(".care-meter i").style.width'),paused,"release must pause injection");
        const touch=await evaluate('(()=>{const r=document.querySelector(".syringe-press").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
        await send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{...touch,id:1}]});await sleep(550);await send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
        const resumed=await evaluate('document.querySelector(".care-meter i").style.width');assert(parseFloat(resumed)>parseFloat(paused)&&parseFloat(resumed)<100,"touch should resume the plunger");
        await sleep(200);assert.equal(await evaluate('document.querySelector(".care-meter i").style.width'),resumed);
        await screenshot("2-shot");
      }
      if(s.tool==="toothbrush"){
        await evaluate('careQA.dispatch("pointerdown",50,40);for(let i=0;i<50;i++)careQA.dispatch("pointermove",50+(i%2?2:-2),40);careQA.dispatch("pointerup",50,40)');
        assert((await evaluate('careQA.marks()')).every(m=>m.opacity===1),"brushing outside the mouth must not remove germs");
        await evaluate('(()=>{const e=document.querySelector(".care-mouth-germ"),x=parseFloat(e.style.left),y=parseFloat(e.style.top);careQA.dispatch("pointerdown",x-1,y);for(let i=0;i<75;i++)careQA.dispatch("pointermove",x+(i%2?1:-1),y);careQA.dispatch("pointerup",x,y)})()');
        const germs=await evaluate('careQA.marks()');assert.equal(germs[0].opacity,0);assert(germs.slice(1).every(g=>g.opacity===1),"other germs must remain until brushed");
        await sleep(250);await screenshot("9-partly-brushed");
      }
      if(s.family==="sprayMouth"){
        const p=await evaluate('(()=>{const r=document.querySelector(".care-rinse-sprayer").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
        await mouse("mousePressed",p);await sleep(550);
        assert((await evaluate('document.querySelectorAll(".care-rinse-drop").length'))>0,"spray must animate moving droplets");
        await screenshot("9-rinse-spray");await mouse("mouseReleased",p);
      }
      if(s.family==="sip"&&index===4){
        const start=await evaluate('(()=>{const r=document.querySelector(".care-medicine-cup").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
        await mouse("mousePressed",start);await mouse("mouseMoved",await screenPoint(s.x,s.y));await mouse("mouseReleased",await screenPoint(s.x,s.y));
        const docked=await evaluate('(()=>{const r=document.querySelector(".care-medicine-cup").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
        await mouse("mousePressed",docked);await sleep(480);await screenshot("4-medicine-sip");await mouse("mouseReleased",docked);
        assert(parseFloat(await evaluate('document.querySelector(".care-meter i").style.width'))>0,"medicine must drain while Pip sips");
      }
      if(s.family==="surfaceSpray"){
        const spray=await evaluate('(()=>{const e=document.querySelector(".care-surface-sprayer"),r=e.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
        await mouse("mousePressed",spray);await sleep(420);
        assert((await evaluate('document.querySelectorAll(".care-surface-drop").length'))>0,"surface spray needs visible moving mist");
        await screenshot(`${index}-surface-spray`);
        const partial=await evaluate('document.querySelector(".care-meter i").style.width');
        assert(parseFloat(partial)>0&&parseFloat(partial)<100,"short spray must only partially treat");
        await mouse("mouseReleased",spray);await sleep(80);
        const released=await evaluate('document.querySelector(".care-meter i").style.width');
        await sleep(180);
        assert.equal(await evaluate('document.querySelector(".care-meter i").style.width'),released,"release must pause spray");
        if(s.tool==="spray")assert(parseFloat(await evaluate('document.querySelector(".care-condition[data-resolves-with=brush]").style.getPropertyValue("--soften")'))>0,"detangler must visibly loosen leaves");
      }
      if(s.family==="inspectDetail"){
        const checks={magnifier:0,otoscope:1,flashlight:1,mirror:4,scanner:3};
        assert.equal(await evaluate('document.querySelectorAll(".care-inspection-clue").length'),checks[s.tool],"exam points must follow the actual ear, mouth germs, or horn");
        if(s.tool!=="magnifier")assert.equal(await evaluate('[...document.querySelectorAll(".care-inspection-clue")].every(e=>getComputedStyle(e).opacity==="0")'),true,"exam locations should not begin as arbitrary floating sparkle targets");
        if(s.tool==="scanner")assert.equal(await evaluate('document.querySelector(".scanner-tool .clinic-tool-svg")!==null'),true,"horn scanner must be a wand, not a magnifying glass");
        if(["otoscope","flashlight","mirror","scanner"].includes(s.tool)){
          await evaluate('(()=>{const e=document.querySelector(".care-inspection-clue");careQA.dispatch("pointerdown",parseFloat(e.style.left),parseFloat(e.style.top))})()');
          await sleep(220);
          assert.equal(await evaluate('document.querySelector(".care-gesture-tool").classList.contains("has-evidence")'),true,"exam tool should react at the visible condition");
          await screenshot(`${index}-${s.tool}-evidence`);
          await evaluate('(()=>{const e=document.querySelector(".care-inspection-clue");careQA.dispatch("pointerup",parseFloat(e.style.left),parseFloat(e.style.top))})()');
        }
        if(index===0&&step===0){
          await evaluate('(()=>{const v=document.querySelector(".care-treatment");careQA.dispatch("pointerdown",Number(v.dataset.targetX),Number(v.dataset.targetY))})()');
          await sleep(230);await screenshot("0-inspection");
          assert.equal(await evaluate('document.querySelector(".magnifier-tool").classList.contains("has-evidence")'),true,"lens must reveal the actual ailment art");
          await evaluate('(()=>{const v=document.querySelector(".care-treatment");careQA.dispatch("pointerup",Number(v.dataset.targetX),Number(v.dataset.targetY))})()');
        }
      }
      await evaluate(`(async()=>{
        const s=careQA.snapshot(),d=(type,x,y,target)=>careQA.dispatch(type,x,y,target,${index%2?'"touch"':'"mouse"'}),wait=ms=>new Promise(r=>setTimeout(r,ms));
        if(s.tool==="toothbrush"){
          for(const el of document.querySelectorAll(".care-mouth-germ")){
            const x=parseFloat(el.style.left),y=parseFloat(el.style.top);d("pointerdown",x-1,y);
            for(let i=0;i<75;i++)d("pointermove",x+(i%2?1:-1),y);
            d("pointerup",x,y);
          }
        }else if(s.family==="sprayMouth"){
          const spray=document.querySelector(".care-rinse-sprayer");
          d("pointerdown",75,51,spray);await wait(2500);d("pointerup",75,51,spray);
        }else if(s.family==="injection"){
          const shot=document.querySelector(".care-syringe");d("pointerdown",48,84,shot);d("pointermove",s.x,s.y,shot);d("pointerup",s.x,s.y,shot);
          const press=shot.querySelector("button");d("pointerdown",s.x+40,s.y,press);
          for(let i=0;i<65&&shot.dataset.phase!=="done";i++)await wait(50);
          d("pointerup",s.x+40,s.y,press);
        }else if(s.family==="inspectDetail"){
          if(s.tool==="magnifier"){d("pointerdown",s.x,s.y);await wait(1350);d("pointerup",s.x,s.y)}
          else for(const clue of document.querySelectorAll(".care-inspection-clue")){
            const x=parseFloat(clue.style.left),y=parseFloat(clue.style.top);
            d("pointerdown",x,y);await wait(650);d("pointerup",x,y);
          }
        }else if(s.family==="surfaceSpray"){
          const spray=document.querySelector(".care-surface-sprayer");
          d("pointerdown",s.x+22,s.y,spray);await wait(2600);d("pointerup",s.x+22,s.y,spray);
        }else if(s.family==="wipeScrub"){
          d("pointerdown",s.x-10,s.y);
          for(let i=0;i<90;i++)d("pointermove",s.x+(i%2?10:-10),s.y+(i%3-1)*4);
          d("pointerup",s.x,s.y);
        }else if(s.family==="holdStill"){
          d("pointerdown",s.x,s.y);await wait(1800);d("pointerup",s.x,s.y);
        }else if(s.family==="tapDebris"){
          for(const el of document.querySelectorAll(".care-debris:not(.dropped)")){
            const x=parseFloat(el.style.left),y=parseFloat(el.style.top);
            d("pointerdown",x-15,y);d("pointermove",x,y);d("pointermove",83,15);d("pointerup",83,15);
          }
        }else if(s.family==="earDrops"){
          d("pointerdown",s.x-14,s.y);
          for(let i=0;i<32;i++)d("pointermove",s.x+(i%2?8:-8),s.y+(i%3-1)*3);
          d("pointerup",s.x,s.y);
        }else if(s.family==="stitch"){
          for(const line of document.querySelectorAll(".care-stitch-line:not(.done)")){
            const x=parseFloat(line.style.left),y=parseFloat(line.style.top);
            d("pointerdown",x,y);for(let i=1;i<=12;i++)d("pointermove",x,y+8*i/12);d("pointerup",x,y+8);
          }
        }else if(s.family==="wipeDebris"){
          for(const el of document.querySelectorAll(".care-debris:not(.dropped)")){
            const x=parseFloat(el.style.left),y=parseFloat(el.style.top);d("pointerdown",x-3,y);
            for(let i=0;i<70;i++)d("pointermove",x+(i%2?3:-3),y);
            d("pointerup",x,y);
          }
        }else if(s.family==="dabSpots"){
          for(const el of document.querySelectorAll(".care-detail-dab:not([hidden]):not(.done)")){
            const x=parseFloat(el.style.left),y=parseFloat(el.style.top);d("pointerdown",x,y);await wait(1150);d("pointerup",x,y);
          }
        }else if(s.family==="sip"){
          const cup=document.querySelector(".care-medicine-cup");
          if(${index}!==4){
            cup.click();if(document.querySelector(".care-meter i").style.width!=="0%")throw Error("tap must not feed medicine");
            d("pointerdown",16,84,cup);d("pointermove",s.x,s.y,cup);d("pointerup",s.x,s.y,cup);
          }
          d("pointerdown",s.x,s.y,cup);await wait(1600);d("pointerup",s.x,s.y,cup);
        }else if(s.family==="placeItem"){
          const token=document.querySelector(".care-action-layer .care-drag-token");
          d("pointerdown",16,86,token);d("pointermove",s.x,s.y,token);d("pointerup",s.x,s.y,token);
        }
      })()`);
      const after=await evaluate("careQA.snapshot()");
      assert.equal(after.bg,start.bg);
      for(let i=0;i<after.marks.length;i++){
        const m=after.marks[i];
        if(m.tool===s.tool)assert.equal(m.opacity,m.art==="horn-shine.png" ? 1 : s.tool==="stitches" ? 0.25 : 0,"condition not resolved by "+s.tool);
        else assert.equal(m.opacity,s.marks[i].opacity,"unrelated condition changed by "+s.tool);
      }
      if(s.family==="tapDebris"||s.family==="wipeDebris")assert.equal(await evaluate('document.querySelectorAll(".care-debris:not(.dropped)").length'),0);
      if(s.family==="inspectDetail")assert.equal(await evaluate('document.querySelector(".care-meter i").style.width'),"100%","all details must be examined");
      if(s.family==="placeItem")assert(after.placed>s.placed,"dressing not retained");
      if(step===3){await sleep(400);await screenshot(`${index}-after`)}
    }
    await until('document.querySelector("#activityRewardScreen").classList.contains("active")',"reward");
    assert.equal(await evaluate('document.querySelector("#activityEarnedStars").textContent'),"4","each newly completed vet case should earn its full first-visit reward");
    assert.equal(await evaluate('MagicalHospital.getState().story.completedCareCases.length'),caseIndexes.indexOf(index)+1,"completed vet cases must be tracked separately from started cases");
    assert.equal(await evaluate('document.querySelector("#samePatientButton").hidden'),false,"vet reward should offer the same friend again");
    assert.equal(await evaluate('document.querySelector("#nextAdventureButton").textContent.includes("next patient")'),true,"next patient should be the main vet reward action");
    if(index===0){
      const history=await evaluate('MagicalHospital.getState().story.careHistory.length');
      await evaluate('document.querySelector("#samePatientButton").click()');
      assert.equal(await evaluate('document.querySelector(".care-treatment").dataset.ailment'),start.name,"same-friend replay must keep the chosen case");
      assert.equal(await evaluate('MagicalHospital.getState().story.careHistory.length'),history,"same-friend replay must not advance the ten-case rotation");
    }
    if(index===6||index===9){
      const photo=await evaluate('(()=>{const e=document.querySelector("#rewardPatient"),r=e.getBoundingClientRect();return{visible:e.classList.contains("care-reward-photo"),width:r.width,height:r.height}})()');
      assert(photo.visible&&photo.width>=180&&photo.height>=230,"happy portrait must be prominent in the reward screen");
      await screenshot(`${index}-reward`);
    }
    if(index===9){
      await evaluate('document.querySelector("#nextAdventureButton").click()');
      assert.equal(await evaluate('document.querySelector("#activityScreen").classList.contains("active")&&!!document.querySelector(".care-clinic")'),true,"main vet reward action should open the next treatment");
    }
    results.push({case:start.name,steps:4,initialAilment:true,unchangingBase:true,reward:true});
    console.log("PASS "+start.name);
  }
  // Tablet portrait: treatment remains visible without cropping the base.
  debug("ten cases finished; beginning tablet and side games");
  let portrait=null;
  if(!process.env.CARE_QA_SKIP_NATIVE){
  await send("Emulation.setDeviceMetricsOverride",{width:820,height:1180,deviceScaleFactor:1,mobile:true});
  await evaluate('document.querySelector("#worldButton").click();document.querySelector(\'.activity-card[data-game="paw"]\').click()');
  await sleep(250);await screenshot("tablet-portrait");
  portrait=await evaluate("careQA.snapshot().rect");assert(portrait.y+portrait.h<=1180);
  // Verify real hit testing/capture too: select, wipe, collect, and place through CDP.
  await send("Emulation.setDeviceMetricsOverride",{width:1180,height:820,deviceScaleFactor:1,mobile:false});
  await evaluate('MagicalHospital.getState().story.careHistory=[1,2,3,4,5,6,7,8,9];document.querySelector("#worldButton").click();document.querySelector(\'.activity-card[data-game="paw"]\').click()');
  for(let step=0;step<4;step++){
    await until(`document.querySelector(".care-clinic").dataset.step==="${step}"&&!document.querySelector(".care-tool-glow").disabled`,"real-pointer step");
    const tool=await evaluate('(()=>{const r=document.querySelector(".care-tool-glow").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
    await mouse("mousePressed",tool);await mouse("mouseReleased",tool);
    const s=await evaluate("careQA.snapshot()");
    if(step===1){
      const pieces=await evaluate('[...document.querySelectorAll(".care-debris")].map(e=>({x:parseFloat(e.style.left),y:parseFloat(e.style.top)}))');
      for(const p of pieces){await mouse("mousePressed",await screenPoint(p.x-15,p.y));await mouse("mouseMoved",await screenPoint(p.x,p.y));await mouse("mouseMoved",await screenPoint(83,15));await mouse("mouseReleased",await screenPoint(83,15))}
    }else if(step===3){
      await mouse("mousePressed",await screenPoint(16,86));await mouse("mouseMoved",await screenPoint(s.x,s.y));await mouse("mouseReleased",await screenPoint(s.x,s.y));
    }else{
      // The wash uses native touch input; examination uses a native mouse drag.
      if(step===2){
        const p=await screenPoint(s.x-10,s.y);
        await send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{...p,id:1}]});
        for(let i=0;i<28;i++){const p=await screenPoint(s.x+(i%2?10:-10),s.y);await send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{...p,id:1}]})}
        await send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
      }else{
        const clues=s.tool==="magnifier"?[{x:s.x,y:s.y}]:await evaluate('[...document.querySelectorAll(".care-inspection-clue")].map(e=>({x:parseFloat(e.style.left),y:parseFloat(e.style.top)}))');
        for(const clue of clues){const p=await screenPoint(clue.x,clue.y);await mouse("mousePressed",p);await sleep(s.tool==="magnifier"?1350:650);await mouse("mouseReleased",p)}
      }
    }
  }
  await until('document.querySelector("#activityRewardScreen").classList.contains("active")',"real mouse/touch reward");
  }
  // Side adventures must offer actions, not five ingredient clicks or four arbitrary taps.
  await evaluate('document.querySelector("#worldButton").click();document.querySelector(\'.activity-card[data-game="potion"]\').click()');
  await until('document.querySelectorAll(".mix-ingredient").length===11',"potion ingredients and distractors");
  assert.equal(await evaluate('document.querySelectorAll(".mix-ingredient").length - document.querySelectorAll(".mix-ingredient.added").length'),11,"potion tray must have surplus ingredients");
  assert.equal(await evaluate('[...document.querySelectorAll(".mix-ingredient")].filter(e=>e.textContent==="🍓").length'),4,"there must be more berries than the recipe needs");
  assert.equal(await evaluate('[...document.querySelectorAll(".mix-ingredient")].filter(e=>e.textContent==="⭐").length'),4,"there must be more stars than the recipe needs");
  assert.equal(await evaluate('(()=>{const edge=document.querySelector("#activityPlayArea").getBoundingClientRect().bottom-4;return [...document.querySelectorAll(".mix-ingredient")].every(e=>e.getBoundingClientRect().bottom<edge)})()'),true,"all potion choices must be visible inside the play area");
  await evaluate('document.querySelector(".mix-ingredient").click()');
  assert.equal(await evaluate('document.querySelectorAll(".mix-ingredient.added").length'),0,"ingredient click cannot fill bowl");
  await screenshot("potion-tray");
  for(let round=0;round<3;round++){
    await until(`document.querySelectorAll(".session-rounds .done").length===${round}`,`potion round ${round+1}`);
    for(const icon of ["🍓","🍓","🍓","⭐","⭐"]){
      const locations=await evaluate(`(()=>{const tiles=[...document.querySelectorAll(".mix-ingredient:not(.added)")],tile=tiles.find(e=>e.textContent===${JSON.stringify(icon)});if(!tile)throw Error("Missing ${icon}; tiles="+tiles.map(e=>e.textContent).join(" ")+"; count="+document.querySelectorAll(".mix-ingredient.added").length);const t=tile.getBoundingClientRect(),b=document.querySelector(".mix-bowl").getBoundingClientRect();return{from:{x:t.x+t.width/2,y:t.y+t.height/2},to:{x:b.x+b.width/2,y:b.y+b.height/2}}})()`);
      await mouse("mousePressed",locations.from);await mouse("mouseMoved",locations.to);await mouse("mouseReleased",locations.to);
    }
    assert.equal(await evaluate('document.querySelectorAll(".mix-ingredient.added").length'),5,"recipe ingredients must be placed in bowl");
    if(round===0)await screenshot("potion-ready");
    const bowl=await evaluate('(()=>{const r=document.querySelector(".mix-bowl").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
    await mouse("mousePressed",{x:bowl.x+40,y:bowl.y});
    for(let i=1;i<=25;i++){const angle=i*Math.PI*2/25;await mouse("mouseMoved",{x:bowl.x+40*Math.cos(angle),y:bowl.y+40*Math.sin(angle)})}
    await mouse("mouseReleased",{x:bowl.x+40,y:bowl.y});
    await until(`document.querySelectorAll(".session-rounds .done").length===${round+1}`,`potion round ${round+1} stirred`);
    if(round<2)await until('document.querySelectorAll(".mix-ingredient").length===11&&document.querySelectorAll(".mix-ingredient.added").length===0',"new potion round");
  }
  await until('document.querySelector("#activityRewardScreen").classList.contains("active")',"stirred potion reward");
  await evaluate('document.querySelector("#worldButton").click()');
  assert.equal(await evaluate('document.querySelectorAll(\'.activity-card[data-game="heart"],.map-panel-game[data-game="heart"]\').length'),0,"retired heartbeat game must not appear in the play menu");
  await evaluate("document.querySelector('#worldButton').click();document.querySelector('[data-game=xray]').click()");
  await until('document.querySelectorAll(".xray-hotspot").length===3',"X-ray treasures");
  assert((await evaluate('getComputedStyle(document.querySelector(".xray-search")).backgroundImage')).includes("pip-xray-room-clean-v1"),"search art must not contain fixed baked-in treasures");
  await evaluate('document.querySelector(".xray-hotspot").click()');
  assert.equal(await evaluate('document.querySelectorAll(".xray-hotspot.found").length'),0,"X-ray treasure should need scanning, not clicking");
  const revealPoint=await evaluate('(()=>{const s=document.querySelector(".xray-search").getBoundingClientRect(),m=document.querySelector(".xray-hotspot");return{x:s.left+s.width*parseFloat(m.style.left)/100,y:s.top+s.height*parseFloat(m.style.top)/100}})()');
  await mouse("mousePressed",revealPoint);
  assert.equal(await evaluate('document.querySelectorAll(".xray-hotspot.glimpsed").length'),1,"the scanner must reveal a treasure only at its real position");
  await mouse("mouseReleased",revealPoint);
  assert.equal(await evaluate('document.querySelectorAll(".xray-hotspot.glimpsed").length'),0,"an undiscovered treasure must hide when the scanner moves away");
  for(let i=0;i<3;i++){
    const point=await evaluate(`(()=>{const s=document.querySelector(".xray-search").getBoundingClientRect(),m=document.querySelectorAll(".xray-hotspot")[${i}];return{x:s.left+s.width*parseFloat(m.style.left)/100,y:s.top+s.height*parseFloat(m.style.top)/100}})()`);
    await mouse("mousePressed",point);await sleep(760);await mouse("mouseReleased",point);
    assert.equal(await evaluate('document.querySelectorAll(".xray-hotspot.found").length'),i+1,"scanner must reveal one treasure at a time");
  }
  await screenshot("xray-scanned");await until('document.querySelector("#activityRewardScreen").classList.contains("active")',"X-ray detective reward");
  await evaluate('document.querySelector("#worldButton").click()');
  assert.equal(await evaluate('document.querySelectorAll(".activity-card[data-game=rhyme],.activity-card[data-game=blend],.activity-card[data-game=segment]").length'),0,"retired games must not appear");
  await evaluate('document.querySelector(".activity-card[data-game=search]").click()');
  for(let round=0;round<3;round++){
    await until(`document.querySelectorAll(".session-rounds .done").length===${round}`,`search scene ${round+1}`);
    await until('document.querySelectorAll(".forest-search .search-hotspot").length===5',"five hidden objects");
    assert.equal(await evaluate('document.querySelector(".forest-search").style.backgroundImage.includes("enchanted-")'),true,"search illustration must load");
    if(round===0)await screenshot("search-scene");
    await evaluate('document.querySelectorAll(".forest-search .search-hotspot").forEach(h=>h.click())');
    await until(`document.querySelectorAll(".session-rounds .done").length===${round+1}`,`searched scene ${round+1}`);
    if(round<2)await until('document.querySelectorAll(".forest-search .search-hotspot.found").length===0',"next search scene");
  }
  await until('document.querySelector("#activityRewardScreen").classList.contains("active")',"three-scene search reward");
  await evaluate('document.querySelector("#worldButton").click();document.querySelector(".activity-card[data-game=measure]").click()');
  for(let round=0;round<3;round++){
    await until(`document.querySelectorAll(".session-rounds .done").length===${round}`,`measure round ${round+1}`);
    await until('!!document.querySelector(".measure-choice:not(:disabled)")',"fresh measuring choices");
    await evaluate('(()=>{const choices=[...document.querySelectorAll(".measure-choice")],values=choices.map(c=>parseFloat(c.firstChild.style.getPropertyValue("--measure"))),shorter=document.querySelector("#activityInstruction").textContent.includes("shorter"),answer=shorter?(values[0]<values[1]?0:1):(values[0]>values[1]?0:1);choices[answer].click()})()');
    await until(`document.querySelectorAll(".session-rounds .done").length===${round+1}`,`measured round ${round+1}`);
  }
  await until('document.querySelector("#activityRewardScreen").classList.contains("active")',"three-round measuring reward");
  await evaluate('document.querySelector("#worldButton").click()');
  for(const id of ["stable","pattern","forest","words","math"]){
    await evaluate(`document.querySelector('.activity-card[data-game="${id}"]').click()`);
    for(let round=0;round<3;round++){
      await until(`document.querySelectorAll(".session-rounds .done").length===${round}`,`${id} round ${round+1}`);
      await until('!!document.querySelector(".choice-tile:not(:disabled)")',`${id} fresh choices`);
      await evaluate('(()=>{const correct=activeAdventure.choices[activeAdventure.answer];[...document.querySelectorAll(".choice-tile")].find(b=>b.textContent===correct).click()})()');
      await until(`document.querySelectorAll(".session-rounds .done").length===${round+1}`,`${id} completed round ${round+1}`);
      if(round<2)assert.equal(await evaluate('document.querySelector("#activityRewardScreen").classList.contains("active")'),false,"three-round game rewarded too early");
    }
    await until('document.querySelector("#activityRewardScreen").classList.contains("active")',`${id} reward`);
    await evaluate('document.querySelector("#worldButton").click()');
  }
  await evaluate("document.querySelector('[data-game=nursery]').click()");
  for(let round=0;round<3;round++){
    await until(`document.querySelectorAll(".session-rounds .done").length===${round}`,`egg round ${round+1}`);
    await until('!!document.querySelector(".egg-nest:not(:disabled)")',"fresh egg nests");
    await evaluate('(()=>{const more=document.querySelector("#activityInstruction").textContent.includes("more"),nests=[...document.querySelectorAll(".egg-nest")],counts=nests.map(b=>Number(b.querySelector("b").textContent)),answer=more?(counts[0]>counts[1]?0:1):(counts[0]<counts[1]?0:1);nests[answer].click()})()');
    await until(`document.querySelectorAll(".session-rounds .done").length===${round+1}`,`egg completed round ${round+1}`);
    if(round<2)assert.equal(await evaluate('document.querySelector("#activityRewardScreen").classList.contains("active")'),false,"egg game rewarded too early");
  }
  await until('document.querySelector("#activityRewardScreen").classList.contains("active")',"counting eggs reward");
  await evaluate("document.querySelector('#worldButton').click();document.querySelector('[data-game=nests]').click()");
  for(let round=0;round<3;round++){
    await until(`document.querySelectorAll(".session-rounds .done").length===${round}`,`magic nest round ${round+1}`);
    await until('!!document.querySelector(".ten-cell:not(:disabled)")',"fresh magic nest");
    const target=await evaluate('Number(document.querySelector("#activityInstruction").textContent.match(/Build (\\d+)/)[1])');
    for(let i=0;i<target;i++)await evaluate('document.querySelector(".ten-cell:not(.filled)").click()');
    await until(`document.querySelectorAll(".session-rounds .done").length===${round+1}`,`magic nest completed round ${round+1}`);
    if(round<2)assert.equal(await evaluate('document.querySelector("#activityRewardScreen").classList.contains("active")'),false,"magic nest rewarded too early");
  }
  await until('document.querySelector("#activityRewardScreen").classList.contains("active")',"magic nest reward");
  for(const id of ["letter","number"]){
    await evaluate(`document.querySelector("#worldButton").click();document.querySelector('.activity-card[data-game="${id}"]').click()`);
    await until('document.querySelectorAll(".guided-trace-game .trace-dot").length>=3',"trace path");
    await evaluate('document.querySelectorAll(".guided-trace-game .trace-dot").forEach(d=>d.click())');
    assert.equal(await evaluate('document.querySelectorAll(".guided-trace-game .trace-dot.done").length'),0,"tapping dots cannot write");
    for(let round=0;round<3;round++){
      const glyph=await evaluate('document.querySelector(".guided-trace-game").getAttribute("aria-label").match(/Trace (.)/)[1]');
      const strokes=await evaluate('Object.values(Object.groupBy([...document.querySelectorAll(".guided-trace-game .trace-dot")],d=>d.dataset.stroke)).map(group=>group.map(d=>{const r=d.getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}}))');
      for(const dots of strokes){
        const halfway=Math.floor(dots.length/2);
        await mouse("mousePressed",dots[0]);for(const dot of dots.slice(1,halfway+1))await mouse("mouseMoved",dot);await mouse("mouseReleased",dots[halfway]);
        await mouse("mousePressed",dots[halfway+1]);for(const dot of dots.slice(halfway+2))await mouse("mouseMoved",dot);await mouse("mouseReleased",dots.at(-1));
      }
      await until(`document.querySelectorAll(".session-rounds .done").length===${round+1}`,`${id} glyph ${round+1}`);
      await screenshot(`${id}-${glyph}-drawn`);
      if(round<2)await until('document.querySelectorAll(".guided-trace-game .trace-dot.done").length===0',"next tracing glyph");
    }
    await until('document.querySelector("#activityRewardScreen").classList.contains("active")',"drawn trace reward");
  }
  await evaluate('document.querySelector("#worldButton").click();document.querySelector(\'.activity-card[data-game="shapes"]\').click()');
  await until('!!document.querySelector(".broken-window")',"shape window");
  await evaluate('(()=>{const answer=document.querySelector(".broken-window").dataset.answer;[...document.querySelectorAll(".shape-piece")].find(t=>t.dataset.name!==answer).click()})()');
  assert.equal(await evaluate('document.querySelector(".broken-window").textContent'),"?","wrong shape cannot repair the window");
  for(let round=0;round<3;round++){
    await until(`document.querySelectorAll(".session-rounds .done").length===${round}`,`shape round ${round+1}`);
    await until('!!document.querySelector(".shape-piece:not(:disabled)")',"fresh shape choices");
    const shape=await evaluate('(()=>{const a=document.querySelector(".broken-window"),t=document.querySelector(`.shape-piece[data-name="${a.dataset.answer}"]`),r=t.getBoundingClientRect(),w=a.getBoundingClientRect();return{from:{x:r.x+r.width/2,y:r.y+r.height/2},to:{x:w.x+w.width/2,y:w.y+w.height/2}}})()');
    if(round===0)await evaluate('document.querySelector(`.shape-piece[data-name="${document.querySelector(".broken-window").dataset.answer}"]`).click()');
    else{await mouse("mousePressed",shape.from);await mouse("mouseMoved",shape.to);await mouse("mouseReleased",shape.to)}
    await until(`document.querySelectorAll(".session-rounds .done").length===${round+1}`,`shape completed round ${round+1}`);
    if(round<2)assert.equal(await evaluate('document.querySelector("#activityRewardScreen").classList.contains("active")'),false,"shape repair rewarded too early");
  }
  await screenshot("shape-repaired");await until('document.querySelector("#activityRewardScreen").classList.contains("active")',"shape repair reward");
  await evaluate('document.querySelector("#worldButton").click();document.querySelector(\'.activity-card[data-game="sort"]\').click()');
  await until('!!document.querySelector(".sort-item")',"sort supply");
  await evaluate('document.querySelector(".sort-basket").click()');
  assert.equal(await evaluate('[...document.querySelectorAll(".sort-basket b")].reduce((n,e)=>n+Number(e.textContent),0)'),0,"clicking a basket cannot sort a supply");
  for(let i=0;i<6;i++){
    const move=await evaluate('(()=>{const item=document.querySelector(".sort-item"),basket=document.querySelector(`.sort-basket[data-group="${item.dataset.group}"]`),a=item.getBoundingClientRect(),b=basket.getBoundingClientRect();return{from:{x:a.x+a.width/2,y:a.y+a.height/2},to:{x:b.x+b.width/2,y:b.y+b.height/2}}})()');
    await mouse("mousePressed",move.from);await mouse("mouseMoved",move.to);await mouse("mouseReleased",move.to);
    assert.equal(await evaluate('[...document.querySelectorAll(".sort-basket b")].reduce((n,e)=>n+Number(e.textContent),0)'),i+1,"basket must receive dropped item");
  }
  await screenshot("supplies-sorted");await until('document.querySelector("#activityRewardScreen").classList.contains("active")',"supply sort reward");
  await evaluate('document.querySelector("#worldButton").click();document.querySelector(\'.activity-card[data-game="horn"]\').click()');
  await until('document.querySelectorAll(".horn-ring-token").length===6',"rainbow rings");
  await evaluate('document.querySelector(".horn-ring-token").click()');
  assert.equal(await evaluate('document.querySelectorAll(".horn-sequence .restored").length'),0,"color click cannot restore horn");
  for(const [i,color] of ["🔴","🟠","🟡","🟢","🔵","🟣"].entries()){
    const move=await evaluate(`(()=>{const t=[...document.querySelectorAll(".horn-ring-token:not(.placed)")].find(e=>e.textContent===${JSON.stringify(color)}),p=document.querySelector(".horn-repair-portrait"),a=t.getBoundingClientRect(),r=p.getBoundingClientRect();return{from:{x:a.x+a.width/2,y:a.y+a.height/2},to:{x:r.x+r.width*.5,y:r.y+r.height*.17}}})()`);
    await mouse("mousePressed",move.from);await mouse("mouseMoved",move.to);await mouse("mouseReleased",move.to);
    assert.equal(await evaluate('document.querySelectorAll(".horn-sequence .restored").length'),i+1,"horn must restore one ordered color at a time");
  }
  await screenshot("horn-rainbow-restored");await until('document.querySelector("#activityRewardScreen").classList.contains("active")',"horn rainbow reward");
  // The original teeth-cleaning game must require brushing, not a one-touch plaque removal.
  await evaluate('MagicalHospital.startDentist()');
  await screenshot("dentist-sparkly-cue");
  assert.equal(await evaluate('document.querySelectorAll(".tooth.cue").length'),1,"one visible sparkling tooth must invite the first tap");
  await evaluate('document.querySelector(".tooth.cue").click()');
  await until('document.querySelectorAll(".tooth.dirty").length===8',"dirty teeth ready");
  await screenshot("dentist-bugs-before");
  const tooth=await evaluate('(()=>{const r=document.querySelector(".tooth.dirty").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
  await mouse("mousePressed",tooth);
  assert.equal(await evaluate('document.querySelectorAll(".tooth.dirty").length'),8,"touching plaque cannot remove it");
  await mouse("mouseMoved",{x:tooth.x+5,y:tooth.y});
  const partialPlaque=await evaluate('document.querySelector(".tooth.dirty").style.getPropertyValue("--plaque")');
  assert(Number(partialPlaque)<1&&Number(partialPlaque)>0,"plaque should fade as brushing begins");
  for(let i=0;i<15;i++)await mouse("mouseMoved",{x:tooth.x+(i%2?-5:5),y:tooth.y});
  await mouse("mouseReleased",tooth);
  assert.equal(await evaluate('document.querySelectorAll(".tooth.dirty").length'),7,"repeated brushing clears one plaque spot only");
  for(let count=7;count>0;count--){
    const p=await evaluate('(()=>{const r=document.querySelector(".tooth.dirty").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
    await mouse("mousePressed",p);for(let i=0;i<15;i++)await mouse("mouseMoved",{x:p.x+(i%2?-6:6),y:p.y});await mouse("mouseReleased",p);
    assert.equal(await evaluate('document.querySelectorAll(".tooth.dirty").length'),count-1,"each brushing gesture must remove one bug");
  }
  await until('document.querySelector("#challengeScreen").classList.contains("active")',"dentist learning challenge");
  await evaluate('document.querySelectorAll(".answer-button")[currentChallenge.answer].click()');
  await until('document.querySelector("#gameScreen").classList.contains("active")&&document.querySelectorAll(".tooth.sparkle").length===8',"eight visibly glowing polish targets");
  await screenshot("dentist-polish-before");
  for(let count=8;count>0;count--){
    const p=await evaluate('(()=>{const r=document.querySelector(".tooth.sparkle").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
    await mouse("mousePressed",p);for(let i=0;i<10;i++)await mouse("mouseMoved",{x:p.x+(i%2?-6:6),y:p.y});await mouse("mouseReleased",p);
    assert.equal(await evaluate('document.querySelectorAll(".tooth.sparkle").length'),count-1,"polishing must clear one glowing tooth at a time");
  }
  await until('document.querySelector("#rewardScreen").classList.contains("active")',"dentist reward");
  console.log("PASS complete dentist check, brushing, learning, polishing, and reward");
  await send("Emulation.setDeviceMetricsOverride",{width:768,height:1024,deviceScaleFactor:1,mobile:true});
  await evaluate('MagicalHospital.startDentist()');
  await screenshot("dentist-tablet-cue");
  const cue=await evaluate('(()=>{const r=document.querySelector(".tooth.cue").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
  await send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:cue.x,y:cue.y,id:1}]});
  await send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
  await until('document.querySelectorAll(".tooth.dirty").length===8',"tablet tap starts brushing");
  await screenshot("dentist-tablet-bugs");
  const touchTooth=await evaluate('(()=>{const r=document.querySelector(".tooth.dirty").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
  await send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:touchTooth.x,y:touchTooth.y,id:2}]});
  for(let i=0;i<16;i++)await send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x:touchTooth.x+(i%2?-7:7),y:touchTooth.y,id:2}]});
  await send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
  assert((await evaluate('document.querySelectorAll(".tooth.dirty").length'))<8,"finger motion must remove a bug on tablet");
  await send("Emulation.setDeviceMetricsOverride",{width:1180,height:820,deviceScaleFactor:1,mobile:false});
  await evaluate('startAdventure("color")');
  assert.equal(await evaluate('document.querySelectorAll(".template-button").length'),12,"coloring book needs twelve selectable pages");
  assert.equal(await evaluate('(()=>{const c=document.querySelector(".coloring-canvas-wrap").getBoundingClientRect();return c.width>innerWidth*.82&&c.height>innerHeight*.65})()'),true,"coloring art must use most of the desktop screen");
  assert.equal(await evaluate('(()=>{const t=document.querySelector(".coloring-tabs");return t.scrollHeight>t.clientHeight})()'),true,"twelve picture choices must scroll within the rail");
  await evaluate('document.querySelector(".coloring-more-pages").click()');
  await sleep(450);
  assert.equal(await evaluate('document.querySelector(".coloring-tabs").scrollTop>0'),true,"more-pages arrow must reveal later drawings");
  for(const id of ["unicorn","butterfly","castle","fox","puppy","kitten","owl","panda","pony","bear"]){
    await evaluate(`[...document.querySelectorAll(".template-button")].find(b=>b.getAttribute("aria-label")==="${id} coloring page").click()`);
    await sleep(250);await screenshot(`coloring-${id}`);
  }
  const newPagePoint=await evaluate('(()=>{const r=document.querySelector(".paint-canvas").getBoundingClientRect();return{x:r.x+r.width*.52,y:r.y+r.height*.52}})()');
  await mouse("mousePressed",newPagePoint);await mouse("mouseMoved",{x:newPagePoint.x+34,y:newPagePoint.y+12});await mouse("mouseReleased",{x:newPagePoint.x+34,y:newPagePoint.y+12});
  assert((await evaluate('MagicalHospital.getState().story.coloringPages?.bear||""')).startsWith("data:image/webp"),"new bear coloring page must save separately");
  await evaluate('[...document.querySelectorAll(".template-button")].find(b=>b.getAttribute("aria-label")==="dragon coloring page").click()');
  await evaluate('[...document.querySelectorAll(".template-button")].find(b=>b.getAttribute("aria-label")==="bear coloring page").click()');
  await sleep(300);
  assert.equal(await evaluate('(()=>{const c=document.querySelector(".paint-canvas"),p=c.getContext("2d").getImageData(Math.round(c.width*.52),Math.round(c.height*.52),1,1).data;return p[3]>0})()'),true,"rapid page switching must restore the new page's paint");
  await evaluate('[...document.querySelectorAll(".template-button")].find(b=>b.getAttribute("aria-label")==="dragon coloring page").click()');
  await sleep(250);await screenshot("coloring-dragon");
  const colorPoint=await evaluate('(()=>{const r=document.querySelector(".paint-canvas").getBoundingClientRect();return{x:r.x+r.width*.5,y:r.y+r.height*.5}})()');
  await mouse("mousePressed",colorPoint);await mouse("mouseMoved",{x:colorPoint.x+30,y:colorPoint.y+10});await mouse("mouseReleased",{x:colorPoint.x+30,y:colorPoint.y+10});
  assert((await evaluate('MagicalHospital.getState().story.coloringPages?.dragon||""')).startsWith("data:image/webp"),"dragon coloring must save separately");
  await evaluate('[...document.querySelectorAll(".template-button")].find(b=>b.getAttribute("aria-label")==="bunny coloring page").click()');
  await sleep(250);await screenshot("coloring-bunny");
  await send("Emulation.setDeviceMetricsOverride",{width:1024,height:768,deviceScaleFactor:1,mobile:true});
  await screenshot("coloring-tablet-landscape");
  const fingerPoint=await evaluate('(()=>{const r=document.querySelector(".paint-canvas").getBoundingClientRect();return{x:r.x+r.width*.48,y:r.y+r.height*.5}})()');
  await send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:fingerPoint.x,y:fingerPoint.y,id:7}]});
  for(let i=0;i<8;i++)await send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x:fingerPoint.x+i*7,y:fingerPoint.y+i*2,id:7}]});
  await send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
  assert((await evaluate('MagicalHospital.getState().story.coloringPages?.bunny||""')).startsWith("data:image/webp"),"finger coloring must save on iPad-sized screen");
  await screenshot("coloring-tablet-painted");
  await send("Emulation.setDeviceMetricsOverride",{width:768,height:1024,deviceScaleFactor:1,mobile:true});
  assert.equal(await evaluate('(()=>{const c=document.querySelector(".paint-canvas").getBoundingClientRect(),w=document.querySelector(".coloring-canvas-wrap").getBoundingClientRect();return c.height>=w.height*.95&&c.width>w.width})()'),true,"portrait coloring art must fill height without stretching");
  await screenshot("coloring-tablet-portrait");
  await evaluate('[...document.querySelectorAll(".coloring-view-button")].find(b=>b.getAttribute("aria-label").includes("Slide")).click()');
  const panPoint=await evaluate('(()=>{const r=document.querySelector(".coloring-canvas-wrap").getBoundingClientRect();return{x:r.x+r.width*.5,y:r.y+r.height*.5}})()');
  await mouse("mousePressed",panPoint);await mouse("mouseMoved",{x:panPoint.x-130,y:panPoint.y});await mouse("mouseReleased",{x:panPoint.x-130,y:panPoint.y});
  assert.notEqual(await evaluate('document.querySelector(".coloring-canvas-wrap").style.getPropertyValue("--pan-x")'),"0px","hand mode must slide the portrait art");
  await screenshot("coloring-tablet-panned");
  await evaluate('[...document.querySelectorAll(".coloring-view-button")].find(b=>b.getAttribute("aria-label").includes("whole coloring page")).click()');
  await screenshot("coloring-tablet-fit");
  await send("Emulation.setDeviceMetricsOverride",{width:1180,height:820,deviceScaleFactor:1,mobile:false});
  const narration=await evaluate(`(()=>{
    const original={audio:voicePlayer.audio,clips:voicePlayer.clips,maxLen:voicePlayer.maxLen,sound:MagicalHospital.getState().sound};
    const fake={src:"",volume:0,pause(){},play(){return Promise.resolve()},onended:null,onerror:null};
    MagicalHospital.getState().sound=true;voicePlayer.audio=fake;voicePlayer.clips={first:"first.mp3",second:"second.mp3"};voicePlayer.maxLen=1;stopVoice();
    speak("first");speak("second");const queued=fake.src.endsWith("first.mp3")&&voicePlayer.pending?.text==="second";
    fake.onended();const resumed=fake.src.endsWith("second.mp3")&&voicePlayer.pending===null;
    fake.onended();speak("unrecorded clinic line",{recordedOnly:true});const silent=!voicePlayer.busy;
    stopVoice();voicePlayer.audio=original.audio;voicePlayer.clips=original.clips;voicePlayer.maxLen=original.maxLen;MagicalHospital.getState().sound=original.sound;
    return{queued,resumed,silent};
  })()`);
  assert.deepEqual(narration,{queued:true,resumed:true,silent:true},"narration must finish before the next cue and avoid device speech for missing clinic lines");
  await evaluate('document.querySelector("#wardrobeButton").click()');
  await until('document.querySelector("#wardrobeDialog").open',"wardrobe opens");
  assert.equal(await evaluate('document.querySelectorAll("#outfitGrid .outfit-card").length'),14,"wardrobe has fourteen complete looks");
  assert.equal(await evaluate('document.querySelectorAll("#wardrobeDialog svg,#wardrobeDialog .dressup-art-layer").length'),0,"wardrobe does not stack floating accessory layers");
  await evaluate('document.querySelector(".outfit-card[data-outfit=clinicbag]").click()');
  assert.equal(await evaluate('MagicalHospital.getState().story.currentOutfit'),"clinicbag","finished clinic look must save");
  assert.equal(await evaluate('document.querySelector("#avatarPreview").dataset.outfit'),"clinicbag","large preview must match selected finished look");
  assert.equal(await evaluate('JSON.parse(localStorage.getItem("annabeth-magical-hospital-v1")).story.currentOutfit'),"clinicbag","finished look must persist in browser storage");
  await screenshot("wardrobe-complete-clinic-bag");
  await evaluate('document.querySelector(".outfit-card[data-outfit=mousevet]").click()');
  assert.equal(await evaluate('document.querySelector("#avatarPreview").dataset.outfit'),"mousevet","second complete look must swap as a whole");
  await screenshot("wardrobe-complete-mouse-vet");
  await evaluate('document.querySelector(".outfit-card[data-outfit=clinicbag]").click()');
  await evaluate('document.querySelector("#wardrobeDialog").close();startAdventure("paw")');
  assert.equal(await evaluate('document.querySelector("#activityAvatarReady").dataset.outfit'),"clinicbag","saved complete look must appear during play");
  await screenshot("activity-avatar");
  assert.deepEqual(errors,[],"browser errors");
  console.log("PASS native mouse/touch hit testing; all "+precache.length+" cached files exist");
  console.log(JSON.stringify({results,portrait,consoleErrors:errors},null,2));
}finally{
  await browser.close();server.close();
}
