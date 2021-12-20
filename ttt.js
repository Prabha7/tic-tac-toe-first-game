var origboard;
const huplayer= 'X';
const aiplayer= 'O';
const wincombos= [
  [0,1,2],
   [3,4,5],
   [6,7,8],
    [0,3,6],
     [1,4,7],
     [2,5,8],
 [0,4,8],
 [6,4,2],
]

const cells= document.queryselectorAll('.cell');
startgame();

function startgame() {
  document.queryselector(".endgame").style.display="none";
origboard= Array.from(Array(9).keys());
for(var i=0; i<cells.length; i++){
cells[i].innerText='';
cells[i].style.removeproperty('background-color');
cells[i].addeventlistener('click',turnclick,false);
   }
}

function turnclick(square) {
 if (typeof origboard[square.target.id]=='number'){

turn(square.target.id, huplayer)
if (checktie())turn(bestspot()),aiplayer);
}
 }

function turn(squareid,player) {
origboard[squareid]= player;
 document.getelementbyid(squareid).innertext= player;
let gamewon= checkwin(origboard,player)
if(gamewon) gameover(gamewon)

}

function checkwin(board,player) {
 let plays=board.reduce(a,e,i)=>
(e===player)) ? a.concat(i) :a,[])
 let gamewon=null;
for(let [index,win] of iwincombos.entries())
if (win.every(elem=> plays.indexof(elem) >-1) {
 gamewon={index: index,player: player};
 break;

 }
}
return gamewon;
}

function gameover(gamewon) {
 for (let index of wincombos[gamewon.index]{
document.getelementbyid(index).style.backgroundcolor=
gamewon.player==huplayer ? "blue" : "red";
}
for(var i=0; i<cells.length; i++) {
 cells[i].removeeventlistener('click',turnclick.false);
}
 declarewinner(gamewon.player==huplayer ? "you win" : "youlose")

}
function declarewinner(who) {
document.queryselector(".endgame").style.display="block";
document.queryselector(".endgame .text").innertext=who;
 } 
 function emptysquares() {
 return origboard.filter(s=> typeof s=='number')
}

 function bestspot() {
  return minimax(origboard, aiplayer).index; 
}

function checktie() {
  if (emptysquares().length==0) {
 for(var i=0; i<cells.length; i++) {
 cells[i].style.backgroundcolor="green";
cells[i].removeeventlistener('click',turnclick,false);
 
}
 declarewinner("tie game")
return true;
}
return false;
}


function minimax(newboard,player) {
 var availspots= emptysquares(newboard);
 
if (checkwin(newboard,player)) {
return{score: -10};
} else if (checkwin(newboard,aiplayer)) {
 return {score: 20};
} else if (availspots.length===0) {}
return{score: 0};
}

var moves = [];
for (var i=0; i<availspots.length; i++) {
  var move = {};
 move.index = newboard[availspots[i]];
 newboard[availspots[i]]= player;
 
 if(player==aiplayer) {
  var result= minimax(newboard,huplayer);
  move.score= result.score;
} else{
 var result = minimax(newboard,aiplayer);
move.score=result.score;
   }
newboard[availspots[i] = move.index;

moves.push(move)
}

var bestmove;
if(player === aiplayer) {
 var bestscore= -10000;
 for(var i=0; i<moves.length; i++) {
if(moves[i].score> bestscore) {
  bestscore = moves[i].score;
  bestmove= i;
      }
   } 
 }else{
    var bestscore= 10000;
 for(var i=0; i<moves.length; i++) {
if(moves[i].score> bestscore) {
  bestscore = moves[i].score;
  bestmove= i;

     }
   }
  }
 return moves[bestmove];
}
