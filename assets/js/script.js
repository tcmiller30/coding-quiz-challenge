//global variables to reference elements in the DOM
var highscoreEl = document.getElementById('highscore');
var countdownEl = document.getElementById('countdown');
var startBtn = document.getElementById('start');
var enterBtn = document.getElementById('enter');
var choicesEl = document.getElementById('choices');
var initialsEl = document.getElementById('initials');



//variables to reference the different div sections
var startScreen = document.getElementById('start-screen');
var questionsScreen = document.getElementById('questions-screen');
var endScreen = document.getElementById('end-screen');

//global variables to record quiz state/timer
// var time = questions.length * 10;
var time = questions.length * 10;
var questionsIndex = 0;
var timer;

console.log(questions);

//starts timer, hides starting screen, presents questions
function startQuiz(){
    //hides start screen and reveals quiz/questions screen
    startScreen.setAttribute('class', 'hidden');
    questionsScreen.removeAttribute('class');

    timer = setInterval(countdown, 1000);

    countdownEl.textContent = time;
    
getQuestion();
    
}

// grabs question objects from question.js and displays values in DOM elements
function getQuestion(){
    var questionTitleEl = document.getElementById('questionTitle');
    
    var currentQuestion = questions[questionsIndex];
    
    // sets text content of both text elements in HTML = values taken from questions array
    questionTitleEl.textContent = currentQuestion.title;

    choicesEl.innerHTML = '';

    //for loop grabs each value from choices array in the questions object
    for(var i = 0; i < currentQuestion.choices.length; i++){
        var choice = currentQuestion.choices[i];

        //creates new buttons 
        var choiceBtn = document.createElement('button');
            choiceBtn.setAttribute('class', 'choice-button')
            choiceBtn.setAttribute('value', choice);

            //sets text content of new button to = value
            choiceBtn.textContent = choice

        //appends created buttons to choices div/choicesEl
        choicesEl.appendChild(choiceBtn);
    }

} 

function choiceClick(event){

    //event.target = the object being clicked on, in this case the choice buttons in the choices div
    var choiceEl = event.target
    // if user isnt clicking a button, exit function
    if(!choiceEl.matches('.choice-button')){
            return;
        }
    //Checks if answer selected is false
    if(choiceEl.value !==  questions[questionsIndex].answer){
        //subtracts from score/remaining time
        time -= 10;

        if(time < 0){
            time = 0;
        }
        countdownEl.textContent = time;

        //changes color of button for visual feedback
        choiceEl.setAttribute('class', 'incorrect');
        
    } 
        else{
        choiceEl.setAttribute('class', 'correct');
        
    }
    
    
questionsIndex++;

setTimeout(checkQuiz, 500);


    

}
function checkQuiz(){

    //checks if there are remaining questions
    if(time <= 0 || questionsIndex === questions.length){
        endQuiz();
    } else{
        getQuestion();
    }
}


function countdown(){
    time--;
    countdownEl.textContent = time;

    //checks to see if out of time and ends the quiz
    if(time <= 0){
        endQuiz();
    }
}

function endQuiz(){
    // stops timer
    clearInterval(timer);  

    // Hides question screen and shows end screen
    questionsScreen.setAttribute('class', 'hidden')
    endScreen.removeAttribute('class');

    //variable to present final score to user
    var score = document.getElementById('score');

    score.textContent = time;
    
}

// ------------------------------------------- End Screen Form Logic -------------------------------------------
function enterScore (){
    
    var initials = initialsEl.value.trim();

    if(initials !== ''){
     var highscores = JSON.parse(window.localStorage.getItem('scores-list')) || [] ;
     var userScore = {
        initials: initials,
        score: time,
    };

    
     // write user input/score to local storage
    highscores.push(userScore);
    window.localStorage.setItem('scores-list', JSON.stringify(highscores));
    window.location.href = 'highscores.html';
    }
   
    
}

function checkEnter(event){
    if(event.keyup === 'Enter'){
        enterScore();
    }
}


// ------------------------------------------- onclick methods -------------------------------------------

//Listens for button click 
enterBtn.onclick = enterScore;

startBtn.onclick = startQuiz;

choicesEl.onclick = choiceClick;

initialsEl.onkeyup = checkEnter;

