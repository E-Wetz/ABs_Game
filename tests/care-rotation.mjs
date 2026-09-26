import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {runInNewContext} from "node:vm";

// Exercise the real case selector with a disposable save, without opening the
// player's browser or copying its selection logic into this test.
const source=await readFile(new URL("../adventure.js",import.meta.url),"utf8");
const cases=source.match(/const careCases=\[[\s\S]*?\n\];/)?.[0];
const picker=source.match(/function nextCareCase\(\)\{[\s\S]*?\n\}\nfunction choiceName/)?.[0].replace(/\nfunction choiceName$/m,"");
assert(cases&&picker,"care case data and selector must be present");
for(let seed=0;seed<50;seed++){
  const save={story:{careHistory:[]}};
  let random=seed;
  const math=Object.create(Math);
  math.random=()=>{random=(random*1664525+1013904223)>>>0;return random/2**32};
  const pick=runInNewContext(`${cases}\n${picker}\nnextCareCase`,{
    Math:math,
    Number,
    Array,
    ensureStory(){},
    gameState:()=>save,
    api:()=>({save(){}})
  });
  const visits=Array.from({length:30},()=>pick());
  for(let cycle=0;cycle<3;cycle++){
    assert.equal(new Set(visits.slice(cycle*10,cycle*10+10).map(c=>c.ailment)).size,10,"each cycle must offer all ten ailments");
  }
  for(let i=1;i<visits.length;i++){
    assert.notEqual(visits[i].ailment,visits[i-1].ailment,"avoid repeating the same ailment at a cycle boundary");
    if(i<3)assert.notEqual(visits[i].plan.join(),visits[i-1].plan.join(),"the first three visits must vary their treatment sequence");
  }
}
console.log("Care rotation: 50 simulated saves, 30 visits each, all ailments offered and early treatment plans varied.");
