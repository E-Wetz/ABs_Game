"use strict";

const adventures=[
  {id:"paw",icon:"🩹",title:"Magical Vet Care",place:"Treatment Room",patient:"🦊",story:"A new magical patient needs a careful checkup.",type:"care",instruction:"Help the patient feel better, one gentle step at a time."},
  {id:"horn",icon:"🦄",title:"Unicorn Horn Repair",place:"Unicorn Stable",patient:"🦄",story:"Nova's horn lost its rainbow rings. Put the colors back in rainbow order.",type:"sequence",instruction:"Tap the colors in rainbow order.",items:["🔴","🟠","🟡","🟢","🔵","🟣"]},
  {id:"potion",icon:"🧪",title:"Potion Mixer",place:"Medicine Room",patient:"🐰",story:"Bramble Bunny needs a gentle giggle potion before his checkup.",type:"mix",instruction:"Add 3 berries and 2 stars.",items:["🍓","⭐"],goal:[3,2]},
  {id:"xray",icon:"🩻",title:"X-Ray Detective",place:"X-Ray Room",patient:"🐲",story:"Pip swallowed some silly treasures. Find what is hiding in his tummy.",type:"find",instruction:"Find the key, button, and tiny bell.",items:["🔑","🔘","🔔","🫧","💜","🌙"]},
  {id:"search",icon:"🔎",title:"Enchanted Search",place:"Enchanted Forest",patient:"🦉",story:"Ollie Owl hid tiny treasures all through the forest.",type:"find",instruction:"Look closely and find the hidden treasures."},
  {id:"heart",icon:"🩺",title:"Heartbeat Check",place:"Examination Room",patient:"🐻",story:"Maple Bear's heart sings a tiny rhythm. Tap it back to make her smile.",type:"rhythm",instruction:"Listen, then copy the 4 heartbeat taps."},
  {id:"forest",icon:"🔍",title:"Forest Sounds",place:"Enchanted Forest",patient:"🦉",story:"Ollie Owl needs something whose name ends with the /g/ sound.",type:"choice",skill:"endingSounds",instruction:"Find the word that ends with /g/.",choices:["🐶 Dog","🐱 Cat","🐝 Bee"],answer:0},
  {id:"rhyme",icon:"🌸",title:"Rhyme Garden",place:"Puzzle Garden",patient:"🦋",story:"The rhyme flowers bloom in matching pairs.",type:"choice",skill:"rhyming",instruction:"Which word rhymes with moon?",choices:["🥄 Spoon","☀️ Sun","🐱 Cat"],answer:0},
  {id:"words",icon:"🍪",title:"Word Treats",place:"Animal Village",patient:"🐶",story:"Scout will do a happy dance when you choose the spoken word.",type:"choice",skill:"sightWords",instruction:"Find the word “come”.",speech:"Find the word come.",choices:["can","come","look"],answer:1},
  {id:"stable",icon:"🔢",title:"Number Stable",place:"Unicorn Meadow",patient:"🐴",story:"Each pony needs the stall with the number called aloud.",type:"choice",skill:"doubleDigits",instruction:"Find the number seventy-four.",speech:"Find the number seventy four.",choices:["47","64","74"],answer:2},
  {id:"nursery",icon:"🥚",title:"Dragon Egg Nursery",place:"Dragon Nursery",patient:"🐲",story:"Pip needs help counting the eggs and finding which nest has more.",type:"countCompare",skill:"counting",instruction:"Count each nest and choose the one with more eggs."},
  {id:"nests",icon:"🔟",title:"Magic Number Nests",place:"Cloud Hatchery",patient:"🐉",story:"Build a full nest of ten eggs, then add more to make the spoken number.",type:"tenFrame",skill:"teenNumbers",instruction:"Fill ten, then add the extra eggs."},
  {id:"shapes",icon:"🔷",title:"Castle Shape Repair",place:"Princess Castle",patient:"🦄",story:"Nova needs shapes to repair the castle's magical windows.",type:"shapes",skill:"geometry",instruction:"Choose and place the shape that completes the window."},
  {id:"measure",icon:"📏",title:"Magical Measuring Room",place:"Supply Hall",patient:"🦊",story:"Fern is organizing bandages and potion bottles by size.",type:"measure",skill:"measurement",instruction:"Listen and choose the longer, shorter, or fuller item."},
  {id:"sort",icon:"🧺",title:"Animal Supply Sort",place:"Hospital Pantry",patient:"🐰",story:"Bramble mixed up the hospital supplies. Sort everything into the right baskets.",type:"sort",skill:"classification",instruction:"Put each item with its matching group."},
  {id:"blend",icon:"🌉",title:"Sound Bridge",place:"Singing River",patient:"🦉",story:"Blend Ollie's three sounds to build a bridge across the river.",type:"blend",skill:"blending",instruction:"Listen to the sounds, blend them, and choose the picture."},
  {id:"segment",icon:"🥚",title:"Word-Cracker Eggs",place:"Hatching Hollow",patient:"🐣",story:"Crack a word into three sounds to help the chicks hatch.",type:"segment",skill:"segmenting",instruction:"Tap one egg for each sound you hear."},
  {id:"letter",icon:"✏️",title:"Letter Skywriting",place:"Princess Castle",patient:"🐱",story:"Follow the glowing stars to write letters in the castle sky.",type:"guidedTrace",skill:"letterFormation",instruction:"Start at the star and follow the glowing letter trail."},
  {id:"number",icon:"🖍️",title:"Number Trails",place:"Treasure Cave",patient:"🐼",story:"Follow the glowing trail to write a number and open the treasure door.",type:"guidedTrace",skill:"numberFormation",instruction:"Start at the star and follow the glowing number trail."},
  {id:"math",icon:"🐇",title:"Bunny Hop Math",place:"Unicorn Meadow",patient:"🐇",story:"Five bunnies are playing. Two hop home. How many stay?",type:"choice",skill:"additionSubtraction",instruction:"5 bunnies take away 2 bunnies. How many are left?",choices:["2","3","7"],answer:1},
  {id:"pattern",icon:"👑",title:"Royal Pattern Parade",place:"Princess Castle",patient:"👸",story:"Finish the parade banner before the royal animals arrive.",type:"choice",skill:"patterns",instruction:"What comes next? ⭐ 🌙 ⭐ 🌙 …",choices:["⭐","🌙","🌈"],answer:0},
  {id:"memory",icon:"🃏",title:"Recovery Room Memory",place:"Recovery Room",patient:"🐨",story:"Find every matching animal pair while the patients rest.",type:"memory",instruction:"Turn over cards and find all 4 pairs."},
  {id:"color",icon:"🎨",title:"Magical Coloring",place:"Art Studio",patient:"🦄",story:"Create a colorful portrait for the hospital gallery.",type:"color",instruction:"Choose colors and paint the unicorn 5 times."}
];

const outfits=[
  {id:"doctor",icon:"👩‍⚕️",name:"Magic Doctor",stars:0},
  {id:"scrubs",icon:"🧑‍⚕️",name:"Sparkle Scrubs",stars:8},
  {id:"princess",icon:"👸",name:"Royal Healer",stars:18},
  {id:"wizard",icon:"🧙‍♀️",name:"Starry Veterinarian",stars:32},
  {id:"rainbow",icon:"🌈",name:"Rainbow Rescuer",stars:40},
  {id:"forestvet",icon:"🌿",name:"Forest Veterinarian",stars:48},
  {id:"stable",icon:"🦄",name:"Unicorn Stable Jacket",stars:56},
  {id:"parade",icon:"👑",name:"Royal Parade Healer",stars:64},
  {id:"pajamas",icon:"🌙",name:"Cozy Unicorn Pajamas",stars:72},
  {id:"ocean",icon:"🐚",name:"Ocean Animal Doctor",stars:80},
  {id:"artist",icon:"🎨",name:"Rainbow Art Smock",stars:90},
  {id:"constellation",icon:"✨",name:"Constellation Healer",stars:100}
];

const dressupItems={
  head:[{id:"none",name:"No hat",icon:"✓",stars:0},{id:"mouse",name:"Mouse ears",icon:"●●",stars:8,gems:2},{id:"tiara",name:"Crystal tiara",icon:"♛",stars:18,gems:3},{id:"flowers",name:"Flower crown",icon:"🌼",stars:32},{id:"starcrown",name:"Star crown",icon:"★",stars:48,gems:5},{id:"wizardhat",name:"Moon hat",icon:"☾",stars:64}],
  clothes:[{id:"lavender",name:"Lavender tunic",icon:"▰",stars:0},{id:"doctor",name:"Doctor coat",icon:"✚",stars:8},{id:"scrubs",name:"Mint scrubs",icon:"♥",stars:18},{id:"princess",name:"Royal dress",icon:"♕",stars:32},{id:"forest",name:"Forest vest",icon:"🌿",stars:48},{id:"artist",name:"Art smock",icon:"🎨",stars:72}],
  jewelry:[{id:"none",name:"No jewelry",icon:"✓",stars:0},{id:"heart",name:"Heart necklace",icon:"♥",stars:8},{id:"pearls",name:"Pearl necklace",icon:"○",stars:32,gems:3},{id:"star",name:"Star pendant",icon:"★",stars:56,gems:4}],
  shoes:[{id:"socks",name:"Comfy socks",icon:"▱",stars:0},{id:"sneakers",name:"Star sneakers",icon:"★",stars:8},{id:"purple",name:"Purple boots",icon:"▰",stars:18},{id:"gold",name:"Royal boots",icon:"♛",stars:40},{id:"rain",name:"Coral rain boots",icon:"♥",stars:64},{id:"slippers",name:"Unicorn slippers",icon:"🦄",stars:80}],
  ribbon:[{id:"none",name:"No ribbon",icon:"✓",stars:0},{id:"pink",name:"Pink bow",icon:"🎀",stars:8},{id:"purple",name:"Purple bow",icon:"🎀",stars:24},{id:"rainbow",name:"Rainbow ribbon",icon:"🌈",stars:56}],
  medical:[{id:"none",name:"No equipment",icon:"✓",stars:0},{id:"stethoscope",name:"Stethoscope",icon:"🩺",stars:0},{id:"gloves",name:"Magic gloves",icon:"◆",stars:18,gems:2},{id:"bag",name:"Medical bag",icon:"✚",stars:40,gems:4}]
};
const dressupCategoryNames={head:"Tiaras & hats",clothes:"Dresses & coats",jewelry:"Jewelry",shoes:"Shoes",ribbon:"Ribbons",medical:"Vet equipment"};
const adventureUnlocks={paw:0,potion:0,search:0,color:0,forest:0,rhyme:0,words:0,nursery:0,stable:0,nests:6,horn:8,xray:12,blend:12,heart:16,sort:16,letter:20,segment:20,number:24,math:28,shapes:28,measure:32,pattern:36,memory:44};

