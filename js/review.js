let answers = JSON.parse(localStorage.getItem("userAnswers")) || [];

let html = "";

answers.forEach((item, index) => {

let correct = item.yourAnswer == item.correctAnswer;

html += `

<div class="subject-card">

<h3>Q${index+1}. ${item.question}</h3>

<p>
Your Answer :
<span style="color:${correct ? "green":"red"};">
${item.yourAnswer}
</span>
</p>

<p>
Correct Answer :
<span style="color:green;">
${item.correctAnswer}
</span>
</p>

</div>

`;

});

document.getElementById("reviewBox").innerHTML = html;