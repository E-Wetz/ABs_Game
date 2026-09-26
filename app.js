"use strict";

const STORAGE_KEY = "annabeth-magical-hospital-v1";
const skillNames = {
  endingSounds: "Ending sounds",
  middleSounds: "Middle sounds",
  rhyming: "Rhyming words",
  sightWords: "Kindergarten sight words",
  doubleDigits: "Double-digit numbers",
  counting: "Counting and comparing sets",
  teenNumbers: "Numbers 11–19",
  geometry: "Shapes and spatial reasoning",
  measurement: "Measurement comparisons",
  classification: "Sorting and classification",
  blending: "Blending spoken sounds",
  segmenting: "Segmenting spoken words",
  additionSubtraction: "Visual addition and subtraction",
  patterns: "Patterns and sequences",
  letterFormation: "Letter tracing practice",
  numberFormation: "Number tracing practice"
};

const challenges = [
  { skill:"endingSounds", badge:"Sound Detective", prompt:"Listen for the last sound: /t/.", speech:"Listen to the last sound. Cat, sun, fish. Which picture ends with t?", choices:["🐱 Cat","☀️ Sun","🐟 Fish"], answer:0 },
  { skill:"endingSounds", badge:"Sound Detective", prompt:"Listen for the last sound: /g/.", speech:"Listen to the last sound. Dog, bee, moon. Which picture ends with g?", choices:["🐶 Dog","🐝 Bee","🌙 Moon"], answer:0 },
  { skill:"middleSounds", badge:"Sound Detective", prompt:"Listen for short i in the middle.", speech:"Listen to the middle sound. Pig, sun, cake. Which picture has short i in the middle?", choices:["🐷 Pig","☀️ Sun","🎂 Cake"], answer:0 },
  { skill:"middleSounds", badge:"Sound Detective", prompt:"Listen for short o in the middle.", speech:"Listen to the middle sound. Fox, bee, kite. Which picture has short o in the middle?", choices:["🦊 Fox","🐝 Bee","🪁 Kite"], answer:0 },
  { skill:"rhyming", badge:"Rhyme Time", prompt:"Which word rhymes with star?", speech:"Which word rhymes with star? Car, moon, or fish?", choices:["🚗 Car","🌙 Moon","🐟 Fish"], answer:0 },
  { skill:"rhyming", badge:"Rhyme Time", prompt:"Which word rhymes with bug?", speech:"Which word rhymes with bug? Rug, cat, or bee?", choices:["🧶 Rug","🐱 Cat","🐝 Bee"], answer:0 },
  { skill:"sightWords", badge:"Word Sparkle", prompt:"Find the word “the”.", speech:"Find the word the.", choices:["the","and","you"], answer:0 },
  { skill:"sightWords", badge:"Word Sparkle", prompt:"Find the word “said”.", speech:"Find the word said.", choices:["see","said","can"], answer:1 },
  { skill:"sightWords", badge:"Word Sparkle", prompt:"Find the word “little”.", speech:"Find the word little.", choices:["like","look","little"], answer:2 },
  { skill:"doubleDigits", badge:"Number Magic", prompt:"Tap the number forty-two.", speech:"Tap the number forty two.", choices:["24","42","12"], answer:1 },
  { skill:"doubleDigits", badge:"Number Magic", prompt:"Tap the number sixty-seven.", speech:"Tap the number sixty seven.", choices:["76","57","67"], answer:2 },
  { skill:"doubleDigits", badge:"Number Magic", prompt:"Which number is 3 tens and 5 ones?", speech:"Which number is three tens and five ones?", choices:["35","53","25"], answer:0 }
];

const defaultState = () => ({
  stars:0, gems:0, missions:0, ticTacToeWins:0, sound:true, voiceName:"",
  story:{ completedActivities:[], currentOutfit:"doctor", chapter:1 },
  mastery:Object.fromEntries(Object.keys(skillNames).map(key => [key,{ attempts:0, correct:0, streak:0, level:1, lastPlayed:null }]))
});