const challengeVariants={
  forest:[
    {skill:"endingSounds",focus:"g",story:"Ollie Owl needs something whose name ends with the /g/ sound.",instruction:"Listen for the last sound: /g/.",choices:["🐶 Dog","🐱 Cat","🐝 Bee"],answer:0},
    {skill:"middleSounds",focus:"short i",story:"Ollie heard a short i hiding in the middle.",instruction:"Listen for the middle sound: short i.",choices:["🐷 Pig","🚌 Bus","🎂 Cake"],answer:0},
    {skill:"endingSounds",focus:"n",story:"A tiny sound is hiding at the end of one word.",instruction:"Listen for the last sound: /n/.",choices:["☀️ Sun","🐟 Fish","🐶 Dog"],answer:0},
    {skill:"middleSounds",focus:"short o",story:"Ollie heard a short o hiding in the middle of a forest word.",instruction:"Listen for the middle sound: short o.",choices:["🦊 Fox","🪁 Kite","🐝 Bee"],answer:0},
    {skill:"endingSounds",focus:"p",story:"Ollie is listening for the last sound in a forest word.",instruction:"Listen for the last sound: /p/.",choices:["🐑 Sheep","🐱 Cat","🌙 Moon"],answer:0},
    {skill:"middleSounds",focus:"short a",story:"Ollie heard a short a in the middle.",instruction:"Listen for the middle sound: short a.",choices:["🐱 Cat","🐷 Pig","🚌 Bus"],answer:0}
  ],
  rhyme:[
    {target:"moon",instruction:"Which picture rhymes with moon?",choices:["🥄 Spoon","☀️ Sun","🐱 Cat"],answer:0},
    {target:"star",instruction:"Which picture rhymes with star?",choices:["🚗 Car","🐟 Fish","🌳 Tree"],answer:0},
    {target:"bug",instruction:"Which picture rhymes with bug?",choices:["🧶 Rug","🐝 Bee","🐱 Cat"],answer:0},
    {target:"fox",instruction:"Which picture rhymes with fox?",choices:["📦 Box","🌙 Moon","🐸 Frog"],answer:0},
    {target:"log",instruction:"Which picture rhymes with log?",choices:["🐸 Frog","☀️ Sun","🐝 Bee"],answer:0}
  ],
  words:[
    {target:"the",instruction:"Find the star word “the”.",choices:["the","my","you"],answer:0},
    {target:"said",instruction:"Find the star word “said”.",choices:["to","said","is"],answer:1},
    {target:"come",instruction:"Find the star word “come”.",choices:["a","come","she"],answer:1},
    {target:"here",instruction:"Find the star word “here”.",choices:["here","do","are"],answer:0},
    {target:"little",instruction:"Find the star word “little”.",choices:["of","little","my"],answer:1}
  ],
  stable:[
    {instruction:"Find the number seventy-four.",speech:"Find the number seventy four.",choices:["47","64","74"],answer:2},
    {instruction:"Find the number forty-two.",speech:"Find the number forty two.",choices:["24","42","12"],answer:1},
    {instruction:"Find the number sixty-seven.",speech:"Find the number sixty seven.",choices:["76","57","67"],answer:2},
    {instruction:"Find the number eighty-three.",speech:"Find the number eighty three.",choices:["38","83","73"],answer:1}
  ],
  math:[
    {story:"Five bunnies are playing. Two hop home.",instruction:"5 take away 2. How many stay?",speech:"Five bunnies are playing. Two hop home. How many stay?",model:["🐰🐰🐰🐰🐰","🐰🐰"],operation:"take",choices:["2","3","7"],answer:1},
    {story:"Three bunnies are joined by two friends.",instruction:"3 and 2 more. How many now?",speech:"Three bunnies are joined by two friends. How many bunnies now?",model:["🐰🐰🐰","🐰🐰"],operation:"add",choices:["5","4","1"],answer:0},
    {story:"Six carrots are ready. One gets eaten.",instruction:"6 take away 1. How many remain?",speech:"Six carrots are ready. One gets eaten. How many remain?",model:["🥕🥕🥕🥕🥕🥕","🥕"],operation:"take",choices:["7","5","4"],answer:1}
  ],
  pattern:[
    {instruction:"What comes next? ⭐ 🌙 ⭐ 🌙 …",speech:"Star, moon, star, moon. What comes next?",choices:["⭐","🌙","🌈"],answer:0},
    {instruction:"What comes next? 💜 💜 💛 💜 💜 💛 …",speech:"Purple, purple, yellow, purple, purple, yellow. What comes next?",choices:["💛","💜","💚"],answer:1},
    {instruction:"What comes next? 🐰 🦊 🐰 🦊 …",speech:"Bunny, fox, bunny, fox. What comes next?",choices:["🦊","🐰","🐻"],answer:1}
  ]
};

const careTools={
  stethoscope:{icon:"🩺",name:"stethoscope",prompt:"Listen gently",action:"💗",reps:4}, thermometer:{icon:"🌡️",name:"thermometer",prompt:"Check the temperature",action:"✨",reps:3},
  magnifier:{icon:"🔍",name:"magnifier",prompt:"Look very closely",action:"🔎",reps:4}, flashlight:{icon:"🔦",name:"flashlight",prompt:"Shine the little light",action:"💡",reps:4},
  tweezers:{icon:"✧",name:"star tweezers",prompt:"Lift out the tiny prickles",action:"✦",reps:5}, cleanser:{icon:"🫧",name:"cleaning bubbles",prompt:"Clean the sore spot",action:"🫧",reps:5},
  bandage:{icon:"🩹",name:"soft bandage",prompt:"Cover it softly",action:"🩹",reps:4}, swab:{icon:"☁️",name:"cotton puff",prompt:"Clean very gently",action:"☁️",reps:4},
  drops:{icon:"💧",name:"magic drops",prompt:"Add the soothing drops",action:"💧",reps:4}, brush:{icon:"🪮",name:"soft brush",prompt:"Brush slowly",action:"✨",reps:6},
  potion:{icon:"🧪",name:"medicine potion",prompt:"Give little sips",action:"💜",reps:3}, blanket:{icon:"🧣",name:"warm blanket",prompt:"Make the patient cozy",action:"💖",reps:4},
  wash:{icon:"🧼",name:"gentle wash",prompt:"Wash away the dirt",action:"🫧",reps:6}, cream:{icon:"🫙",name:"healing cream",prompt:"Dab on the cream",action:"✨",reps:5},
  mist:{icon:"🌫️",name:"cooling mist",prompt:"Spray the cooling mist",action:"💨",reps:5}, scanner:{icon:"🔮",name:"magic scanner",prompt:"Scan the magical glow",action:"✦",reps:5},
  polish:{icon:"🧽",name:"soft polisher",prompt:"Polish in little circles",action:"✨",reps:7}, crystal:{icon:"💎",name:"healing crystal",prompt:"Place the rainbow crystals",action:"💎",reps:4},
  wrap:{icon:"🎗️",name:"support wrap",prompt:"Wrap the tired hoof",action:"🎗️",reps:5}, spray:{icon:"🧴",name:"detangling spray",prompt:"Spritz the tangled fur",action:"💦",reps:4},
  ribbon:{icon:"🎀",name:"comfort ribbon",prompt:"Tie the finishing ribbon",action:"🎀",reps:3}, mirror:{icon:"🪞",name:"dental mirror",prompt:"Check every little tooth",action:"✦",reps:5},
  toothbrush:{icon:"🪥",name:"toothbrush",prompt:"Brush in gentle circles",action:"🫧",reps:7}, toothpaste:{icon:"💠",name:"sparkle paste",prompt:"Add tiny dabs of paste",action:"✨",reps:4},
  rinse:{icon:"🥤",name:"magic rinse",prompt:"Rinse away the bubbles",action:"💧",reps:4}
};
const careCases=[
  {animal:"fox",row:0,name:"Fern",ailment:"Prickly Paw",intro:"Fern found prickles on her paw. Let's help her feel comfortable again.",plan:["magnifier","tweezers","cleanser","bandage"]},
  {animal:"fox",row:0,name:"Fern",ailment:"Itchy Ear",intro:"Fern keeps shaking one ear. Let's find out why it feels itchy.",plan:["flashlight","swab","drops","brush"]},
  {animal:"bunny",row:1,name:"Bramble",ailment:"Rumbly Tummy",intro:"Bramble's tummy is making funny rumbles. Let's give him a careful checkup.",plan:["stethoscope","thermometer","potion","blanket"]},
  {animal:"bunny",row:1,name:"Bramble",ailment:"Muddy Paw",intro:"Bramble slipped into a muddy puddle and his paw needs gentle care.",plan:["magnifier","wash","cream","bandage"]},
  {animal:"dragon",row:2,name:"Pip",ailment:"Smoky Sneezes",intro:"Every time Pip sneezes, a tiny smoke cloud pops out. Let's cool it down.",plan:["thermometer","stethoscope","mist","potion"]},
  {animal:"dragon",row:2,name:"Pip",ailment:"Scraped Scale",intro:"Pip bumped one shiny scale while practicing his flying.",plan:["magnifier","wash","cream","bandage"]},
  {animal:"unicorn",row:3,name:"Nova",ailment:"Dim Horn",intro:"Nova's horn has lost its rainbow sparkle. Let's restore the magic.",plan:["scanner","polish","crystal","ribbon"]},
  {animal:"unicorn",row:3,name:"Nova",ailment:"Tired Hoof",intro:"Nova danced all morning and one hoof feels tired.",plan:["magnifier","wash","cream","wrap"]},
  {animal:"fox",row:0,name:"Fern",ailment:"Tangled Tail",intro:"The wind tangled leaves into Fern's fluffy tail.",plan:["magnifier","spray","brush","ribbon"]},
  {animal:"bunny",row:1,name:"Bramble",ailment:"Sugar-Bug Tooth",intro:"A sugar bug made one of Bramble's teeth feel tickly.",plan:["mirror","toothbrush","toothpaste","rinse"]}
];

