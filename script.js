var startButton = document.querySelector("#start-button")
var timerEl = document.querySelector("#timer-text")
var questions = document.querySelector("#questions")
var h1El = document.querySelector("h1")
var subtitle = document.querySelector("#subtitle")
var check = document.querySelector("#check")
var gameOverEl = document.querySelector("#game-over")
var initials = document.querySelector("#initials")
var finalScore = document.querySelector("#final-score")
var submit = document.querySelector("#submit")
var scores = document.querySelector("#scores")
var scoreList = document.querySelector("#score-list")

//database of questions and answers
var questionList = [
    {
        question: "Which language is used for styling?", 
        answers: [{text: "CSS", correct: true}, 
        {text: "Javascript", correct: false}, 
        {text: "HTML", correct: false}, 
        {text: "Spanish", correct: false}]
    },
    {
        question: "Which is a technique for planning the structure of your site?", 
        answers: [{text: "Brushing", correct: false}, 
        {text: "Wireframing", correct: true}, 
        {text: "Jamming", correct: false}, 
        {text: "Hamboning", correct: false}]
    },
    {
        question: "What is used to enclose an array?", 
        answers: [{text: "Quotes", correct: false}, 
        {text: "Curly Brackets", correct: false}, 
        {text: "Parentheses", correct: false}, 
        {text: "Brackets", correct: true}]
    },
    {
        question: "What is the name for true and false values?", 
        answers: [{text: "Integer", correct: false}, 
        {text: "Boolean", correct: true}, 
        {text: "String", correct: false}, 
        {text: "Class", correct: false}]
    },
    {
        question: "What symbol is used to designate id?", 
        answers: [{text: "Question Mark", correct: false}, 
        {text: "Asterisk", correct: false}, 
        {text: "Period", correct: false}, 
        {text: "Pound/Hashtag", correct: true}]
    }
]

//start button starts the timer and starts displaying questions
startButton.addEventListener("click", function(event) {
    startTimer()
    getQuestions()
    startButton.classList.add("hide")
    h1El.classList.add("hide")
    subtitle.classList.add("hide")
    questions.removeAttribute('class')
})

var timeLeft = 60
function startTimer() {  
    
    timer = setInterval(function() {
        timeLeft--
        timerEl.textContent = timeLeft 
        if (timeLeft<=0) {
            gameOver()
        }
    },1000)
}

//ends the game once it has gone through all the questions
var display = 0
function nextQuestion() { 
    if (display === questionList.length) {
        questions.style.display = "none"
        check.style.display = "none"
        gameOver() 
    }
    else {
        getQuestions()
    }  
}

//displays the current question and its answers
function getQuestions(){
    questions.innerHTML = ""
    var currentQuestion = questionList[display].question
    var h2El = document.createElement("h2")
    questions.appendChild(h2El)
    questions.children[0].textContent = currentQuestion
    var currentAnswers = questionList[display].answers
    currentAnswers.forEach(makeButtons)
    function makeButtons (event) {
        answerBtn = document.createElement("button")
        answerBtn.innerText = event.text
        h2El.appendChild(answerBtn)
        answerBtn.addEventListener("click", function() {
            //checks whether the user's choice is correct and then moves on to the next question
            if (event.correct === true) {
                check.textContent = "Correct!"
            }
            else {
                timeLeft = timeLeft - 10
                check.textContent = "Incorrect!"
                timerEl.textContent = timeLeft
            }
            display++
            nextQuestion()
        })
    }
}

//hides questions and answers and displays endgame info
function gameOver () {
    //resets timeLeft score to 0 if it was negative
    if (timeLeft < 0) {
        timeLeft = 0
        timerEl.textContent = timeLeft
    }
    questions.style.display = "none"
    check.style.display = "none"
    gameOverEl.removeAttribute('class')
    clearInterval(timer)
    finalScore.textContent = timeLeft
}

submit.addEventListener('click', function (event) {
    submit.classList.add("hide")
    scores.classList.remove("hide")
    var initials = document.querySelector('#initials').value.trim()
    if (initials === "") {
        return;
    }
    var playerData = {
        playerName: initials, 
        timeLeft: timeLeft
    }
    localStorage.setItem("playerData", JSON.stringify(playerData))
    var fetch = JSON.parse(localStorage.getItem("playerData"))
    scoreList.append(fetch.playerName, " - ", fetch.timeLeft)
})

