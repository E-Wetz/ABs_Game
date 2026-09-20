const port=Number(process.argv[2]||9223);
const pages=await fetch(`http://127.0.0.1:${port}/json`).then(r=>r.json());
const page=pages.find(p=>p.type==="page");
if(!page)throw new Error("No Chrome page target found");

const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{ws.onopen=resolve;ws.onerror=reject});
let id=0;
const pending=new Map(),errors=[];
ws.onmessage=event=>{
  const message=JSON.parse(event.data);
  if(message.id&&pending.has(message.id)){const {resolve,reject}=pending.get(message.id);pending.delete(message.id);message.error?reject(new Error(message.error.message)):resolve(message.result);return}
  if(message.method==="Runtime.exceptionThrown")errors.push(message.params.exceptionDetails.exception?.description||message.params.exceptionDetails.text);
  if(message.method==="Log.entryAdded"&&message.params.entry.level==="error")errors.push(message.params.entry.text);
  if(message.method==="Network.responseReceived"&&message.params.response.status>=400)errors.push(`${message.params.response.status} ${message.params.response.url}`);
};
const send=(method,params={})=>new Promise((resolve,reject)=>{const callId=++id;pending.set(callId,{resolve,reject});ws.send(JSON.stringify({id:callId,method,params}))});
await send("Runtime.enable");
await send("Log.enable");
await send("Network.enable");

const seeded={stars:999,gems:99,missions:0,ticTacToeWins:0,sound:false,story:{completedActivities:[],currentOutfit:"doctor",chapter:1,customLook:{}},mastery:{}};
try{await send("Runtime.evaluate",{expression:`localStorage.setItem("annabeth-magical-hospital-v1",${JSON.stringify(JSON.stringify(seeded))});location.reload();`})}catch{}
await new Promise(resolve=>setTimeout(resolve,300));