let activeAdventure=null,activityRound=0,actionCount=0,sequenceIndex=0,mixCounts=[0,0],rhythmInput=[],tracePoints=0,paintCount=0,memoryOpen=[],memoryMatched=0,activityNarration="";
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
const api=()=>window.MagicalHospital;
const gameState=()=>api().getState();
const chapterNarration=[
  "The magical hospital is open! Fern, Bramble, and Nova need Doctor Annabeth's help.",
  "Oh no! Nova's rainbow magic scattered across the kingdom. Help the animals find it.",
  "The royal animal parade starts soon. Help everyone get ready to celebrate.",
  "Doctor Annabeth is the kingdom's magical healer. Choose any friend to help today!"
];
const chapterPictures=[["💫","🏥"],["🌈","🦄"],["👑","🎺"],["💖","🏰"]];

function ensureStory(){const s=gameState();if(!s.story)s.story={completedActivities:[],currentOutfit:"doctor",chapter:1};if(!Array.isArray(s.story.completedActivities))s.story.completedActivities=[];}
function openWorld(){ensureStory();api().showScreen("worldScreen");renderWorld();updateStoryPictures();appendClassicGames();q("#collectionCount").textContent=`${gameState().story.completedActivities.length} of ${adventures.length+2} discovered`;speakChapter();}
function currentChapter(){return Math.min(4,1+Math.floor(gameState().story.completedActivities.length/4))}
function speakChapter(){api().speak(chapterNarration[currentChapter()-1]+" Tap a picture to choose an adventure.")}
function updateStoryPictures(){const chapter=currentChapter(),s=gameState(),done=s.story.completedActivities,cards=qa(".activity-card");q("#storyProblem").textContent=chapterPictures[chapter-1][0];q("#storyGoal").textContent=chapterPictures[chapter-1][1];q("#storyText").textContent=["Help three friends!","Find the rainbow!","Get ready to celebrate!","Choose a friend to help!"][chapter-1];cards.forEach((card,index)=>{const adventure=adventures[index],needed=adventureUnlocks[adventure.id]||0,locked=s.stars<needed&&!done.includes(adventure.id);card.dataset.game=adventure.id;card.classList.toggle("locked",locked);card.setAttribute("aria-label",locked?`${adventure.title}, unlocks at ${needed} stars`:`${adventure.title}, ${adventure.place}`);if(locked){const lock=document.createElement("span");lock.className="activity-lock";lock.textContent=`🔒 ${needed} ⭐`;card.append(lock);card.onclick=()=>{gentleSound();api().speak(`${needed-s.stars} more stars will unlock ${adventure.title}. Try another adventure first.`)}}});const recommended=cards.find((card,index)=>!card.classList.contains("locked")&&!done.includes(adventures[index].id))||cards.find(card=>!card.classList.contains("locked"));if(recommended){recommended.classList.add("recommended");recommended.setAttribute("aria-label",`Suggested next: ${recommended.getAttribute("aria-label")}`)}}
function appendClassicGames(){const carousel=q("#activityCarousel"),done=gameState().story.completedActivities;[{id:"dentist",icon:"🪥",title:"Magic Smile Checkup",place:"Dental Room",play:()=>api().startDentist()},{id:"tictactoe",icon:"⭐",title:"Magic Tic-Tac-Toe",place:"Puzzle Garden",play:()=>api().startTicTacToe()}].forEach(game=>{const card=button("","activity-card classic-card");card.dataset.game=game.id;card.classList.toggle("completed",done.includes(game.id));card.setAttribute("aria-label",`${game.title}, ${game.place}`);card.innerHTML=`<span class="game-icon">${game.icon}</span><strong>${game.title}</strong><small>${game.place}</small>`;card.onclick=game.play;carousel.append(card)})}
function renderWorld(){ensureStory();const s=gameState(),done=s.story.completedActivities; q("#worldStars").textContent=s.stars;q("#collectionCount").textContent=`${done.length} of ${adventures.length+2} discovered`;const chapter=Math.min(4,1+Math.floor(done.length/4));q("#chapterNumber").textContent=chapter;q("#chapterTitle").textContent=["The Hospital Opens","The Missing Rainbow","The Royal Animal Parade","Guardian of the Kingdom"][chapter-1];q("#storyPatient").textContent=["🦊","🦄","👑","🐲"][chapter-1];q("#storyText").textContent=["The hospital is opening! Help three magical patients get ready for the royal parade.","Nova's rainbow magic has scattered across the kingdom. Every patient holds a clue!","The royal parade begins soon. Help the animals prepare their songs, patterns, and costumes.","The whole kingdom trusts Dr. Annabeth. Explore freely and help old friends whenever you like!"][chapter-1];const c=q("#activityCarousel");c.replaceChildren();adventures.forEach(a=>{const b=document.createElement("button");b.className=`activity-card ${done.includes(a.id)?"completed":""}`;b.innerHTML=`<span class="game-icon">${a.icon}</span><strong>${a.title}</strong><small>${a.place}</small>`;b.onclick=()=>startAdventure(a.id);c.append(b)});}

function startAdventure(id){const base=adventures.find(a=>a.id===id),variants=challengeVariants[id],variant=variants&&variants[Math.floor(Math.random()*variants.length)];activeAdventure={...base,...variant};if(id==="paw")activeAdventure.careCase=nextCareCase();activityRound=0;actionCount=0;sequenceIndex=0;mixCounts=[0,0];rhythmInput=[];tracePoints=0;paintCount=0;memoryOpen=[];memoryMatched=0;activityNarration="";api().showScreen("activityScreen");q("#activityTitle").textContent=activeAdventure.careCase?`${activeAdventure.careCase.name}'s ${activeAdventure.careCase.ailment}`:activeAdventure.title;q("#activityLocation").textContent=activeAdventure.place;q("#activityPatient").textContent=activeAdventure.patient;q("#activityAction").textContent=activeAdventure.icon;q("#activityStory").textContent=activeAdventure.careCase?.intro||activeAdventure.story;q("#activityInstruction").textContent=activeAdventure.instruction;q("#activityFeedback").textContent="";q("#activityStars").textContent=gameState().stars;q("#activitySpeakButton").classList.toggle("needs-listening",["choice","blend","segment"].includes(activeAdventure.type));renderActivity();if(!["countCompare","tenFrame","shapes","measure","sort","blend","segment","guidedTrace"].includes(activeAdventure.type))setTimeout(()=>activeAdventure.careCase?api().speak(activeAdventure.careCase.intro):speakActivity(),250)}
function nextCareCase(){ensureStory();const s=gameState();s.story.careHistory=s.story.careHistory||[];let available=careCases.map((_,i)=>i).filter(i=>!s.story.careHistory.includes(i));if(!available.length){s.story.careHistory=[];available=careCases.map((_,i)=>i)}const index=available[Math.floor(Math.random()*available.length)];s.story.careHistory.push(index);api().save();return careCases[index]}
function choiceName(choice){return choice.replace(/[^\p{L}\p{N}]+/gu," ").trim().toLowerCase()}
function learningSpeech(a){
  if(a.type!=="choice")return `${a.careCase?.intro||a.story} ${a.speech||a.instruction}`;
  const names=a.choices.map(choiceName),answer=names[a.answer],practice=activityRound>0;
  if(a.skill==="endingSounds")return practice?`Listen for the last sound ${a.focus}. Your pictures are ${names.join(", ")}. Which one ends with ${a.focus}?`:`Let me show you. ${answer}. Listen to the end: ${answer}. It ends with ${a.focus}. Tap the ${answer} picture.`;
  if(a.skill==="middleSounds")return practice?`Listen for ${a.focus} in the middle. Your pictures are ${names.join(", ")}. Which one has ${a.focus} in the middle?`:`Let me show you. ${answer}. Say it slowly: ${answer}. The middle sound is ${a.focus}. Tap the ${answer} picture.`;
  if(a.skill==="rhyming")return practice?`${a.target}. Your pictures are ${names.join(", ")}. Which picture rhymes with ${a.target}?`:`Listen: ${a.target}, ${answer}. ${a.target}, ${answer}. They rhyme. Tap ${answer}.`;
  if(a.skill==="sightWords")return practice?`Find ${a.target}. Look carefully and tap ${a.target}.`:`This star word is ${a.target}. ${a.target.split("").join(", ")} spells ${a.target}. Tap ${a.target}.`;
  return `${a.story} ${a.speech||a.instruction}`;
}
function narrate(text){activityNarration=text;api().speak(text)}
function speakActivity(){api().speak(activityNarration||learningSpeech(activeAdventure))}
function area(){const el=q("#activityPlayArea");el.replaceChildren();el.dataset.game=activeAdventure.id;return el}
function button(text,cls="play-target"){const b=document.createElement("button");b.type="button";b.className=cls;b.textContent=text;return b}
let soundContext=null;
function tone(frequency,duration=.12,type="sine",delay=0){if(!gameState()?.sound)return;try{soundContext=soundContext||new AudioContext();const oscillator=soundContext.createOscillator(),gain=soundContext.createGain(),start=soundContext.currentTime+delay;oscillator.type=type;oscillator.frequency.setValueAtTime(frequency,start);gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.12,start+.015);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);oscillator.connect(gain).connect(soundContext.destination);oscillator.start(start);oscillator.stop(start+duration+.02)}catch{}}
window.addEventListener("hospital-sound-change",()=>{if(!gameState()?.sound&&soundContext){soundContext.close().catch(()=>{});soundContext=null}});
function sparkleSound(){tone(523,.12);tone(659,.12,"sine",.09);tone(784,.18,"sine",.18)}
function gentleSound(){tone(330,.11,"sine");tone(294,.16,"sine",.1)}
function good(message="Wonderful work!"){q("#activityFeedback").textContent=message;sparkleSound();api().speak(message)}
function tryAgain(el){el.classList.remove("wiggle");void el.offsetWidth;el.classList.add("wiggle");gentleSound();q("#activityFeedback").textContent="Try another one!";api().speak("Almost. Try another one!")}

