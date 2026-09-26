"use strict";

const adventures=[
  {id:"paw",icon:"🩹",title:"Magical Vet Care",place:"Treatment Room",patient:"🦊",story:"A new magical patient needs a careful checkup.",type:"care",instruction:"Help the patient feel better, one gentle step at a time."},
  {id:"horn",icon:"🦄",title:"Unicorn Horn Repair",place:"Unicorn Stable",patient:"🦄",story:"Nova's horn lost its rainbow rings. Put the colors back in rainbow order.",type:"sequence",instruction:"Tap the colors in rainbow order.",items:["🔴","🟠","🟡","🟢","🔵","🟣"]},
  {id:"potion",icon:"🧪",title:"Potion Mixer",place:"Medicine Room",patient:"🐰",story:"Bramble Bunny needs a gentle giggle potion before his checkup.",type:"mix",instruction:"Add 3 berries and 2 stars.",items:["🍓","⭐"],goal:[3,2]},
  {id:"xray",icon:"🩻",title:"X-Ray Detective",place:"X-Ray Room",patient:"🐲",story:"Pip swallowed some silly treasures. Find what is hiding in his tummy.",type:"find",instruction:"Find the key, button, and tiny bell.",items:["🔑","🔘","🔔","🫧","💜","🌙"]},
  {id:"search",icon:"🔎",title:"Enchanted Search",place:"Enchanted Forest",patient:"🦉",story:"Ollie Owl hid tiny treasures all through the forest.",type:"find",instruction:"Look closely and find the hidden treasures."},
  {id:"forest",icon:"🔍",title:"Forest Sounds",place:"Enchanted Forest",patient:"🦉",story:"Ollie Owl needs something whose name ends with the /g/ sound.",type:"choice",skill:"endingSounds",instruction:"Find the word that ends with /g/.",choices:["🐶 Dog","🐱 Cat","🐝 Bee"],answer:0},
  {id:"words",icon:"🍪",title:"Word Treats",place:"Animal Village",patient:"🐶",story:"Scout will do a happy dance when you choose the spoken word.",type:"choice",skill:"sightWords",instruction:"Find the word “come”.",speech:"Find the word come.",choices:["can","come","look"],answer:1},
  {id:"stable",icon:"🔢",title:"Number Stable",place:"Unicorn Meadow",patient:"🐴",story:"Each pony needs the stall with the number called aloud.",type:"choice",skill:"doubleDigits",instruction:"Find the number seventy-four.",speech:"Find the number seventy four.",choices:["47","64","74"],answer:2},
  {id:"nursery",icon:"🥚",title:"Dragon Egg Nursery",place:"Dragon Nursery",patient:"🐲",story:"Pip needs help counting the eggs and finding which nest has more.",type:"countCompare",skill:"counting",instruction:"Count each nest and choose the one with more eggs."},
  {id:"nests",icon:"🔟",title:"Magic Number Nests",place:"Cloud Hatchery",patient:"🐉",story:"Build a full nest of ten eggs, then add more to make the spoken number.",type:"tenFrame",skill:"teenNumbers",instruction:"Fill ten, then add the extra eggs."},
  {id:"shapes",icon:"🔷",title:"Castle Shape Repair",place:"Princess Castle",patient:"🦄",story:"Nova needs shapes to repair the castle's magical windows.",type:"shapes",skill:"geometry",instruction:"Choose and place the shape that completes the window."},
  {id:"measure",icon:"📏",title:"Magical Measuring Room",place:"Supply Hall",patient:"🦊",story:"Fern is organizing bandages and potion bottles by size.",type:"measure",skill:"measurement",instruction:"Listen and choose the longer, shorter, or fuller item."},
  {id:"sort",icon:"🧺",title:"Animal Supply Sort",place:"Hospital Pantry",patient:"🐰",story:"Bramble mixed up the hospital supplies. Sort everything into the right baskets.",type:"sort",skill:"classification",instruction:"Put each item with its matching group."},
  {id:"letter",icon:"✏️",title:"Letter Skywriting",place:"Princess Castle",patient:"🐱",story:"Follow the glowing stars to write letters in the castle sky.",type:"guidedTrace",skill:"letterFormation",instruction:"Start at the star and follow the glowing letter trail."},
  {id:"number",icon:"🖍️",title:"Number Trails",place:"Treasure Cave",patient:"🐼",story:"Follow the glowing trail to write a number and open the treasure door.",type:"guidedTrace",skill:"numberFormation",instruction:"Start at the star and follow the glowing number trail."},
  {id:"math",icon:"🐇",title:"Bunny Hop Math",place:"Unicorn Meadow",patient:"🐇",story:"Five bunnies are playing. Two hop home. How many stay?",type:"choice",skill:"additionSubtraction",instruction:"5 bunnies take away 2 bunnies. How many are left?",choices:["2","3","7"],answer:1},
  {id:"pattern",icon:"👑",title:"Royal Pattern Parade",place:"Princess Castle",patient:"👸",story:"Finish the parade banner before the royal animals arrive.",type:"choice",skill:"patterns",instruction:"What comes next? ⭐ 🌙 ⭐ 🌙 …",choices:["⭐","🌙","🌈"],answer:0},
  {id:"memory",icon:"🃏",title:"Recovery Room Memory",place:"Recovery Room",patient:"🐨",story:"Find every matching animal pair while the patients rest.",type:"memory",instruction:"Turn over cards and find all 4 pairs."},
  {id:"color",icon:"🎨",title:"Magical Coloring",place:"Art Studio",patient:"🦄",story:"Create a colorful portrait for the hospital gallery.",type:"color",instruction:"Choose colors and paint the unicorn 5 times."}
];

