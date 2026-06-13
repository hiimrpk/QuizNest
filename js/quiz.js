let userAnswers = [];
let questions = [];
let mode = localStorage.getItem("mode");
let selectedAnswer = "";
let current = 0;

let score = 0;

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

function loadQuestion() {

    selectedAnswer = "";

    if (mode == "practice") {

        document.getElementById("nextBtn").style.display = "none";

    } else {

        document.getElementById("nextBtn").style.display = "block";

    }

    document.getElementById("counter").innerHTML =
        `Question ${current + 1}/${questions.length}`;

    document.getElementById("progressBar").style.width =
        ((current + 1) / questions.length) * 100 + "%";

    document.getElementById("question").innerHTML =
        questions[current].question;

    let html = "";

    questions[current].options
        .sort(() => Math.random() - 0.5)
        .forEach(option => {

            html += `

<div class="option"

onclick="checkAnswer(this,'${option}')">

${option}

</div>

`;

        });

    document.getElementById("options").innerHTML = html;

}
function checkAnswer(element, ans) {

    if (mode == "practice") {

        userAnswers.push({
            question: questions[current].question,
            yourAnswer: ans,
            correctAnswer: questions[current].answer
        });

        if (ans == questions[current].answer) {
            score++;
        }

        nextQuestion();

    } else {

        selectedAnswer = ans;

        document.querySelectorAll(".option").forEach(opt => {
            opt.classList.remove("selected");
        });

        element.classList.add("selected");

    }

}

function nextQuestion() {

    if (mode == "exam") {

        if (selectedAnswer == "") {

            alert("Please select an option!");

            return;

        }

        userAnswers.push({

            question: questions[current].question,

            yourAnswer: selectedAnswer,

            correctAnswer: questions[current].answer

        });

        if (selectedAnswer == questions[current].answer) {

            score++;

        }

    }

    current++;

    selectedAnswer = "";

    if (current < questions.length) {

        loadQuestion();

    } 
    else {

        submitTest();

    }

}

function submitTest() {

    localStorage.setItem("score", score);

    localStorage.setItem("total", questions.length);

    localStorage.setItem(
        "userAnswers",
        JSON.stringify(userAnswers)
    );

    window.location.href = "result.html";

}
function startTimer() {

    let time = parseFloat(localStorage.getItem("time"));

    if (time == 0) {

        document.getElementById("timer").innerHTML = "∞";

        return;

    }

    let seconds = Math.floor(time * 60);

    let timer = setInterval(() => {

        let m = Math.floor(seconds / 60);
        let s = seconds % 60;

        document.getElementById("timer").innerHTML =
            `${m}:${s < 10 ? "0" : ""}${s}`;

        if (seconds <= 0) {

            clearInterval(timer);

            alert("⏰ Time Up!");

            // Exam Mode me current selected answer save karo
            if (mode == "exam" && selectedAnswer != "") {

                userAnswers.push({

                    question: questions[current].question,

                    yourAnswer: selectedAnswer,

                    correctAnswer: questions[current].answer

                });

                if (selectedAnswer == questions[current].answer) {

                    score++;

                }

            }

            // Practice aur Exam dono ke liye submit
            submitTest();

            return;

        }

        seconds--;

    }, 1000);

}
// Prevent accidental back during test

history.pushState(null, null, location.href);

window.addEventListener("popstate", function () {

    history.pushState(null, null, location.href);

    // Modal Show
    document.getElementById("exitModal").style.display = "flex";

});
    // Continue Test
document.getElementById("continueBtn").onclick = function () {

    document.getElementById("exitModal").style.display = "none";

};

// Exit Test
document.getElementById("exitBtn").onclick = function () {

    window.location.href = "../index.html";

};