function renderCare(box,patient){
  const icons={fox:"🦊",bunny:"🐰",dragon:"🐲",unicorn:"🦄"};q("#activityPatient").textContent=icons[patient.animal];
  let step=0,chosen=false,actions=0;
  const care=document.createElement("div");care.className="care-game";
  const progress=document.createElement("div");progress.className="care-progress";progress.innerHTML=patient.plan.map((_,i)=>`<span class="${i===0?"active":""}">${i+1}</span>`).join("");
  const patientCard=document.createElement("div");patientCard.className="care-patient";patientCard.dataset.animal=patient.animal;patientCard.dataset.emotion="worried";
  const bubble=document.createElement("div");bubble.className="care-bubble";bubble.textContent=`${patient.name} needs your help.`;
  const actionLayer=document.createElement("div");actionLayer.className="care-action-layer";patientCard.append(actionLayer,bubble);
  const prompt=document.createElement("div");prompt.className="care-prompt";
  const tools=document.createElement("div");tools.className="care-tools";
  const update=()=>{
    const tool=careTools[patient.plan[step]];chosen=false;actions=0;actionLayer.replaceChildren();
    prompt.innerHTML=`<span>${tool.action}</span><strong>${tool.prompt}</strong>`;q("#activityInstruction").textContent=`Choose the ${tool.name}.`;
    const wrong=Object.keys(careTools).filter(k=>k!==patient.plan[step]).sort(()=>Math.random()-.5).slice(0,2),choices=[patient.plan[step],...wrong].sort(()=>Math.random()-.5);tools.replaceChildren();
    choices.forEach(key=>{const item=careTools[key],b=button("","care-tool");b.innerHTML=`<span>${item.icon}</span><small>${item.name}</small>`;b.setAttribute("aria-label",item.name);b.onclick=()=>{if(chosen)return;if(key!==patient.plan[step]){tryAgain(b);return}chosen=true;b.classList.add("selected");qa(".care-tool").forEach(x=>x.disabled=true);q("#activityInstruction").textContent=tool.prompt;api().speak(`${tool.name}. Good choice! ${tool.prompt}.`);createCareSpots(tool)};tools.append(b)});
    setTimeout(()=>api().speak(`Step ${step+1}. Choose the ${tool.name}.`),step===0?2200:250);
  };
  const createCareSpots=tool=>{for(let i=0;i<tool.reps;i++){const spot=button(tool.action,"care-spot");spot.style.left=`${24+(i*17)%58}%`;spot.style.top=`${24+(i*23)%55}%`;spot.style.animationDelay=`${i*.08}s`;spot.onclick=()=>{if(spot.classList.contains("done"))return;spot.classList.add("done");actions++;tone(440+actions*45,.1);if(actions===tool.reps)setTimeout(finishStep,450)};actionLayer.append(spot)}};
  const finishStep=()=>{qa(".care-progress span")[step].classList.add("done");step++;const ratio=step/patient.plan.length;patientCard.dataset.emotion=ratio>=.75?"happy":"hopeful";bubble.textContent=ratio>=.75?`${patient.name} feels much better!`:`${patient.name} is feeling calmer.`;sparkleSound();if(step===patient.plan.length){q("#activityInstruction").textContent=`${patient.name} is healthy and happy!`;api().speak(`${patient.name} is healthy and happy! You used every tool so carefully.`);setTimeout(completeAdventure,1400);return}qa(".care-progress span")[step].classList.add("active");good("That helped! Ready for the next step?");setTimeout(update,850)};
  care.append(progress,patientCard,prompt,tools);box.append(care);update()
}
function renderCareClinic(box,patient){
  const art={"Prickly Paw":[1,0],"Itchy Ear":[3,0],"Rumbly Tummy":[2,0],"Muddy Paw":[3,1],"Smoky Sneezes":[2,1],"Scraped Scale":[1,2],"Dim Horn":[2,2],"Tired Hoof":[3,3],"Tangled Tail":[2,3],"Sugar-Bug Tooth":[3,2]};
  const modes={magnifier:"inspect",flashlight:"inspect",stethoscope:"inspect",thermometer:"inspect",scanner:"inspect",mirror:"inspect",tweezers:"remove",swab:"remove",cleanser:"scrub",wash:"scrub",brush:"scrub",toothbrush:"scrub",polish:"scrub",spray:"apply",drops:"apply",cream:"apply",toothpaste:"apply",mist:"apply",potion:"apply",crystal:"apply",bandage:"finish",blanket:"finish",wrap:"finish",ribbon:"finish",rinse:"finish"};
  const [sheet,row]=art[patient.ailment]||[1,0];
  const icons={fox:"\u{1F98A}",bunny:"\u{1F430}",dragon:"\u{1F432}",unicorn:"\u{1F984}"};q("#activityPatient").textContent=icons[patient.animal];
  let step=0,chosen=false,amount=0,pointerDown=false,lastPoint=null,finishing=false;
  const care=document.createElement("div");care.className="care-game care-clinic";
  const progress=document.createElement("div");progress.className="care-progress";progress.innerHTML=patient.plan.map((_,i)=>`<span class="${i===0?"active":""}">${i+1}</span>`).join("");
  const patientCard=document.createElement("div");patientCard.className="care-patient";patientCard.dataset.animal=patient.animal;patientCard.dataset.emotion="worried";
  const bubble=document.createElement("div");bubble.className="care-bubble";bubble.textContent=`${patient.name} needs your help.`;patientCard.append(bubble);
  const treatment=document.createElement("div");treatment.className="care-treatment";treatment.style.backgroundImage=`url("assets/care-treatments-${sheet}.png")`;treatment.style.setProperty("--treatment-row",`${row*33.333}%`);treatment.style.setProperty("--treatment-column","0%");treatment.setAttribute("aria-label",`${patient.ailment} close-up`);
  const actionLayer=document.createElement("div");actionLayer.className="care-action-layer";
  const gestureTool=document.createElement("div");gestureTool.className="care-gesture-tool";
  const meter=document.createElement("div");meter.className="care-meter";meter.innerHTML="<i></i>";
  const hint=document.createElement("div");hint.className="care-gesture-hint";
  treatment.append(actionLayer,gestureTool,meter,hint);
  const prompt=document.createElement("div");prompt.className="care-prompt";
  const tools=document.createElement("div");tools.className="care-tools";
  const showAmount=()=>meter.querySelector("i").style.width=`${Math.min(100,amount)}%`;
  const addAmount=value=>{if(finishing)return;amount=Math.min(100,amount+value);showAmount();tone(420+amount*2,.06);if(amount>=100){finishing=true;setTimeout(finishStep,300)}};
  const pointerPoint=event=>{const rect=treatment.getBoundingClientRect();return{x:event.clientX-rect.left,y:event.clientY-rect.top}};
  const moveTool=event=>{const p=pointerPoint(event);gestureTool.style.left=`${p.x}px`;gestureTool.style.top=`${p.y}px`;gestureTool.classList.add("visible");return p};
  treatment.addEventListener("pointerdown",event=>{if(!chosen)return;pointerDown=true;lastPoint=moveTool(event);try{treatment.setPointerCapture?.(event.pointerId)}catch{}if(treatment.dataset.mode==="apply")addAmount(28)});
  treatment.addEventListener("pointermove",event=>{if(!chosen||!pointerDown)return;const p=moveTool(event),distance=lastPoint?Math.hypot(p.x-lastPoint.x,p.y-lastPoint.y):0;if(treatment.dataset.mode==="inspect")addAmount(Math.min(7,distance/10));if(treatment.dataset.mode==="scrub")addAmount(Math.min(10,distance/8));if(treatment.dataset.mode==="finish")addAmount(Math.min(9,distance/9));lastPoint=p});
  const end=()=>{pointerDown=false;lastPoint=null};treatment.addEventListener("pointerup",end);treatment.addEventListener("pointercancel",end);treatment.addEventListener("pointerleave",end);
  const prepare=tool=>{const mode=modes[patient.plan[step]]||"apply";treatment.dataset.mode=mode;gestureTool.textContent=tool.icon;meter.classList.add("show");hint.textContent=mode==="inspect"?"Move the tool over the sore spot":mode==="remove"?"Tap each little speck":mode==="scrub"?"Wipe gently back and forth":mode==="finish"?"Drag and smooth it into place":"Dab the sore spot gently";
    if(mode==="remove")[[42,42],[58,50],[49,64]].forEach((pos,i)=>{const mark=button(tool.action,"care-detail");mark.style.left=`${pos[0]}%`;mark.style.top=`${pos[1]}%`;mark.style.animationDelay=`${i*.12}s`;mark.onclick=event=>{event.stopPropagation();if(mark.classList.contains("done"))return;mark.classList.add("done");addAmount(34)};actionLayer.append(mark)})};
  const update=()=>{const tool=careTools[patient.plan[step]];chosen=false;amount=0;finishing=false;actionLayer.replaceChildren();gestureTool.className="care-gesture-tool";meter.classList.remove("show");showAmount();delete treatment.dataset.mode;
    prompt.innerHTML=`<span>${tool.action}</span><strong>${tool.prompt}</strong>`;q("#activityInstruction").textContent=`Choose the ${tool.name}.`;
    const wrong=Object.keys(careTools).filter(key=>key!==patient.plan[step]).sort(()=>Math.random()-.5).slice(0,2),choices=[patient.plan[step],...wrong].sort(()=>Math.random()-.5);tools.replaceChildren();
    choices.forEach(key=>{const item=careTools[key],choice=button("","care-tool");choice.innerHTML=`<span>${item.icon}</span><small>${item.name}</small>`;choice.setAttribute("aria-label",item.name);choice.onclick=()=>{if(chosen)return;if(key!==patient.plan[step]){tryAgain(choice);return}chosen=true;choice.classList.add("selected");qa(".care-tool").forEach(x=>x.disabled=true);q("#activityInstruction").textContent=tool.prompt;api().speak(`${tool.name}. Good choice! ${tool.prompt}.`);prepare(tool)};tools.append(choice)});
    setTimeout(()=>api().speak(`Step ${step+1}. Choose the ${tool.name}.`),step===0?2200:250)};
  function finishStep(){qa(".care-progress span")[step].classList.add("done");step++;const column=Math.round(step/patient.plan.length*3);treatment.style.setProperty("--treatment-column",`${column*33.333}%`);const ratio=step/patient.plan.length;patientCard.dataset.emotion=ratio>=.75?"happy":"hopeful";bubble.textContent=ratio>=.75?`${patient.name} feels much better!`:`${patient.name} can feel the care working!`;sparkleSound();if(step===patient.plan.length){hint.textContent="All better!";q("#activityInstruction").textContent=`${patient.name} is healthy and happy!`;api().speak(`${patient.name} is healthy and happy! You used every tool so carefully.`);setTimeout(completeAdventure,1400);return}qa(".care-progress span")[step].classList.add("active");good("That helped! Look—the sore spot is improving.");setTimeout(update,850)}
  care.append(progress,patientCard,treatment,prompt,tools);box.append(care);update();
}

