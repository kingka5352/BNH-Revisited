const choices=["Bear","Ninja","Hunter"]; // moves
let yourWins=0, computerWins=0; // totals

function computerChoice(){ // random pick
  const i=Math.floor(Math.random()*choices.length);
  return choices[i];
}

function outcome(p,c){ // decide winner
  if(p===c) return "tie";
  if((p==="Bear"&&c==="Ninja")||(p==="Ninja"&&c==="Hunter")||(p==="Hunter"&&c==="Bear")) return "player";
  return "computer";
}

function ensureExtraLines(){ // create hr lines if missing
  const wrap=document.querySelector(".again");
  if(!wrap) return;
  if(!document.getElementById("line-before-again")){
    const before=document.createElement("hr");
    before.id="line-before-again"; before.className="rule"; before.hidden=true;
    wrap.insertAdjacentElement("beforebegin", before);
  }
  if(!document.getElementById("line-after-again")){
    const after=document.createElement("hr");
    after.id="line-after-again"; after.className="rule bottom"; after.hidden=true;
    wrap.insertAdjacentElement("afterend", after);
  }
}

function showExtraLines(){ // show lines around Play Again
  const before=document.getElementById("line-before-again");
  const after =document.getElementById("line-after-again");
  if(before) before.hidden=false;
  if(after)  after.hidden=false;
}

function hideExtraLines(){ // hide lines around Play Again
  const before=document.getElementById("line-before-again");
  const after =document.getElementById("line-after-again");
  if(before) before.hidden=true;
  if(after)  after.hidden=true;
}

function playRound(player){ // one round
  ensureExtraLines();
  const comp=computerChoice();
  const res=outcome(player,comp);

  document.getElementById("line1").textContent=`You chose ${player}.`;
  document.getElementById("line2").textContent=`The computer chose ${comp}`;
  document.getElementById("line3").textContent=
    res==="tie" ? "It's a tie!" : (res==="player" ? "You win!" : "The computer wins!");

  if(res==="player") yourWins++;
  else if(res==="computer") computerWins++;

  document.getElementById("yourWins").textContent=yourWins;
  document.getElementById("computerWins").textContent=computerWins;

  document.getElementById("resultBox").hidden=false;
  document.querySelector(".scores").hidden=false;
  showExtraLines();
  document.getElementById("playAgain").hidden=false;

  document.querySelectorAll("[data-move]").forEach(b=>b.disabled=true);
}

function resetForNext(){ // next round
  document.getElementById("line1").textContent="";
  document.getElementById("line2").textContent="";
  document.getElementById("line3").textContent="";
  document.getElementById("resultBox").hidden=true;
  document.querySelector(".scores").hidden=true;
  hideExtraLines();
  document.getElementById("playAgain").hidden=true;
  document.querySelectorAll("[data-move]").forEach(b=>b.disabled=false);
}

document.addEventListener("DOMContentLoaded",()=>{ // wire up + initial hide
  // hide all dynamic rules except the fixed two
  document.querySelectorAll(".rule").forEach(hr=>{
    if(hr.id!=="line-above-buttons" && hr.id!=="line-below-buttons"){
      hr.hidden=true;
    }
  });
  // button events
  document.querySelectorAll("[data-move]").forEach(btn=>{
    btn.addEventListener("click",()=>playRound(btn.dataset.move));
  });
  const again=document.getElementById("playAgain");
  if(again) again.addEventListener("click", resetForNext);
});
