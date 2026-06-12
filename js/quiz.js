let userAnswers = [];
let questions=[];
let mode = localStorage.getItem("mode");
let selectedAnswer = "";
let current=0;

let score=0;

// Subject & Topic
let subject = localStorage.getItem("subject");
let topic = localStorage.getItem("topic");

// JSON Path
let filePath = `../data/${subject}/${topic}.json`;

fetch(filePath)

.then(res => {
    if (!res.ok) {
        throw new Error("File not found: " + filePath);
    }
    return res.json();
})

.then(data => {

    data.sort(() => Math.random() - 0.5);

    let count = parseInt(localStorage.getItem("count")) || data.length;

    questions = data.slice(0, count);

    loadQuestion();

    startTimer();

})

.catch(err => {

    alert(err.message);
    console.log(err);

});

function loadQuestion(){
  selectedAnswer="";

if(mode=="practice"){
document.getElementById("nextBtn").style.display="none";
}else{
document.getElementById("nextBtn").style.display="block";
}

document.getElementById("counter").innerHTML=

`Question ${current+1}/${questions.length}`;

document.getElementById("progressBar").style.width=

((current+1)/questions.length)*100+"%";

document.getElementById("question").innerHTML=

questions[current].question;

let html="";

questions[current].options

.sort(()=>Math.random()-0.5)

.forEach(option=>{

html+=`

<div class="option"

onclick="checkAnswer(this,'${option}')">

${option}

</div>

`;

});

document.getElementById("options").innerHTML=html;

}

function checkAnswer(element, ans){

if(mode=="practice"){

userAnswers.push({
question: questions[current].question,
yourAnswer: ans,
correctAnswer: questions[current].answer
});

if(ans==questions[current].answer){
score++;
}

nextQuestion();

}

else{

selectedAnswer = ans;

document.querySelectorAll(".option").forEach(opt=>{
opt.classList.remove("selected");
});

element.classList.add("selected");

}

}
function nextQuestion(){

if(mode=="exam"){

if(selectedAnswer==""){

alert("Please select an option!");

return;

}

userAnswers.push({

question: questions[current].question,

yourAnswer: selectedAnswer,

correctAnswer: questions[current].answer

});

if(selectedAnswer==questions[current].answer){

score++;

}

}

current++;

selectedAnswer="";

if(current<questions.length){

loadQuestion();

}

else{

localStorage.setItem("score",score);

localStorage.setItem("total",questions.length);

localStorage.setItem(
"userAnswers",
JSON.stringify(userAnswers)
);

window.location="result.html";

}

}

function startTimer(){

let time=parseInt(localStorage.getItem("time"));

if(time==0){

document.getElementById("timer").innerHTML="∞";

return;

}

let seconds=time*60;

setInterval(()=>{

let m=Math.floor(seconds/60);

let s=seconds%60;

document.getElementById("timer").innerHTML=

`${m}:${s<10?"0":""}${s}`;

if(seconds>0){

seconds--;

}

},1000);

}