function renderActivity(){const a=activeAdventure,box=area();if(a.type==="care")renderCareClinic(box,a.careCase);else if(a.type==="tap")renderTap(box,a);else if(a.type==="sequence")renderSequence(box,a);else if(a.type==="mix")renderMix(box,a);else if(a.type==="find")renderFind(box,a);else if(a.type==="rhythm")renderRhythm(box);else if(a.type==="choice")renderChoice(box,a);else if(a.type==="countCompare")renderCountCompare(box,a);else if(a.type==="tenFrame")renderTenFrame(box,a);else if(a.type==="shapes")renderShapes(box,a);else if(a.type==="measure")renderMeasure(box,a);else if(a.type==="sort")renderSort(box,a);else if(a.type==="blend")renderBlend(box,a);else if(a.type==="segment")renderSegment(box,a);else if(a.type==="guidedTrace")renderGuidedTrace(box,a);else if(a.type==="trace")renderTrace(box,a);else if(a.type==="memory")renderMemory(box);else if(a.type==="color")renderColor(box)}
function renderTap(box,a){a.items.forEach((item,i)=>{const b=button(item);if(i===a.items.length-1)b.style.opacity=.45;b.onclick=()=>{if(i===a.items.length-1&&actionCount<5){tryAgain(b);return}if(b.classList.contains("found"))return;b.classList.add("found");b.disabled=true;actionCount++;good(i===5?"Soft bandage on—Fern feels better!":"Thorn removed gently!");if(actionCount===6)setTimeout(completeAdventure,650)};box.append(b)})}
function renderSequence(box,a){const shuffled=[...a.items].sort(()=>Math.random()-.5);shuffled.forEach(item=>{const b=button(item,"sequence-tile");b.onclick=()=>{if(item!==a.items[sequenceIndex]){tryAgain(b);return}b.classList.add("found");b.disabled=true;sequenceIndex++;good(`${sequenceIndex} rainbow ring${sequenceIndex===1?"":"s"} restored!`);if(sequenceIndex===a.items.length)setTimeout(completeAdventure,600)};box.append(b)})}
function renderMix(box,a){const bowl=document.createElement("div");bowl.className="mix-bowl";bowl.textContent="🫧";box.append(bowl);a.items.forEach((item,i)=>{const b=button(item);const count=document.createElement("small");count.textContent=` 0 / ${a.goal[i]}`;b.append(count);b.onclick=()=>{if(mixCounts[i]>=a.goal[i]){tryAgain(b);return}mixCounts[i]++;count.textContent=` ${mixCounts[i]} / ${a.goal[i]}`;bowl.textContent=item;good("Plop! Into the potion!");if(mixCounts.every((n,j)=>n===a.goal[j]))setTimeout(completeAdventure,700)};box.append(b)})}
function renderFind(box,a){
  const isForest=a.id==="search";
  const objects=isForest?
    [{icon:"🔑",name:"key",x:8,y:66},{icon:"🔔",name:"bell",x:29,y:17},{icon:"⛵",name:"boat",x:70,y:73},{icon:"🌙",name:"moon",x:91,y:61},{icon:"🌰",name:"acorn",x:31,y:84},{icon:"🐞",name:"ladybug",x:92,y:79}]:
    [{icon:"🔑",name:"key",x:34,y:49},{icon:"🔘",name:"button",x:40,y:50},{icon:"🔔",name:"bell",x:45,y:54}];
  const targets=isForest?[...objects].sort(()=>Math.random()-.5).slice(0,4):objects;
  const wrap=document.createElement("div");wrap.className="search-wrap";
  const tray=document.createElement("div");tray.className="search-tray";tray.innerHTML=targets.map(o=>`<span data-target="${o.name}">${o.icon}<i></i></span>`).join("");
  const scene=document.createElement("div");scene.className=`target-scene ${isForest?"forest-search":"xray-search"}`;
  targets.forEach(o=>{const hotspot=button("","search-hotspot");hotspot.dataset.name=o.name;hotspot.style.left=`${o.x}%`;hotspot.style.top=`${o.y}%`;hotspot.setAttribute("aria-label",`Hidden ${o.name}`);hotspot.onclick=()=>{if(hotspot.classList.contains("found"))return;hotspot.classList.add("found");tray.querySelector(`[data-target="${o.name}"]`).classList.add("found");actionCount++;good(`You found the ${o.name}!`);if(actionCount===targets.length)setTimeout(completeAdventure,700)};scene.append(hotspot)});
  const hint=button("✨ Hint","hint-button");hint.hidden=true;hint.onclick=()=>{const remaining=[...scene.querySelectorAll(".search-hotspot:not(.found)")];if(!remaining.length)return;const target=remaining[0];target.classList.add("hinting");setTimeout(()=>target.classList.remove("hinting"),2600);hint.hidden=true;setTimeout(()=>{if(actionCount<targets.length)hint.hidden=false},60000);api().speak(`Look near the ${target.dataset.name}. Follow the sparkle.`)};
  setTimeout(()=>{if(actionCount<targets.length)hint.hidden=false},60000);
  wrap.append(tray,scene,hint);box.append(wrap)
}
function renderRhythm(box){const wrap=document.createElement("div");wrap.style.textAlign="center";const pad=button("💗","rhythm-pad");const meter=document.createElement("div");meter.className="meter";meter.innerHTML="<span></span>";wrap.append(pad,meter);box.append(wrap);let demo=0;pad.disabled=true;const flash=setInterval(()=>{pad.classList.add("flash");setTimeout(()=>pad.classList.remove("flash"),180);demo++;if(demo===4){clearInterval(flash);pad.disabled=false;good("Now tap 4 heartbeats!")}},450);pad.onclick=()=>{rhythmInput.push(1);pad.classList.add("flash");setTimeout(()=>pad.classList.remove("flash"),120);meter.firstElementChild.style.width=`${rhythmInput.length*25}%`;if(rhythmInput.length===4)setTimeout(completeAdventure,500)}}
function renderChoice(box,a){
  let mistakes=0;
  if(a.id==="math"&&a.model){const model=document.createElement("div");model.className=`math-story-model ${a.operation}`;model.innerHTML=`<span>${a.model[0]}</span><b>${a.operation==="add"?"＋":"−"}</b><span>${a.model[1]}</span>`;box.append(model)}
  const options=a.choices.map((choice,index)=>({choice,correct:index===a.answer})).sort(()=>Math.random()-.5);
  options.forEach(option=>{
    const b=button(option.choice,"choice-tile");
    b.setAttribute("aria-label",choiceName(option.choice));
    b.onclick=()=>{
      const name=choiceName(option.choice);
      if(!option.correct){mistakes++;b.classList.remove("wiggle");void b.offsetWidth;b.classList.add("wiggle");gentleSound();q("#activityFeedback").textContent="Listen once more.";api().speak(`${name}. That is not the one yet. Listen again. ${learningSpeech(a)}`);return}
      b.classList.add("correct");qa(".choice-tile").forEach(x=>x.disabled=true);if(a.skill)api().recordSkill(a.skill,mistakes===0);good(mistakes?`Yes, ${name}! You listened carefully.`:`Yes, ${name}! Brilliant listening!`);if(activityRound<2&&challengeVariants[a.id])setTimeout(nextLearningRound,1050);else setTimeout(completeAdventure,1050)
    };
    box.append(b)
  })
}
function nextLearningRound(){activityRound++;const base=adventures.find(item=>item.id===activeAdventure.id),pool=challengeVariants[activeAdventure.id],choices=pool.filter(item=>item.instruction!==activeAdventure.instruction),variant=choices[Math.floor(Math.random()*choices.length)];activeAdventure={...base,...variant};q("#activityStory").textContent=activeAdventure.story;q("#activityInstruction").textContent=activeAdventure.instruction;q("#activityFeedback").textContent=`✨ ${activityRound+1} of 3 ✨`;renderActivity();setTimeout(speakActivity,250)}

function finishLearning(skill,perfect=true,delay=800){if(skill)api().recordSkill(skill,perfect);setTimeout(completeAdventure,delay)}

function renderCountCompare(box,a){
  let round=0,mistakes=0;const game=document.createElement("div");game.className="mini-learning-game";box.append(game);
  const play=()=>{game.replaceChildren();const left=4+Math.floor(Math.random()*6),rightChoices=[4,5,6,7,8,9].filter(n=>n!==left),right=rightChoices[Math.floor(Math.random()*rightChoices.length)],askMore=Math.random()>.35,answer=askMore?(left>right?0:1):(left<right?0:1);q("#activityInstruction").textContent=`Which nest has ${askMore?"more":"fewer"} eggs?`;narrate(`Count the eggs. Which nest has ${askMore?"more":"fewer"} eggs?`);[left,right].forEach((count,index)=>{const nest=button("","egg-nest");nest.innerHTML=`<span>${"🥚".repeat(count)}</span><b>${count}</b>`;nest.onclick=()=>{if(index!==answer){mistakes++;tryAgain(nest);return}nest.classList.add("correct");round++;good(`Yes! ${count} eggs.`);if(round<3)setTimeout(play,850);else finishLearning(a.skill,mistakes===0)};game.append(nest)})};play()
}

function renderTenFrame(box,a){
  let round=0,mistakes=0;const game=document.createElement("div");game.className="mini-learning-game";box.append(game);
  const play=()=>{game.replaceChildren();let count=0;const target=11+Math.floor(Math.random()*9),frame=document.createElement("div");frame.className="double-ten-frame";const countLabel=document.createElement("strong");countLabel.className="build-count";countLabel.textContent="0";for(let i=0;i<20;i++){const cell=button("","ten-cell");cell.onclick=()=>{if(cell.classList.contains("filled"))return;if(count>=target){mistakes++;tryAgain(cell);return}cell.classList.add("filled");cell.textContent="🥚";count++;countLabel.textContent=count;if(count===10)api().speak("One full ten! Now add the extra ones.");if(count===target){round++;good(`${target} is ten and ${target-10} more!`);if(round<3)setTimeout(play,1000);else finishLearning(a.skill,mistakes===0,1000)}};frame.append(cell)}game.append(countLabel,frame);q("#activityInstruction").textContent=`Build ${target}: one ten and ${target-10} more.`;narrate(`Build ${target}. Fill one nest with ten eggs, then add ${target-10} more.`)};play()
}