const expression=String.raw`(async()=>{
  const wait=(ms=8)=>new Promise(resolve=>setTimeout(resolve,ms));
  const results=[];
  const record=(id,ok,detail="")=>results.push({id,ok,detail});
  const active=id=>document.querySelector("#"+id)?.classList.contains("active");
  const reward=()=>active("activityRewardScreen")||active("rewardScreen");
  const clickAll=selector=>[...document.querySelectorAll(selector)].filter(x=>!x.disabled).forEach(x=>x.click());
  const until=async(test,action,limit=160)=>{for(let i=0;i<limit;i++){if(test())return true;await action(i);await wait()}return test()};
  const openWorld=async()=>{document.querySelector("#worldButton").click();await wait()};
  const launch=async id=>{await openWorld();const card=document.querySelector('.activity-card[data-game="'+id+'"]');if(!card)throw new Error("Missing card "+id);card.click();await wait()};
  const test=async(id,runner)=>{try{await launch(id);const ok=await runner();record(id,Boolean(ok),ok?"completed":"did not reach reward screen")}catch(error){record(id,false,error.message)}};

  const realTimeout=window.setTimeout.bind(window),realInterval=window.setInterval.bind(window);
  window.setTimeout=(fn,ms,...args)=>realTimeout(fn,Math.min(ms,8),...args);
  window.setInterval=(fn,ms,...args)=>realInterval(fn,Math.min(ms,8),...args);
  const choiceRunner=()=>until(reward,async()=>clickAll(".choice-tile"));
  await test("horn",()=>until(reward,async()=>{for(const symbol of ["🔴","🟠","🟡","🟢","🔵","🟣"]){[...document.querySelectorAll(".sequence-tile")].find(x=>x.textContent.includes(symbol)&&!x.disabled)?.click();await wait()}}));
  await test("potion",()=>until(reward,async()=>{const b=[...document.querySelectorAll(".play-target")];b[0]?.click();b[1]?.click()}));
  await test("xray",()=>until(reward,async()=>clickAll(".search-hotspot")));
  await test("search",()=>until(reward,async()=>clickAll(".search-hotspot")));
  await test("heart",async()=>{await wait(80);return until(reward,async()=>document.querySelector(".rhythm-pad:not(:disabled)")?.click())});
  for(const id of ["forest","rhyme","words","stable","math","pattern"])await test(id,choiceRunner);
  await test("nursery",()=>until(reward,async()=>clickAll(".egg-nest")));
  await test("nests",()=>until(reward,async()=>clickAll(".ten-cell")));
  await test("shapes",()=>until(reward,async()=>clickAll(".shape-piece")));
  await test("measure",()=>until(reward,async()=>clickAll(".measure-choice")));
  await test("sort",()=>until(reward,async()=>clickAll(".sort-basket"),240));
  await test("blend",()=>until(reward,async()=>clickAll(".choice-tile")));
  await test("segment",()=>until(reward,async()=>document.querySelector(".sound-egg.active:not(:disabled)")?.click()));
  for(const id of ["letter","number"])await test(id,()=>until(reward,async()=>document.querySelector(".trace-dot.active:not(:disabled)")?.click(),260));
  await test("memory",()=>until(reward,async()=>{const cards=[...document.querySelectorAll(".memory-card:not(.matched)")];const groups={};for(const card of cards)(groups[card.textContent]??=[]).push(card);const pair=Object.values(groups).find(g=>g.length===2);if(pair){pair[0].click();pair[1].click()}}));
  await test("color",async()=>{document.querySelector(".done-coloring-button")?.click();await wait();return reward()});
  await test("paw",()=>until(reward,async()=>{const instruction=document.querySelector("#activityInstruction")?.textContent.toLowerCase()||"";const correct=[...document.querySelectorAll(".care-tool:not(:disabled)")].find(x=>instruction.includes(x.querySelector("small")?.textContent.trim().toLowerCase()));correct?.click();await wait();clickAll(".care-detail:not(.done)");const view=document.querySelector(".care-treatment");if(view){const r=view.getBoundingClientRect();for(let i=0;i<28;i++){const x=r.left+r.width*(.3+(i%7)*.065),y=r.top+r.height*(.35+(i%4)*.09);view.dispatchEvent(new PointerEvent("pointerdown",{bubbles:true,clientX:x,clientY:y,pointerId:1,buttons:1}));view.dispatchEvent(new PointerEvent("pointermove",{bubbles:true,clientX:x+45,clientY:y+20,pointerId:1,buttons:1}));view.dispatchEvent(new PointerEvent("pointerup",{bubbles:true,clientX:x+45,clientY:y+20,pointerId:1}))}}},420));

  try{
    await openWorld();document.querySelector('.activity-card[data-game="dentist"]').click();await wait();document.querySelector(".tooth.sparkle")?.click();await wait();
    const brush=async()=>{for(const tooth of document.querySelectorAll(".tooth.dirty,.tooth.sparkle")){const r=tooth.getBoundingClientRect();document.querySelector("#mouthGame").dispatchEvent(new PointerEvent("pointermove",{bubbles:true,clientX:r.left+r.width/2,clientY:r.top+r.height/2,pointerType:"mouse",buttons:1}));await wait(3)}};
    await until(()=>active("challengeScreen"),brush,80);if(active("challengeScreen"))await until(()=>active("gameScreen"),async()=>clickAll(".answer-button"),80);await until(()=>active("rewardScreen"),brush,100);record("dentist",active("rewardScreen"),active("rewardScreen")?"completed":"did not reach reward screen")
  }catch(error){record("dentist",false,error.message)}

  try{
    await openWorld();document.querySelector('.activity-card[data-game="tictactoe"]').click();await wait();
    const ok=await until(()=>document.querySelector(".ttt-actions")?.classList.contains("round-over"),async()=>{document.querySelector(".ttt-cell:not(:disabled)")?.click();await wait(18)},120);
    record("tictactoe",ok,ok?"round completed":"round did not finish")
  }catch(error){record("tictactoe",false,error.message)}

  const state=JSON.parse(localStorage.getItem("annabeth-magical-hospital-v1"));
  return {results,stateSummary:{stars:state.stars,gems:state.gems,missions:state.missions,discoveries:state.story?.completedActivities?.length,masterySkills:Object.keys(state.mastery||{}).length},activeScreen:document.querySelector(".screen.active")?.id};
})()`;

const evaluation=await send("Runtime.evaluate",{expression,awaitPromise:true,returnByValue:true,userGesture:true});
if(evaluation.exceptionDetails){console.error(JSON.stringify(evaluation.exceptionDetails,null,2));throw new Error(evaluation.exceptionDetails.text)}
const value=evaluation.result?.value;
console.log(JSON.stringify({playthrough:value,consoleErrors:errors},null,2));
ws.close();