let state = loadState();
let stage = 0;
let currentChallenge = null;
let challengeMistakes = 0;
let cleaned = new Set();
let toothCareProgress = new Map();
let lastBrushPoint = null;
let cleaningEnabled = false;
let tttBoard = Array(9).fill("");
let tttActive = false;
let tttThinking = false;

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const base = defaultState();
    if (!saved) return base;
    return { ...base, ...saved, mastery:{ ...base.mastery, ...(saved.mastery || {}) } };
  } catch { return defaultState(); }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  renderStats();
}

function showScreen(id) {
  $$(".screen").forEach(screen => screen.classList.toggle("active", screen.id === id));
  updateBgMusic(id);
}

// Gentle looping music bed for the title and map screens, so the child hears something pleasant
// there instead of the same spoken lines repeating on every visit. Silently does nothing until a
// real licensed loop is placed at MUSIC_SRC; never falls back to synthesized sound.
const MUSIC_SRC = "assets/audio/title-loop.mp3";
const MUSIC_PACKAGED = true; // assets/audio/title-loop.mp3 ("Caketown 1") is packaged and cached; see sw.js ASSETS
const bgMusic = new Audio();
bgMusic.loop = true; bgMusic.volume = 0.35; bgMusic.preload = "none";
let bgMusicWanted = false, bgMusicAvailable = MUSIC_PACKAGED;
if (MUSIC_PACKAGED) bgMusic.src = MUSIC_SRC;
function updateBgMusic(screenId) {
  bgMusicWanted = state.sound && (screenId === "homeScreen" || screenId === "worldScreen");
  if (bgMusicWanted) attemptBgMusicPlay(); else bgMusic.pause();
}
function attemptBgMusicPlay() {
  if (!bgMusicWanted || bgMusicAvailable !== true || !bgMusic.paused) return;
  const started = bgMusic.play();
  if (started && started.catch) started.catch(() => {});
}
// Autoplay policies block sound until a user gesture; retry once on the first interaction.
["pointerdown", "keydown"].forEach(type => document.addEventListener(type, attemptBgMusicPlay, { once: true, passive: true }));
window.addEventListener("hospital-sound-change", () => updateBgMusic($$(".screen.active")[0]?.id));

// Stop all audio immediately when the app is backgrounded, the screen locks, or it's closed/switched
// away from (swipe up, app switcher, etc.) so music or a voice line never keeps playing after the
// child has left the game. Resume the music bed only if it was actually wanted when we come back.
function stopAllAudio() {
  bgMusic.pause();
  stopVoice();
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopAllAudio();
  else if (bgMusicWanted) attemptBgMusicPlay();
});
window.addEventListener("pagehide", stopAllAudio);

