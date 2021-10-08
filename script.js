var startButton = document.querySelector("#start-button")
var timerEl = document.querySelector("#timer-text")
var questions = document.querySelector(".questions")
var wrongAnswer = document.querySelector(".wrong-answer")
var rightAnswer = document.querySelector(".right-answer")
var h1El = document.querySelector("h1")
var subtitle = document.querySelector("#subtitle")
var check = document.querySelector("#check")
var gameOverEl = document.querySelector("#game-over")
var initials = document.querySelector("#initials")

var questionList = [
    {
        question: "What is the answer?", 
        answers: [{text: "right", correct: true}, 
        {text: "wrong1", correct: false}, 
        {text: "wrong2", correct: false}, 
        {text: "wrong3", correct: false}]
    },
    {
        question: "another question?", 
        answers: [{text: "wrong1", correct: false}, 
        {text: "right", correct: true}, 
        {text: "wrong2", correct: false}, 
        {text: "wrong3", correct: false}]
    },
    {
        question: "a third question?", 
        answers: [{text: "wrong1", correct: false}, 
        {text: "wrong2", correct: false}, 
        {text: "wrong3", correct: false}, 
        {text: "right", correct: true}]
    },
    {
        question: "a fourth question?", 
        answers: [{text: "wrong1", correct: false}, 
        {text: "wrong2", correct: false}, 
        {text: "wrong3", correct: false}, 
        {text: "right", correct: true}]
    },
    {
        question: "a fifth question?", 
        answers: [{text: "wrong1", correct: false}, 
        {text: "wrong2", correct: false}, 
        {text: "wrong3", correct: false}, 
        {text: "right", correct: true}]
    }
]

var correctTally = 0
var display = 0

startButton.addEventListener("click", function(event) {
    startTimer()
    nextQuestion()
    startButton.classList.add("hide")
    h1El.classList.add("hide")
    subtitle.classList.add("hide")
})
var timeLeft = 60
function startTimer() {  
    
    timer = setInterval(function() {
        timeLeft--
        timerEl.textContent = timeLeft + " seconds left"
        if (timeLeft===0) {
            clearInterval(timer)
            gameOver()
        }
    },1000)
}

function nextQuestion() { 
    if (display >= 5) {
        gameOver()
        //questions.classList.add("hide")
        return
    }
    else {
        questions.innerHTML = ""
        questions.style.display = "block"
        var currentQuestion = questionList[display].question
        var h2El = document.createElement("h2")
        //h2El.textContent = currentQuestion
        questions.appendChild(h2El)
        questions.children[0].textContent = currentQuestion
        var currentAnswers = questionList[display].answers
        currentAnswers.forEach(makeButtons)
        function makeButtons (event) {
            answerBtn = document.createElement("button")
            answerBtn.innerText = event.text
            h2El.appendChild(answerBtn)
            answerBtn.addEventListener("click", function() {
                if (event.correct === true) {
                    h2El.textContent += "Correct!"
                    correctTally++
                    console.log(correctTally)
                }
                else {
                    timeLeft = timeLeft - 10
                    check.textContent = "Incorrect!"
                } 
                display++
                nextQuestion()
            })
        }
    }  
}

function gameOver () {
    questions.classList.add("hide")
    timerEl.classList.add("hide")
    gameOverEl.textContent = "Your final score: " + correctTally + ". Enter your initials to save your score."
    initials.style.display = "block"
}