const outfits=[
  {id:"doctor",icon:"👩‍⚕️",name:"Magic Doctor",stars:0},
  {id:"clinicbag",icon:"🩺",name:"Clinic Hero",stars:8},
  {id:"scrubs",icon:"🧑‍⚕️",name:"Sparkle Scrubs",stars:8},
  {id:"mousevet",icon:"🎀",name:"Playful Pet Doctor",stars:24},
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
// Warm the small set of complete-look images while the player explores the map,
// so the picture choices do not appear as empty tiles on first wardrobe open.
let wardrobeArtPreloaded=false;const wardrobeImages=[];
function preloadWardrobeArt(){
  if(wardrobeArtPreloaded)return;wardrobeArtPreloaded=true;
  for(const file of ["annabeth-outfits.png","annabeth-outfits-2.png","annabeth-outfits-3.png","annabeth-complete-clinic-bag-v1.png","annabeth-complete-mouse-vet-v1.png"]){const picture=new Image();picture.src=`assets/${file}`;wardrobeImages.push(picture)}
}

const dressupItems={
  head:[{id:"none",name:"No hat",icon:"✓",stars:0},{id:"mouse",name:"Mouse ears",icon:"●●",stars:8,gems:2},{id:"tiara",name:"Crystal tiara",icon:"♛",stars:18,gems:3},{id:"flowers",name:"Flower crown",icon:"🌼",stars:32},{id:"starcrown",name:"Star crown",icon:"★",stars:48,gems:5},{id:"wizardhat",name:"Moon hat",icon:"☾",stars:64}],
  clothes:[{id:"lavender",name:"Lavender tunic",icon:"▰",stars:0},{id:"doctor",name:"Doctor coat",icon:"✚",stars:8},{id:"scrubs",name:"Mint scrubs",icon:"♥",stars:18},{id:"princess",name:"Royal dress",icon:"♕",stars:32},{id:"forest",name:"Forest vest",icon:"🌿",stars:48},{id:"artist",name:"Art smock",icon:"🎨",stars:72}],
  jewelry:[{id:"none",name:"No jewelry",icon:"✓",stars:0},{id:"heart",name:"Heart necklace",icon:"♥",stars:8},{id:"pearls",name:"Pearl necklace",icon:"○",stars:32,gems:3},{id:"star",name:"Star pendant",icon:"★",stars:56,gems:4}],
  shoes:[{id:"socks",name:"Comfy socks",icon:"🧦",stars:0},{id:"sneakers",name:"Star sneakers",icon:"👟",stars:8},{id:"purple",name:"Purple boots",icon:"👢",stars:18},{id:"gold",name:"Royal boots",icon:"👢",stars:40},{id:"rain",name:"Coral rain boots",icon:"👢",stars:64},{id:"slippers",name:"Unicorn slippers",icon:"🦄",stars:80}],
  ribbon:[{id:"none",name:"No ribbon",icon:"✓",stars:0},{id:"pink",name:"Pink bow",icon:"🎀",stars:8},{id:"purple",name:"Purple bow",icon:"🎀",stars:24},{id:"rainbow",name:"Rainbow ribbon",icon:"🌈",stars:56}],
  medical:[{id:"none",name:"No equipment",icon:"✓",stars:0},{id:"stethoscope",name:"Stethoscope",icon:"🩺",stars:0},{id:"gloves",name:"Magic gloves",icon:"🧤",stars:18,gems:2},{id:"bag",name:"Medical bag",icon:"🧰",stars:40,gems:4}]
};
const dressupCategoryNames={head:"Tiaras & hats",clothes:"Dresses & coats",jewelry:"Jewelry",shoes:"Shoes",ribbon:"Ribbons",medical:"Vet equipment"};
const adventureUnlocks={paw:0,potion:0,search:0,color:0,forest:0,words:0,nursery:0,stable:0,nests:6,horn:8,xray:12,sort:16,letter:20,number:24,math:28,shapes:28,measure:32,pattern:36,memory:44};
const mapStops=[
  {id:"hospital",name:"Animal Hospital",icon:"🏥",x:51,y:47,games:["paw","dentist","sort","measure","potion"]},
  {id:"forest",name:"Enchanted Forest",icon:"🦉",x:20,y:35,games:["search","forest","words","memory"]},
  {id:"studio",name:"Art Studio",icon:"🎨",x:18,y:76,games:["color","tictactoe"]},
  {id:"dragon",name:"Dragon Cave",icon:"🐉",x:89,y:60,games:["nursery","nests","xray","number"]},
  {id:"stable",name:"Unicorn Stable",icon:"🦄",x:84,y:29,games:["horn","stable","math"]},
  {id:"castle",name:"Royal Castle",icon:"👑",x:31,y:15,games:["shapes","letter","pattern"]}
];
const classicMapGames={dentist:{id:"dentist",icon:"🪥",title:"Magic Smile Checkup",play:()=>api().startDentist()},tictactoe:{id:"tictactoe",icon:"⭐",title:"Magic Tic-Tac-Toe",play:()=>api().startTicTacToe()}};
let selectedMapStop=null,mapObserver=null;
function journeyStopIndex(){return Math.min(mapStops.length-1,Math.floor(discoveryCount()/2))}
function sizeMapScene(){
  const viewport=q("#worldMap"),scene=q("#mapScene");if(!viewport||!scene)return;
  const scale=Math.min(viewport.clientWidth/1671,viewport.clientHeight/941);
  scene.style.width=`${Math.floor(1671*scale)}px`;
  scene.style.height=`${Math.floor(941*scale)}px`;
}
function mapGame(id){return adventures.find(item=>item.id===id)||classicMapGames[id]}
function mapGameLocked(id){const s=gameState();return s.stars<(adventureUnlocks[id]||0)&&!s.story.completedActivities.includes(id)}
function renderMap(){
  const current=journeyStopIndex(),done=gameState().story.completedActivities,container=q("#mapStops");
  container.replaceChildren();
  mapStops.forEach((stop,index)=>{
    const visited=stop.games.some(id=>done.includes(id)),marker=button("","map-stop");
    marker.dataset.stop=stop.id;marker.style.left=`${stop.x}%`;marker.style.top=`${stop.y}%`;
    marker.classList.toggle("current",index===current);marker.classList.toggle("reached",index<current);marker.classList.toggle("future",index>current);marker.classList.toggle("visited",visited);
    marker.setAttribute("aria-label",`${stop.name}${index===current?", next stop":""}${visited?", visited":""}. Tap to see games.`);
    marker.innerHTML=`<span class="map-stop-badge" aria-hidden="true">${stop.icon}</span><span class="map-stop-name">${stop.name}</span>${visited?'<span class="map-stop-check" aria-hidden="true">✓</span>':""}${index===current?'<span class="map-stop-sparkle" aria-hidden="true">✦</span>':""}`;
    marker.onclick=()=>openMapStop(stop.id);
    container.append(marker);
  });
  qa(".map-route-leg").forEach((leg,index)=>leg.classList.toggle("traveled",index<current));
  q("#mapProgress").innerHTML=`<span aria-hidden="true">🗺️</span><span>Stop ${current+1} of ${mapStops.length}</span><span class="map-progress-dots" aria-hidden="true">${mapStops.map((_,index)=>`<i class="${index<current?"traveled":index===current?"current":""}"></i>`).join("")}</span>`;
  sizeMapScene();
  if(!mapObserver&&window.ResizeObserver){mapObserver=new ResizeObserver(sizeMapScene);mapObserver.observe(q("#worldMap"))}
  if(selectedMapStop)openMapStop(selectedMapStop,false);
}
function openMapStop(id,announce=true){
  const stop=mapStops.find(item=>item.id===id);if(!stop)return;
  selectedMapStop=id;
  const panel=q("#mapStopPanel"),done=gameState().story.completedActivities;
  panel.replaceChildren();panel.hidden=false;
  const head=document.createElement("div");head.className="map-panel-head";
  head.innerHTML=`<span class="map-panel-icon" aria-hidden="true">${stop.icon}</span><div><small>Choose an adventure</small><strong>${stop.name}</strong></div>`;
  const close=button("×","map-panel-close");close.setAttribute("aria-label","Close place games");close.onclick=closeMapStop;head.append(close);panel.append(head);
  const list=document.createElement("div");list.className="map-panel-games";
  stop.games.forEach(id=>{
    const game=mapGame(id),locked=mapGameLocked(id),tile=button("","map-panel-game");
    tile.dataset.game=id;tile.classList.toggle("locked",locked);tile.classList.toggle("completed",done.includes(id));
    tile.setAttribute("aria-label",locked?`${game.title}, unlocks at ${adventureUnlocks[id]} stars`:`Play ${game.title}${done.includes(id)?" again":""}`);
    tile.innerHTML=`<span class="map-game-icon" aria-hidden="true">${game.icon}</span><strong>${game.title}</strong><small>${locked?`🔒 ⭐ ${adventureUnlocks[id]}`:done.includes(id)?"✓ Play again":"▶ Play"}</small>`;
    tile.onclick=()=>{if(locked){gentleSound();api().speak(`${adventureUnlocks[id]-gameState().stars} more stars will unlock ${game.title}.`,{recordedOnly:true});return}closeMapStop();if(classicMapGames[id])classicMapGames[id].play();else startAdventure(id)};
    list.append(tile);
  });
  panel.append(list);
  qa(".map-stop").forEach(marker=>marker.classList.toggle("selected",marker.dataset.stop===id));
  if(announce)gentleSound();
}
function closeMapStop(){selectedMapStop=null;q("#mapStopPanel").hidden=true;qa(".map-stop.selected").forEach(marker=>marker.classList.remove("selected"))}

const challengeVariants={
  forest:[
    {skill:"endingSounds",focus:"g",story:"Ollie Owl needs something whose name ends with the /g/ sound.",instruction:"Listen for the last sound: /g/.",choices:["🐶 Dog","🐱 Cat","🐝 Bee"],answer:0},
    {skill:"middleSounds",focus:"short i",story:"Ollie heard a short i hiding in the middle.",instruction:"Listen for the middle sound: short i.",choices:["🐷 Pig","🚌 Bus","🎂 Cake"],answer:0},
    {skill:"endingSounds",focus:"n",story:"A tiny sound is hiding at the end of one word.",instruction:"Listen for the last sound: /n/.",choices:["☀️ Sun","🐟 Fish","🐶 Dog"],answer:0},
    {skill:"middleSounds",focus:"short o",story:"Ollie heard a short o hiding in the middle of a forest word.",instruction:"Listen for the middle sound: short o.",choices:["🦊 Fox","🪁 Kite","🐝 Bee"],answer:0},
    {skill:"endingSounds",focus:"p",story:"Ollie is listening for the last sound in a forest word.",instruction:"Listen for the last sound: /p/.",choices:["🐑 Sheep","🐱 Cat","🌙 Moon"],answer:0},
    {skill:"middleSounds",focus:"short a",story:"Ollie heard a short a in the middle.",instruction:"Listen for the middle sound: short a.",choices:["🐱 Cat","🐷 Pig","🚌 Bus"],answer:0}
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
  otoscope:{icon:"🔦",name:"otoscope",prompt:"Look gently inside the ear",action:"👂",reps:4},
  magnifier:{icon:"🔍",name:"magnifier",prompt:"Look very closely",action:"🔎",reps:4}, flashlight:{icon:"🔦",name:"flashlight",prompt:"Shine the little light",action:"💡",reps:4},
  tweezers:{icon:"✧",name:"star tweezers",prompt:"Lift out the tiny prickles",action:"✦",reps:5}, cleanser:{icon:"🧽",name:"cleaning sponge",prompt:"Wipe the sore spot",action:"🫧",reps:5},
  bandage:{icon:"🩹",name:"soft bandage",prompt:"Cover it softly",action:"🩹",reps:4}, swab:{icon:"☁️",name:"cotton puff",prompt:"Clean very gently",action:"☁️",reps:4},
  drops:{icon:"💧",name:"magic drops",prompt:"Add the soothing drops",action:"💧",reps:4}, brush:{icon:"🪮",name:"soft brush",prompt:"Brush slowly",action:"✨",reps:6},
  potion:{icon:"🧪",name:"medicine potion",prompt:"Give little sips",action:"💜",reps:3},
  prep:{icon:"☁️",name:"cotton puff",prompt:"Clean very gently",action:"☁️",reps:4},
  syringe:{icon:"💉",art:"syringe.png",name:"vet's medicine shot",prompt:"Move the shot to the glowing spot. Then hold the pink plunger",action:"💉",reps:1},
  stitches:{icon:"🪡",name:"stitching tool",prompt:"Guide the thread across the little cut",action:"🪡",reps:3},
  hoofbrush:{icon:"🪮",name:"hoof brush",prompt:"Brush the dusty hoof",action:"🪮",reps:6},
  coolpack:{icon:"❄️",name:"soft cool pack",prompt:"Hold the cool pack gently on the tired hoof",action:"❄️",reps:4},
  wash:{icon:"🧼",name:"gentle wash",prompt:"Wash away the dirt",action:"🫧",reps:6}, cream:{icon:"🫙",name:"healing cream",prompt:"Dab on the cream",action:"✨",reps:5},
  mist:{icon:"🌫️",name:"cooling mist",prompt:"Spray the cooling mist",action:"💨",reps:5}, scanner:{icon:"🔮",name:"magic scanner",prompt:"Scan the magical glow",action:"✦",reps:5},
  polish:{icon:"🧽",name:"soft polisher",prompt:"Polish in little circles",action:"✨",reps:7}, crystal:{icon:"💎",name:"healing crystal",prompt:"Place the rainbow crystals",action:"💎",reps:4},
  wrap:{icon:"🎗️",name:"support wrap",prompt:"Wrap the tired hoof",action:"🎗️",reps:5}, spray:{icon:"🧴",name:"detangling spray",prompt:"Spritz the tangled fur",action:"💦",reps:4},
  ribbon:{icon:"🎀",name:"comfort ribbon",prompt:"Tie the finishing ribbon",action:"🎀",reps:3}, mirror:{icon:"🪞",name:"dental mirror",prompt:"Check every little tooth",action:"✦",reps:5},
  toothbrush:{icon:"🪥",name:"toothbrush",prompt:"Brush in gentle circles",action:"🫧",reps:7}, toothpaste:{icon:"🪥",name:"sparkle paste",prompt:"Add tiny dabs of paste",action:"✨",reps:4},
  rinse:{icon:"💦",name:"magic rinse",prompt:"Rinse away the bubbles",action:"💦",reps:4}
};
const careCases=[
  {animal:"fox",row:0,name:"Fern",ailment:"Prickly Paw",intro:"Fern found prickles on her paw. Let's help her feel comfortable again.",plan:["magnifier","tweezers","cleanser","bandage"]},
  {animal:"fox",row:0,name:"Fern",ailment:"Itchy Ear",intro:"Fern keeps shaking one ear. Let's find out why it feels itchy.",plan:["otoscope","swab","drops","brush"]},
  {animal:"bunny",row:1,name:"Bramble",ailment:"Rumbly Tummy",intro:"Bramble needs a checkup. The vet has chosen medicine to help him feel better. Only a grown-up vet gives real shots.",spokenIntro:"Bramble's tummy is making funny rumbles. Let's give him a careful checkup.",plan:["stethoscope","thermometer","prep","syringe"]},
  {animal:"bunny",row:1,name:"Bramble",ailment:"Muddy Paw",intro:"Bramble slipped into a muddy puddle and his paw needs gentle care.",plan:["magnifier","wash","cream","bandage"]},
  {animal:"dragon",row:2,name:"Pip",ailment:"Smoky Sneezes",intro:"Every time Pip sneezes, a tiny smoke cloud pops out. Let's cool it down.",plan:["thermometer","stethoscope","mist","potion"]},
  {animal:"dragon",row:2,name:"Pip",ailment:"Scraped Scale",intro:"Pip bumped one shiny scale while practicing his flying.",plan:["magnifier","wash","stitches","bandage"]},
  {animal:"unicorn",row:3,name:"Nova",ailment:"Dim Horn",intro:"Nova's horn has lost its rainbow sparkle. Let's restore the magic.",plan:["scanner","polish","crystal","ribbon"]},
  {animal:"unicorn",row:3,name:"Nova",ailment:"Tired Hoof",intro:"Nova danced all morning and one hoof feels tired.",plan:["magnifier","hoofbrush","coolpack","wrap"]},
  {animal:"fox",row:0,name:"Fern",ailment:"Tangled Tail",intro:"The wind tangled leaves into Fern's fluffy tail.",plan:["magnifier","spray","brush","ribbon"]},
  {animal:"bunny",row:1,name:"Bramble",ailment:"Sugar-Bug Tooth",intro:"Little sugar bugs are hiding in Bramble's mouth. Let's brush them away.",spokenIntro:"Help the patient feel better, one gentle step at a time.",plan:["mirror","toothbrush","toothpaste","rinse"]}
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
function discoveryCount(){return gameState().story.completedActivities.filter(id=>adventures.some(a=>a.id===id)||id==="dentist"||id==="tictactoe").length}
let lastNarratedChapter=0;
function openWorld(){ensureStory();closeMapStop();api().showScreen("worldScreen");renderWorld();updateStoryPictures();appendClassicGames();renderMap();preloadWardrobeArt();q("#collectionCount").textContent=`${discoveryCount()} of ${adventures.length+2} discovered`;if(currentChapter()!==lastNarratedChapter){lastNarratedChapter=currentChapter();speakChapter()}}
function currentChapter(){return Math.min(4,1+Math.floor(discoveryCount()/4))}
function speakChapter(){api().speak(chapterNarration[currentChapter()-1],{recordedOnly:true});api().speak(`The glowing place on the map is ${mapStops[journeyStopIndex()].name}. Tap any place to choose an adventure.`,{recordedOnly:true})}
function updateStoryPictures(){const chapter=currentChapter(),s=gameState(),done=s.story.completedActivities,cards=qa(".activity-card[data-game]");q("#storyProblem").textContent=chapterPictures[chapter-1][0];q("#storyGoal").textContent=chapterPictures[chapter-1][1];q("#storyText").textContent=["Help three friends!","Find the rainbow!","Get ready to celebrate!","Choose a friend to help!"][chapter-1];cards.forEach(card=>{const adventure=adventures.find(item=>item.id===card.dataset.game);if(!adventure)return;const needed=adventureUnlocks[adventure.id]||0,locked=s.stars<needed&&!done.includes(adventure.id);card.classList.toggle("locked",locked);card.setAttribute("aria-label",locked?`${adventure.title}, unlocks at ${needed} stars`:`${adventure.title}, ${adventure.place}`);if(locked){const lock=document.createElement("span");lock.className="activity-lock";lock.textContent="🔒";card.append(lock);card.onclick=()=>{gentleSound();api().speak(`${needed-s.stars} more stars will unlock ${adventure.title}. Try another adventure first.`,{recordedOnly:true})}}});const recommended=cards.find(card=>!card.classList.contains("locked")&&!done.includes(card.dataset.game))||cards.find(card=>!card.classList.contains("locked"));if(recommended){recommended.classList.add("recommended");recommended.setAttribute("aria-label",`Suggested next: ${recommended.getAttribute("aria-label")}`)}}
function appendClassicGames(){const carousel=q("#activityCarousel"),done=gameState().story.completedActivities;[{id:"dentist",icon:"🪥",title:"Magic Smile Checkup",place:"Dental Room",play:()=>api().startDentist()},{id:"tictactoe",icon:"⭐",title:"Magic Tic-Tac-Toe",place:"Puzzle Garden",play:()=>api().startTicTacToe()}].forEach(game=>{const card=button("","activity-card classic-card");card.dataset.game=game.id;card.classList.toggle("completed",done.includes(game.id));card.setAttribute("aria-label",`${game.title}, ${game.place}`);card.innerHTML=`<span class="game-icon">${game.icon}</span><strong>${game.title}</strong><small>${game.place}</small>`;card.onclick=game.play;carousel.append(card)})}
function renderWorld(){ensureStory();const s=gameState(),done=s.story.completedActivities; q("#worldStars").textContent=s.stars;q("#collectionCount").textContent=`${discoveryCount()} of ${adventures.length+2} discovered`;const chapter=currentChapter();q("#chapterNumber").textContent=chapter;q("#chapterTitle").textContent=["The Hospital Opens","The Missing Rainbow","The Royal Animal Parade","Guardian of the Kingdom"][chapter-1];q("#storyPatient").textContent=mapStops[journeyStopIndex()].icon;q("#storyText").textContent=["The hospital is opening! Help three magical patients get ready for the royal parade.","Nova's rainbow magic has scattered across the kingdom. Every patient holds a clue!","The royal parade begins soon. Help the animals prepare their songs, patterns, and costumes.","The whole kingdom trusts Dr. Annabeth. Explore freely and help old friends whenever you like!"][chapter-1];const c=q("#activityCarousel");c.replaceChildren();
  const ordered=[...adventures].sort((x,y)=>{
    const rank=item=>{const locked=s.stars<(adventureUnlocks[item.id]||0)&&!done.includes(item.id);return locked?3:done.includes(item.id)?2:mapStops[journeyStopIndex()].games.includes(item.id)?0:1};
    return rank(x)-rank(y);
  });
  ordered.forEach(a=>{const b=document.createElement("button");b.className=`activity-card ${done.includes(a.id)?"completed":""}`;b.dataset.game=a.id;b.innerHTML=`<span class="game-icon">${a.icon}</span><strong>${a.title}</strong><small>${a.place}</small>`;b.onclick=()=>startAdventure(a.id);c.append(b)});}

function startAdventure(id,options={}){const base=adventures.find(a=>a.id===id),variants=challengeVariants[id],variant=variants&&variants[Math.floor(Math.random()*variants.length)];activeAdventure={...base,...variant};if(id==="paw")activeAdventure.careCase=options.careCase||nextCareCase();activityRound=0;actionCount=0;sequenceIndex=0;mixCounts=[0,0];rhythmInput=[];tracePoints=0;paintCount=0;memoryOpen=[];memoryMatched=0;activityNarration="";api().showScreen("activityScreen");q("#activityScreen").classList.toggle("coloring-mode",id==="color");q("#activityScreen").classList.toggle("care-mode",id==="paw");q("#activityTitle").textContent=activeAdventure.careCase?`${activeAdventure.careCase.name}'s ${activeAdventure.careCase.ailment}`:activeAdventure.title;q("#activityLocation").textContent=activeAdventure.place;q("#activityPatient").textContent=activeAdventure.patient;q("#activityAction").textContent=activeAdventure.icon;q("#activityStory").textContent=activeAdventure.careCase?.intro||activeAdventure.story;q("#activityInstruction").textContent=activeAdventure.instruction;q("#activityFeedback").textContent="";q("#activityStars").textContent=gameState().stars;renderActivityAvatar();q("#activitySpeakButton").classList.toggle("needs-listening",activeAdventure.type==="choice"||activeAdventure.type==="mix");renderActivity();if(!["countCompare","tenFrame","shapes","measure","sort","guidedTrace"].includes(activeAdventure.type))setTimeout(()=>activeAdventure.careCase?api().speak(activeAdventure.careCase.spokenIntro||activeAdventure.careCase.intro,{recordedOnly:true}):speakActivity(),250)}
function nextCareCase(){
  ensureStory();
  const s=gameState(),story=s.story;
  story.careHistory=Array.isArray(story.careHistory)?story.careHistory.filter(i=>Number.isInteger(i)&&i>=0&&i<careCases.length):[];
  const recent=Array.isArray(story.careRecent)?story.careRecent.filter(i=>Number.isInteger(i)&&i>=0&&i<careCases.length).slice(-2):story.careHistory.slice(-2);
  let available=careCases.map((_,i)=>i).filter(i=>!story.careHistory.includes(i));
  if(!available.length){story.careHistory=[];available=careCases.map((_,i)=>i)}
  const similarity=(candidate,previous)=>{
    const a=careCases[candidate],b=careCases[previous];
    const shared=a.plan.filter(tool=>b.plan.includes(tool)).length;
    return shared*2+(a.plan[0]===b.plan[0]?4:0)+(a.plan.join()===b.plan.join()?8:0)+(a.animal===b.animal?2:0);
  };
  const score=index=>recent.reduce((total,prior,age)=>total+similarity(index,prior)*(age===recent.length-1?2:1),0);
  const lowest=Math.min(...available.map(score));
  const varied=available.filter(index=>score(index)===lowest);
  const index=varied[Math.floor(Math.random()*varied.length)];
  story.careHistory.push(index);
  story.careRecent=[...recent,index].slice(-2);
  api().save();
  return careCases[index];
}
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
function narrate(text){activityNarration=text;api().speak(text,{recordedOnly:true})}
function speakActivity(){api().speak(activeAdventure?.careCase?.spokenIntro||activityNarration||learningSpeech(activeAdventure),{interrupt:true,recordedOnly:true})}
function area(){const el=q("#activityPlayArea");el.replaceChildren();el.dataset.game=activeAdventure.id;return el}
function button(text,cls="play-target"){const b=document.createElement("button");b.type="button";b.className=cls;b.textContent=text;return b}
let soundContext=null;
function tone(frequency,duration=.12,type="sine",delay=0){if(!gameState()?.sound)return;try{soundContext=soundContext||new AudioContext();const oscillator=soundContext.createOscillator(),gain=soundContext.createGain(),start=soundContext.currentTime+delay;oscillator.type=type;oscillator.frequency.setValueAtTime(frequency,start);gain.gain.setValueAtTime(.0001,start);gain.gain.exponentialRampToValueAtTime(.12,start+.015);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);oscillator.connect(gain).connect(soundContext.destination);oscillator.start(start);oscillator.stop(start+duration+.02)}catch{}}
window.addEventListener("hospital-sound-change",()=>{if(!gameState()?.sound&&soundContext){soundContext.close().catch(()=>{});soundContext=null}});
function sparkleSound(){tone(523,.12);tone(659,.12,"sine",.09);tone(784,.18,"sine",.18)}
function gentleSound(){tone(330,.11,"sine");tone(294,.16,"sine",.1)}
function good(message="Wonderful work!"){q("#activityFeedback").textContent=message;sparkleSound();api().speak(message,{recordedOnly:true})}
function tryAgain(el){el.classList.remove("nudge");void el.offsetWidth;el.classList.add("nudge");gentleSound()}

// Permanent plates and calibrated treatment locations. Only overlay art changes during care.
const careBaseArt={
  "Prickly Paw":"base-prickly-paw.png","Itchy Ear":"base-itchy-ear.png",
  "Rumbly Tummy":"base-rumbly-tummy.png","Muddy Paw":"base-muddy-paw.png",
  "Smoky Sneezes":"base-smoky-sneezes.png","Scraped Scale":"base-scraped-scale.png",
  "Dim Horn":"base-dim-horn.png","Tired Hoof":"base-tired-hoof.png",
  "Tangled Tail":"base-tangled-tail.png","Sugar-Bug Tooth":"base-sugar-bug-tooth.png"
};
const careTargets={
  "Prickly Paw":{x:52,y:61},"Itchy Ear":{x:77,y:29},
  "Rumbly Tummy":{x:50,y:65},"Muddy Paw":{x:50,y:58},
  "Smoky Sneezes":{x:47,y:50},"Scraped Scale":{x:49,y:53},
  "Dim Horn":{x:50,y:18},"Tired Hoof":{x:50,y:67},
  "Tangled Tail":{x:59,y:73},"Sugar-Bug Tooth":{x:50,y:49}
};
// The examination reveals the actual condition, not three unrelated sparkles.
const magnifierEvidence={
  "Prickly Paw":"prickle-burr.png",
  "Muddy Paw":"dirt-smear.png",
  "Scraped Scale":"discomfort-squiggle.png",
  "Tired Hoof":"discomfort-squiggle.png",
  "Tangled Tail":"tangle-leaf.png"
};
// Progress on these tools resolves only their own condition; examinations never heal.
const careConditions={
  "Prickly Paw":[{art:"dirt-smear.png",tool:"cleanser",width:38,height:20}],
  "Itchy Ear":[],
  "Rumbly Tummy":[{art:"discomfort-squiggle.png",tool:"syringe",width:24,height:12}],
  "Muddy Paw":[{art:"dirt-smear.png",tool:"wash",width:46,height:28},{art:"discomfort-squiggle.png",tool:"cream",width:22,height:12}],
  "Smoky Sneezes":[{art:"smoke-puff.png",tool:"mist",width:36,height:24}],
  "Scraped Scale":[{art:"dirt-smear.png",tool:"wash",width:40,height:22},{art:"discomfort-squiggle.png",tool:"stitches",width:24,height:12}],
  "Dim Horn":[{art:"horn-shine.png",tool:"polish",width:100,height:100,inverse:true}],
  "Tired Hoof":[{art:"dirt-smear.png",tool:"hoofbrush",width:40,height:20},{art:"discomfort-squiggle.png",tool:"coolpack",width:24,height:12}],
  "Tangled Tail":[{art:"tangle-leaf.png",tool:"brush",width:23,height:16,dx:-10,dy:-6},{art:"tangle-leaf.png",tool:"brush",width:23,height:16,dx:10,dy:7}],
  "Sugar-Bug Tooth":[[-9,0],[6,0],[-5,7],[9,7]].map(([dx,dy])=>({art:"bug-plaque.png",tool:"toothbrush",width:7,height:5.5,dx,dy,local:true}))
};
// Each tool gets a gesture family that matches how it is actually used, instead of one generic rub-the-screen motion.
const toolFamily={stethoscope:"holdStill",thermometer:"holdStill",coolpack:"holdStill",otoscope:"inspectDetail",flashlight:"inspectDetail",mirror:"inspectDetail",magnifier:"inspectDetail",scanner:"inspectDetail",tweezers:"tapDebris",swab:"wipeDebris",cleanser:"wipeScrub",wash:"wipeScrub",hoofbrush:"wipeScrub",brush:"wipeScrub",toothbrush:"wipeScrub",polish:"wipeScrub",rinse:"wipeScrub",drops:"earDrops",cream:"dabSpots",toothpaste:"dabSpots",mist:"surfaceSpray",spray:"surfaceSpray",potion:"sip",bandage:"placeItem",blanket:"placeItem",wrap:"placeItem",ribbon:"placeItem",crystal:"placeItem",stitches:"stitch"};
toolFamily.prep="wipeScrub";toolFamily.syringe="injection";toolFamily.rinse="sprayMouth";
const clampPct=v=>Math.min(92,Math.max(8,v));
const dentalMirrorSvg='<svg class="dental-mirror-svg" viewBox="0 0 120 120" aria-hidden="true"><path d="M44 43 101 109" fill="none" stroke="#5c6b85" stroke-width="9" stroke-linecap="round"/><path d="M44 43 101 109" fill="none" stroke="#d2e0eb" stroke-width="4" stroke-linecap="round"/><path d="M48 48 57 58" fill="none" stroke="#fff" stroke-width="3"/><ellipse cx="34" cy="32" rx="18" ry="15" transform="rotate(-20 34 32)" fill="#dcebf2" stroke="#5c6b85" stroke-width="6"/><path d="M24 27 Q32 19 41 25" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>';
const clinicToolSvg={
  stethoscope:'<svg class="clinic-tool-svg stethoscope-svg" viewBox="0 0 100 100" aria-hidden="true"><path class="stethoscope-yoke" d="M27 16 C27 32 32 41 49 49 M73 16 C73 32 68 41 51 49" fill="none" stroke="#40536c" stroke-width="8" stroke-linecap="round"/><path d="M27 16 C27 32 32 41 49 49 M73 16 C73 32 68 41 51 49" fill="none" stroke="#c9dee8" stroke-width="4" stroke-linecap="round"/><path class="stethoscope-earpieces" d="M21 10 Q27 6 32 11 L32 19 Q27 22 22 18 Z M68 11 Q73 6 79 10 L78 18 Q73 22 68 19 Z" fill="#f4f8fa" stroke="#40536c" stroke-width="3"/><circle cx="50" cy="49" r="6" fill="#70889b" stroke="#40536c" stroke-width="2"/><path class="stethoscope-tube" d="M50 54 C51 67 34 73 39 84 C44 96 66 94 72 82 L74 66" fill="none" stroke="#334866" stroke-width="9" stroke-linecap="round"/><path d="M50 54 C51 67 34 73 39 84 C44 96 66 94 72 82 L74 66" fill="none" stroke="#798cab" stroke-width="4" stroke-linecap="round"/><rect x="68" y="57" width="12" height="14" rx="4" fill="#c9dee8" stroke="#40536c" stroke-width="3"/><circle class="stethoscope-diaphragm" cx="74" cy="76" r="15" fill="#f4f8fa" stroke="#40536c" stroke-width="4"/><circle cx="74" cy="76" r="9" fill="#65c8d0" stroke="#477b91" stroke-width="2"/><circle cx="71" cy="73" r="2" fill="#e6ffff"/></svg>',
  thermometer:'<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(35 50 50)"><rect x="39" y="9" width="22" height="67" rx="11" fill="#edfaff" stroke="#6e6795" stroke-width="5"/><circle cx="50" cy="77" r="13" fill="#f49ab6" stroke="#6e6795" stroke-width="5"/><path d="M50 29 V72" stroke="#ed789f" stroke-width="6" stroke-linecap="round"/><path d="M59 30 H65 M59 40 H65 M59 50 H65" stroke="#6e6795" stroke-width="3" stroke-linecap="round"/></g></svg>',
  brush:'<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><path d="M47 47 81 87" stroke="#76548f" stroke-width="18" stroke-linecap="round"/><path d="M47 47 81 87" stroke="#d4b5dd" stroke-width="10" stroke-linecap="round"/><ellipse cx="34" cy="35" rx="25" ry="20" transform="rotate(-35 34 35)" fill="#ae83bd" stroke="#684885" stroke-width="5"/><path d="M16 24 12 10 M24 19 23 5 M33 16 36 3 M42 18 49 5 M50 23 60 11 M14 39 3 37 M18 48 8 54 M28 53 24 65 M41 52 45 64 M51 45 63 50" stroke="#efe0f6" stroke-width="5" stroke-linecap="round"/></svg>',
  cleanser:'<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><rect x="13" y="25" width="74" height="54" rx="17" fill="#f9de83" stroke="#b58545" stroke-width="5"/><path d="M18 49 Q47 59 82 45" fill="none" stroke="#fff5be" stroke-width="7"/><circle cx="28" cy="38" r="3" fill="#d5a654"/><circle cx="65" cy="65" r="4" fill="#d5a654"/><circle cx="43" cy="67" r="3" fill="#d5a654"/></svg>',
  wash:'<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><rect x="11" y="29" width="78" height="49" rx="18" fill="#f4c9e1" stroke="#af78a2" stroke-width="5"/><path d="M24 46 Q47 37 75 46" fill="none" stroke="#fff3f9" stroke-width="7" stroke-linecap="round"/><circle cx="21" cy="20" r="6" fill="#e7f9ff" stroke="#9bd9e9" stroke-width="2"/><circle cx="42" cy="14" r="4" fill="#e7f9ff"/><circle cx="72" cy="21" r="7" fill="#e7f9ff" stroke="#9bd9e9" stroke-width="2"/></svg>',
  prep:'<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><path d="M20 46 Q12 37 21 29 Q24 18 36 22 Q43 14 52 20 Q63 13 70 25 Q83 25 83 38 Q93 47 83 56 Q88 68 75 73 Q70 84 57 78 Q47 86 38 78 Q26 82 23 70 Q12 65 20 54Z" fill="#faf9f5" stroke="#d9d5dc" stroke-width="3"/><path d="M29 43 Q46 30 68 39 M30 59 Q52 68 72 55" fill="none" stroke="#ebe9e9" stroke-width="5" stroke-linecap="round"/></svg>'
};
clinicToolSvg.swab=clinicToolSvg.prep;
clinicToolSvg.hoofbrush='<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><path d="M47 45 79 83" stroke="#74518b" stroke-width="17" stroke-linecap="round"/><path d="M47 45 79 83" stroke="#d8b8df" stroke-width="8" stroke-linecap="round"/><rect x="15" y="20" width="49" height="39" rx="13" transform="rotate(-38 39 39)" fill="#eec579" stroke="#8b6e56" stroke-width="5"/><path d="M17 42 11 50 M25 50 19 61 M34 55 31 68 M44 57 45 68 M53 52 58 63" stroke="#f5e7c2" stroke-width="7" stroke-linecap="round"/></svg>';
clinicToolSvg.coolpack='<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><rect x="10" y="22" width="80" height="58" rx="16" fill="#95dce8" stroke="#527b9d" stroke-width="5"/><rect x="17" y="28" width="66" height="46" rx="11" fill="#c7f3f6" stroke="#e8ffff" stroke-width="3"/><path d="M50 35v32M34 51h32M39 40l22 22m0-22L39 62" stroke="#65b7d8" stroke-width="4" stroke-linecap="round"/><path d="M15 32 Q19 26 25 27" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>';
clinicToolSvg.scanner='<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><path d="M33 74 64 29" fill="none" stroke="#5d528b" stroke-width="22" stroke-linecap="round"/><path d="M33 74 64 29" fill="none" stroke="#a8bce5" stroke-width="12" stroke-linecap="round"/><path d="M55 35 69 16 82 25 67 43Z" fill="#7be7e2" stroke="#5d528b" stroke-width="4"/><path d="M20 87 32 70" fill="none" stroke="#7b5da5" stroke-width="13" stroke-linecap="round"/><circle cx="43" cy="57" r="4" fill="#ffdf72"/></svg>';
// Clear, full-size kit silhouettes; tools never rely on emoji presentation.
clinicToolSvg.magnifier=`<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><circle cx="39" cy="38" r="25" fill="#bdeaf3" stroke="#ad812e" stroke-width="8"/><circle cx="39" cy="38" r="20" fill="#d7f5fb" stroke="#fff8d4" stroke-width="3"/><path d="M56 56 85 87" fill="none" stroke="#76519f" stroke-width="14" stroke-linecap="round"/><path d="M58 57 84 84" fill="none" stroke="#bfa4d9" stroke-width="6" stroke-linecap="round"/><path d="M25 29 Q35 18 48 25" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>`;
clinicToolSvg.flashlight=`<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(-35 50 50)"><path d="M7 38 22 43 V57 L7 62" fill="#fff1b0" opacity=".75"/><rect x="20" y="35" width="13" height="30" rx="3" fill="#d5e0e8" stroke="#53627c" stroke-width="4"/><rect x="31" y="39" width="54" height="22" rx="9" fill="#7889a7" stroke="#495b7c" stroke-width="4"/><path d="M39 42 H69" stroke="#d7e5ef" stroke-width="5" stroke-linecap="round"/><path d="M76 42 V58" stroke="#596a88" stroke-width="4"/><circle cx="23" cy="50" r="5" fill="#fff7c7"/></g></svg>`;
clinicToolSvg.otoscope=`<svg class="clinic-tool-svg otoscope-svg" viewBox="0 0 100 100" aria-hidden="true"><path d="M39 40 H61 V83 Q61 91 50 91 Q39 91 39 83Z" fill="#7e68a3" stroke="#4d486f" stroke-width="5"/><path d="M44 54 H56 M44 65 H56" stroke="#c7c0e0" stroke-width="5" stroke-linecap="round"/><circle cx="50" cy="31" r="23" fill="#dbe8f1" stroke="#4d486f" stroke-width="6"/><circle cx="50" cy="31" r="13" fill="#f5edb4" stroke="#8492a7" stroke-width="4"/><circle cx="50" cy="31" r="6" fill="#e4af69"/><path d="M49 6 H75 L91 18 L75 30 H70" fill="#b8c4d5" stroke="#4d486f" stroke-width="5" stroke-linejoin="round"/><path d="M74 11 87 18 74 25" fill="#e9e7d9"/><circle cx="50" cy="79" r="4" fill="#95e2d4"/></svg>`;
clinicToolSvg.stitches=`<svg class="clinic-tool-svg stitcher-svg" viewBox="0 0 100 100" aria-hidden="true"><path d="M58 13 76 27 43 70" fill="none" stroke="#54627d" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/><path d="M58 13 76 27 43 70" fill="none" stroke="#cbd8e8" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><path d="M43 70 Q34 80 27 72 Q21 63 30 56" fill="none" stroke="#8a90a8" stroke-width="5" stroke-linecap="round"/><path d="M29 56 Q10 44 16 31 Q25 20 35 31 Q38 43 24 47" fill="none" stroke="#74c7c0" stroke-width="4" stroke-linecap="round"/><circle cx="28" cy="59" r="4" fill="#8a90a8"/></svg>`;
clinicToolSvg.tweezers=`<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><path d="M43 13 Q50 9 57 13 L64 79 Q66 87 74 90 M43 13 36 79 Q34 87 26 90" fill="none" stroke="#6d579c" stroke-width="12" stroke-linecap="round"/><path d="M43 18 38 77 M57 18 62 77" fill="none" stroke="#c9b9ef" stroke-width="6" stroke-linecap="round"/><path d="M23 88 31 91 M69 91 77 88" stroke="#e9f5f5" stroke-width="8" stroke-linecap="round"/><circle cx="50" cy="17" r="6" fill="#f8faff" stroke="#6d579c" stroke-width="3"/></svg>`;
clinicToolSvg.toothbrush=`<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(-40 50 50)"><rect x="43" y="30" width="14" height="60" rx="7" fill="#f66c9f" stroke="#aa4c77" stroke-width="3"/><path d="M48 43 V78" stroke="#ffd2df" stroke-width="4" stroke-linecap="round"/><rect x="35" y="13" width="30" height="27" rx="7" fill="#fff" stroke="#aa4c77" stroke-width="3"/><path d="M39 16 V28 M45 16 V28 M51 16 V28 M57 16 V28 M63 16 V28" stroke="#8bd9e5" stroke-width="4" stroke-linecap="round"/></g></svg>`;
clinicToolSvg.drops=`<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="12" rx="13" ry="9" fill="#8461ad" stroke="#5b4685" stroke-width="3"/><path d="M45 20 H55 V41 H45Z" fill="#eefaff" stroke="#5b4685" stroke-width="3"/><rect x="28" y="37" width="44" height="48" rx="12" fill="#d8f6ff" stroke="#5b4685" stroke-width="5"/><path d="M33 60 Q50 54 67 60 V72 Q67 80 60 80 H40 Q33 80 33 72Z" fill="#73cbdf"/><path d="M50 26 V55" stroke="#eefaff" stroke-width="4" stroke-linecap="round"/><path d="M50 88 Q43 96 50 99 Q57 96 50 88Z" fill="#63c6e3"/><path d="M36 47 H43" stroke="#fff" stroke-width="4" stroke-linecap="round"/></svg>`;
clinicToolSvg.cream=`<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(18 50 50)"><path d="M30 11 H70 L65 64 Q62 72 57 73 H43 Q38 72 35 64Z" fill="#fff9e9" stroke="#765a96" stroke-width="4" stroke-linejoin="round"/><path d="M31 14 H69 M33 21 H67" stroke="#f0a5c6" stroke-width="5"/><path d="M41 45 H59" stroke="#e7add0" stroke-width="5" stroke-linecap="round"/><path d="M50 30 Q41 42 50 48 Q59 42 50 30Z" fill="#7acbb9"/><rect x="41" y="70" width="18" height="15" rx="3" fill="#d8cfe9" stroke="#765a96" stroke-width="4"/><path d="M42 85 H58" stroke="#fff" stroke-width="3"/></g></svg>`;
clinicToolSvg.toothpaste=`<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><g transform="rotate(-25 50 50)"><path d="M29 11 H71 L64 66 Q61 73 57 74 H43 Q39 73 36 66Z" fill="#fff9fb" stroke="#6b538d" stroke-width="4" stroke-linejoin="round"/><path d="M30 14 H70 M32 21 H68" stroke="#e988b4" stroke-width="5"/><path d="M40 41 H60 M43 50 H57" stroke="#83d5d5" stroke-width="5" stroke-linecap="round"/><path d="M50 29 53 35 60 36 55 41 56 48 50 45 44 48 45 41 40 36 47 35Z" fill="#f5b4d1"/><rect x="41" y="71" width="18" height="15" rx="3" fill="#efeaf6" stroke="#6b538d" stroke-width="4"/></g></svg>`;
clinicToolSvg.polish=`<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><path d="M43 17 Q43 11 50 11 Q57 11 57 17 V54 H43Z" fill="#9d78b2" stroke="#654b84" stroke-width="5"/><path d="M46 24 H54" stroke="#e6d8ef" stroke-width="4" stroke-linecap="round"/><path d="M29 52 Q50 41 71 52 L81 73 Q70 85 50 85 Q30 85 19 73Z" fill="#fff1c3" stroke="#a58a59" stroke-width="5" stroke-linejoin="round"/><path d="M24 71 Q50 78 76 71" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/><path d="M32 55 Q50 50 68 55" fill="none" stroke="#fff9df" stroke-width="4" stroke-linecap="round"/></svg>`;
const sprayBottleSvg=liquid=>`<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><path d="M34 42 H66 Q72 42 72 49 V84 Q72 91 65 91 H35 Q28 91 28 84 V49 Q28 42 34 42Z" fill="#dff7fb" stroke="#605680" stroke-width="5"/><path d="M33 67 Q50 60 67 67 V82 Q67 86 63 86 H37 Q33 86 33 82Z" fill="${liquid}"/><path d="M39 42 V30 H59 V42" fill="#e7eef8" stroke="#605680" stroke-width="5"/><path d="M34 22 H65 V30 H34Z" fill="#aa9bd0" stroke="#605680" stroke-width="4"/><path d="M34 24 H16 V31 H34" fill="#d8d8ed" stroke="#605680" stroke-width="4"/><path d="M58 30 Q70 33 65 44" fill="none" stroke="#cf8aaa" stroke-width="6" stroke-linecap="round"/><path d="M20 45 12 43 M19 55 8 57" stroke="#b4eefa" stroke-width="4" stroke-linecap="round"/></svg>`;
clinicToolSvg.mist=sprayBottleSvg("#88dcf1");clinicToolSvg.spray=sprayBottleSvg("#f7a8cf");clinicToolSvg.rinse=sprayBottleSvg("#9ee1e6");
clinicToolSvg.brush=`<svg class="clinic-tool-svg" viewBox="0 0 100 100" aria-hidden="true"><path d="M47 45 79 83" stroke="#74518b" stroke-width="17" stroke-linecap="round"/><path d="M47 45 79 83" stroke="#e3c6ea" stroke-width="8" stroke-linecap="round"/><rect x="15" y="20" width="49" height="39" rx="16" transform="rotate(-38 39 39)" fill="#ffd9ec" stroke="#a56a8c" stroke-width="5"/><path d="M17 42 11 50 M25 50 19 61 M34 55 31 68 M44 57 45 68 M53 52 58 63" stroke="#fff0f7" stroke-width="7" stroke-linecap="round"/></svg>`;
const medicineVialSvg=`<svg class="clinic-tool-svg medicine-flask" viewBox="0 0 100 100" aria-hidden="true"><path d="M23 34 Q23 27 30 27 H57 Q64 27 64 34 V78 Q64 86 56 86 H31 Q23 86 23 78Z" fill="#e5f8ff" stroke="#66538b" stroke-width="5"/><path class="medicine-liquid" d="M28 59 Q44 53 59 59 V76 Q59 81 54 81 H33 Q28 81 28 76Z" fill="#b787e4"/><path d="M37 27 V18 H50 V27" fill="#ccebf3" stroke="#66538b" stroke-width="4"/><path d="M49 33 H73 L82 27 H90 V37 H81 L73 42 H63" fill="#d3eef4" stroke="#66538b" stroke-width="4" stroke-linejoin="round"/><path d="M31 40 H42" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="M42 61 H46 V57 H51 V61 H55 V66 H51 V70 H46 V66 H42Z" fill="#fff"/></svg>`;
clinicToolSvg.potion=medicineVialSvg;
function renderCareClinic(box,patient){
  const baseArt=careBaseArt[patient.ailment];
  const ailmentAnchor=careTargets[patient.ailment]||{x:50,y:50};
  let anchor=ailmentAnchor;
  const icons={fox:"\u{1F98A}",bunny:"\u{1F430}",dragon:"\u{1F432}",unicorn:"\u{1F984}"};q("#activityPatient").textContent=icons[patient.animal];
  let step=0,chosen=false,amount=0,pointerDown=false,lastPoint=null,dragStart=null,finishing=false,pointerActive=false,activePoint=null,holdTimer=null,hintTimer=null,wrongTries=0,reactionLevel=0,heldDebris=null,debrisItems=[],stitchLines=[],activeStitch=null;
  const dropZone={x:83,y:15};
  const care=document.createElement("div");care.className="care-game care-clinic";
  const progress=document.createElement("div");progress.className="care-progress";progress.innerHTML=patient.plan.map((_,i)=>`<span class="${i===0?"active":""}">${i+1}</span>`).join("");
  const patientCard=document.createElement("div");patientCard.className="care-patient";patientCard.dataset.animal=patient.animal;patientCard.dataset.emotion="worried";patientCard.setAttribute("aria-label",`${patient.name} needs your help`);
  const patientReaction=document.createElement("span");patientReaction.className="care-patient-reaction";patientReaction.setAttribute("aria-hidden","true");patientCard.append(patientReaction);
  const treatment=document.createElement("div");treatment.className="care-treatment";
  treatment.dataset.ailment=patient.ailment;
  treatment.style.backgroundImage=`url("assets/${baseArt}")`;
  treatment.setAttribute("aria-label",`${patient.ailment} close-up`);
  // Conditions and completed dressings survive step transitions; controls do not.
  const ailmentLayer=document.createElement("div");ailmentLayer.className="care-ailment-layer";
  const appliedLayer=document.createElement("div");appliedLayer.className="care-applied-layer";
  const conditionNodes=(careConditions[patient.ailment]||[]).map((condition,index)=>{
    const el=document.createElement("img");el.className="care-condition";
    el.src=`assets/${condition.art==="horn-shine.png"?baseArt:condition.art}`;el.alt="";el.draggable=false;
    el.dataset.resolvesWith=condition.tool;el.dataset.art=condition.art;
    el.style.left=`${condition.inverse?50:ailmentAnchor.x+(condition.dx||0)}%`;el.style.top=`${condition.inverse?50:ailmentAnchor.y+(condition.dy||0)}%`;
    el.style.width=`${condition.width}%`;el.style.height=`${condition.height}%`;
    el.style.opacity=condition.inverse?"0":"1";
    if(condition.local)el.classList.add("care-mouth-germ");
    if(condition.inverse)el.classList.add("care-horn-restoration");
    el.style.setProperty("--germ-delay",`${index*-.35}s`);
    ailmentLayer.append(el);return{...condition,el,progress:0,x:ailmentAnchor.x+(condition.dx||0),y:ailmentAnchor.y+(condition.dy||0)};
  });
  const debrisByTool=new Map(),dabsByTool=new Map();
  const actionLayer=document.createElement("div");actionLayer.className="care-action-layer";
  const gestureTool=document.createElement("div");gestureTool.className="care-gesture-tool";
  const meter=document.createElement("div");meter.className="care-meter";meter.innerHTML="<i></i>";
  treatment.append(ailmentLayer,appliedLayer,actionLayer,gestureTool,meter);
  const prompt=document.createElement("div");prompt.className="care-prompt";
  const tools=document.createElement("div");tools.className="care-tools";
  const stillHere=()=>care.isConnected&&q("#activityScreen").classList.contains("active");
  const later=(fn,ms)=>setTimeout(()=>{if(stillHere())fn()},ms);
  const showAmount=()=>{
    meter.querySelector("i").style.width=`${Math.min(100,amount)}%`;
    if(step>0||amount>=20)patientCard.dataset.emotion="hopeful";
    conditionNodes.filter(c=>c.tool===patient.plan[step]).forEach(c=>{
      const progress=(c.local||treatment.dataset.family==="wipeScrub")?c.progress:amount;
      c.el.style.opacity=String(c.inverse?progress/100:c.tool==="stitches" ? 0.25+0.75*(1-progress/100) : 1-progress/100);
      if(progress>=100)c.el.dataset.resolved="true";
    });
  };
  const react=(symbol)=>{patientReaction.textContent=symbol;patientReaction.classList.remove("visible");void patientReaction.offsetWidth;patientReaction.classList.add("visible");patientCard.classList.remove("care-patient-lift");void patientCard.offsetWidth;patientCard.classList.add("care-patient-lift")};
  const addAmount=value=>{if(finishing||!chosen||!stillHere()||value<=0)return;amount=Math.min(100,amount+value);showAmount();const level=amount>=100?3:amount>=75?2:amount>=25?1:0;if(level>reactionLevel){reactionLevel=level;react(level===3?"✦":"♥")}if(amount>=99.99){amount=100;showAmount();finishing=true;pointerDown=false;stopHoldTimer();later(finishStep,300)}};
  const pointerPoint=event=>{const rect=treatment.getBoundingClientRect();return{x:event.clientX-rect.left-treatment.clientLeft,y:event.clientY-rect.top-treatment.clientTop}};
  const percentPoint=event=>{const p=pointerPoint(event);return{x:p.x/treatment.clientWidth*100,y:p.y/treatment.clientHeight*100}};
  const moveTool=event=>{const p=pointerPoint(event);gestureTool.style.left=`${p.x}px`;gestureTool.style.top=`${p.y}px`;gestureTool.classList.add("visible");return p};
  const distanceToAnchor=p=>Math.hypot(p.x-anchor.x,p.y-anchor.y);
  let inspectionPoints=[],inspectionTimer=null;
  const stopInspection=()=>{clearInterval(inspectionTimer);inspectionTimer=null};
  const inspectAt=point=>{
    if(treatment.dataset.family!=="inspectDetail")return;
    const lens=gestureTool.querySelector(".lens");
    if(lens){lens.style.backgroundImage=`url("assets/${baseArt}")`;lens.style.backgroundSize=`${treatment.clientWidth*2}px ${treatment.clientHeight*2}px`;lens.style.backgroundPosition=`${point.x}% ${point.y}%`}
    if(patient.plan[step]==="magnifier"){
      gestureTool.classList.toggle("has-evidence",Math.hypot(point.x-anchor.x,point.y-anchor.y)<12);
      return;
    }
    const radius=patient.plan[step]==="scanner"?6:9;
    const near=inspectionPoints.find(item=>!item.done&&Math.hypot(point.x-item.x,point.y-item.y)<radius);
    gestureTool.classList.toggle("has-evidence",Boolean(near));
    gestureTool.classList.toggle("on-horn",Boolean(near)&&patient.plan[step]==="scanner");
    actionLayer.querySelector(".care-ear-view")?.classList.toggle("visible",Boolean(near)&&patient.plan[step]==="otoscope");
    inspectionPoints.forEach(item=>item.el?.classList.toggle("focused",item===near));
  };
  function stopHoldTimer(){if(holdTimer){clearInterval(holdTimer);holdTimer=null}pointerActive=false;activePoint=null}
  treatment.addEventListener("pointerdown",event=>{
    if(!chosen||finishing)return;const family=treatment.dataset.family;if(family==="placeItem"||family==="sip"||family==="injection"||family==="sprayMouth")return;
    pointerDown=true;lastPoint=moveTool(event);dragStart=lastPoint;activePoint=percentPoint(event);pointerActive=true;gestureTool.classList.toggle("brushing",patient.plan[step]==="toothbrush");
    try{treatment.setPointerCapture?.(event.pointerId)}catch{}
    // Pressing on a target is enough to start a hold or pick up debris.
    interactAt(activePoint);inspectAt(activePoint);
  });
  let lastBubbleAt=0;
  const spawnBubble=(x,y)=>{
    const now=performance.now();if(now-lastBubbleAt<130)return;lastBubbleAt=now;
    const bubble=document.createElement("span");bubble.className="care-bubble-particle";
    const size=patient.plan[step]==="toothbrush"?5+Math.random()*7:10+Math.random()*14;bubble.style.width=bubble.style.height=`${size}px`;
    bubble.style.left=`${x+(Math.random()*24-12)}px`;bubble.style.top=`${y+(Math.random()*16-8)}px`;
    actionLayer.append(bubble);setTimeout(()=>bubble.remove(),750);
  };
  const spawnSparklePop=(xPct,yPct)=>{
    const pop=document.createElement("span");pop.className="care-sparkle-pop";
    pop.style.left=`${xPct}%`;pop.style.top=`${yPct}%`;
    actionLayer.append(pop);setTimeout(()=>pop.remove(),600);
  };
  let lastCreamAt=0;
  const spawnCream=(x,y)=>{
    if(performance.now()-lastCreamAt<180)return;lastCreamAt=performance.now();
    const dab=document.createElement("span");dab.className="care-cream-stroke";dab.style.left=`${x}px`;dab.style.top=`${y}px`;
    appliedLayer.append(dab);
  };
  let dabTarget=null,dabFillTimer=null;
  const stopDabFill=()=>{if(dabFillTimer){clearInterval(dabFillTimer);dabFillTimer=null}if(dabTarget){dabTarget.mark.classList.remove("active");dabTarget=null}gestureTool.classList.remove("near")};
  const interactAt=(point,moving=false)=>{
    const family=treatment.dataset.family;
    if(family==="tapDebris"){
      if(heldDebris){heldDebris.el.style.left=`${point.x}%`;heldDebris.el.style.top=`${point.y}%`}
      else{
        const moved=dragStart&&Math.hypot(point.x*treatment.clientWidth/100-dragStart.x,point.y*treatment.clientHeight/100-dragStart.y)>8;
        const target=moving&&moved?debrisItems.find(it=>!it.collected&&Math.hypot(point.x-it.x,point.y-it.y)<14):null;
        gestureTool.classList.toggle("near",Boolean(target));
        if(target){heldDebris=target;target.el.classList.add("held");gestureTool.classList.add("grabbing")}
      }
    }else if(family==="stitch"){
      const next=stitchLines.find(line=>!line.done);
      if(next&&Math.hypot(point.x-next.x,point.y-next.y)<11){activeStitch=next;next.el.classList.add("active")}
    }else if(family==="dabSpots"){
      const target=debrisItems.find(it=>!it.collected&&Math.hypot(point.x-it.x,point.y-it.y)<10);
      if(target!==dabTarget){
        stopDabFill();
        if(target){
          dabTarget=target;target.mark.classList.add("active");gestureTool.classList.add("near");
          dabFillTimer=setInterval(()=>{
            if(!stillHere()||!pointerActive||finishing){stopDabFill();return}
            if(!dabTarget)return;
            dabTarget.fill=Math.min(100,dabTarget.fill+16);
            dabTarget.blob.style.setProperty("--fill",String(dabTarget.fill/100));
            if(dabTarget.fill>=100){
              dabTarget.collected=true;dabTarget.mark.classList.add("done");dabTarget.blob.classList.add("done");
              spawnSparklePop(dabTarget.x,dabTarget.y);addAmount(100/debrisItems.length);stopDabFill();
            }
          },140);
        }
      }
    }
  };
  treatment.addEventListener("pointermove",event=>{
    if(!chosen||!pointerDown||finishing)return;const family=treatment.dataset.family;
    const p=moveTool(event);activePoint=percentPoint(event);
    const distance=lastPoint?Math.hypot(p.x-lastPoint.x,p.y-lastPoint.y):0;
    if(family==="wipeDebris"&&distance>1){
      const nearest=debrisItems.filter(item=>!item.collected&&Math.hypot(item.x-activePoint.x,item.y-activePoint.y)<12)
        .sort((a,b)=>Math.hypot(a.x-activePoint.x,a.y-activePoint.y)-Math.hypot(b.x-activePoint.x,b.y-activePoint.y))[0];
      if(nearest){nearest.progress=Math.min(100,(nearest.progress||0)+Math.min(18,distance/2));nearest.el.style.opacity=String(1-nearest.progress/100);if(nearest.progress>=100){nearest.collected=true;nearest.el.classList.add("dropped");spawnSparklePop(nearest.x,nearest.y);addAmount(100/debrisItems.length)}}
    }else if(family==="stitch"&&activeStitch&&distance>1){
      const line=activeStitch,progress=Math.max(0,Math.min(1,(activePoint.y-line.y)/(line.endY-line.y)));
      if(Math.abs(activePoint.x-line.x)<11){line.el.style.setProperty("--stitch-fill",String(progress));if(progress>=.7){line.el.style.setProperty("--stitch-fill","1");line.done=true;line.el.classList.add("done");appliedLayer.append(line.el);activeStitch=null;spawnSparklePop(line.x,line.endY);addAmount(100/stitchLines.length)}}
    }else if(family==="earDrops"&&distance>1&&distanceToAnchor(activePoint)<18){
      const before=amount;addAmount(Math.min(10,distance/3));
      if(Math.floor(amount/16)>Math.floor(before/16)){
        const drop=document.createElement("span");drop.className="care-ear-drop";drop.style.left=`${activePoint.x}%`;drop.style.top=`${activePoint.y}%`;actionLayer.append(drop);setTimeout(()=>drop.remove(),700);
        spawnSparklePop(activePoint.x,activePoint.y);
      }
    }else if(family==="wipeScrub"){
      const local=conditionNodes.filter(c=>c.local&&c.tool===patient.plan[step]);
      if(local.length){
        // Each mouth germ has its own brushing progress. Rubbing the cheek cannot clean teeth.
        if(distance>1){
          const nearest=local.filter(c=>c.progress<100&&Math.hypot((c.x-activePoint.x)*treatment.clientWidth/100,(c.y-activePoint.y)*treatment.clientHeight/100)<Math.max(12,treatment.clientWidth*.045))
            .sort((a,b)=>Math.hypot(a.x-activePoint.x,a.y-activePoint.y)-Math.hypot(b.x-activePoint.x,b.y-activePoint.y))[0];
          if(nearest){const delta=Math.min(100-nearest.progress,Math.min(12,distance/2));nearest.progress+=delta;addAmount(delta/local.length);spawnBubble(p.x,p.y);if(nearest.progress>=100)spawnSparklePop(nearest.x,nearest.y)}
        }
      }else{
        const marks=conditionNodes.filter(c=>c.tool===patient.plan[step]);
        if(marks.length&&distance>2){
          const nearest=marks.filter(c=>c.progress<100&&Math.hypot((c.x-activePoint.x)*treatment.clientWidth/100,(c.y-activePoint.y)*treatment.clientHeight/100)<Math.min(55,Math.max(26,treatment.clientWidth*c.width/100*.7)))
            .sort((a,b)=>Math.hypot(a.x-activePoint.x,a.y-activePoint.y)-Math.hypot(b.x-activePoint.x,b.y-activePoint.y))[0];
          if(nearest){const delta=Math.min(100-nearest.progress,Math.min(12,distance/2));nearest.progress+=delta;addAmount(delta/marks.length);if(patient.plan[step]==="cream")spawnCream(p.x,p.y);else spawnBubble(p.x,p.y);if(nearest.progress>=100)spawnSparklePop(nearest.x,nearest.y)}
        }else if(!marks.length&&distanceToAnchor(activePoint)<18){addAmount(Math.min(9,distance/9));if(distance>2&&patient.plan[step]!=="prep")spawnBubble(p.x,p.y)}
      }
    }
    else if(family==="holdStill"){
      const near=distanceToAnchor(activePoint)<16;
      gestureTool.classList.toggle("locked",near);
      if(near){gestureTool.style.left=`${anchor.x*treatment.clientWidth/100}px`;gestureTool.style.top=`${anchor.y*treatment.clientHeight/100}px`}
    }
    interactAt(activePoint,true);inspectAt(activePoint);
    lastPoint=p;
  });
  const endPointer=event=>{
    if(heldDebris){
      const p=event&&event.clientX!==undefined?percentPoint(event):activePoint||heldDebris;
      const near=event?.type!=="pointercancel"&&Math.hypot(p.x-dropZone.x,p.y-dropZone.y)<16;
      if(near){heldDebris.collected=true;heldDebris.el.classList.add("dropped");addAmount(100/debrisItems.length)}
      else{const el=heldDebris.el;el.classList.remove("held");el.classList.add("settling");el.style.left=`${heldDebris.x}%`;el.style.top=`${heldDebris.y}%`;setTimeout(()=>el.classList.remove("settling"),400)}
      heldDebris=null;gestureTool.classList.remove("grabbing");
    }
    stopDabFill();
    if(activeStitch&&!activeStitch.done){activeStitch.el.classList.remove("active");activeStitch.el.style.setProperty("--stitch-fill","0");activeStitch=null}
    pointerDown=false;lastPoint=null;dragStart=null;pointerActive=false;gestureTool.classList.remove("near","brushing");
  };
  treatment.addEventListener("pointerup",endPointer);treatment.addEventListener("pointercancel",endPointer);treatment.addEventListener("pointerleave",endPointer);
  const debrisArt={tweezers:"prickle-burr.png",swab:"ear-fuzz.png"};
  const placeItemArt={bandage:"bandage-wrap.png",wrap:"support-wrap.png",ribbon:"ribbon-bow.png",crystal:"healing-crystals.svg",blanket:"cozy-blanket.png"};
  const setupDebris=(count,icon,toolKey)=>{
    debrisItems=[];heldDebris=null;
    const art=debrisArt[toolKey]||"prickle-burr.png";
    const offsets=[[-8,-6],[7,4],[-3,8],[9,-7]];
    offsets.slice(0,count).forEach((pos,i)=>{
      const px=clampPct(anchor.x+pos[0]),py=clampPct(anchor.y+pos[1]);
      const el=document.createElement("div");el.className="care-debris";el.style.backgroundImage=`url("assets/${art}")`;el.style.left=`${px}%`;el.style.top=`${py}%`;el.style.setProperty("--tilt",`${(i%2?1:-1)*(12+i*6)}deg`);el.style.animationDelay=`${i*.12}s`;
      el.dataset.resolvesWith=toolKey;ailmentLayer.append(el);debrisItems.push({el,x:px,y:py,collected:false});
    });
  };
  const setupDabSpots=(count,icon,toolKey)=>{
    debrisItems=[];dabTarget=null;
    const art=toolKey==="mist"?"smoke-puff.png":"cream-dab.png";
    const offsets=toolKey==="toothpaste"?[[-9,0],[6,0],[-5,7],[9,7]]:[[-8,-6],[7,4],[-3,8],[9,-7]];
    offsets.slice(0,count).forEach((pos,i)=>{
      const left=`${clampPct(anchor.x+pos[0])}%`,top=`${clampPct(anchor.y+pos[1])}%`;
      const blob=document.createElement("div");blob.className="care-dab-blob";blob.style.backgroundImage=`url("assets/${art}")`;blob.style.left=left;blob.style.top=top;blob.style.setProperty("--fill","0");
      const mark=document.createElement("div");mark.className="care-detail care-detail-dab";mark.textContent=icon;mark.style.left=left;mark.style.top=top;mark.style.animationDelay=`${i*.12}s`;
      blob.hidden=true;mark.hidden=true;ailmentLayer.append(blob,mark);
      debrisItems.push({el:mark,mark,blob,x:clampPct(anchor.x+pos[0]),y:clampPct(anchor.y+pos[1]),fill:0,collected:false});
    });
  };
  // Construct all ailment objects once, before the first tool is selected.
  patient.plan.forEach(key=>{
    if(toolFamily[key]==="tapDebris"||toolFamily[key]==="wipeDebris"){setupDebris(3,careTools[key].action,key);debrisByTool.set(key,debrisItems)}
    if(toolFamily[key]==="dabSpots"){setupDabSpots(4,careTools[key].action,key);dabsByTool.set(key,debrisItems)}
  });
  debrisItems=[];
  const buildToolVisual=(toolKey,icon)=>{
    gestureTool.className="care-gesture-tool";gestureTool.innerHTML="";
    if(toolKey==="tweezers"){
      gestureTool.classList.add("tweezers-tool");
      gestureTool.innerHTML='<img class="tweezers-img tweezers-open" src="assets/tweezers-open.png" alt=""><img class="tweezers-img tweezers-closed" src="assets/tweezers-closed.png" alt="">';
    }else if(toolKey==="magnifier"){
      gestureTool.classList.add("magnifier-tool");
      gestureTool.innerHTML=`<span class="lens"><img class="care-lens-evidence" src="assets/${magnifierEvidence[patient.ailment]||baseArt}" alt=""><span class="lens-shine"></span></span><span class="handle"></span>`;
    }else if(toolKey==="scanner"){
      gestureTool.classList.add("scanner-tool","art-icon-tool");gestureTool.innerHTML=clinicToolSvg.scanner;
    }else if(toolKey==="flashlight"){
      gestureTool.classList.add("flashlight-tool");gestureTool.innerHTML='<span class="flashlight-beam"></span>'+clinicToolSvg.flashlight;
    }else if(toolKey==="mirror"){
      gestureTool.classList.add("dental-mirror-tool");gestureTool.innerHTML=dentalMirrorSvg+'<img class="mirror-reflection" src="assets/bug-plaque.png" alt="">';
    }else if(toolKey==="toothbrush"){
      gestureTool.classList.add("toothbrush-tool");
      gestureTool.innerHTML='<span class="toothbrush-handle"></span><span class="toothbrush-head"><i></i></span>';
    }else if(toolKey==="swab"){
      gestureTool.classList.add("swab-tool","art-icon-tool");
      gestureTool.innerHTML=clinicToolSvg.swab;
    }else if(clinicToolSvg[toolKey]){
      gestureTool.classList.add("art-icon-tool",`${toolKey}-tool`);gestureTool.innerHTML=clinicToolSvg[toolKey];
    }else if(careTools[toolKey].art||placeItemArt[toolKey]){
      gestureTool.classList.add("asset-icon-tool",`${toolKey}-tool`);
      gestureTool.innerHTML=`<img class="care-held-art" src="assets/${careTools[toolKey].art||placeItemArt[toolKey]}" alt="">`;
    }else{
      gestureTool.classList.add("raw-icon-tool");gestureTool.innerHTML=`<span class="tool-free-icon">${icon}</span>`;
    }
  };
  const prepare=(tool,toolKey)=>{
    stopHoldTimer();
    // Diagnostic targets differ from the ailment mark when the full torso is shown.
    anchor=ailmentAnchor;
    if(patient.ailment==="Rumbly Tummy"&&toolKey==="thermometer")anchor={x:76,y:45};
    if(patient.ailment==="Rumbly Tummy"&&(toolKey==="prep"||toolKey==="syringe"))anchor={x:35,y:54};
    if(patient.ailment==="Smoky Sneezes"&&toolKey==="stethoscope")anchor={x:50,y:72};
    if(patient.ailment==="Smoky Sneezes"&&toolKey==="thermometer")anchor={x:83,y:42};
    if(patient.ailment==="Dim Horn"&&toolKey==="crystal")anchor={x:50,y:31};
    if(patient.ailment==="Dim Horn"&&toolKey==="ribbon")anchor={x:76,y:39};
    if(patient.ailment==="Rumbly Tummy"&&toolKey==="potion")anchor={x:50,y:38};
    if(patient.ailment==="Smoky Sneezes"&&toolKey==="potion")anchor={x:48,y:53};
    treatment.dataset.targetX=anchor.x;treatment.dataset.targetY=anchor.y;
    const family=toolFamily[toolKey]||"wipeScrub";
    treatment.dataset.family=family;treatment.dataset.tool=toolKey;buildToolVisual(toolKey,tool.icon);meter.classList.add("show");
    if(family==="holdStill"&&toolKey!=="coolpack"){
      const readout=document.createElement("div");readout.className="care-readout";readout.dataset.kind=toolKey;readout.style.left=`${Math.min(82,anchor.x+16)}%`;readout.style.top=`${Math.max(16,anchor.y-18)}%`;
      readout.innerHTML=toolKey==="thermometer"?'<span class="readout-thermometer"><i></i></span><span class="readout-temperature" aria-live="polite">--.-°</span>':'<span class="readout-heart">♥</span><span class="readout-pulse"></span>';
      actionLayer.append(readout);
    }
    if(family==="holdStill"){
      holdTimer=setInterval(()=>{if(!stillHere()){stopHoldTimer();return}if(!pointerActive||!activePoint)return;if(distanceToAnchor(activePoint)<16){addAmount(11);const display=actionLayer.querySelector(".care-readout");display?.style.setProperty("--reading",String(amount/100));if(toolKey==="coolpack"&&Math.round(amount)%22<11)spawnSparklePop(anchor.x,anchor.y);if(toolKey==="thermometer"){const digits=display?.querySelector(".readout-temperature");if(digits)digits.textContent=amount>=100?"38.1°":`${(36.4+1.7*amount/100).toFixed(1)}°`}}},150);
    }
    if(family==="inspectDetail"){
      // Magnifier cases have one real finding at the visible injury. Other
      // instruments retain their separate anatomical check locations.
      const locations=toolKey==="mirror"?conditionNodes.filter(c=>c.local&&c.tool==="toothbrush").map(c=>({x:c.x,y:c.y})):toolKey==="scanner"?[{x:anchor.x+2,y:anchor.y+8},{x:anchor.x,y:anchor.y},{x:anchor.x-2,y:anchor.y-8}]:[{x:anchor.x,y:anchor.y}];
      inspectionPoints=locations.map(({x:rawX,y:rawY},i)=>{
        const x=clampPct(rawX),y=clampPct(rawY),el=document.createElement("span");
        if(toolKey!=="magnifier"){el.className="care-inspection-clue evidence-check";el.style.left=`${x}%`;el.style.top=`${y}%`;el.textContent="✦";actionLayer.append(el)}
        return{x,y,el:toolKey==="magnifier"?null:el,done:false,hold:0,index:i};
      });
      if(toolKey==="otoscope"){
        // Keep the inset away from Fern's face and the ear being examined.
        const view=document.createElement("div");view.className="care-ear-view";view.style.left="82%";view.style.top="82%";
        view.innerHTML='<img src="assets/ear-fuzz.png" alt="Enlarged ear debris">';actionLayer.append(view);
      }
      inspectionTimer=setInterval(()=>{
        if(!stillHere()){stopInspection();return}
        if(finishing||!pointerActive||!activePoint)return;
        const item=inspectionPoints.find((it,i)=>!it.done&&(toolKey!=="scanner"||i===0||inspectionPoints[i-1].done)&&Math.hypot(activePoint.x-it.x,activePoint.y-it.y)<(toolKey==="magnifier"?12:toolKey==="scanner"?6:9));
        if(!item)return;
        item.hold+=1;if(item.el)item.el.style.setProperty("--discovery",String(item.hold/4));
        if(item.hold>=(toolKey==="magnifier"?9:4)){
          item.done=true;if(item.el){item.el.classList.add("found");item.el.textContent="✦"}
          if(toolKey==="magnifier")gestureTool.classList.add("evidence-found");
          spawnSparklePop(item.x,item.y);addAmount(100/inspectionPoints.length);
        }
      },130);
    }
    if(family==="tapDebris"){
      debrisItems=debrisByTool.get(toolKey);
      const tray=document.createElement("div");tray.className="care-drop-tray";tray.textContent="🧺";
      tray.style.left=`${dropZone.x}%`;tray.style.top=`${dropZone.y}%`;actionLayer.append(tray);
    }
    if(family==="stitch"){
      stitchLines=[];activeStitch=null;
      for(let i=0;i<3;i++){
        const x=anchor.x-6+i*6,y=anchor.y-5,el=document.createElement("span");
        el.className="care-stitch-line";el.style.left=`${x}%`;el.style.top=`${y}%`;el.style.width=`${8*treatment.clientHeight/treatment.clientWidth}%`;el.style.setProperty("--stitch-fill","0");actionLayer.append(el);
        stitchLines.push({x,y,endY:y+8,el,done:false});
      }
      q("#activityInstruction").textContent="Start at each little star. Guide the stitching tool across the cut.";
    }
    if(family==="wipeDebris")debrisItems=debrisByTool.get(toolKey);
    if(family==="dabSpots"){
      debrisItems=dabsByTool.get(toolKey);
      debrisItems.forEach(item=>{item.mark.hidden=false;item.blob.hidden=false});
    }
    if(family==="surfaceSpray"){
      const sprayer=document.createElement("button");sprayer.type="button";sprayer.className="care-surface-sprayer";sprayer.dataset.kind=toolKey;
      const sprayerX=Math.min(82,anchor.x+22);
      sprayer.style.left=`${sprayerX}%`;sprayer.style.top=`${anchor.y}%`;
      sprayer.setAttribute("aria-label",toolKey==="spray"?"Hold to spray the tangles, then brush the leaves away":"Hold to spray a cool mist toward Pip's nose");
      sprayer.innerHTML='<span class="surface-nozzle"></span><span class="surface-trigger"></span><span class="surface-bottle"><i></i></span><span class="rinse-hand-hint" aria-hidden="true">👆</span>';
      actionLayer.append(sprayer);let spraying=false,timer=null;
      const stop=()=>{spraying=false;clearInterval(timer);timer=null;sprayer.classList.remove("spraying")};
      const start=event=>{
        if(finishing||!chosen||spraying||!stillHere())return;
        event.preventDefault();event.stopPropagation();spraying=true;sprayer.classList.add("spraying");try{sprayer.setPointerCapture?.(event.pointerId)}catch{}
        timer=setInterval(()=>{
          if(!stillHere()||!spraying||finishing){stop();return}
          addAmount(5);
          for(let i=0;i<3;i++){
            const drop=document.createElement("span");drop.className="care-surface-drop";
            drop.style.left=`${sprayerX-10}%`;drop.style.top=`${anchor.y-5}%`;
            drop.style.setProperty("--travel",`${(sprayerX-anchor.x-8)*treatment.clientWidth/100}px`);
            drop.style.setProperty("--drift",`${Math.random()*38-16}px`);actionLayer.append(drop);setTimeout(()=>drop.remove(),800);
          }
          if(toolKey==="spray")conditionNodes.filter(c=>c.tool==="brush").forEach(c=>c.el.style.setProperty("--soften",String(amount/100)));
          if(amount>=100)stop();
        },110);
      };
      sprayer.addEventListener("pointerdown",start);
      ["pointerup","pointercancel","lostpointercapture"].forEach(type=>sprayer.addEventListener(type,stop));
      sprayer.addEventListener("keydown",event=>{if(event.code==="Space"||event.code==="Enter")start(event)});
      sprayer.addEventListener("keyup",stop);sprayer.addEventListener("blur",stop);
    }
    // The visible tool and the actual mark guide wiping; no generic circular target.
    if(family==="sip"){
      const cup=button("","care-medicine-cup");cup.style.left="16%";cup.style.top="84%";
      cup.innerHTML=medicineVialSvg+'<span class="medicine-hand-hint" aria-hidden="true">👆</span>';
      cup.setAttribute("aria-label","Move the medicine to Pip's mouth, then hold for gentle sips");
      actionLayer.append(cup);let dragging=false,docked=false,feeding=false,timer=null;
      const stop=()=>{feeding=false;clearInterval(timer);timer=null;cup.classList.remove("feeding")};
      const feed=()=>{if(feeding||!docked||finishing)return;feeding=true;cup.classList.add("feeding");timer=setInterval(()=>{if(!feeding||finishing||!stillHere()){stop();return}addAmount(7);cup.style.setProperty("--dose",String(amount/100));if(amount>=100){stop();cup.classList.add("empty")}},100)};
      const dock=()=>{docked=true;dragging=false;cup.classList.add("docked");cup.style.left=`${anchor.x-12}%`;cup.style.top=`${anchor.y+10}%`;spawnSparklePop(anchor.x,anchor.y)};
      cup.addEventListener("pointerdown",event=>{
        if(finishing||!chosen||!stillHere())return;event.preventDefault();event.stopPropagation();try{cup.setPointerCapture?.(event.pointerId)}catch{}
        if(!docked){dragging=true;return}
        feed();
      });
      cup.addEventListener("pointermove",event=>{if(!dragging)return;const p=percentPoint(event);if(distanceToAnchor(p)<18){dock();feed()}else{cup.style.left=`${p.x}%`;cup.style.top=`${p.y}%`}});
      cup.addEventListener("pointerup",event=>{
        if(dragging){dragging=false;const p=percentPoint(event);if(distanceToAnchor(p)<18)dock();else{cup.style.left="16%";cup.style.top="84%"}}
        stop();
      });
      cup.addEventListener("pointercancel",()=>{dragging=false;stop()});cup.addEventListener("lostpointercapture",stop);
      cup.addEventListener("keydown",event=>{if(event.code==="Enter"||event.code==="Space"){event.preventDefault();if(!docked)dock();else feed()}});
      cup.addEventListener("keyup",stop);cup.addEventListener("blur",stop);
    }
    if(family==="sprayMouth"){
      const spray=document.createElement("button");spray.type="button";spray.className="care-rinse-sprayer";
      spray.setAttribute("aria-label","Hold to spray a gentle mist into Bramble's mouth");
      spray.innerHTML='<span class="rinse-nozzle"></span><span class="rinse-trigger"></span><span class="rinse-bottle"><i></i></span><span class="rinse-hand-hint" aria-hidden="true">👆</span>';
      actionLayer.append(spray);
      let spraying=false,timer=null;
      const stop=()=>{spraying=false;clearInterval(timer);timer=null;spray.classList.remove("spraying")};
      const start=event=>{
        if(finishing||!chosen||spraying||!stillHere())return;
        event.preventDefault();event.stopPropagation();
        spraying=true;spray.classList.add("spraying");try{spray.setPointerCapture?.(event.pointerId)}catch{}
        timer=setInterval(()=>{
          if(!stillHere()||!spraying||finishing){stop();return}
          addAmount(5);
          for(let i=0;i<3;i++){
            const drop=document.createElement("span");drop.className="care-rinse-drop";
            drop.style.setProperty("--drift",`${(i-1)*12}px`);
            actionLayer.append(drop);setTimeout(()=>drop.remove(),650);
          }
          if(amount>=100)stop();
        },110);
      };
      spray.addEventListener("pointerdown",start);
      ["pointerup","pointercancel","lostpointercapture"].forEach(type=>spray.addEventListener(type,stop));
      spray.addEventListener("keydown",event=>{if(event.code==="Space"||event.code==="Enter")start(event)});
      spray.addEventListener("keyup",stop);spray.addEventListener("blur",stop);
    }
    if(family==="injection"){
      // Pretend, vet-chosen medicine: position once, then hold the plunger. Never scrub a needle.
      const ring=document.createElement("div");ring.className="care-target care-shot-target";
      ring.style.left=`${anchor.x}%`;ring.style.top=`${anchor.y}%`;actionLayer.append(ring);
      const shot=document.createElement("div");shot.className="care-syringe";shot.dataset.phase="position";
      shot.setAttribute("role","group");shot.setAttribute("aria-label","Move the medicine shot to the glowing spot");
      shot.innerHTML='<img class="syringe-body" src="assets/syringe.png" alt="Medicine syringe" draggable="false"><img class="syringe-plunger" src="assets/syringe.png" alt="" draggable="false"><button type="button" class="syringe-press" aria-label="Hold to press the pink plunger" disabled><span aria-hidden="true">👆</span></button>';
      shot.style.left="48%";shot.style.top="84%";actionLayer.append(shot);
      const press=shot.querySelector("button");let dragging=false,docked=false,pressing=false,fillTimer=null;
      const stopPress=()=>{pressing=false;clearInterval(fillTimer);fillTimer=null;press.classList.remove("pressing")};
      shot.addEventListener("pointerdown",event=>{if(docked||finishing||!chosen)return;event.preventDefault();event.stopPropagation();dragging=true;try{shot.setPointerCapture(event.pointerId)}catch{}});
      shot.addEventListener("pointermove",event=>{if(!dragging)return;const p=percentPoint(event);shot.style.left=`${p.x}%`;shot.style.top=`${p.y}%`});
      const dock=event=>{
        if(!dragging)return;dragging=false;
        if(event.type!=="pointercancel"&&distanceToAnchor(percentPoint(event))<18){
          docked=true;shot.dataset.phase="ready";shot.classList.add("docked");
          // The needle tip, not the syringe center, meets the prepared spot.
          shot.style.left=`${anchor.x}%`;shot.style.top=`${anchor.y}%`;
          press.disabled=false;ring.classList.add("ready");
          api().speak("Hold the pink plunger. Nice and steady.",{recordedOnly:true});
        }else{shot.style.left="48%";shot.style.top="84%"}
      };
      shot.addEventListener("pointerup",dock);shot.addEventListener("pointercancel",dock);
      const startPress=()=>{
        if(!docked||pressing||finishing||!chosen||!stillHere())return;
        pressing=true;press.classList.add("pressing");shot.dataset.phase="giving";
        fillTimer=setInterval(()=>{
          if(!stillHere()||!pressing||finishing){stopPress();return}
          addAmount(4);shot.style.setProperty("--dose",String(amount/100));
          if(amount>=100){stopPress();shot.dataset.phase="done";shot.classList.add("withdrawn");press.disabled=true;spawnSparklePop(anchor.x,anchor.y)}
        },100);
      };
      press.addEventListener("pointerdown",event=>{event.preventDefault();event.stopPropagation();try{press.setPointerCapture(event.pointerId)}catch{}startPress()});
      ["pointerup","pointercancel","lostpointercapture"].forEach(type=>press.addEventListener(type,stopPress));
      press.addEventListener("keydown",event=>{if(event.code==="Space"||event.code==="Enter"){event.preventDefault();startPress()}});
      press.addEventListener("keyup",stopPress);press.addEventListener("blur",stopPress);
    }
    if(family==="placeItem"){
      const start={x:16,y:86};
      const art=placeItemArt[toolKey];
      const token=document.createElement("div");token.className="care-drag-token";
      token.dataset.tool=toolKey;
      if(art){token.classList.add("care-drag-token-art");token.style.backgroundImage=`url("assets/${art}")`}else token.textContent=tool.action;
      token.style.left=`${start.x}%`;token.style.top=`${start.y}%`;actionLayer.append(token);
      let dragging=false;
      token.addEventListener("pointerdown",event=>{if(finishing||!chosen||token.classList.contains("placed"))return;dragging=true;token.classList.remove("settling");event.stopPropagation();try{token.setPointerCapture?.(event.pointerId)}catch{}});
      token.addEventListener("pointermove",event=>{if(!dragging)return;const p=percentPoint(event);token.style.left=`${p.x}%`;token.style.top=`${p.y}%`});
      const release=event=>{
        if(!dragging)return;dragging=false;const p=percentPoint(event);token.classList.add("settling");
        if(event.type!=="pointercancel"&&distanceToAnchor(p)<18){token.style.left=`${anchor.x}%`;token.style.top=`${anchor.y}%`;token.classList.add("placed");appliedLayer.append(token);addAmount(100)}
        else{token.style.left=`${start.x}%`;token.style.top=`${start.y}%`}
      };
      token.addEventListener("pointerup",release);token.addEventListener("pointercancel",release);
    }
  };
  const update=()=>{
    stopHoldTimer();stopDabFill();stopInspection();clearTimeout(hintTimer);inspectionPoints=[];heldDebris=null;debrisItems=[];stitchLines=[];activeStitch=null;pointerDown=false;lastPoint=null;anchor=ailmentAnchor;
    const toolKey=patient.plan[step],tool=careTools[toolKey];chosen=false;amount=0;wrongTries=0;reactionLevel=0;finishing=false;actionLayer.replaceChildren();gestureTool.className="care-gesture-tool";gestureTool.innerHTML="";meter.classList.remove("show");showAmount();delete treatment.dataset.family;
    care.dataset.step=String(step);care.dataset.tool=toolKey;
    prompt.innerHTML=toolKey==="magnifier"?`<span aria-hidden="true">🔍 → <img class="care-prompt-evidence" src="assets/${magnifierEvidence[patient.ailment]}" alt=""></span>`:`<span>${tool.action}</span>`;q("#activityInstruction").textContent="";
    // The tray contains only equipment for this patient, never random unrelated tools.
    const wrong=patient.plan.filter(key=>key!==toolKey).sort(()=>Math.random()-.5).slice(0,2),choices=[toolKey,...wrong].sort(()=>Math.random()-.5);tools.replaceChildren();
    const showToolHint=()=>{if(!chosen&&stillHere())tools.querySelector(".care-tool-glow")?.classList.add("hint-visible")};
    choices.forEach(key=>{
      const item=careTools[key],choice=button("","care-tool");choice.dataset.tool=key;choice.innerHTML=key==="mirror"?dentalMirrorSvg:clinicToolSvg[key]|| (item.art?`<img class="care-tool-art" src="assets/${item.art}" alt="">`:placeItemArt[key]?`<img class="care-tool-art" src="assets/${placeItemArt[key]}" alt="">`:key==="tweezers"?'<img class="care-tool-art" src="assets/tweezers-open.png" alt="">':`<span>${item.icon}</span>`);choice.setAttribute("aria-label",item.name);
      const isCorrect=key===toolKey;choice.classList.toggle("care-tool-glow",isCorrect);
      choice.onclick=()=>{
        if(chosen)return;
        if(!isCorrect){choice.classList.remove("nudge");void choice.offsetWidth;choice.classList.add("nudge");gentleSound();api().speak(`Let's try the ${tool.name}!`,{recordedOnly:true});if(++wrongTries>=2)showToolHint();return}
        chosen=true;clearTimeout(hintTimer);choice.classList.add("selected");qa(".care-tool").forEach(x=>x.disabled=true);api().speak(`${tool.name}. ${tool.prompt}.`,{recordedOnly:true});prepare(tool,toolKey);
      };
      tools.append(choice);
    });
    hintTimer=setTimeout(showToolHint,7500);
    const announcedStep=step;
    later(()=>{if(step===announcedStep&&!chosen)api().speak(`Step ${step+1}. Let's use the ${tool.name}.`,{recordedOnly:true})},350);
  };
  function finishStep(){
    chosen=false;clearTimeout(hintTimer);stopHoldTimer();stopDabFill();stopInspection();gestureTool.classList.remove("visible");
    actionLayer.replaceChildren();meter.classList.remove("show");
    qa(".care-progress span")[step].classList.add("done");step++;const ratio=step/patient.plan.length;patientCard.dataset.emotion=ratio===1?"happy":"hopeful";sparkleSound();
    if(step===patient.plan.length){later(completeAdventure,1400);return}
    qa(".care-progress span")[step].classList.add("active");sparkleSound();later(update,650);
  }
  care.append(progress,patientCard,treatment,prompt,tools);box.append(care);update();
}

function renderActivity(){const a=activeAdventure,box=area();if(a.type==="care")renderCareClinic(box,a.careCase);else if(a.type==="tap")renderTap(box,a);else if(a.type==="sequence")renderSequence(box,a);else if(a.type==="mix")renderMix(box,a);else if(a.type==="find")renderFind(box,a);else if(a.type==="choice")renderChoice(box,a);else if(a.type==="countCompare")renderCountCompare(box,a);else if(a.type==="tenFrame")renderTenFrame(box,a);else if(a.type==="shapes")renderShapes(box,a);else if(a.type==="measure")renderMeasure(box,a);else if(a.type==="sort")renderSort(box,a);else if(a.type==="guidedTrace")renderGuidedTrace(box,a);else if(a.type==="trace")renderTrace(box,a);else if(a.type==="memory")renderMemory(box);else if(a.type==="color")renderColor(box)}
function renderTap(box,a){a.items.forEach((item,i)=>{const b=button(item);if(i===a.items.length-1)b.style.opacity=.45;b.onclick=()=>{if(i===a.items.length-1&&actionCount<5){tryAgain(b);return}if(b.classList.contains("found"))return;b.classList.add("found");b.disabled=true;actionCount++;good(i===5?"Soft bandage on—Fern feels better!":"Thorn removed gently!");if(actionCount===6)setTimeout(completeAdventure,650)};box.append(b)})}
function renderSequence(box,a){
  const game=document.createElement("div");game.className="horn-repair-game";
  const sequence=document.createElement("div");sequence.className="horn-sequence";sequence.innerHTML=a.items.map(()=>'<span>✧</span>').join("");
  const portrait=document.createElement("div");portrait.className="horn-repair-portrait";portrait.setAttribute("aria-label","Nova's horn, growing brighter as rainbow colors are restored");
  const colorLayer=document.createElement("div");colorLayer.className="horn-rainbow-layer";portrait.append(colorLayer);
  const target=document.createElement("span");target.className="horn-repair-target";target.textContent="✦";portrait.append(target);
  const palette=document.createElement("div");palette.className="horn-palette";
  const colors=[...a.items].sort(()=>Math.random()-.5);
  colors.forEach(color=>{
    const token=button(color,"horn-ring-token");token.setAttribute("aria-label",`Place the ${color} rainbow ring on Nova's horn`);
    let dragging=false,startX=0,startY=0;
    token.addEventListener("pointerdown",event=>{if(token.classList.contains("placed"))return;dragging=true;startX=event.clientX;startY=event.clientY;token.classList.add("dragging");try{token.setPointerCapture?.(event.pointerId)}catch{}});
    token.addEventListener("pointermove",event=>{if(dragging)token.style.translate=`${event.clientX-startX}px ${event.clientY-startY}px`});
    const release=event=>{
      if(!dragging)return;dragging=false;token.classList.remove("dragging");token.style.translate="";
      const r=portrait.getBoundingClientRect(),x=(event.clientX-r.left)/r.width*100,y=(event.clientY-r.top)/r.height*100;
      if(event.type==="pointercancel"||x<35||x>65||y<2||y>36)return;
      if(color!==a.items[sequenceIndex]){tryAgain(token);return}
      token.classList.add("placed");sequence.children[sequenceIndex].textContent=color;sequence.children[sequenceIndex].classList.add("restored");sequenceIndex++;
      colorLayer.style.setProperty("--reveal",`${3+sequenceIndex*5}%`);sparkleSound();
      if(sequenceIndex===a.items.length){target.classList.add("finished");setTimeout(completeAdventure,1100)}
    };
    token.addEventListener("pointerup",release);token.addEventListener("pointercancel",release);
    token.addEventListener("keydown",event=>{if((event.code==="Enter"||event.code==="Space")&&color===a.items[sequenceIndex]){event.preventDefault();token.classList.add("placed");sequence.children[sequenceIndex].textContent=color;sequence.children[sequenceIndex].classList.add("restored");sequenceIndex++;colorLayer.style.setProperty("--reveal",`${3+sequenceIndex*5}%`);if(sequenceIndex===a.items.length)setTimeout(completeAdventure,1100)}});
    palette.append(token);
  });
  q("#activityInstruction").textContent="Move rainbow colors to Nova's horn, in order.";
  game.append(sequence,portrait,palette);box.append(game);
}
function renderMix(box,a){
  const updateRounds=roundTracker(box),game=document.createElement("div");game.className="potion-game";box.append(game);
  const spoken="Bramble Bunny needs a gentle giggle potion before his checkup. Add three berries and two stars.";
  let round=0;
  const play=()=>{
    game.replaceChildren();game.classList.remove("ready-to-stir","potion-complete");updateRounds(round);
    const recipe=document.createElement("div");recipe.className="potion-recipe";recipe.setAttribute("aria-label","Potion progress");
    const replay=button("🔊","potion-replay");replay.setAttribute("aria-label","Hear the potion recipe again");replay.onclick=()=>api().speak(spoken,{interrupt:true,recordedOnly:true});
    const progress=document.createElement("span");progress.className="potion-progress";progress.textContent="🍓 0   ⭐ 0";recipe.append(replay,progress);
    const bowl=document.createElement("div");bowl.className="mix-bowl";bowl.innerHTML='<span class="potion-liquid"></span><span class="potion-spoon">🥄</span><span class="potion-stir-arrow">↻</span>';bowl.setAttribute("aria-label","Potion bowl");
    const tray=document.createElement("div");tray.className="potion-tray";
    // More of each recipe ingredient than the spoken count: listening matters.
    const ingredients=["🍓","🍓","🍓","🍓","⭐","⭐","⭐","⭐","🍃","🫐","🍯"].sort(()=>Math.random()-.5);
    const count={"🍓":0,"⭐":0};let ready=false,finished=false,stirring=false,lastAngle=null,turn=0;
    const splash=icon=>{const drop=document.createElement("span");drop.className="potion-splash";drop.textContent=icon;drop.style.left=`${35+Math.random()*30}%`;bowl.append(drop);setTimeout(()=>drop.remove(),650)};
    const add=(tile,icon)=>{
      if(tile.classList.contains("added")||finished||ready)return;
      if(!(icon in count)||count[icon]>=(icon==="🍓"?3:2)){tile.classList.add("wiggle");setTimeout(()=>tile.classList.remove("wiggle"),450);q("#activityFeedback").textContent="🔊 🎧";return}
      tile.classList.add("added");count[icon]++;progress.textContent=`🍓 ${count["🍓"]}   ⭐ ${count["⭐"]}`;splash(icon);sparkleSound();
      bowl.style.setProperty("--ingredients",String((count["🍓"]+count["⭐"])/5));
      if(count["🍓"]===3&&count["⭐"]===2){ready=true;game.classList.add("ready-to-stir");q("#activityInstruction").textContent="Stir the potion in a circle!";q("#activityFeedback").textContent="🥄 ↻"}
    };
    ingredients.forEach(icon=>{
      const tile=button(icon,"mix-ingredient");tile.setAttribute("aria-label",`Drag ${icon} into the potion bowl`);
      let dragging=false,startX=0,startY=0;
      tile.addEventListener("pointerdown",event=>{if(tile.classList.contains("added"))return;dragging=true;startX=event.clientX;startY=event.clientY;tile.classList.add("dragging");try{tile.setPointerCapture?.(event.pointerId)}catch{}});
      tile.addEventListener("pointermove",event=>{if(dragging)tile.style.translate=`${event.clientX-startX}px ${event.clientY-startY}px`});
      const release=event=>{if(!dragging)return;dragging=false;tile.classList.remove("dragging");tile.style.translate="";const r=bowl.getBoundingClientRect();if(event.type!=="pointercancel"&&event.clientX>=r.left-15&&event.clientX<=r.right+15&&event.clientY>=r.top-15&&event.clientY<=r.bottom+15)add(tile,icon)};
      tile.addEventListener("pointerup",release);tile.addEventListener("pointercancel",release);
      tile.addEventListener("keydown",event=>{if(event.code==="Enter"||event.code==="Space"){event.preventDefault();add(tile,icon)}});tray.append(tile)
    });
    const angleAt=event=>{const r=bowl.getBoundingClientRect();return Math.atan2(event.clientY-r.top-r.height/2,event.clientX-r.left-r.width/2)};
    bowl.addEventListener("pointerdown",event=>{if(!ready||finished)return;stirring=true;lastAngle=angleAt(event);try{bowl.setPointerCapture?.(event.pointerId)}catch{}});
    bowl.addEventListener("pointermove",event=>{if(!stirring||finished)return;const next=angleAt(event);let delta=next-lastAngle;if(delta>Math.PI)delta-=2*Math.PI;if(delta<-Math.PI)delta+=2*Math.PI;lastAngle=next;if(Math.abs(delta)>.04&&Math.abs(delta)<1.4){turn+=delta;bowl.style.setProperty("--turn",`${turn}rad`);if(Math.abs(turn)>=Math.PI*1.8){finished=true;stirring=false;game.classList.add("potion-complete");sparkleSound();round++;updateRounds(round);if(round===3)setTimeout(completeAdventure,850);else setTimeout(()=>{play();api().speak(spoken,{interrupt:true,recordedOnly:true})},850)}}});
    bowl.addEventListener("pointerup",()=>{stirring=false;lastAngle=null});bowl.addEventListener("pointercancel",()=>{stirring=false;lastAngle=null});
    game.append(recipe,bowl,tray);q("#activityInstruction").textContent="Listen, then mix the potion.";
  };
  play();
}
function renderFind(box,a){
  if(a.id!=="search")return renderXRay(box,a);
  const scenes=[
    {file:"enchanted-forest-garden.png",objects:[{icon:"🔑",name:"key",x:8,y:66},{icon:"🔔",name:"bell",x:29,y:17},{icon:"⛵",name:"boat",x:70,y:73},{icon:"🌙",name:"moon",x:91,y:61},{icon:"🌰",name:"acorn",x:31,y:84},{icon:"🐞",name:"ladybug",x:92,y:79}]},
    {file:"enchanted-search-conservatory.png",objects:[{icon:"🔑",name:"key",x:9,y:61},{icon:"🔔",name:"bell",x:74,y:14},{icon:"⛵",name:"boat",x:64,y:86},{icon:"🌙",name:"moon",x:90,y:38},{icon:"🌰",name:"acorn",x:31,y:19},{icon:"🐞",name:"ladybug",x:20,y:44}]},
    {file:"enchanted-search-observatory.png",objects:[{icon:"🔑",name:"key",x:9,y:66},{icon:"🔔",name:"bell",x:66,y:14},{icon:"⛵",name:"boat",x:50,y:34},{icon:"🌙",name:"moon",x:90,y:14},{icon:"🌰",name:"acorn",x:89,y:82},{icon:"🐞",name:"ladybug",x:17,y:44}]}
  ].sort(()=>Math.random()-.5);
  const wrap=document.createElement("div");wrap.className="search-wrap";
  const updateRounds=roundTracker(wrap),tray=document.createElement("div"),scene=document.createElement("div"),hint=button("✨ Hint","hint-button");
  tray.className="search-tray";scene.className="target-scene forest-search";hint.hidden=true;wrap.append(tray,scene,hint);box.append(wrap);
  let round=0,found=0,hintTimer;
  let targetCount=0;
  const scheduleHint=()=>{clearTimeout(hintTimer);hint.hidden=true;hintTimer=setTimeout(()=>{if(scene.isConnected&&found<targetCount)hint.hidden=false},60000)};
  const play=()=>{
    const entry=scenes[round],targets=[...entry.objects].sort(()=>Math.random()-.5).slice(0,5);
    targetCount=targets.length;
    found=0;actionCount=0;updateRounds(round);clearTimeout(hintTimer);hint.hidden=true;
    tray.innerHTML=targets.map(o=>`<span data-target="${o.name}" aria-label="Find ${o.name}">${o.icon}</span>`).join("");scene.replaceChildren();scene.style.backgroundImage="none";scene.classList.add("art-loading");
    const startingRound=round,art=new Image();
    art.onload=()=>{
      if(!scene.isConnected||round!==startingRound)return;
      scene.style.backgroundImage=`url("assets/${entry.file}")`;scene.classList.remove("art-loading");scheduleHint();
      targets.forEach(o=>{const hotspot=button("","search-hotspot");hotspot.dataset.name=o.name;hotspot.style.left=`${o.x}%`;hotspot.style.top=`${o.y}%`;hotspot.setAttribute("aria-label",`Hidden ${o.name}`);hotspot.onclick=()=>{if(hotspot.classList.contains("found"))return;hotspot.classList.add("found");tray.querySelector(`[data-target="${o.name}"]`).classList.add("found");found++;actionCount++;good(`You found the ${o.name}!`);if(found===targets.length){clearTimeout(hintTimer);round++;updateRounds(round);if(round===scenes.length)setTimeout(completeAdventure,850);else setTimeout(play,850)}};scene.append(hotspot)})
    };
    art.onerror=()=>{if(scene.isConnected){scene.classList.remove("art-loading");scene.textContent="🖼️ ⚠️"}};
    art.src=`assets/${entry.file}`;
  };
  hint.onclick=()=>{const target=scene.querySelector(".search-hotspot:not(.found)");if(!target)return;target.classList.add("hinting");setTimeout(()=>target.classList.remove("hinting"),2600);scheduleHint()};
  play();
}
function renderXRay(box,a){
  // The clean X-ray has no baked-in treasures. These six belly-safe layouts
  // really move the three objects, so the scanner and illustration agree.
  const layouts=[[[31,47],[43,39],[43,54]],[[33,39],[45,48],[32,55]],[[31,52],[42,38],[45,55]],[[34,36],[46,50],[33,54]],[[30,43],[44,38],[42,55]],[[43,53],[31,39],[45,41]]];
  const points=layouts[Math.floor(Math.random()*layouts.length)];
  const objects=[{icon:"🔑",name:"key"},{icon:"🔘",name:"button"},{icon:"🔔",name:"bell"}].map((o,i)=>({...o,x:points[i][0],y:points[i][1]}));
  const wrap=document.createElement("div");wrap.className="search-wrap xray-detective";
  const tray=document.createElement("div");tray.className="search-tray";tray.innerHTML=objects.map(o=>`<span data-target="${o.name}">${o.icon}</span>`).join("");
  const scene=document.createElement("div");scene.className="target-scene xray-search";scene.setAttribute("aria-label","Move the scanner across Pip's X-ray and hold on hidden treasures");
  const veil=document.createElement("div");veil.className="xray-veil";const reveal=document.createElement("div");reveal.className="xray-reveal";
  const lens=document.createElement("div");lens.className="xray-scan-lens";lens.textContent="🔎";scene.append(veil,reveal,lens);
  objects.forEach(o=>{const marker=document.createElement("span");marker.className="search-hotspot xray-hotspot";marker.dataset.name=o.name;marker.style.left=`${o.x}%`;marker.style.top=`${o.y}%`;marker.textContent=o.icon;marker.setAttribute("aria-label",`Hidden ${o.name}`);scene.append(marker);o.marker=marker;o.progress=0;o.found=false});
  let scanning=false,point={x:24,y:42},timer=null;
  const place=event=>{const r=scene.getBoundingClientRect();point={x:(event.clientX-r.left)/r.width*100,y:(event.clientY-r.top)/r.height*100};scene.style.setProperty("--scan-x",`${point.x}%`);scene.style.setProperty("--scan-y",`${point.y}%`);lens.style.left=`${point.x}%`;lens.style.top=`${point.y}%`;objects.forEach(o=>o.marker.classList.toggle("glimpsed",scanning&&!o.found&&Math.hypot((o.x-point.x)*1.8,o.y-point.y)<5.5))};
  const start=event=>{event.preventDefault();scanning=true;scene.classList.add("scanning");place(event);try{scene.setPointerCapture?.(event.pointerId)}catch{};
    clearInterval(timer);timer=setInterval(()=>{
      if(!scanning||!scene.isConnected){clearInterval(timer);return}
      const target=objects.find(o=>!o.found&&Math.hypot((o.x-point.x)*1.8,o.y-point.y)<4.7);
      if(!target)return;target.progress++;target.marker.style.setProperty("--scan-progress",String(target.progress/7));
      if(target.progress<7)return;target.found=true;target.marker.classList.remove("glimpsed");target.marker.classList.add("found");target.marker.textContent=target.icon;tray.querySelector(`[data-target="${target.name}"]`).classList.add("found");actionCount++;sparkleSound();q("#activityFeedback").textContent=`${target.icon} ✨`;
      if(actionCount===objects.length){scanning=false;clearInterval(timer);setTimeout(completeAdventure,850)}
    },90)
  };
  const stop=()=>{scanning=false;scene.classList.remove("scanning");objects.forEach(o=>o.marker.classList.remove("glimpsed"));clearInterval(timer);timer=null};
  scene.addEventListener("pointerdown",start);scene.addEventListener("pointermove",event=>{if(scanning)place(event)});scene.addEventListener("pointerup",stop);scene.addEventListener("pointercancel",stop);scene.addEventListener("lostpointercapture",stop);
  const hint=button("✨ Hint","hint-button");hint.hidden=true;hint.onclick=()=>{const target=objects.find(o=>!o.found);if(!target)return;target.marker.classList.add("hinting");setTimeout(()=>target.marker.classList.remove("hinting"),2700);hint.hidden=true;setTimeout(()=>{if(actionCount<objects.length)hint.hidden=false},60000)};
  setTimeout(()=>{if(scene.isConnected&&actionCount<objects.length)hint.hidden=false},60000);
  q("#activityInstruction").textContent="Move the scanner across Pip's X-ray. Hold it on each treasure.";
  wrap.append(tray,scene,hint);box.append(wrap);
}
function renderChoice(box,a){
  if(challengeVariants[a.id]&&["pattern","stable","forest","words","math"].includes(a.id))return renderChoiceSeries(box,a);
  let mistakes=0;
  if(a.id==="math"&&a.model){const model=document.createElement("div");model.className=`math-story-model ${a.operation}`;model.innerHTML=`<span>${a.model[0]}</span><b>${a.operation==="add"?"＋":"−"}</b><span>${a.model[1]}</span>`;box.append(model)}
  const options=a.choices.map((choice,index)=>({choice,correct:index===a.answer})).sort(()=>Math.random()-.5);
  options.forEach(option=>{
    const b=button(option.choice,"choice-tile");
    b.setAttribute("aria-label",choiceName(option.choice));
    b.onclick=()=>{
      const name=choiceName(option.choice);
      if(!option.correct){mistakes++;b.classList.remove("nudge");void b.offsetWidth;b.classList.add("nudge");gentleSound();api().speak(learningSpeech(a),{recordedOnly:true});return}
      b.classList.add("correct");qa(".choice-tile").forEach(x=>x.disabled=true);if(a.skill)api().recordSkill(a.skill,mistakes===0);good(mistakes?`Yes, ${name}! You listened carefully.`:`Yes, ${name}! Brilliant listening!`);setTimeout(completeAdventure,1050)
    };
    box.append(b)
  })
}

function roundTracker(box,total=3){
  const track=document.createElement("div");track.className="session-rounds";track.setAttribute("aria-label",`Round 1 of ${total}`);
  for(let i=0;i<total;i++){const pip=document.createElement("span");pip.textContent=i===0?"★":"☆";track.append(pip)}
  box.append(track);
  return round=>{track.setAttribute("aria-label",`Round ${Math.min(round+1,total)} of ${total}`);[...track.children].forEach((pip,i)=>{pip.classList.toggle("done",i<round);pip.classList.toggle("current",i===round);pip.textContent=i<round?"★":i===round?"✦":"☆"})};
}

function renderChoiceSeries(box,a){
  const tasks=[...challengeVariants[a.id]].sort(()=>Math.random()-.5).slice(0,3);
  const updateRounds=roundTracker(box),game=document.createElement("div");game.className="mini-learning-game";box.append(game);
  let round=0,mistakes=0;
  const play=()=>{
    if(!game.isConnected||activeAdventure.id!==a.id)return;
    game.replaceChildren();updateRounds(round);const task=tasks[round];Object.assign(activeAdventure,task);activityRound=round;
    q("#activityInstruction").textContent=task.instruction;
    if(a.id==="math"&&task.model){const model=document.createElement("div");model.className=`math-story-model ${task.operation}`;model.innerHTML=`<span>${task.model[0]}</span><b>${task.operation==="add"?"＋":"−"}</b><span>${task.model[1]}</span>`;game.append(model)}
    if(round>0)api().speak(a.id==="forest"||a.id==="words"?learningSpeech(activeAdventure):task.speech||task.instruction,{interrupt:true,recordedOnly:true});
    [...task.choices.map((choice,index)=>({choice,correct:index===task.answer}))].sort(()=>Math.random()-.5).forEach(option=>{
      const tile=button(option.choice,"choice-tile");tile.setAttribute("aria-label",choiceName(option.choice));
      tile.onclick=()=>{
        if(!option.correct){mistakes++;tryAgain(tile);api().speak(a.id==="forest"||a.id==="words"?learningSpeech(activeAdventure):task.speech||task.instruction,{recordedOnly:true});return}
        game.querySelectorAll("button").forEach(b=>b.disabled=true);tile.classList.add("correct");round++;sparkleSound();
        if(round===tasks.length){updateRounds(round);api().recordSkill(a.skill,mistakes===0);setTimeout(completeAdventure,650)}
        else{updateRounds(round);q("#activityFeedback").textContent="✨";setTimeout(play,650)}
      };game.append(tile);
    });
  };play();
}

function finishLearning(skill,perfect=true,delay=800){if(skill)api().recordSkill(skill,perfect);setTimeout(completeAdventure,delay)}

function renderCountCompare(box,a){
  let round=0,mistakes=0;const updateRounds=roundTracker(box),game=document.createElement("div");game.className="mini-learning-game";box.append(game);
  const used=new Set();
  const play=()=>{
    if(!game.isConnected||activeAdventure.id!==a.id)return;
    updateRounds(round);game.replaceChildren();
    let left,right,key;do{left=4+Math.floor(Math.random()*6);right=4+Math.floor(Math.random()*6);key=[left,right].sort().join("-")}while((left===right||used.has(key)));used.add(key);
    const askMore=round!==1,answer=askMore?(left>right?0:1):(left<right?0:1);
    q("#activityInstruction").textContent=`Which nest has ${askMore?"more":"fewer"} eggs?`;
    narrate(`Count the eggs. Which nest has ${askMore?"more":"fewer"} eggs?`);
    [left,right].forEach((count,index)=>{const nest=button("","egg-nest");nest.innerHTML=`<span>${"🥚".repeat(count)}</span><b>${count}</b>`;
      nest.onclick=()=>{if(index!==answer){mistakes++;tryAgain(nest);return}game.querySelectorAll("button").forEach(b=>b.disabled=true);nest.classList.add("correct");round++;updateRounds(round);q("#activityFeedback").textContent=`🥚 ${count} ✨`;sparkleSound();if(round===3)finishLearning(a.skill,mistakes===0,700);else setTimeout(play,700)};game.append(nest)});
  };play()
}

function renderTenFrame(box,a){
  let round=0,mistakes=0;const updateRounds=roundTracker(box),game=document.createElement("div");game.className="mini-learning-game";box.append(game);
  const targets=[11,12,13,14,15,16,17,18,19].sort(()=>Math.random()-.5).slice(0,3);
  const play=()=>{
    if(!game.isConnected||activeAdventure.id!==a.id)return;
    updateRounds(round);game.replaceChildren();let count=0;const target=targets[round],frame=document.createElement("div");frame.className="double-ten-frame";
    const countLabel=document.createElement("strong");countLabel.className="build-count";countLabel.textContent="0";
    for(let i=0;i<20;i++){const cell=button("","ten-cell");cell.onclick=()=>{
      if(cell.classList.contains("filled"))return;if(count>=target){mistakes++;tryAgain(cell);return}
      cell.classList.add("filled");cell.textContent="🥚";count++;countLabel.textContent=count;
      if(count===10)api().speak("One full ten! Now add the extra ones.",{recordedOnly:true});
      if(count===target){frame.querySelectorAll("button").forEach(b=>b.disabled=true);round++;updateRounds(round);q("#activityFeedback").textContent=`🔟 + ${target-10} = ${target} ✨`;sparkleSound();if(round===3)finishLearning(a.skill,mistakes===0,850);else setTimeout(play,850)}
    };frame.append(cell)}game.append(countLabel,frame);q("#activityInstruction").textContent=`Build ${target}: one ten and ${target-10} more.`;narrate(`Build ${target}. Fill one nest with ten eggs, then add ${target-10} more.`);
  };play()
}

function renderShapes(box,a){
  const tasks=[{name:"triangle",icon:"🔺",choices:[["🔺","triangle"],["🟦","square"],["⚪","circle"]]},{name:"rectangle",icon:"▭",choices:[["⚪","circle"],["▭","rectangle"],["🔺","triangle"]]},{name:"hexagon",icon:"⬡",choices:[["⬡","hexagon"],["🟦","square"],["🔺","triangle"]]}];
  let round=0,mistakes=0;const ordered=[...tasks].sort(()=>Math.random()-.5),updateRounds=roundTracker(box),game=document.createElement("div");game.className="mini-learning-game";box.append(game);
  const play=()=>{
    if(!game.isConnected||activeAdventure.id!==a.id)return;
    updateRounds(round);game.replaceChildren();const task=ordered[round],window=document.createElement("div");window.className="broken-window";window.dataset.answer=task.name;window.textContent="?";
    const choices=document.createElement("div");choices.className="shape-choices";let finished=false;
    const place=(tile,name,icon)=>{if(finished)return;if(name!==task.name){mistakes++;tryAgain(tile);return}finished=true;window.textContent=icon;window.classList.add("repaired");tile.classList.add("correct");choices.querySelectorAll("button").forEach(b=>b.disabled=true);sparkleSound();round++;updateRounds(round);q("#activityFeedback").textContent="🏰 ✨";if(round===3)finishLearning(a.skill,mistakes===0,850);else setTimeout(play,850)};
    [...task.choices].sort(()=>Math.random()-.5).forEach(([icon,name])=>{
      const tile=button(icon,"shape-piece");tile.dataset.name=name;tile.setAttribute("aria-label",`Drag the ${name} into the window`);
      let dragging=false,dragged=false,startX=0,startY=0;
      tile.addEventListener("click",()=>{if(dragged){dragged=false;return}place(tile,name,icon)});
      tile.addEventListener("pointerdown",event=>{if(finished)return;dragging=true;dragged=false;startX=event.clientX;startY=event.clientY;tile.classList.add("dragging");try{tile.setPointerCapture?.(event.pointerId)}catch{}});
      tile.addEventListener("pointermove",event=>{if(dragging){if(Math.hypot(event.clientX-startX,event.clientY-startY)>8)dragged=true;tile.style.translate=`${event.clientX-startX}px ${event.clientY-startY}px`}});
      const release=event=>{if(!dragging)return;dragging=false;tile.classList.remove("dragging");tile.style.translate="";const r=window.getBoundingClientRect();if(event.type!=="pointercancel"&&event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom)place(tile,name,icon)};
      tile.addEventListener("pointerup",release);tile.addEventListener("pointercancel",release);
      tile.addEventListener("keydown",event=>{if((event.code==="Enter"||event.code==="Space")&&!finished){event.preventDefault();place(tile,name,icon)}});
      choices.append(tile);
    });
    game.append(window,choices);q("#activityInstruction").textContent=`Find the ${task.name}. Tap it or move it into the window.`;
    activityNarration=`Find the ${task.name}. Tap it to repair the window.`;
    api().speak(activityNarration,{recordedOnly:true});
  };play()
}

function renderMeasure(box,a){
  const tasks=[{ask:"longer",kind:"bandage",values:[42,76]},{ask:"shorter",kind:"ribbon",values:[70,38]},{ask:"holds more",kind:"potion bottle",values:[45,78]}].sort(()=>Math.random()-.5);let round=0,mistakes=0;const updateRounds=roundTracker(box),game=document.createElement("div");game.className="mini-learning-game";box.append(game);
  const play=()=>{game.replaceChildren();updateRounds(round);const task=tasks[round],answer=task.ask==="shorter"?(task.values[0]<task.values[1]?0:1):(task.values[0]>task.values[1]?0:1);task.values.forEach((value,index)=>{const b=button("","measure-choice");const visual=document.createElement("span");visual.style.setProperty("--measure",`${value}%`);visual.className=task.kind.includes("bottle")?"bottle-measure":"length-measure";b.append(visual);b.onclick=()=>{if(index!==answer){mistakes++;tryAgain(b);return}game.querySelectorAll("button").forEach(tile=>tile.disabled=true);b.classList.add("correct");round++;good(`Yes, this ${task.kind} ${task.ask==="holds more"?"holds more":`is ${task.ask}`}!`);updateRounds(round);if(round===tasks.length)finishLearning(a.skill,mistakes===0);else setTimeout(play,700)};game.append(b)});q("#activityInstruction").textContent=`Which ${task.kind} ${task.ask==="holds more"?"holds more":`is ${task.ask}`}?`;narrate(q("#activityInstruction").textContent)};play()
}

function renderSort(box,a){
  const items=[{icon:"🍎",group:"food"},{icon:"🥕",group:"food"},{icon:"🩹",group:"care"},{icon:"🩺",group:"care"},{icon:"⚽",group:"play"},{icon:"🧸",group:"play"}].sort(()=>Math.random()-.5);
  let index=0,finished=false;const game=document.createElement("div");game.className="sort-game";
  const item=button("","sort-item");item.setAttribute("aria-label","Drag this supply into the matching basket");
  const baskets=document.createElement("div");baskets.className="sort-baskets";box.append(game);game.append(item,baskets);
  const groups=[{id:"food",icon:"🍽️",name:"food"},{id:"care",icon:"🏥",name:"care tools"},{id:"play",icon:"🎈",name:"play things"}];
  groups.forEach(group=>{const basket=button(`${group.icon} ${group.name}`,"sort-basket");basket.dataset.group=group.id;basket.setAttribute("aria-label",group.name);basket.innerHTML=`<span>${group.icon}</span><small>${group.name}</small><b>0</b><i class="sort-stored"></i>`;baskets.append(basket)});
  const show=()=>{item.textContent=items[index].icon;item.dataset.group=items[index].group;q("#activityInstruction").textContent="Drag it into the matching basket."};
  const place=group=>{if(finished)return;const current=items[index];if(group!==current.group){tryAgain(item);return}const basket=baskets.querySelector(`[data-group="${group}"]`);basket.querySelector("b").textContent=String(Number(basket.querySelector("b").textContent)+1);basket.querySelector(".sort-stored").textContent+=current.icon;basket.classList.remove("received");void basket.offsetWidth;basket.classList.add("received");sparkleSound();index++;if(index===items.length){finished=true;item.classList.add("sorted");finishLearning(a.skill,true,900)}else show()};
  let dragging=false,startX=0,startY=0;
  item.addEventListener("pointerdown",event=>{if(finished)return;dragging=true;startX=event.clientX;startY=event.clientY;item.classList.add("dragging");try{item.setPointerCapture?.(event.pointerId)}catch{}});
  item.addEventListener("pointermove",event=>{if(dragging)item.style.translate=`${event.clientX-startX}px ${event.clientY-startY}px`});
  const release=event=>{if(!dragging)return;dragging=false;item.classList.remove("dragging");item.style.translate="";if(event.type==="pointercancel")return;const basket=[...baskets.children].find(b=>{const r=b.getBoundingClientRect();return event.clientX>=r.left&&event.clientX<=r.right&&event.clientY>=r.top&&event.clientY<=r.bottom});if(basket)place(basket.dataset.group)};
  item.addEventListener("pointerup",release);item.addEventListener("pointercancel",release);
  item.addEventListener("keydown",event=>{if((event.code==="Enter"||event.code==="Space")&&!finished){event.preventDefault();place(items[index].group)}});
  show();narrate("Where does this belong? Food, care tools, or play things?")
}

function renderGuidedTrace(box,a){
  const letters=[{glyph:"M",paths:["M20 84 L20 16 L50 55 L80 16 L80 84"]},{glyph:"A",paths:["M17 84 L50 16","M50 16 L83 84","M32 57 L68 57"]},{glyph:"S",paths:["M77 23 C63 11 36 12 24 29 C12 45 36 49 53 52 C84 58 87 74 67 85 C50 94 29 86 20 77"]}],numbers=[{glyph:"2",paths:["M19 29 C22 13 47 10 65 19 C85 29 81 45 65 61 L21 84 L82 84"]},{glyph:"7",paths:["M18 20 L82 20 L42 86"]},{glyph:"9",paths:["M70 48 C62 59 42 60 27 47 C12 33 21 17 42 15 C64 13 77 29 70 51 L51 86"]}],tasks=[...(a.skill==="letterFormation"?letters:numbers)].sort(()=>Math.random()-.5);
  const updateRounds=roundTracker(box),stage=document.createElement("div");stage.className="trace-stage";box.append(stage);let round=0;
  const play=()=>{
    stage.replaceChildren();updateRounds(round);const task=tasks[round],game=document.createElement("div");game.className="guided-trace-game";game.setAttribute("aria-label",`Trace ${task.glyph} with a finger or stylus`);
    game.innerHTML=`<svg class="trace-letter" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${task.paths.map(path=>`<path class="trace-guide-path" d="${path}"/><path class="trace-ink-path" d="${path}"/>`).join("")}</svg>`;stage.append(game);
    const guides=[...game.querySelectorAll(".trace-guide-path")],inks=[...game.querySelectorAll(".trace-ink-path")],lengths=guides.map(guide=>guide.getTotalLength());
    const checkpoints=guides.flatMap((guide,stroke)=>Array.from({length:task.paths.length===1?13:stroke===2?5:7},(_,point)=>{const total=task.paths.length===1?12:stroke===2?4:6,p=guide.getPointAtLength(lengths[stroke]*point/total);return{x:p.x,y:p.y,stroke,point,total}}));
    inks.forEach((ink,i)=>{ink.style.strokeDasharray=String(lengths[i]);ink.style.strokeDashoffset=String(lengths[i])});
    const dots=checkpoints.map((p,i)=>{const dot=document.createElement("span");dot.className=`trace-dot ${i===0?"active":""}`;dot.dataset.stroke=p.stroke;dot.textContent=p.point===0?"★":"·";dot.style.left=`${p.x}%`;dot.style.top=`${p.y}%`;game.append(dot);return dot});
    let next=0,drawing=false,last=null,finished=false;
    const point=event=>{const r=game.getBoundingClientRect();return{x:(event.clientX-r.left)/r.width*100,y:(event.clientY-r.top)/r.height*100}};
    const near=(p,i)=>Math.hypot(p.x-checkpoints[i].x,p.y-checkpoints[i].y)<8;
    const reach=()=>{const reached=checkpoints[next];dots[next].classList.remove("active");dots[next].classList.add("done");inks[reached.stroke].style.strokeDashoffset=String(lengths[reached.stroke]*(1-reached.point/reached.total));next++;if(dots[next]){dots[next].classList.add("active");if(checkpoints[next].stroke!==reached.stroke)drawing=false}else{finished=true;drawing=false;round++;updateRounds(round);good(`${task.glyph} is glowing!`);if(round===tasks.length)finishLearning(a.skill,true,1000);else setTimeout(play,950)}};
    game.addEventListener("pointerdown",event=>{if(finished)return;const p=point(event);if(!near(p,next)&&!(next>0&&checkpoints[next-1].stroke===checkpoints[next].stroke&&near(p,next-1)))return;event.preventDefault();drawing=true;last=p;try{game.setPointerCapture?.(event.pointerId)}catch{};if(near(p,next))reach()});
    game.addEventListener("pointermove",event=>{if(!drawing||finished)return;event.preventDefault();const p=point(event);while(drawing&&next<checkpoints.length&&near(p,next))reach();last=p});
    const stop=()=>{drawing=false;last=null};game.addEventListener("pointerup",stop);game.addEventListener("pointercancel",stop);
    q("#activityInstruction").textContent=`Start at the star. Follow the dots to write ${task.glyph}.`;narrate(q("#activityInstruction").textContent);
  };play();
}
function renderTrace(box,a){const board=document.createElement("div");board.className="trace-board";board.innerHTML=`<div class="trace-glyph">${a.glyph}</div><canvas class="trace-canvas"></canvas>`;box.append(board);const canvas=board.querySelector("canvas"),ctx=canvas.getContext("2d");let drawing=false,last=null;const resize=()=>{canvas.width=board.clientWidth*devicePixelRatio;canvas.height=board.clientHeight*devicePixelRatio;ctx.scale(devicePixelRatio,devicePixelRatio);ctx.strokeStyle="#8a62dc";ctx.lineWidth=18;ctx.lineCap="round"};resize();const move=e=>{if(!drawing)return;e.preventDefault();const r=canvas.getBoundingClientRect(),p=[(e.clientX-r.left)*canvas.width/r.width/devicePixelRatio,(e.clientY-r.top)*canvas.height/r.height/devicePixelRatio];if(last){ctx.beginPath();ctx.moveTo(...last);ctx.lineTo(...p);ctx.stroke();tracePoints++}last=p;if(tracePoints>28){drawing=false;good("Your trail is glowing!");setTimeout(completeAdventure,600)}};canvas.onpointerdown=e=>{drawing=true;last=null;canvas.setPointerCapture(e.pointerId);move(e)};canvas.onpointermove=move;canvas.onpointerup=()=>{drawing=false;last=null}}
function renderMemory(box){const symbols=["🐶","🐱","🦊","🐰","🐶","🐱","🦊","🐰"].sort(()=>Math.random()-.5),grid=document.createElement("div");grid.className="memory-grid";symbols.forEach((s,i)=>{const b=button(s,"memory-card");b.onclick=()=>{if(memoryOpen.length===2||b.classList.contains("open")||b.classList.contains("matched"))return;b.classList.add("open");memoryOpen.push({b,s});if(memoryOpen.length===2)setTimeout(()=>{const[x,y]=memoryOpen;if(x.s===y.s){x.b.classList.add("matched");y.b.classList.add("matched");memoryMatched++;good("A matching pair!");if(memoryMatched===4)setTimeout(completeAdventure,500)}else{x.b.classList.remove("open");y.b.classList.remove("open")}memoryOpen=[]},650)};grid.append(b)});box.append(grid)}
function renderColor(box){
  const templates=[{id:"unicorn",icon:"🦄",file:"coloring-unicorn-v2.png"},{id:"butterfly",icon:"🦋",file:"coloring-butterfly-v2.png"},{id:"castle",icon:"🏰",file:"coloring-castle-v2.png"},{id:"fox",icon:"🦊",file:"coloring-fox-v2.png"},{id:"dragon",icon:"🐉",file:"coloring-dragon.png"},{id:"bunny",icon:"🐰",file:"coloring-bunny.png"},{id:"puppy",icon:"🐶",file:"coloring-puppy-v1.png"},{id:"kitten",icon:"🐱",file:"coloring-kitten-v1.png"},{id:"owl",icon:"🦉",file:"coloring-owl-v1.png"},{id:"panda",icon:"🐼",file:"coloring-panda-v1.png"},{id:"pony",icon:"🐴",file:"coloring-pony-v1.png"},{id:"bear",icon:"🐻",file:"coloring-bear-v1.png"}];
  let templateIndex=0,color="#ff5fa2",size=22,drawing=false,last=null,rewarded=false,panMode=false,panning=false,panX=0,panStart=0,panOrigin=0,canvasVersion=0,paintReady=true,paintTouched=false;
  const studio=document.createElement("div");studio.className="coloring-studio";
  const tabs=document.createElement("div");tabs.className="coloring-tabs";
  const canvasWrap=document.createElement("div");canvasWrap.className="coloring-canvas-wrap";
  const paint=document.createElement("canvas"),outline=document.createElement("canvas");paint.className="paint-canvas";outline.className="outline-canvas";canvasWrap.append(paint,outline);
  const viewTools=document.createElement("div");viewTools.className="coloring-view-tools";
  const fit=button("","coloring-view-button"),hand=button("","coloring-view-button");
  fit.innerHTML='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 19V7h12M30 7h12v12M42 29v12H30M18 41H6V29" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><rect x="14" y="15" width="20" height="18" rx="3" fill="#ffe6a5" stroke="currentColor" stroke-width="2"/><path d="m17 29 6-7 5 5 3-3" fill="none" stroke="#54a99e" stroke-width="2"/></svg>';
  hand.innerHTML='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 11 2 16l5 5m-5-5h13m26-5 5 5-5 5m5-5H33" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 35V19a3 3 0 0 1 6 0v8-3a3 3 0 0 1 6 0v3a3 3 0 0 1 6 0v7c0 6-5 10-11 10h-3c-5 0-8-4-10-8l-3-5a3 3 0 0 1 5-3Z" fill="#ffe0b4" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
  fit.setAttribute("aria-label","Show the whole coloring page");hand.setAttribute("aria-label","Slide the coloring page sideways");
  const placePan=()=>{const overflow=Math.max(0,(paint.getBoundingClientRect().width-canvasWrap.getBoundingClientRect().width)/2);panX=Math.max(-overflow,Math.min(overflow,panX));canvasWrap.style.setProperty("--pan-x",`${panX}px`)};
  fit.onclick=()=>{canvasWrap.classList.toggle("fit-page");fit.classList.toggle("selected",canvasWrap.classList.contains("fit-page"));fit.setAttribute("aria-label",canvasWrap.classList.contains("fit-page")?"Make coloring page large again":"Show the whole coloring page");panMode=false;hand.classList.remove("selected");paint.style.pointerEvents="auto";panX=0;placePan()};
  hand.onclick=()=>{panMode=!panMode;hand.classList.toggle("selected",panMode);paint.style.pointerEvents=panMode?"none":"auto"};
  canvasWrap.onpointerdown=e=>{if(!panMode||e.target.closest("button"))return;panning=true;panStart=e.clientX;panOrigin=panX;canvasWrap.setPointerCapture?.(e.pointerId)};
  canvasWrap.onpointermove=e=>{if(!panning)return;e.preventDefault();panX=panOrigin+e.clientX-panStart;placePan()};
  canvasWrap.onpointerup=canvasWrap.onpointercancel=()=>{panning=false};
  viewTools.append(fit,hand);canvasWrap.append(viewTools);
  const toolbar=document.createElement("div");toolbar.className="coloring-toolbar";
  const colors=["#ff5fa2","#8a63df","#21b99a","#ffd23f","#238ee8","#ff7a32","#4b2a83"];
  colors.forEach(c=>{const b=button("","paint-dot");b.style.background=c;b.setAttribute("aria-label",`Choose color ${c}`);b.onclick=()=>{color=c;qa(".paint-dot").forEach(x=>x.classList.remove("selected"));b.classList.add("selected")};toolbar.append(b)});
  const custom=document.createElement("input");custom.type="color";custom.value=color;custom.className="custom-color";custom.setAttribute("aria-label","Choose any color");custom.oninput=()=>color=custom.value;
  const brush=document.createElement("input");brush.type="range";brush.min=8;brush.max=46;brush.value=size;brush.className="brush-size";brush.setAttribute("aria-label","Brush size");brush.oninput=()=>size=Number(brush.value);
  const eraser=button("","tool-button");eraser.innerHTML='<svg viewBox="0 0 56 56" width="38" height="38" aria-hidden="true"><path d="M12 34 31 12 Q34 9 38 12 L49 23 Q52 26 49 30 L32 48 H23Z" fill="#f49db9" stroke="#6c4d91" stroke-width="3"/><path d="M12 34 23 48 H32 L38 41 20 25Z" fill="#e9e9f3" stroke="#6c4d91" stroke-width="3"/></svg>';eraser.setAttribute("aria-label","Use eraser");eraser.title="Eraser";eraser.onclick=()=>color="erase";
  const clear=button("↺","tool-button");clear.setAttribute("aria-label","Clear picture");clear.title="Clear picture";clear.onclick=()=>{paintTouched=true;paintReady=true;paint.getContext("2d").clearRect(0,0,paint.width,paint.height);paintCount=0};
  const done=button("✓","done-coloring-button");done.setAttribute("aria-label","Finish and save coloring page");done.title="Finish and save";done.onclick=()=>{saveColoring();completeAdventure()};
  toolbar.append(custom,brush,eraser,clear,done);
  const setupCanvas=()=>{
    const w=700,h=430,id=templates[templateIndex].id,version=++canvasVersion;paint.width=outline.width=w;paint.height=outline.height=h;paintTouched=false;
    const octx=outline.getContext("2d");
    octx.clearRect(0,0,w,h);
    const art=new Image();
    art.onload=()=>{if(templates[templateIndex].id===id){octx.clearRect(0,0,w,h);octx.drawImage(art,0,0,w,h)}};
    art.onerror=()=>{if(templates[templateIndex].id===id)drawColoringOutline(octx,id,w,h)};
    art.src=`assets/${templates[templateIndex].file}`;
    const saved=gameState().story?.coloringPages?.[id];paintReady=!saved;if(saved){const img=new Image();img.onload=()=>{if(version!==canvasVersion)return;if(!paintTouched)paint.getContext("2d").drawImage(img,0,0,w,h);paintReady=true};img.onerror=()=>{if(version===canvasVersion)paintReady=true};img.src=saved}
  };
  templates.forEach((t,i)=>{const b=button(t.icon,"template-button");b.setAttribute("aria-label",`${t.id} coloring page`);b.onclick=()=>{saveColoring();templateIndex=i;panX=0;placePan();qa(".template-button").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");setupCanvas()};tabs.append(b)});tabs.firstChild.classList.add("selected");
  const morePages=button("▼","coloring-more-pages");morePages.setAttribute("aria-label","Show more coloring pages");morePages.onclick=()=>{const atEnd=tabs.scrollTop+tabs.clientHeight>=tabs.scrollHeight-8;tabs.scrollTo({top:atEnd?0:Math.min(tabs.scrollTop+tabs.clientHeight*.7,tabs.scrollHeight),behavior:"smooth"})};
  tabs.addEventListener("scroll",()=>{const atEnd=tabs.scrollTop+tabs.clientHeight>=tabs.scrollHeight-8;morePages.textContent=atEnd?"▲":"▼";morePages.setAttribute("aria-label",atEnd?"Show first coloring pages":"Show more coloring pages")});
  const point=e=>{const r=paint.getBoundingClientRect();return[(e.clientX-r.left)*paint.width/r.width,(e.clientY-r.top)*paint.height/r.height]};
  const move=e=>{if(!drawing)return;e.preventDefault();const p=point(e),ctx=paint.getContext("2d");ctx.lineCap="round";ctx.lineJoin="round";ctx.lineWidth=size;if(color==="erase"){ctx.globalCompositeOperation="destination-out";ctx.strokeStyle="#000"}else{ctx.globalCompositeOperation="source-over";ctx.strokeStyle=color}if(last){ctx.beginPath();ctx.moveTo(...last);ctx.lineTo(...p);ctx.stroke();paintCount++;if(paintCount>35&&!rewarded){rewarded=true;good("Your picture is beautiful! Keep coloring as long as you like.")}}last=p};
  paint.onpointerdown=e=>{e.preventDefault();drawing=true;paintTouched=true;paintReady=true;last=point(e);paint.setPointerCapture(e.pointerId);const ctx=paint.getContext("2d");ctx.globalCompositeOperation=color==="erase"?"destination-out":"source-over";ctx.fillStyle=color==="erase"?"#000":color;ctx.beginPath();ctx.arc(last[0],last[1],size/2,0,Math.PI*2);ctx.fill();paintCount++};paint.onpointermove=move;paint.onpointerup=()=>{drawing=false;last=null;saveColoring()};paint.onpointercancel=()=>{drawing=false;last=null};
  function saveColoring(){if(!paintReady)return;ensureStory();const s=gameState();s.story.coloringPages=s.story.coloringPages||{};try{s.story.coloringPages[templates[templateIndex].id]=paint.toDataURL("image/webp",.72);api().save()}catch{}}
  studio.append(tabs,canvasWrap,toolbar,morePages);box.append(studio);setupCanvas();q("#activityInstruction").textContent="Choose a picture. Color with your finger or stylus."
}

function drawColoringOutline(ctx,id,w,h){
  ctx.clearRect(0,0,w,h);ctx.strokeStyle="#503c68";ctx.lineWidth=7;ctx.lineCap="round";ctx.lineJoin="round";
  const path=d=>{const p=new Path2D(d);ctx.stroke(p)};
  if(id==="unicorn"){path("M210 335 C150 290 145 185 210 135 C265 92 360 102 414 160 C472 222 451 318 382 347 C325 371 256 363 210 335 Z");path("M223 150 C168 112 138 72 151 42 C203 66 241 97 252 129 Z");path("M366 139 C399 87 442 69 474 82 C459 126 426 157 391 169 Z");path("M292 111 L326 20 L352 119 Z");ctx.beginPath();ctx.arc(278,211,11,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.arc(378,211,11,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(292,278);ctx.quadraticCurveTo(333,309,374,278);ctx.stroke();}
  else if(id==="butterfly"){path("M350 120 C279 35 121 47 113 163 C108 234 195 247 278 227 C209 275 176 363 251 389 C305 408 332 329 350 252 Z");path("M350 120 C421 35 579 47 587 163 C592 234 505 247 422 227 C491 275 524 363 449 389 C395 408 368 329 350 252 Z");path("M333 105 C333 70 367 70 367 105 L367 332 C367 365 333 365 333 332 Z");ctx.beginPath();ctx.moveTo(338,94);ctx.quadraticCurveTo(304,48,279,38);ctx.moveTo(362,94);ctx.quadraticCurveTo(396,48,421,38);ctx.stroke();}
  else if(id==="castle"){path("M145 360 L145 166 L219 166 L219 104 L285 104 L285 180 L415 180 L415 104 L481 104 L481 166 L555 166 L555 360 Z");path("M132 166 L182 93 L232 166 Z");path("M272 104 L318 35 L364 104 Z");path("M402 104 L448 35 L494 104 Z");ctx.beginPath();ctx.arc(350,360,58,Math.PI,Math.PI*2);ctx.stroke();for(const x of [185,318,448,515]){ctx.strokeRect(x-15,220,30,50)}}
  else{path("M198 330 C145 271 166 157 261 120 C342 89 454 126 489 216 C519 292 456 367 359 369 C295 370 236 362 198 330 Z");path("M236 137 L177 38 L304 105 Z");path("M408 124 L503 54 L473 179 Z");path("M477 276 C578 250 590 333 533 367 C487 394 438 367 420 342");ctx.beginPath();ctx.arc(292,213,12,0,Math.PI*2);ctx.arc(405,213,12,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(314,284);ctx.quadraticCurveTo(355,316,396,284);ctx.stroke()}
}

function nextUnlockAfter(stars){const options=[...adventures.map(a=>({name:a.title,stars:adventureUnlocks[a.id]||0})),...outfits].filter(item=>item.stars>stars).sort((a,b)=>a.stars-b.stars);return options[0]}
function completeAdventure(){
  const s=gameState();ensureStory();const careCase=activeAdventure.careCase,first=!s.story.completedActivities.includes(activeAdventure.id);if(first)s.story.completedActivities.push(activeAdventure.id);
  s.story.completedCareCases=s.story.completedCareCases||[];
  const newCareCase=Boolean(careCase&&!s.story.completedCareCases.includes(careCase.ailment));if(newCareCase)s.story.completedCareCases.push(careCase.ailment);
  s.story.varietyRun=s.story.varietyRun||[];if(!s.story.varietyRun.includes(activeAdventure.id))s.story.varietyRun.push(activeAdventure.id);
  let earned=first||newCareCase?4:1,gem=0,bonus=false;if(s.story.varietyRun.length>=3){earned+=4;gem=1;bonus=true;s.story.varietyRun=[];s.gems+=1}
  s.stars+=earned;s.missions+=1;api().save();
  const rewardPatient=q("#rewardPatient");
  rewardPatient.classList.toggle("care-reward-photo",Boolean(careCase));
  rewardPatient.dataset.animal=careCase?.animal||"";
  rewardPatient.textContent=careCase?"":activeAdventure.patient;
  rewardPatient.setAttribute("aria-label",careCase?`${careCase.name} feels happy`:"Happy patient");
  q("#activityRewardTitle").textContent=activeAdventure.careCase?`${activeAdventure.careCase.name} feels wonderful!`:`${activeAdventure.title} complete!`;
  q("#activityRewardStory").textContent=bonus?"Three different adventures completed! You earned a Variety Bonus and a magic gem.":first?"A new adventure has been added to Annabeth's kingdom book.":newCareCase?"Another animal story is complete. More adventures are opening!":"A favorite adventure is always ready to play again.";
  q("#activityEarnedStars").textContent=earned;q("#activityGemReward").hidden=!gem;
  const next=nextUnlockAfter(s.stars);q("#unlockProgress").textContent=next?`${next.stars-s.stars} more stars until ${next.name}.`:"Every adventure and wardrobe reward is unlocked!";
  q("#nextAdventureButton").textContent=careCase?"🐾 Help the next patient":"🗺️ Choose another adventure";
  q("#replayActivityButton").textContent=careCase?"🗺️ Adventure map":"🔁 Play this one again";
  q("#nextAdventureButton").onclick=careCase?()=>startAdventure("paw"):openWorld;
  q("#replayActivityButton").onclick=careCase?openWorld:()=>startAdventure(activeAdventure.id);
  const samePatient=q("#samePatientButton");samePatient.hidden=!careCase;if(careCase)samePatient.textContent=`🔁 Help ${careCase.name} again`;
  api().showScreen("activityRewardScreen");api().confetti("#activityConfetti");api().speak(bonus?`Wonderful work, Doctor Annabeth! Variety bonus! You earned ${earned} stars and a magic gem.`:`Wonderful work, Doctor Annabeth! You earned ${earned} stars.`,{recordedOnly:true})
}

let activeDressupCategory="head";
function ensureCustomLook(){ensureStory();const s=gameState();s.story.customLook={head:"none",clothes:"lavender",jewelry:"none",shoes:"socks",ribbon:"none",medical:"stethoscope",...(s.story.customLook||{})};return s.story.customLook}
// Each illustrated item is cropped from its original transparent sheet, then
// placed in the same 1024×1536 coordinate system as the full-body avatar.
// The old full-screen CSS backgrounds scaled unrelated 3×2 sheets and put
// crowns over eyes, necklaces off shoulders, and boots away from feet.
const wardrobeParts={
  head:{
    mouse:{file:"annabeth-headwear.png",crop:[0,155,320,245],place:[245,12,535,275]},
    tiara:{file:"annabeth-headwear.png",crop:[365,118,305,250],place:[305,10,415,230]},
    flowers:{file:"annabeth-headwear.png",crop:[680,155,344,235],place:[230,0,565,260]},
    starcrown:{file:"annabeth-headwear.png",crop:[0,775,335,295],place:[265,0,495,245]},
    wizardhat:{file:"annabeth-headwear.png",crop:[340,535,370,565],place:[245,-44,555,345]}
  },
  shoes:{
    socks:{file:"annabeth-shoes.png",crop:[0,470,345,230],place:[160,1300,630,215]},
    sneakers:{file:"annabeth-shoes.png",crop:[345,430,345,270],place:[260,1300,500,205]},
    purple:{file:"annabeth-shoes.png",crop:[680,385,344,310],place:[260,1240,500,265]},
    gold:{file:"annabeth-shoes.png",crop:[0,885,345,385],place:[260,1230,500,275]},
    rain:{file:"annabeth-shoes.png",crop:[345,865,330,410],place:[260,1215,500,290]},
    slippers:{file:"annabeth-shoes.png",crop:[680,1040,344,235],place:[250,1330,520,175]}
  },
  jewelry:{
    heart:{file:"annabeth-accessories.png",crop:[20,225,320,335],place:[320,520,385,245]},
    pearls:{file:"annabeth-accessories.png",crop:[350,210,330,255],place:[315,515,395,210]},
    star:{file:"annabeth-accessories.png",crop:[685,225,330,335],place:[320,520,385,245]}
  },
  medical:{
    stethoscope:{file:"annabeth-medical.png",crop:[55,365,285,385],place:[332,535,360,420]},
    gloves:[
      {file:"annabeth-medical.png",crop:[340,730,125,250],place:[90,790,130,225]},
      {file:"annabeth-medical.png",crop:[565,730,125,250],place:[730,790,130,225]}
    ],
    bag:{vector:true,place:[730,830,230,255]}
  },
  ribbon:{
    pink:{file:"annabeth-accessories.png",crop:[40,755,305,415],place:[735,170,175,190]},
    purple:{file:"annabeth-accessories.png",crop:[350,755,330,415],place:[735,170,175,190]},
    rainbow:{file:"annabeth-accessories.png",crop:[690,755,325,415],place:[735,170,175,190]}
  }
};
function renderDressupLayers(look,svg){
  const ns="http://www.w3.org/2000/svg";svg.replaceChildren();
  for(const category of ["shoes","jewelry","medical","head","ribbon"]){
    const part=wardrobeParts[category][look[category]];if(!part)continue;
    for(const piece of Array.isArray(part)?part:[part]){
      if(piece.vector){const bag=document.createElementNS(ns,"svg");bag.setAttribute("x",piece.place[0]);bag.setAttribute("y",piece.place[1]);bag.setAttribute("width",piece.place[2]);bag.setAttribute("height",piece.place[3]);bag.setAttribute("viewBox","0 0 230 255");bag.innerHTML='<path d="M62 75Q60 25 115 25Q170 25 168 75" fill="none" stroke="#784890" stroke-width="17"/><rect x="17" y="69" width="196" height="167" rx="32" fill="#f276a2" stroke="#784890" stroke-width="9"/><rect x="28" y="88" width="174" height="132" rx="24" fill="#fc9abd"/><path d="M101 112h28v24h24v28h-24v24h-28v-24H77v-28h24z" fill="#fff" stroke="#e778a4" stroke-width="4"/><path d="M24 185Q112 220 206 185" fill="none" stroke="#fff8" stroke-width="8"/>';svg.append(bag);continue}
      const layer=document.createElementNS(ns,"svg"),image=document.createElementNS(ns,"image");
      const [cx,cy,cw,ch]=piece.crop,[x,y,w,h]=piece.place;
      layer.setAttribute("x",category==="ribbon"&&look.head==="wizardhat"?x+25:x);layer.setAttribute("y",category==="ribbon"&&look.head==="wizardhat"?y+130:y);layer.setAttribute("width",w);layer.setAttribute("height",h);layer.setAttribute("viewBox",`${cx} ${cy} ${cw} ${ch}`);layer.setAttribute("preserveAspectRatio","none");
      image.setAttribute("href",`assets/${piece.file}`);image.setAttribute("width","1024");image.setAttribute("height","1536");layer.append(image);svg.append(layer);
    }
  }
}
function renderActivityAvatar(){
  ensureStory();q("#activityAvatarReady").dataset.outfit=selectedCompleteOutfit();
}
function renderDressup(){
  const look=ensureCustomLook(),s=gameState(),categories=q("#dressupCategories"),choices=q("#dressupChoices");categories.replaceChildren();
  Object.keys(dressupItems).forEach(category=>{const b=button(dressupCategoryNames[category],"dressup-category");b.classList.toggle("selected",category===activeDressupCategory);b.onclick=()=>{activeDressupCategory=category;renderDressup()};categories.append(b)});
  choices.replaceChildren();dressupItems[activeDressupCategory].forEach(item=>{const unlocked=s.stars>=item.stars&&(!item.gems||s.gems>=item.gems),b=button("","dressup-choice");b.dataset.category=activeDressupCategory;b.dataset.item=item.id;b.classList.toggle("selected",look[activeDressupCategory]===item.id);b.classList.toggle("locked",!unlocked);const need=item.gems&&s.gems<item.gems?`${item.gems} gems`:`${item.stars} stars`;b.innerHTML=`<span>${unlocked&&activeDressupCategory==="clothes"?"":unlocked?item.icon:"🔒"}</span><small>${unlocked?item.name:need}</small>`;b.onclick=()=>{if(!unlocked){api().speak(item.gems&&s.gems<item.gems?`${item.gems-s.gems} more magic gems to unlock ${item.name}.`:`${item.stars-s.stars} more stars to unlock ${item.name}.`,{recordedOnly:true});return}look[activeDressupCategory]=item.id;s.story.currentOutfit="custom";api().save();sparkleSound();renderDressup()};choices.append(b)});
  q("#dressupCharacter").dataset.clothes=look.clothes;q("#dressupShoes").dataset.item=look.shoes;q("#dressupJewelry").dataset.item=look.jewelry;q("#dressupMedical").dataset.item=look.medical;q("#dressupHead").dataset.item=look.head;q("#dressupRibbon").dataset.item=look.ribbon;renderDressupLayers(look,q("#dressupLayers"))
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
// Old layered saves remain intact, but are represented by a finished illustration
// until the player chooses a new look. No save migration or progress reset occurs.
function selectedCompleteOutfit(){
  const story=gameState().story||{};
  if(outfits.some(o=>o.id===story.currentOutfit))return story.currentOutfit;
  if(story.currentOutfit!=="custom")return "doctor";
  const look=story.customLook||{};
  if(look.head==="mouse")return "mousevet";
  if(look.medical==="bag")return "clinicbag";
  if(look.clothes==="princess")return "princess";
  if(look.clothes==="forest")return "forestvet";
  if(look.clothes==="artist")return "artist";
  if(look.clothes==="scrubs")return "scrubs";
  return "doctor";
}
function renderWardrobe(){
  ensureStory();const s=gameState(),selected=selectedCompleteOutfit(),grid=q("#outfitGrid");grid.replaceChildren();
  outfits.forEach(o=>{const unlocked=s.stars>=o.stars,b=button("","outfit-card");b.dataset.outfit=o.id;b.classList.toggle("locked",!unlocked);b.classList.toggle("selected",selected===o.id);b.setAttribute("aria-label",unlocked?`${o.name}${selected===o.id?", wearing now":""}`:`${o.name}, unlock at ${o.stars} stars`);b.setAttribute("aria-pressed",String(unlocked&&selected===o.id));b.innerHTML=`<span aria-hidden="true"></span><b>${unlocked?o.name:"Mystery look"}</b><small>${unlocked?selected===o.id?"✓ Wearing now":"Tap to wear":`⭐ ${o.stars}`}</small>`;b.onclick=()=>{if(!unlocked){api().speak(`${o.stars-s.stars} more stars to unlock this outfit.`,{recordedOnly:true});return}s.story.currentOutfit=o.id;api().save();sparkleSound();renderWardrobe()};grid.append(b)});
  const preview=q("#avatarPreview");preview.dataset.outfit=selected;preview.setAttribute("aria-label",`Annabeth wearing ${outfits.find(o=>o.id===selected)?.name||"Magic Doctor"}`);
}

q("#worldButton").onclick=openWorld;q("#worldHomeButton").onclick=()=>api().showScreen("homeScreen");q("#storySpeakButton").onclick=speakChapter;q("#activitySpeakButton").onclick=speakActivity;q("#activityBackButton").onclick=openWorld;q("#nextAdventureButton").onclick=openWorld;q("#replayActivityButton").onclick=()=>startAdventure(activeAdventure.id);q("#samePatientButton").onclick=()=>{if(activeAdventure?.careCase)startAdventure("paw",{careCase:activeAdventure.careCase})};q("#wardrobeButton").onclick=()=>{renderWardrobe();q("#wardrobeDialog").showModal()};