// Recorded voice (assets/voice, generated with the af_heart voice). Any spoken line is matched against the
// clip index; if every word is covered the clips play back to back, otherwise we fall back to device speech.
const VOICE_ONES="zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split(" ");
const VOICE_TENS=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];
function voiceNumberWords(n){return n<20?VOICE_ONES[n]:n<100?VOICE_TENS[Math.floor(n/10)]+(n%10?" "+VOICE_ONES[n%10]:""):n===100?"one hundred":String(n)}
function voiceTokens(text){return String(text).toLowerCase().replace(/[\u2018\u2019]/g,"'").replace(/\d+/g,m=>" "+voiceNumberWords(+m)+" ").replace(/-/g," ").replace(/[^a-z' ]+/g," ").split(/\s+/).filter(Boolean)}
const voicePlayer={clips:null,maxLen:1,audio:new Audio(),token:0,busy:false,pending:null};
fetch("assets/voice/index.json").then(r=>r.ok?r.json():null).then(data=>{if(!data)return;voicePlayer.clips=data.clips;voicePlayer.maxLen=Math.max(...Object.keys(data.clips).map(k=>k.split(" ").length))}).catch(()=>{});
function stopVoice(){voicePlayer.token++;voicePlayer.busy=false;voicePlayer.pending=null;try{voicePlayer.audio.pause()}catch{}}
function finishVoice(token){
  if(token!==voicePlayer.token)return;
  voicePlayer.busy=false;
  const pending=voicePlayer.pending;voicePlayer.pending=null;
  if(pending)speak(pending.text,pending.options);
}
function voiceClipsFor(text){
  const clips=voicePlayer.clips;if(!clips)return null;
  const tokens=voiceTokens(text),files=[];if(!tokens.length)return null;
  let i=0;
  while(i<tokens.length){
    let hit=null;
    for(let len=Math.min(voicePlayer.maxLen,tokens.length-i);len>0;len--){const f=clips[tokens.slice(i,i+len).join(" ")];if(f){hit={f,len};break}}
    if(!hit)return null;
    files.push("assets/voice/"+hit.f);i+=hit.len;
  }
  return files;
}
function playVoiceClips(files,text){
  const token=++voicePlayer.token,audio=voicePlayer.audio;let i=0;voicePlayer.busy=true;
  const next=()=>{
    if(token!==voicePlayer.token)return;
    if(i>=files.length){finishVoice(token);return}
    audio.src=files[i++];audio.volume=.95;
    const started=audio.play();
    if(started&&started.catch)started.catch(()=>{if(token===voicePlayer.token)finishVoice(token)});
  };
  audio.onended=next;audio.onerror=()=>finishVoice(token);
  next();
}
function speak(text,options={}) {
  if (!state.sound) return;
  if(voicePlayer.busy&&!options.interrupt){voicePlayer.pending={text,options};return}
  if(options.interrupt)stopVoice();
  if("speechSynthesis" in window&&options.interrupt)speechSynthesis.cancel();
  const files=voiceClipsFor(text);
  if (files&&files.length) { playVoiceClips(files,text); return; }
  if(options.recordedOnly)return;
  speakSynth(text);
}

function speakSynth(text) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const token=++voicePlayer.token;voicePlayer.busy=true;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = .94;
  utterance.pitch = 1;
  utterance.volume = .92;
  utterance.voice = preferredVoice();
  utterance.onend=()=>finishVoice(token);utterance.onerror=()=>finishVoice(token);
  speechSynthesis.speak(utterance);
}

function availableEnglishVoices() {
  return speechSynthesis.getVoices().filter(voice=>/^en[-_]/i.test(voice.lang));
}

function voiceScore(voice) {
  const name=voice.name.toLowerCase();
  let score=voice.lang.toLowerCase()==="en-us"?20:10;
  if(/natural|enhanced|premium/.test(name))score+=100;
  if(/aria|jenny|ava|samantha|sonia|serena/.test(name))score+=60;
  if(/zira|google us english/.test(name))score+=25;
  if(/compact|novelty|whisper/.test(name))score-=80;
  return score;
}

function preferredVoice() {
  const voices=availableEnglishVoices();
  return voices.find(voice=>voice.name===state.voiceName)||voices.sort((a,b)=>voiceScore(b)-voiceScore(a))[0]||null;
}

function populateVoicePicker() {
  const select=$("#voiceSelect");
  if(!select||!("speechSynthesis" in window))return;
  const voices=availableEnglishVoices().sort((a,b)=>voiceScore(b)-voiceScore(a));
  const chosen=state.voiceName;
  select.replaceChildren(new Option("Best available voice",""));
  voices.forEach(voice=>select.add(new Option(`${voice.name} (${voice.lang})`,voice.name)));
  select.value=voices.some(voice=>voice.name===chosen)?chosen:"";
}

function renderStats() {
  $("#homeStars").textContent = state.stars;
  $("#homeGems").textContent = state.gems;
  $("#homeMissions").textContent = state.missions;
  $("#gameStars").textContent = state.stars;
  $("#tttWins").textContent = state.ticTacToeWins || 0;
  $("#soundButton").textContent = state.sound ? "🔊" : "🔇";
  $("#soundButton").setAttribute("aria-label", state.sound ? "Turn sound off" : "Turn sound on");
}

function setupTeeth() {
  const grid = $("#toothGrid");
  grid.replaceChildren();
  for (let i=0; i<16; i++) {
    const tooth = document.createElement("button");
    tooth.type = "button";
    tooth.className = "tooth";
    tooth.dataset.index = i;
    tooth.setAttribute("aria-label", `Tooth ${i+1}`);
    grid.append(tooth);
  }
  positionDentalTargets();
}

// Coordinates follow the actual upper and lower teeth in the source portrait.
// Convert through object-fit:cover so cropping on a laptop or iPad cannot move
// the interactive spots onto Twinkle's cheeks.
const dentalTeeth=[[803,468],[823,461],[842,456],[861,453],[880,453],[899,455],[918,459],[938,465],
                   [828,517],[840,527],[858,534],[876,537],[894,537],[911,533],[928,526],[941,516]];
function positionDentalTargets(){
  const clinic=$("#clinic"),image=clinic?.querySelector(".clinic-art");if(!clinic||!image)return;
  const width=clinic.clientWidth,height=clinic.clientHeight;if(!width||!height)return;
  const naturalWidth=image.naturalWidth||1672,naturalHeight=image.naturalHeight||941;
  const scale=Math.max(width/naturalWidth,height/naturalHeight),left=(width-naturalWidth*scale)/2,top=(height-naturalHeight*scale)*.48;
  $$(".tooth").forEach((tooth,i)=>{const [x,y]=dentalTeeth[i];tooth.style.left=`${left+x*scale}px`;tooth.style.top=`${top+y*scale}px`;tooth.style.setProperty("--tooth-size",`${Math.max(23,Math.min(40,31*scale))}px`)});
}
window.addEventListener("resize",positionDentalTargets);
window.addEventListener("orientationchange",()=>setTimeout(positionDentalTargets,150));

function startMission() {
  stage = 0; cleaned.clear(); cleaningEnabled = false; challengeMistakes = 0;
  toothCareProgress.clear(); lastBrushPoint = null;
  setupTeeth(); showScreen("gameScreen"); setStage(0);
}

function setStage(next) {
  stage = next;
  const steps = $$(".progress-step");
  steps.forEach((el,i) => el.classList.toggle("active", i <= next));
  $("#progressFill").style.width = `${(next / 3) * 100}%`;
  $("#stageLabel").textContent = `Step ${Math.min(next + 1,4)} of 4`;
  const mouth = $("#mouthGame");
  mouth.classList.remove("brushing","brush-active");

  if (next === 0) {
    $("#instructionText").textContent = "Tap the sparkly tooth to check Twinkle's smile!";
    $("#characterBubble").textContent = "My teeth feel a little tickly!";
    positionDentalTargets();
    const target = $$(".tooth")[4]; target.classList.add("cue");
    target.setAttribute("aria-label","Sparkling tooth — tap to begin");
    target.onclick = () => beginBrushing();
    speak("Dr. Annabeth, Twinkle's teeth feel tickly. Tap the sparkly tooth to take a look!");
  } else if (next === 1) {
    mouth.classList.add("brushing");
    $("#instructionText").textContent = "Brush every sugar bug until all the teeth sparkle!";
    $("#characterBubble").textContent = "Gentle circles, please!";
    speak("Brush every sugar bug. Move the magic toothbrush over all the spots!");
  } else if (next === 2) {
    $("#instructionText").textContent = "Use your learning magic to power the tooth polisher!";
    $("#characterBubble").textContent = "You found every sugar bug!";
    setTimeout(showChallenge, 650);
  } else {
    $("#instructionText").textContent = "Polish the glowing teeth for a magical finish!";
    $("#characterBubble").textContent = "Ooh, the polish is sparkly!";
    cleaningEnabled = true; mouth.classList.add("brushing"); cleaned.clear();
    toothCareProgress.clear(); lastBrushPoint = null;
    $$(".tooth").forEach((t,i) => {if([0,2,4,6,8,10,12,14].includes(i))t.classList.add("sparkle")});
    speak("The polisher is powered up! Brush the glowing teeth for a magical finish.");
  }
}

function beginBrushing() {
  toothCareProgress.clear(); lastBrushPoint = null;
  $$(".tooth").forEach((tooth,i) => {
    tooth.classList.remove("cue","sparkle");
    if ([0,2,4,6,8,10,12,14].includes(i)) tooth.classList.add("dirty");
    tooth.onclick = null;
  });
  cleaningEnabled = true;
  $("#mouthGame").classList.add("brushing");
  setStage(1);
}

function moveBrush(event) {
  if (!cleaningEnabled) return;
  event.preventDefault();
  const mouth = $("#mouthGame");
  mouth.classList.add("brush-active");
  const rect = mouth.getBoundingClientRect();
  const point = event.touches ? event.touches[0] : event;
  $("#brush").style.left = `${point.clientX - rect.left}px`;
  $("#brush").style.top = `${point.clientY - rect.top}px`;
  const currentPoint={x:point.clientX,y:point.clientY};
  if(event.type==="pointerdown"){lastBrushPoint=currentPoint;return}
  const travel=lastBrushPoint?Math.hypot(currentPoint.x-lastBrushPoint.x,currentPoint.y-lastBrushPoint.y):0;
  lastBrushPoint=currentPoint;
  if(travel<3)return;
  const candidates=$$(stage===1?".tooth.dirty":".tooth.sparkle");
  const under=candidates.map(tooth=>{const r=tooth.getBoundingClientRect();return{tooth,distance:Math.hypot(point.clientX-r.left-r.width/2,point.clientY-r.top-r.height/2),reach:Math.max(14,r.width*.58)}}).sort((a,b)=>a.distance-b.distance)[0];
  if(!under||under.distance>under.reach)return;
  const target=under.tooth;
  target.classList.add("cleaning");
  setTimeout(() => target.classList.remove("cleaning"),300);
  if (stage === 1 && target.classList.contains("dirty")) {
    const progress=Math.min(1,(toothCareProgress.get(target.dataset.index)||0)+Math.min(.24,travel/38));
    toothCareProgress.set(target.dataset.index,progress);target.style.setProperty("--plaque",String(1-progress));
    if(progress<1)return;
    target.classList.remove("dirty"); cleaned.add(target.dataset.index);
    if (!$(".tooth.dirty")) { cleaningEnabled=false; setStage(2); }
  } else if (stage === 3) {
    const progress=Math.min(1,(toothCareProgress.get(target.dataset.index)||0)+Math.min(.34,travel/35));
    toothCareProgress.set(target.dataset.index,progress);
    if(progress<1)return;
    target.classList.remove("sparkle");target.classList.add("polished");cleaned.add(target.dataset.index);
    if (cleaned.size >= 8) finishMission();
  }
}

function chooseChallenge() {
  const supportedSkills = [...new Set(challenges.map(challenge => challenge.skill))];
  const weakest = supportedSkills.sort((a,b) => {
    const ma=state.mastery[a], mb=state.mastery[b];
    const sa=ma.attempts ? ma.correct/ma.attempts : -1;
    const sb=mb.attempts ? mb.correct/mb.attempts : -1;
    return sa-sb || ma.attempts-mb.attempts;
  }).slice(0,3);
  const skill = weakest[Math.floor(Math.random()*weakest.length)];
  const pool = challenges.filter(c => c.skill === skill);
  return pool[Math.floor(Math.random()*pool.length)];
}

function showChallenge() {
  currentChallenge = chooseChallenge(); challengeMistakes=0;
  const shuffled=currentChallenge.choices.map((choice,index)=>({choice,correct:index===currentChallenge.answer})).sort(()=>Math.random()-.5);
  currentChallenge={...currentChallenge,choices:shuffled.map(item=>item.choice),answer:shuffled.findIndex(item=>item.correct)};
  $("#skillBadge").textContent = currentChallenge.badge;
  $("#challengePrompt").textContent = currentChallenge.prompt;
  $("#encouragement").textContent = "";
  const answers = $("#answerChoices"); answers.replaceChildren();
  currentChallenge.choices.forEach((choice,index) => {
    const button=document.createElement("button");
    button.type="button"; button.className="answer-button"; button.textContent=choice;
    button.addEventListener("click",() => answerChallenge(index,button));
    answers.append(button);
  });
  showScreen("challengeScreen");
  setTimeout(() => speak(currentChallenge.speech),250);
}

function answerChallenge(index, button) {
  if (button.disabled) return;
  if (index === currentChallenge.answer) {
    button.classList.add("correct");
    $$(".answer-button").forEach(b => b.disabled=true);
    $("#encouragement").textContent = challengeMistakes ? "You found it! Great listening! ✨" : "Brilliant! Your magic is strong! ✨";
    updateMastery(currentChallenge.skill, challengeMistakes===0);
    speak(challengeMistakes ? "You found it! Great listening!" : "Brilliant! Your magic is strong!");
    setTimeout(() => { showScreen("gameScreen"); setStage(3); },1200);
  } else {
    challengeMistakes++;
    button.classList.remove("try-again"); void button.offsetWidth; button.classList.add("try-again");
    $("#encouragement").textContent = challengeMistakes === 1 ? "Almost! Listen once more—you've got this." : "Look for the glowing hint!";
    speak(`Almost. Listen once more. ${currentChallenge.speech}`);
    if (challengeMistakes >= 2) $$(".answer-button")[currentChallenge.answer].style.boxShadow="0 0 0 7px #ffe783";
  }
}

function updateMastery(skill, correctFirstTry) {
  const item=state.mastery[skill]||(state.mastery[skill]={attempts:0,correct:0,streak:0,level:1,lastPlayed:null}); item.attempts++; item.lastPlayed=new Date().toISOString();
  if (correctFirstTry) { item.correct++; item.streak++; } else item.streak=0;
  item.level=Math.min(5,Math.max(1,Math.floor((item.correct/Math.max(1,item.attempts))*4)+1));
  saveState();
}

function finishMission() {
  cleaningEnabled=false;
  state.story=state.story||{completedActivities:[]};state.story.completedActivities=state.story.completedActivities||[];
  const first=!state.story.completedActivities.includes("dentist");if(first)state.story.completedActivities.push("dentist");
  const earned=first?5:(challengeMistakes===0?3:2);
  state.stars+=earned; if(first)state.gems+=1; state.missions+=1; saveState();
  $("#earnedStars").textContent=earned;
  $("#dentistGemReward").hidden=!first;
  $("#rewardMessage").textContent=challengeMistakes===0 ? "Wonderful work, Dr. Annabeth! You earned a perfect-care bonus." : "Wonderful work, Dr. Annabeth! You kept trying and helped Twinkle.";
  showScreen("rewardScreen"); createConfetti();
  speak("Hooray! Twinkle's smile sparkles. Wonderful work, Doctor Annabeth!");
}

function createConfetti(target="#confetti") {
  const holder=$(target); holder.replaceChildren();
  for(let i=0;i<28;i++) { const bit=document.createElement("span"); bit.textContent=["★","✦","●","♥"][i%4]; bit.style.left=`${Math.random()*100}vw`; bit.style.color=["#ff86b5","#ffd354","#7759d0","#62cbb1"][i%4]; bit.style.animationDelay=`${Math.random()*1.6}s`; holder.append(bit); }
}

function renderMastery() {
  const list=$("#masteryList"); list.replaceChildren();
  Object.entries(skillNames).forEach(([key,label]) => {
    const m=state.mastery[key]; const percent=m.attempts ? Math.round(m.correct/m.attempts*100) : 0;
    const row=document.createElement("div"); row.className="mastery-row";
    row.innerHTML=`<span>${label}</span><div class="mastery-bar"><span style="width:${percent}%"></span></div><b>${m.attempts ? percent+"%" : "New"}</b>`;
    list.append(row);
  });
}

function exportProgress() {
  const blob=new Blob([JSON.stringify(state,null,2)],{type:"application/json"});
  const link=document.createElement("a"); link.href=URL.createObjectURL(blob); link.download="annabeth-hospital-progress.json"; link.click(); URL.revokeObjectURL(link.href);
}

const winningLines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function startTicTacToe() {
  showScreen("ticTacToeScreen");
  resetTicTacToe();
}

function resetTicTacToe() {
  tttBoard=Array(9).fill(""); tttActive=true; tttThinking=false;
  $("#tttStatus").textContent="Your turn—place a star!";
  $(".ttt-actions").classList.remove("round-over");
  const board=$("#tttBoard"); board.replaceChildren();
  for(let i=0;i<9;i++) {
    const cell=document.createElement("button"); cell.type="button"; cell.className="ttt-cell";
    cell.setAttribute("role","gridcell"); cell.setAttribute("aria-label",`Empty square ${i+1}`);
    cell.addEventListener("click",()=>playTicTacToe(i)); board.append(cell);
  }
  speak("Magic tic tac toe! Your turn, Annabeth. Place a star.");
}

function playTicTacToe(index) {
  if(!tttActive||tttThinking||tttBoard[index]) return;
  placeTtt(index,"star");
  const result=checkTtt(); if(result){endTtt(result);return;}
  tttThinking=true; $("#tttStatus").textContent="Pip is choosing…";
  setTimeout(()=>{
    const move=choosePipMove(); if(move!==undefined) placeTtt(move,"dragon");
    const pipResult=checkTtt(); if(pipResult) endTtt(pipResult);
    else {tttThinking=false;$("#tttStatus").textContent="Your turn—place a star!";}
  },500);
}

function placeTtt(index, player) {
  tttBoard[index]=player;
  const cell=$$(".ttt-cell")[index]; cell.textContent=player==="star"?"⭐":"🐉"; cell.classList.add(player); cell.disabled=true;
  cell.setAttribute("aria-label",player==="star"?"Annabeth's star":"Pip's dragon");
}

function choosePipMove() {
  const open=tttBoard.map((value,index)=>value?null:index).filter(index=>index!==null);
  const finishingMove = player => open.find(index => { const copy=[...tttBoard]; copy[index]=player; return winningLines.some(line=>line.every(i=>copy[i]===player)); });
  const win=finishingMove("dragon"); if(win!==undefined) return win;
  const block=finishingMove("star"); if(block!==undefined&&Math.random()<.82) return block;
  if(!tttBoard[4]&&Math.random()<.65) return 4;
  return open[Math.floor(Math.random()*open.length)];
}

function checkTtt() {
  const line=winningLines.find(cells=>tttBoard[cells[0]]&&cells.every(i=>tttBoard[i]===tttBoard[cells[0]]));
  if(line) return {winner:tttBoard[line[0]],line};
  if(tttBoard.every(Boolean)) return {winner:"draw",line:[]};
  return null;
}

function endTtt(result) {
  tttActive=false; tttThinking=false;
  result.line.forEach(index=>$$(".ttt-cell")[index].classList.add("winner"));
  $(".ttt-actions").classList.add("round-over");
  state.story=state.story||{completedActivities:[]};state.story.completedActivities=state.story.completedActivities||[];
  const first=!state.story.completedActivities.includes("tictactoe");if(first)state.story.completedActivities.push("tictactoe");
  state.missions+=1;if(first)state.stars+=3;
  if(result.winner==="star") {
    state.ticTacToeWins=(state.ticTacToeWins||0)+1; state.stars+=2; saveState();
    $("#tttStatus").textContent="You won! Three sparkling stars!";
    speak("You won, Annabeth! Three sparkling stars in a row!"); createConfetti("#tttConfetti");
  } else if(result.winner==="dragon") {
    saveState();
    $("#tttStatus").textContent="Pip got three! Let's play again.";
    speak("Pip got three this time. Let's play again!");
  } else {
    saveState();
    $("#tttStatus").textContent="A magical tie! Great playing!";
    speak("A magical tie! Great playing!");
  }
}

async function importProgress(file) {
  try { const parsed=JSON.parse(await file.text()); if (!parsed.mastery) throw new Error(); state={...defaultState(),...parsed,mastery:{...defaultState().mastery,...parsed.mastery}}; saveState(); renderMastery(); alert("Progress restored!"); }
  catch { alert("That progress file could not be read."); }
}

$("#startButton")?.addEventListener("click",startMission);
$("#ticTacToeButton")?.addEventListener("click",startTicTacToe);
$("#tttHomeButton").addEventListener("click",()=>showScreen("homeScreen"));
$("#tttAgainButton").addEventListener("click",resetTicTacToe);
$("#tttNewButton").addEventListener("click",resetTicTacToe);
$("#playAgainButton").addEventListener("click",startMission);
$("#homeButton").addEventListener("click",()=>showScreen("homeScreen"));
$("#rewardHomeButton").addEventListener("click",()=>showScreen("homeScreen"));
$("#soundButton").addEventListener("click",()=>{state.sound=!state.sound;if(!state.sound){speechSynthesis?.cancel();stopVoice()}window.dispatchEvent(new Event("hospital-sound-change"));saveState();});
$("#speakButton").addEventListener("click",()=>speak($("#instructionText").textContent,{interrupt:true}));
$("#challengeSpeak").addEventListener("click",()=>speak(currentChallenge?.speech||"",{interrupt:true}));
$("#mouthGame").addEventListener("pointerdown",event=>{if(cleaningEnabled){try{$("#mouthGame").setPointerCapture(event.pointerId)}catch{}}moveBrush(event)});
$("#mouthGame").addEventListener("pointermove",event=>{if(event.buttons||event.pointerType==="touch")moveBrush(event);});
$("#mouthGame").addEventListener("pointerup",()=>{lastBrushPoint=null;$("#mouthGame").classList.remove("brush-active")});
$("#mouthGame").addEventListener("pointercancel",()=>{lastBrushPoint=null;$("#mouthGame").classList.remove("brush-active")});
$("#parentButton").addEventListener("click",()=>{renderMastery();populateVoicePicker();$("#parentDialog").showModal();});
$("#voiceSelect").addEventListener("change",event=>{state.voiceName=event.target.value;saveState();speak("Hello, Doctor Annabeth! Your magical animal friends are ready for an adventure.")});
$("#voicePreviewButton").addEventListener("click",()=>speak("Hello, Doctor Annabeth! Your magical animal friends are ready for an adventure.",{interrupt:true}));
$("#exportButton").addEventListener("click",exportProgress);
$("#importInput").addEventListener("change",event=>event.target.files[0]&&importProgress(event.target.files[0]));
$("#resetButton").addEventListener("click",()=>{if(confirm("Reset all of Annabeth's saved progress on this device?")){state=defaultState();saveState();renderMastery();}});

renderStats();
updateBgMusic($$(".screen.active")[0]?.id);
if("speechSynthesis" in window){speechSynthesis.addEventListener?.("voiceschanged",populateVoicePicker);populateVoicePicker()}

// Hidden button on the title screen: plays a personal recorded message (assets/voice/my-voice.mp3) if the file exists.
(function setupSecretVoice(){
  const btn=$("#secretVoice"),img=$(".title-key-art"),screen=$("#homeScreen");if(!btn||!img||!screen)return;
  const SPOT={x:1055,y:337}; // the glowing heart on the hospital's gable in the 1672x941 poster
  const place=()=>{
    const w=screen.clientWidth,h=screen.clientHeight,nw=img.naturalWidth||1672,nh=img.naturalHeight||941;if(!w||!h)return;
    const scale=Math.max(w/nw,h/nh),ox=(w-nw*scale)/2,oy=(h-nh*scale)/2;
    btn.style.left=`${ox+SPOT.x*scale}px`;btn.style.top=`${oy+SPOT.y*scale}px`;
  };
  if("ResizeObserver" in window)new ResizeObserver(place).observe(screen);else window.addEventListener("resize",place);
  img.addEventListener("load",place);place();
  const message=new Audio("assets/voice/my-voice.mp3?v=3");message.preload="none";
  btn.addEventListener("click",()=>{
    if(!state.sound)return;
    stopVoice();if("speechSynthesis" in window)speechSynthesis.cancel();
    try{message.currentTime=0}catch{}
    const started=message.play();if(started&&started.catch)started.catch(()=>{});
    btn.classList.remove("playing");void btn.offsetWidth;btn.classList.add("playing");
  });
})();
window.MagicalHospital={
  getState:()=>state,
  save:()=>saveState(),
  speak,
  showScreen,
  confetti:createConfetti,
  refresh:renderStats,
  recordSkill:updateMastery,
  startDentist:startMission,
  startTicTacToe,
  discover:id=>{state.story=state.story||{completedActivities:[]};state.story.completedActivities=state.story.completedActivities||[];const first=!state.story.completedActivities.includes(id);if(first)state.story.completedActivities.push(id);saveState();return first}
};
if ("serviceWorker" in navigator && location.protocol !== "file:") navigator.serviceWorker.register("./sw.js");
