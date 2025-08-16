const choices=["Bear","Ninja","Hunter"]; // moves
let yourWins=0,computerWins=0; // totals

function computerChoice(){ // random pick
  const i=Math.floor(Math.random()*choices.length);
  return choices[i];
}

function outcome(p,c){ // compare
  if(p===c)return "tie";
  if((p==="Bear"&&c==="Ninja")||(p==="Ninja"&&c==="Hunter")||(p==="Hunter"&&c==="Bear"))return "player";
  return "computer";
}

function ensureExtraLines(){ // create lines if missing
  if(!document.getElementById("line-before-again")){
    const before=document.createElement("hr");
    before.id="line-before-again"; before.className="rule"; before.hidden=true;
    document.querySelector(".again").insertAdjacentElement("beforebegin", before);
  }
  if(!document.getElementById("line-after-again")){
    const after=document.createElement("hr");
    after.id="line-after-again"; after.className="rule bottom"; after.hidden=true;
    document.querySelector(".again").insertAdjacentElement("afterend", after);
  }
}

function playRound(player){ // one round
  ensureExtraLines();
  const comp=computerChoice();
  const res=outcome(player,comp);
  document.getElementById("line1").textContent=`You chose ${player}.`;
  document.getElementById("line2").textContent=`The computer chose ${comp}`;
  document.getElementById("line3").textContent=res==="tie"?"It's a tie!":(res==="player"?"You win!":"The computer wins!");
  if(res==="player")yourWins++; else if(res==="computer")computerWins++;
  document.getElementById("yourWins").textContent=yourWins;
  document.getElementById("computerWins").textContent=computerWins;
  document.getElementById("resultBox").hidden=false;
  showExtraLines();
  document.querySelector(".scores").hidden=false;
  document.getElementById("line-before-again").hidden=false;
  document.getElementById("line-after-again").hidden=false;
  document.getElementById("playAgain").hidden=false;
  document.querySelectorAll("[data-move]").forEach(b=>b.disabled=true);
}

function resetForNext(){ // next round
  document.getElementById("line1").textContent="";
  document.getElementById("line2").textContent="";
  document.getElementById("line3").textContent="";
  document.getElementById("resultBox").hidden=true;
  hideExtraLines();
  document.querySelector(".scores").hidden=true;
  const before=document.getElementById("line-before-again");
  const after=document.getElementById("line-after-again");
  if(before)before.hidden=true;
  if(after)after.hidden=true;
  document.getElementById("playAgain").hidden=true;
  document.querySelectorAll("[data-move]").forEach(b=>b.disabled=false);
}

document.querySelectorAll("[data-move]").forEach(btn=>{ // events
  btn.addEventListener("click",()=>playRound(btn.dataset.move));
});
document.getElementById("playAgain").addEventListener("click",resetForNext);

function showExtraLines(){ // show lines around Play Again
  let before=document.getElementById("line-before-again");
  let after=document.getElementById("line-after-again");
  if(!before){
    before=document.createElement("hr");
    before.id="line-before-again"; before.className="rule";
    document.querySelector(".again").insertAdjacentElement("beforebegin", before);
  }
  if(!after){
    after=document.createElement("hr");
    after.id="line-after-again"; after.className="rule bottom";
    document.querySelector(".again").insertAdjacentElement("afterend", after);
  }
  before.style.display="block";
  after.style.display="block";
}
function hideExtraLines(){ // hide lines around Play Again
  const before=document.getElementById("line-before-again");
  const after=document.getElementById("line-after-again");
  if(before) before.style.display="none";
  if(after) after.style.display="none";
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.rule').forEach(hr=>{
    if(hr.id!=='line-above-buttons' && hr.id!=='line-below-buttons'){
      hr.style.display='none';
    }
  });
});
