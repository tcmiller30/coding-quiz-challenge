//global variables to reference elements in the DOM
var highscoreEl = document.getElementById('highscore');
var timerEl = document.getElementById('timer');
var startBtn = document.getElementById('start');
var submitBtn = document.getElementById('submit');
var questionTitleEl = document.getElementById('questionTitle');
var choicesEl = document.getElementById('choices');
var initialsEl = document.getElementById('initials');

//global variables to record quiz state/timer
var time = questions.length * 15;


//starts timer, hides starting screen, presents questions
function startQuiz(){
    startTimer();
    timerEl.textContent = time;

}

function startTimer(){

}

//Listens for button click 
startBtn.onclick = startQuiz;
