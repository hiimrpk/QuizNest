let score=parseInt(localStorage.getItem("score"))||0;

let total=parseInt(localStorage.getItem("total"))||0;

let wrong=total-score;

let accuracy=Math.round((score/total)*100);

document.getElementById("score").innerHTML=

`${score} / ${total}`;

document.getElementById("accuracy").innerHTML=

`Accuracy : ${accuracy}%`;

document.getElementById("correct").innerHTML=

`✅ Correct : ${score}`;

document.getElementById("wrong").innerHTML=

`❌ Wrong : ${wrong}`;


// Best Score

let best=localStorage.getItem("bestScore")||0;

if(score>best){

localStorage.setItem("bestScore",score);

}