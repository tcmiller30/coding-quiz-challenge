function showScores(){
    var highscores = JSON.parse(window.localStorage.getItem('scores-list')) || [] ;

    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

    for(var i = 0; i < highscores.length; i++){
        // create list item and sets value to user inputted score
        var listItem = document.createElement('li');
        listItem.textContent = highscores[i].initials + ' - ' + highscores[i].score;
        
        // appends new li to highscores ol
        var scoresList =document.getElementById('highscores');
        scoresList.appendChild(listItem);


    }
}

function clearScores(){
    window.localStorage.removeItem('scores-list');
    window.location.reload();
}

document.getElementById('clear').onclick = clearScores;
showScores();