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
  stars:0, gems:0, missions:0, ticTacToeWins:0, sound:true,
  story:{ completedActivities:[], currentOutfit:"doctor", chapter:1 },
  mastery:Object.fromEntries(Object.keys(skillNames).map(key => [key,{ attempts:0, correct:0, streak:0, level:1, lastPlayed:null }]))
});

let state = loadState();
let stage = 0;
let currentChallenge = null;
let challengeMistakes = 0;
let cleaned = new Set();
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
}

function speak(text) {
  if (!state.sound || !("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = .88;
  utterance.pitch = 1.15;
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.find(v => /Samantha|Zira|Ava|female/i.test(v.name)) || voices.find(v => v.lang.startsWith("en")) || null;
  speechSynthesis.speak(utterance);
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
  for (let i=0; i<12; i++) {
    const tooth = document.createElement("button");
    tooth.type = "button";
    tooth.className = "tooth";
    tooth.dataset.index = i;
    tooth.setAttribute("aria-label", `Tooth ${i+1}`);
    grid.append(tooth);
  }
}

function startMission() {
  stage = 0; cleaned.clear(); cleaningEnabled = false; challengeMistakes = 0;
  setupTeeth(); showScreen("gameScreen"); setStage(0);
}

function setStage(next) {
  stage = next;
  const steps = $$(".progress-step");
  steps.forEach((el,i) => el.classList.toggle("active", i <= next));
  $("#progressFill").style.width = `${(next / 3) * 100}%`;
  $("#stageLabel").textContent = `Step ${Math.min(next + 1,4)} of 4`;
  const mouth = $("#mouthGame");
  mouth.classList.remove("brushing");

  if (next === 0) {
    $("#instructionText").textContent = "Tap the sparkly tooth to check Twinkle's smile!";
    $("#characterBubble").textContent = "My teeth feel a little tickly!";
    const target = $$(".tooth")[4]; target.classList.add("sparkle");
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
    $$(".tooth").forEach(t => t.classList.add("sparkle"));
    speak("The polisher is powered up! Brush the glowing teeth for a magical finish.");
  }
}

function beginBrushing() {
  $$(".tooth").forEach((tooth,i) => {
    tooth.classList.remove("sparkle");
    if ([0,2,3,5,6,8,9,11].includes(i)) tooth.classList.add("dirty");
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
  const rect = mouth.getBoundingClientRect();
  const point = event.touches ? event.touches[0] : event;
  $("#brush").style.left = `${point.clientX - rect.left}px`;
  $("#brush").style.top = `${point.clientY - rect.top}px`;
  const under = document.elementFromPoint(point.clientX, point.clientY)?.closest(".tooth");
  if (!under) return;
  under.classList.add("cleaning");
  setTimeout(() => under.classList.remove("cleaning"),300);
  if (stage === 1 && under.classList.contains("dirty")) {
    under.classList.remove("dirty"); cleaned.add(under.dataset.index);
    if (!$(".tooth.dirty")) { cleaningEnabled=false; setStage(2); }
  } else if (stage === 3) {
    under.classList.remove("sparkle"); cleaned.add(under.dataset.index);
    if (cleaned.size >= 9) finishMission();
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
$("#soundButton").addEventListener("click",()=>{state.sound=!state.sound;if(!state.sound)speechSynthesis?.cancel();saveState();});
$("#speakButton").addEventListener("click",()=>speak($("#instructionText").textContent));
$("#challengeSpeak").addEventListener("click",()=>speak(currentChallenge?.speech||""));
$("#mouthGame").addEventListener("pointerdown",moveBrush);
$("#mouthGame").addEventListener("pointermove",event=>{if(event.buttons||event.pointerType==="touch")moveBrush(event);});
$("#parentButton").addEventListener("click",()=>{renderMastery();$("#parentDialog").showModal();});
$("#exportButton").addEventListener("click",exportProgress);
$("#importInput").addEventListener("change",event=>event.target.files[0]&&importProgress(event.target.files[0]));
$("#resetButton").addEventListener("click",()=>{if(confirm("Reset all of Annabeth's saved progress on this device?")){state=defaultState();saveState();renderMastery();}});

renderStats();
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
