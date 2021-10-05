var startButton = document.querySelector("#start-button")
var timerEl = document.querySelector("#timer-text")
var questions = document.querySelector(".questions")
var question = document.querySelector("#question")
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
    }
]

//console.log(questions)
var display = 0

startButton.addEventListener("click", function(event) {
    startTimer()
    nextQuestion()
    startButton.classList.add("hide")
})

function startTimer() {  
    var timeLeft = 10
    timer = setInterval(function() {
        timeLeft--
        timerEl.textContent = timeLeft + " seconds left"
        if (timeLeft===0) {
            clearInterval(timer)
            timerEl.textContent = "Times up!"
        }
    },1000)
}

function nextQuestion() { 
    questions.innerHTML = ""
    questions.style.display = "block"
    var currentQuestion = questionList[display].question
    //create a new h2
    //update the text to the question
    // append the question to "questions" element 
    questions.children[0].textContent = currentQuestion
    var currentAnswers = questionList[display].answers
    currentAnswers.forEach(makeButtons)
    //console.log (currentAnswers[0].text)
    function makeButtons (something) {
        console.log(something)
        answerBtn = document.createElement("button")
        answerBtn.innerText = something.text
        document.body.appendChild(answerBtn)
        answerBtn.addEventListener("click", function() {
            display++
            answerBtn.classList.add("hide")
            nextQuestion()
        })
    }  
}