function renderShapes(box,a){
  const tasks=[{name:"triangle",icon:"🔺",choices:[["🔺","triangle"],["🟦","square"],["⚪","circle"]]},{name:"rectangle",icon:"▭",choices:[["⚪","circle"],["▭","rectangle"],["🔺","triangle"]]},{name:"hexagon",icon:"⬡",choices:[["⬡","hexagon"],["🟦","square"],["🔺","triangle"]]}];let round=0,mistakes=0;const game=document.createElement("div");game.className="mini-learning-game";box.append(game);
  const play=()=>{game.replaceChildren();const task=tasks[round],window=document.createElement("div");window.className="broken-window";window.textContent="?";const choices=document.createElement("div");choices.className="shape-choices";[...task.choices].sort(()=>Math.random()-.5).forEach(([icon,name])=>{const b=button(icon,"shape-piece");b.setAttribute("aria-label",name);b.onclick=()=>{if(name!==task.name){mistakes++;tryAgain(b);return}window.textContent=icon;b.classList.add("correct");round++;good(`The ${name} fits!`);if(round<tasks.length)setTimeout(play,900);else finishLearning(a.skill,mistakes===0)};choices.append(b)});game.append(window,choices);q("#activityInstruction").textContent=`Repair the window with a ${task.name}.`;narrate(`Find the ${task.name}. Tap it to repair the window.`)};play()
}

function renderMeasure(box,a){
  const tasks=[{ask:"longer",kind:"bandage",values:[42,76]},{ask:"shorter",kind:"ribbon",values:[70,38]},{ask:"holds more",kind:"potion bottle",values:[45,78]}];let round=0,mistakes=0;const game=document.createElement("div");game.className="mini-learning-game";box.append(game);
  const play=()=>{game.replaceChildren();const task=tasks[round],answer=task.ask==="shorter"?(task.values[0]<task.values[1]?0:1):(task.values[0]>task.values[1]?0:1);task.values.forEach((value,index)=>{const b=button("","measure-choice");const visual=document.createElement("span");visual.style.setProperty("--measure",`${value}%`);visual.className=task.kind.includes("bottle")?"bottle-measure":"length-measure";b.append(visual);b.onclick=()=>{if(index!==answer){mistakes++;tryAgain(b);return}b.classList.add("correct");round++;good(`Yes, this ${task.kind} ${task.ask==="holds more"?"holds more":`is ${task.ask}`}!`);if(round<tasks.length)setTimeout(play,900);else finishLearning(a.skill,mistakes===0)};game.append(b)});q("#activityInstruction").textContent=`Which ${task.kind} ${task.ask==="holds more"?"holds more":`is ${task.ask}`}?`;narrate(q("#activityInstruction").textContent)};play()
}

function renderSort(box,a){
  const items=[{icon:"🍎",group:"food"},{icon:"🥕",group:"food"},{icon:"🩹",group:"care"},{icon:"🩺",group:"care"},{icon:"⚽",group:"play"},{icon:"🧸",group:"play"}].sort(()=>Math.random()-.5);let index=0,mistakes=0,finished=false;const game=document.createElement("div");game.className="sort-game";const item=document.createElement("div");item.className="sort-item";const baskets=document.createElement("div");baskets.className="sort-baskets";box.append(game);game.append(item,baskets);[{id:"food",icon:"🍽️",name:"food"},{id:"care",icon:"🏥",name:"care tools"},{id:"play",icon:"🎈",name:"play things"}].forEach(group=>{const b=button(`${group.icon} ${group.name}`,"sort-basket");b.onclick=()=>{if(finished)return;const current=items[index];if(!current)return;if(group.id!==current.group){mistakes++;tryAgain(b);return}index++;good("That belongs there!");if(index<items.length){show()}else{finished=true;[...baskets.children].forEach(choice=>choice.disabled=true);finishLearning(a.skill,mistakes===0)}};baskets.append(b)});const show=()=>{item.textContent=items[index].icon;q("#activityInstruction").textContent="Which basket does this belong in?";narrate(`Where does this belong? Food, care tools, or play things?`)};show()
}

function renderBlend(box,a){
  const tasks=[{sounds:"mmm ... short a ... p",word:"map",choices:[["🗺️","map"],["🐱","cat"],["☀️","sun"]]},{sounds:"sss ... short u ... nnn",word:"sun",choices:[["☀️","sun"],["🐷","pig"],["🚌","bus"]]},{sounds:"fff ... short i ... sh",word:"fish",choices:[["🐟","fish"],["🦊","fox"],["🐶","dog"]]}];let round=0,mistakes=0;const game=document.createElement("div");game.className="mini-learning-game";box.append(game);const play=()=>{game.replaceChildren();const task=tasks[round],soundButton=button("🔊","big-listen"),prompt=`Listen and blend. ${task.sounds}. What word?`;soundButton.onclick=()=>narrate(prompt);game.append(soundButton);[...task.choices].sort(()=>Math.random()-.5).forEach(([icon,word])=>{const b=button(icon,"choice-tile");b.setAttribute("aria-label",word);b.onclick=()=>{if(word!==task.word){mistakes++;tryAgain(b);soundButton.onclick();return}round++;good(`Yes! ${task.word}.`);if(round<tasks.length)setTimeout(play,900);else finishLearning(a.skill,mistakes===0)};game.append(b)});q("#activityInstruction").textContent="Blend the sounds. Choose the picture.";setTimeout(soundButton.onclick,150)};play()
}

function renderSegment(box,a){
  const tasks=[{icon:"🐱",word:"cat",sounds:["c","short a","t"]},{icon:"☀️",word:"sun",sounds:["s","short u","n"]},{icon:"🐟",word:"fish",sounds:["f","short i","sh"]}];let round=0,mistakes=0;const game=document.createElement("div");game.className="mini-learning-game";box.append(game);const play=()=>{game.replaceChildren();let step=0;const task=tasks[round],picture=document.createElement("div");picture.className="segment-picture";picture.textContent=task.icon;const eggs=document.createElement("div");eggs.className="sound-eggs";task.sounds.forEach((sound,i)=>{const egg=button("🥚","sound-egg");egg.classList.toggle("active",i===0);egg.onclick=()=>{if(i!==step){mistakes++;tryAgain(egg);return}egg.classList.remove("active");egg.textContent="🐣";egg.disabled=true;api().speak(sound);step++;if(eggs.children[step])eggs.children[step].classList.add("active");if(step===task.sounds.length){round++;good(`${task.word} has ${task.sounds.length} sounds!`);if(round<tasks.length)setTimeout(play,1000);else finishLearning(a.skill,mistakes===0)}};eggs.append(egg)});game.append(picture,eggs);q("#activityInstruction").textContent=`Tap the eggs in order for each sound in ${task.word}.`;narrate(`${task.word}. Listen: ${task.sounds.join(" ... ")}. Now tap one egg for each sound.`)};play()
}

