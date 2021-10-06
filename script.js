var startButton = document.querySelector("#start-button")
var timerEl = document.querySelector("#timer-text")
var questions = document.querySelector(".questions")
var wrongAnswer = document.querySelector(".wrong-answer")
var rightAnswer = document.querySelector(".right-answer")
//var answerButton = document.querySelector(".anwer-btn")

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
    }
]

var correctTally = 0
var display = 0

startButton.addEventListener("click", function(event) {
    startTimer()
    nextQuestion()
    startButton.classList.add("hide")
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
    questions.innerHTML = ""
    questions.style.display = "block"
    var currentQuestion = questionList[display].question
    //create a new h2
    var h2El = document.createElement("h2")
    //update the text to the question
    h2El.textContent = currentQuestion
    // append the question to "questions" element
    questions.appendChild(h2El)
    questions.children[0].textContent = currentQuestion
    var currentAnswers = questionList[display].answers
    currentAnswers.forEach(makeButtons)
    function makeButtons (event) {
        answerBtn = document.createElement("button")
        answerBtn.innerText = event.text
        //document.body.appendChild(answerBtn)
        h2El.appendChild(answerBtn)
        answerBtn.addEventListener("click", function() {
            if (event.correct === true) {
                correctTally++
                console.log(correctTally)
            }
            else {
                timeLeft = timeLeft - 10
            } 
            display++
            nextQuestion()
        })
    }  
}