function renderGuidedTrace(box,a){
  const letters=[{glyph:"M",points:[[18,82],[18,18],[50,58],[82,18],[82,82]]},{glyph:"A",points:[[16,82],[50,16],[84,82],[30,58],[70,58]]},{glyph:"S",points:[[78,24],[55,15],[26,28],[30,48],[70,52],[76,72],[50,86],[22,76]]}],numbers=[{glyph:"2",points:[[20,30],[42,15],[72,22],[80,43],[60,61],[22,84],[82,84]]},{glyph:"7",points:[[18,20],[82,20],[42,86]]},{glyph:"9",points:[[70,48],[48,58],[25,45],[30,20],[62,15],[78,35],[66,85]]}],tasks=a.skill==="letterFormation"?letters:numbers;let round=0,mistakes=0;const game=document.createElement("div");game.className="guided-trace-game";box.append(game);const play=()=>{game.replaceChildren();let step=0;const task=tasks[round],glyph=document.createElement("div");glyph.className="guide-glyph";glyph.textContent=task.glyph;task.points.forEach((point,i)=>{const dot=button(i===0?"★":"•","trace-dot");dot.style.left=`${point[0]}%`;dot.style.top=`${point[1]}%`;dot.classList.toggle("active",i===0);dot.onclick=()=>{if(i!==step){mistakes++;tryAgain(dot);return}dot.classList.remove("active");dot.classList.add("done");dot.disabled=true;step++;const next=game.querySelectorAll(".trace-dot")[step];if(next)next.classList.add("active");else{round++;good(`${task.glyph} is glowing!`);if(round<tasks.length)setTimeout(play,900);else finishLearning(a.skill,mistakes===0)}};glyph.append(dot)});game.append(glyph);q("#activityInstruction").textContent=`Start at the star. Follow the dots to write ${task.glyph}.`;narrate(q("#activityInstruction").textContent)};play()
}
function renderTrace(box,a){const board=document.createElement("div");board.className="trace-board";board.innerHTML=`<div class="trace-glyph">${a.glyph}</div><canvas class="trace-canvas"></canvas>`;box.append(board);const canvas=board.querySelector("canvas"),ctx=canvas.getContext("2d");let drawing=false,last=null;const resize=()=>{canvas.width=board.clientWidth*devicePixelRatio;canvas.height=board.clientHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);ctx.strokeStyle="#8a62dc";ctx.lineWidth=18;ctx.lineCap="round"};resize();const move=e=>{if(!drawing)return;e.preventDefault();const r=canvas.getBoundingClientRect(),p=[(e.clientX-r.left)*canvas.width/r.width/devicePixelRatio,(e.clientY-r.top)*canvas.height/r.height/devicePixelRatio];if(last){ctx.beginPath();ctx.moveTo(...last);ctx.lineTo(...p);ctx.stroke();tracePoints++}last=p;if(tracePoints>28){drawing=false;good("Your trail is glowing!");setTimeout(completeAdventure,600)}};canvas.onpointerdown=e=>{drawing=true;last=null;canvas.setPointerCapture(e.pointerId);move(e)};canvas.onpointermove=move;canvas.onpointerup=()=>{drawing=false;last=null}}
function renderMemory(box){const symbols=["🐶","🐱","🦊","🐰","🐶","🐱","🦊","🐰"].sort(()=>Math.random()-.5),grid=document.createElement("div");grid.className="memory-grid";symbols.forEach((s,i)=>{const b=button(s,"memory-card");b.onclick=()=>{if(memoryOpen.length===2||b.classList.contains("open")||b.classList.contains("matched"))return;b.classList.add("open");memoryOpen.push({b,s});if(memoryOpen.length===2)setTimeout(()=>{const[x,y]=memoryOpen;if(x.s===y.s){x.b.classList.add("matched");y.b.classList.add("matched");memoryMatched++;good("A matching pair!");if(memoryMatched===4)setTimeout(completeAdventure,500)}else{x.b.classList.remove("open");y.b.classList.remove("open")}memoryOpen=[]},650)};grid.append(b)});box.append(grid)}
function renderColor(box){
  const templates=[{id:"unicorn",icon:"🦄"},{id:"butterfly",icon:"🦋"},{id:"castle",icon:"🏰"},{id:"fox",icon:"🦊"}];
  let templateIndex=0,color="#ff5fa2",size=22,drawing=false,last=null,rewarded=false;
  const studio=document.createElement("div");studio.className="coloring-studio";
  const tabs=document.createElement("div");tabs.className="coloring-tabs";
  const canvasWrap=document.createElement("div");canvasWrap.className="coloring-canvas-wrap";
  const paint=document.createElement("canvas"),outline=document.createElement("canvas");paint.className="paint-canvas";outline.className="outline-canvas";canvasWrap.append(paint,outline);
  const toolbar=document.createElement("div");toolbar.className="coloring-toolbar";
  const colors=["#ff5fa2","#8a63df","#21b99a","#ffd23f","#238ee8","#ff7a32","#4b2a83"];
  colors.forEach(c=>{const b=button("","paint-dot");b.style.background=c;b.setAttribute("aria-label",`Choose color ${c}`);b.onclick=()=>{color=c;qa(".paint-dot").forEach(x=>x.classList.remove("selected"));b.classList.add("selected")};toolbar.append(b)});
  const custom=document.createElement("input");custom.type="color";custom.value=color;custom.className="custom-color";custom.setAttribute("aria-label","Choose any color");custom.oninput=()=>color=custom.value;
  const brush=document.createElement("input");brush.type="range";brush.min=8;brush.max=46;brush.value=size;brush.className="brush-size";brush.setAttribute("aria-label","Brush size");brush.oninput=()=>size=Number(brush.value);
  const eraser=button("Eraser","tool-button");eraser.setAttribute("aria-label","Use eraser");eraser.onclick=()=>color="erase";
  const clear=button("Clear","tool-button");clear.setAttribute("aria-label","Clear picture");clear.onclick=()=>{paint.getContext("2d").clearRect(0,0,paint.width,paint.height);paintCount=0};
  const done=button("✓ Done","done-coloring-button");done.setAttribute("aria-label","Finish and save coloring page");done.onclick=()=>{saveColoring();completeAdventure()};
  toolbar.append(custom,brush,eraser,clear,done);
  const setupCanvas=()=>{const w=700,h=430;paint.width=outline.width=w;paint.height=outline.height=h;drawColoringOutline(outline.getContext("2d"),templates[templateIndex].id,w,h);const saved=gameState().story?.coloringPages?.[templates[templateIndex].id];if(saved){const img=new Image();img.onload=()=>paint.getContext("2d").drawImage(img,0,0,w,h);img.src=saved}};
  templates.forEach((t,i)=>{const b=button(t.icon,"template-button");b.setAttribute("aria-label",`${t.id} coloring page`);b.onclick=()=>{saveColoring();templateIndex=i;qa(".template-button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");setupCanvas()};tabs.append(b)});tabs.firstChild.classList.add("selected");
  const point=e=>{const r=paint.getBoundingClientRect();return[(e.clientX-r.left)*paint.width/r.width,(e.clientY-r.top)*paint.height/r.height]};
  const move=e=>{if(!drawing)return;e.preventDefault();const p=point(e),ctx=paint.getContext("2d");ctx.lineCap="round";ctx.lineJoin="round";ctx.lineWidth=size;if(color==="erase"){ctx.globalCompositeOperation="destination-out";ctx.strokeStyle="#000"}else{ctx.globalCompositeOperation="source-over";ctx.strokeStyle=color}if(last){ctx.beginPath();ctx.moveTo(...last);ctx.lineTo(...p);ctx.stroke();paintCount++;if(paintCount>35&&!rewarded){rewarded=true;good("Your picture is beautiful! Keep coloring as long as you like.")}}last=p};
  paint.onpointerdown=e=>{drawing=true;last=point(e);paint.setPointerCapture(e.pointerId)};paint.onpointermove=move;paint.onpointerup=()=>{drawing=false;last=null;saveColoring()};paint.onpointercancel=()=>{drawing=false;last=null};
  function saveColoring(){ensureStory();const s=gameState();s.story.coloringPages=s.story.coloringPages||{};try{s.story.coloringPages[templates[templateIndex].id]=paint.toDataURL("image/webp",.72);api().save()}catch{}}
  studio.append(tabs,canvasWrap,toolbar);box.append(studio);setupCanvas()
}

function drawColoringOutline(ctx,id,w,h){
  ctx.clearRect(0,0,w,h);ctx.strokeStyle="#503c68";ctx.lineWidth=7;ctx.lineCap="round";ctx.lineJoin="round";ctx.fillStyle="#fff";
  const path=d=>{const p=new Path2D(d);ctx.fill(p);ctx.stroke(p)};
  if(id==="unicorn"){path("M210 335 C150 290 145 185 210 135 C265 92 360 102 414 160 C472 222 451 318 382 347 C325 371 256 363 210 335 Z");path("M223 150 C168 112 138 72 151 42 C203 66 241 97 252 129 Z");path("M366 139 C399 87 442 69 474 82 C459 126 426 157 391 169 Z");path("M292 111 L326 20 L352 119 Z");ctx.beginPath();ctx.arc(278,211,11,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(378,211,11,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(292,278);ctx.quadraticCurveTo(333,309,374,278);ctx.stroke();}
  else if(id==="butterfly"){path("M350 120 C279 35 121 47 113 163 C108 234 195 247 278 227 C209 275 176 363 251 389 C305 408 332 329 350 252 Z");path("M350 120 C421 35 579 47 587 163 C592 234 505 247 422 227 C491 275 524 363 449 389 C395 408 368 329 350 252 Z");path("M333 105 C333 70 367 70 367 105 L367 332 C367 365 333 365 333 332 Z");ctx.beginPath();ctx.moveTo(338,94);ctx.quadraticCurveTo(304,48,279,38);ctx.moveTo(362,94);ctx.quadraticCurveTo(396,48,421,38);ctx.stroke();}
  else if(id==="castle"){path("M145 360 L145 166 L219 166 L219 104 L285 104 L285 180 L415 180 L415 104 L481 104 L481 166 L555 166 L555 360 Z");path("M132 166 L182 93 L232 166 Z");path("M272 104 L318 35 L364 104 Z");path("M402 104 L448 35 L494 104 Z");ctx.beginPath();ctx.arc(350,360,58,Math.PI,Math.PI*2);ctx.stroke();for(const x of [185,318,448,515]){ctx.strokeRect(x-15,220,30,50)}}
  else{path("M198 330 C145 271 166 157 261 120 C342 89 454 126 489 216 C519 292 456 367 359 369 C295 370 236 362 198 330 Z");path("M236 137 L177 38 L304 105 Z");path("M408 124 L503 54 L473 179 Z");path("M477 276 C578 250 590 333 533 367 C487 394 438 367 420 342");ctx.beginPath();ctx.arc(292,213,12,0,Math.PI*2);ctx.arc(405,213,12,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(314,284);ctx.quadraticCurveTo(355,316,396,284);ctx.stroke()}
}

function nextUnlockAfter(stars){const options=[...adventures.map(a=>({name:a.title,stars:adventureUnlocks[a.id]||0})),...outfits,...Object.values(dressupItems).flat()].filter(item=>item.stars>stars).sort((a,b)=>a.stars-b.stars);return options[0]}
function completeAdventure(){
  const s=gameState();ensureStory();const first=!s.story.completedActivities.includes(activeAdventure.id);if(first)s.story.completedActivities.push(activeAdventure.id);
  s.story.varietyRun=s.story.varietyRun||[];if(!s.story.varietyRun.includes(activeAdventure.id))s.story.varietyRun.push(activeAdventure.id);
  let earned=first?4:1,gem=0,bonus=false;if(s.story.varietyRun.length>=3){earned+=4;gem=1;bonus=true;s.story.varietyRun=[];s.gems+=1}
  s.stars+=earned;s.missions+=1;api().save();
  const patientIcons={fox:"🦊",bunny:"🐰",dragon:"🐲",unicorn:"🦄"};q("#rewardPatient").textContent=activeAdventure.careCase?patientIcons[activeAdventure.careCase.animal]:activeAdventure.patient;
  q("#activityRewardTitle").textContent=activeAdventure.careCase?`${activeAdventure.careCase.name} feels wonderful!`:`${activeAdventure.title} complete!`;
  q("#activityRewardStory").textContent=bonus?"Three different adventures completed! You earned a Variety Bonus and a magic gem.":first?"A new adventure has been added to Annabeth's kingdom book.":"A favorite adventure is always ready to play again.";
  q("#activityEarnedStars").textContent=earned;q("#activityGemReward").hidden=!gem;
  const next=nextUnlockAfter(s.stars);q("#unlockProgress").textContent=next?`${next.stars-s.stars} more stars until ${next.name}.`:"Every adventure and wardrobe reward is unlocked!";
  q("#replayActivityButton").textContent=activeAdventure.careCase?"🐾 Help the next patient":"🔁 Play this one again";
  api().showScreen("activityRewardScreen");api().confetti("#activityConfetti");api().speak(bonus?`Wonderful work, Doctor Annabeth! Variety bonus! You earned ${earned} stars and a magic gem.`:`Wonderful work, Doctor Annabeth! You earned ${earned} stars.`)
}

let activeDressupCategory="head";
function ensureCustomLook(){ensureStory();const s=gameState();s.story.customLook={head:"none",clothes:"lavender",jewelry:"none",shoes:"socks",ribbon:"none",medical:"stethoscope",...(s.story.customLook||{})};return s.story.customLook}
function renderDressup(){
  const look=ensureCustomLook(),s=gameState(),categories=q("#dressupCategories"),choices=q("#dressupChoices");categories.replaceChildren();
  Object.keys(dressupItems).forEach(category=>{const b=button(dressupCategoryNames[category],"dressup-category");b.classList.toggle("selected",category===activeDressupCategory);b.onclick=()=>{activeDressupCategory=category;renderDressup()};categories.append(b)});
  choices.replaceChildren();dressupItems[activeDressupCategory].forEach(item=>{const unlocked=s.stars>=item.stars&&(!item.gems||s.gems>=item.gems),b=button("","dressup-choice");b.dataset.category=activeDressupCategory;b.dataset.item=item.id;b.classList.toggle("selected",look[activeDressupCategory]===item.id);b.classList.toggle("locked",!unlocked);const need=item.gems&&s.gems<item.gems?`${item.gems} gems`:`${item.stars} stars`;b.innerHTML=`<span>${unlocked&&activeDressupCategory==="clothes"?"":unlocked?item.icon:"🔒"}</span><small>${unlocked?item.name:need}</small>`;b.onclick=()=>{if(!unlocked){api().speak(item.gems&&s.gems<item.gems?`${item.gems-s.gems} more magic gems to unlock ${item.name}.`:`${item.stars-s.stars} more stars to unlock ${item.name}.`);return}look[activeDressupCategory]=item.id;s.story.currentOutfit="custom";api().save();sparkleSound();renderDressup()};choices.append(b)});
  q("#dressupCharacter").dataset.clothes=look.clothes;q("#dressupShoes").dataset.item=look.shoes;q("#dressupJewelry").dataset.item=look.jewelry;q("#dressupMedical").dataset.item=look.medical;q("#dressupHead").dataset.item=look.head;q("#dressupRibbon").dataset.item=look.ribbon;q("#dressupLayers").replaceChildren()
}
function dressupSvg(look){
  const defs=`<defs><linearGradient id="lav" x2="0" y2="1"><stop stop-color="#bca2ff"/><stop offset="1" stop-color="#7653c7"/></linearGradient><linearGradient id="mint" x2="0" y2="1"><stop stop-color="#bdf2df"/><stop offset="1" stop-color="#58b99a"/></linearGradient><linearGradient id="gold" x2="0" y2="1"><stop stop-color="#fff0a0"/><stop offset="1" stop-color="#d79a24"/></linearGradient><linearGradient id="coral" x2="0" y2="1"><stop stop-color="#ffb0be"/><stop offset="1" stop-color="#e85e7c"/></linearGradient></defs>`;
  let body="";
  if(look.clothes==="doctor")body=`<path class="cloth" fill="#fffdf4" d="M348 493 Q512 430 676 493 L720 1015 Q512 1090 304 1015Z"/><path fill="url(#lav)" d="M356 500 L405 477 L425 1018 L315 1005Z M668 500 L619 477 L599 1018 L709 1005Z"/><path class="detail" d="M512 474V1040 M370 790H462 M562 790H654"/>`;
  else if(look.clothes==="scrubs")body=`<path class="cloth" fill="url(#mint)" d="M350 492 Q512 438 674 492 L655 835 Q512 890 369 835Z"/><path fill="#6cccad" d="M403 823 L497 823 L486 1278 L370 1278Z M527 823 L621 823 L654 1278 L538 1278Z"/><path class="detail" d="M451 494L512 565L573 494 M397 716H470 M554 716H627"/>`;
  else if(look.clothes==="princess")body=`<path class="cloth" fill="url(#lav)" d="M359 490 Q512 431 665 490 L632 759 Q718 942 782 1254 Q512 1350 242 1254 Q306 942 392 759Z"/><path fill="#fff8ed" stroke="#d79a24" stroke-width="10" d="M421 490L512 586L603 490L620 756Q512 820 404 756Z"/><path fill="none" stroke="#ffd76d" stroke-width="16" d="M286 1190Q512 1270 738 1190"/>`;
  else if(look.clothes==="forest")body=`<path class="cloth" fill="#f6eed7" d="M353 493Q512 440 671 493L650 840Q512 884 374 840Z"/><path fill="#477744" stroke="#2f5631" stroke-width="10" d="M363 492L444 466L467 840L367 829Z M661 492L580 466L557 840L657 829Z"/><path fill="#567a43" d="M389 838L490 838L482 1268L354 1268Z M534 838L635 838L670 1268L542 1268Z"/>`;
  else if(look.clothes==="artist")body=`<path class="cloth" fill="#fffaf4" d="M355 492Q512 438 669 492L700 1010Q512 1080 324 1010Z"/><circle fill="#ff5fa2" cx="418" cy="650" r="34"/><circle fill="#24b99b" cx="570" cy="730" r="39"/><path fill="#ffd23f" d="M470 850l42-44l42 44l-42 44z"/><path fill="#7754c9" d="M366 991L482 1018L469 1280L351 1280Z M658 991L542 1018L555 1280L673 1280Z"/>`;
  const shoes={sneakers:`<path class="shoe" fill="#9a74e2" d="M314 1352L438 1352L451 1460Q365 1500 286 1458Z M586 1352L710 1352L738 1458Q659 1500 573 1460Z"/>`,purple:`<path class="shoe" fill="#5a3b99" d="M320 1250H435L452 1464Q365 1502 286 1458Z M589 1250H704L738 1458Q659 1502 572 1464Z"/>`,gold:`<path class="shoe" fill="url(#gold)" d="M320 1235H435L452 1464Q365 1502 286 1458Z M589 1235H704L738 1458Q659 1502 572 1464Z"/>`,rain:`<path class="shoe" fill="url(#coral)" d="M316 1220H438L451 1462Q361 1505 280 1455Z M586 1220H708L744 1455Q663 1505 573 1462Z"/>`,slippers:`<ellipse class="shoe" fill="#f1cfff" cx="364" cy="1430" rx="92" ry="61"/><ellipse class="shoe" fill="#f1cfff" cx="660" cy="1430" rx="92" ry="61"/><path fill="#ffd363" d="M350 1373l18-48l18 48M646 1373l18-48l18 48"/>`}[look.shoes]||"";
  const head={mouse:`<path fill="#17131c" d="M347 227Q335 94 432 84Q494 105 474 206M677 227Q689 94 592 84Q530 105 550 206"/><path fill="none" stroke="#17131c" stroke-width="28" d="M384 205Q512 153 640 205"/>`,tiara:`<path fill="url(#gold)" stroke="#a66f18" stroke-width="8" d="M362 213L405 115L470 184L512 80L554 184L619 115L662 213Z"/><circle fill="#9b65ef" cx="512" cy="116" r="20"/>`,flowers:`<path fill="none" stroke="#4e974e" stroke-width="22" d="M361 208Q512 142 663 208"/>${[390,450,512,574,634].map((x,i)=>`<circle fill="${i%2?'#ffd75e':'#fff'}" cx="${x}" cy="${178-Math.abs(512-x)*.18}" r="25"/>`).join("")}`,starcrown:`<path fill="url(#gold)" stroke="#b17b1d" stroke-width="9" d="M370 216L402 113L467 181L512 74L557 181L622 113L654 216Z"/><path fill="#fff" d="M512 103l12 26l28 3l-21 19l6 28l-25-14l-25 14l6-28l-21-19l28-3z"/>`,wizardhat:`<path fill="#352778" stroke="#d9af43" stroke-width="10" d="M336 222Q512 170 688 222L604 207L534 23Q492 2 453 207Z"/><path fill="#ffd85f" d="M493 77l12 25l27 4l-20 18l5 27l-24-13l-24 13l5-27l-20-18l27-4z"/>`}[look.head]||"";
  const jewelry={heart:`<path fill="none" stroke="#dfaa35" stroke-width="12" d="M423 489Q512 566 601 489"/><path fill="#ef6f9d" d="M512 548C460 515 468 472 512 499C556 472 564 515 512 548Z"/>`,pearls:`<path fill="none" stroke="#fff" stroke-width="20" stroke-dasharray="1 25" stroke-linecap="round" d="M420 489Q512 574 604 489"/>`,star:`<path fill="none" stroke="#d7a528" stroke-width="10" d="M423 489Q512 566 601 489"/><path fill="#ffd85e" d="M512 516l12 26l29 3l-22 19l7 28l-26-14l-26 14l7-28l-22-19l29-3z"/>`}[look.jewelry]||"";
  const ribbon={pink:"#ff77aa",purple:"#8051c9",rainbow:"url(#gold)"}[look.ribbon];const ribbonSvg=ribbon?`<path fill="${ribbon}" stroke="#fff" stroke-width="7" d="M712 195Q780 140 814 208Q780 267 712 221Q644 267 610 208Q644 140 712 195Z"/><circle fill="#ffd85d" cx="712" cy="208" r="23"/>`:"";
  const medical=look.medical==="stethoscope"?`<path fill="none" stroke="#65449e" stroke-width="17" d="M406 489Q395 699 512 739Q629 699 618 489"/><circle fill="#78d6c0" stroke="#d8b54e" stroke-width="10" cx="512" cy="739" r="38"/>`:look.medical==="gloves"?`<ellipse fill="#8ee0d0" stroke="#fff" stroke-width="8" cx="218" cy="864" rx="52" ry="67"/><ellipse fill="#8ee0d0" stroke="#fff" stroke-width="8" cx="806" cy="864" rx="52" ry="67"/>`:look.medical==="bag"?`<path fill="url(#coral)" stroke="#fff" stroke-width="9" d="M711 873Q798 828 870 884L851 1080Q776 1121 696 1068Z"/><path fill="none" stroke="#e95f7c" stroke-width="20" d="M735 874Q782 785 831 874"/><path fill="#fff" d="M760 941h28v-28h30v28h28v30h-28v28h-30v-28h-28z"/>`:"";
  return `${defs}<g class="dressup-svg">${shoes}${head}${jewelry}${ribbonSvg}${medical}</g>`
}
function renderWardrobe(){ensureStory();const s=gameState(),grid=q("#outfitGrid");grid.replaceChildren();outfits.forEach(o=>{const unlocked=s.stars>=o.stars,b=button("","outfit-card");b.dataset.outfit=o.id;b.classList.toggle("locked",!unlocked);b.classList.toggle("selected",s.story.currentOutfit===o.id);b.innerHTML=`<span aria-hidden="true"></span><b>${unlocked?o.name:"Mystery outfit"}</b><small>${unlocked?"Ready to wear":`${o.stars} stars`}</small>`;b.onclick=()=>{if(!unlocked){api().speak(`${o.stars-s.stars} more stars to unlock this outfit.`);return}s.story.currentOutfit=o.id;api().save();sparkleSound();renderWardrobe()};grid.append(b)});const preview=q("#avatarPreview");preview.textContent="";preview.dataset.outfit=s.story.currentOutfit||"doctor"}

q("#worldButton").onclick=openWorld;q("#worldHomeButton").onclick=()=>api().showScreen("homeScreen");q("#storySpeakButton").onclick=speakChapter;q("#activitySpeakButton").onclick=speakActivity;q("#activityBackButton").onclick=openWorld;q("#nextAdventureButton").onclick=openWorld;q("#replayActivityButton").onclick=()=>startAdventure(activeAdventure.id);q("#wardrobeButton").onclick=()=>{renderWardrobe();renderDressup();q("#wardrobeDialog").showModal()};
