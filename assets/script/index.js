'use strict';

// Declaring Elements

const body = document.querySelector('body');
const instructionDlg = document.querySelector('#instructions-dlg');
const highScoreDlg = document.querySelector('#high-score-dlg');
const higherScoreDlg = document.querySelector('#higher-score-dlg');
const deleteDlg = document.querySelector('#scores-delete-dlg');
const title = document.querySelector('h2');
const timer = document.querySelector('.timer');
const currentWordDisplayed = document.querySelector('.curr-word');
const textInp = document.querySelector('#txt-input');
const currentScoreText = document.querySelector('.curr-score');
const reStartBtn = document.querySelector('#start-reset');
const hardModeBtn = document.querySelector('#hard-mode');
const highScoreBtn = document.querySelector('#high-score-btn');
const higherScoreBtn = document.querySelector('#higher-score-btn');
const openDeleteDlgBtn = document.querySelector('#scores-delete-btn');
const deleteScoresBtn = document.querySelector('#delete-all-btn');

// Audio
const BgMusic = new Audio('./assets/audio/BgMusic.mp3');
BgMusic.type = 'audio/mp3';
BgMusic.volume = 0.4;
const hardmodeMusic = new Audio('./assets/audio/Hardmode.mp3');
hardmodeMusic.type = 'audio/mp3';
hardmodeMusic.volume = 0.4;
const correctSound = new Audio('./assets/audio/correct.mp3');
correctSound.type = 'audio/mp3';
correctSound.volume = 0.3;

// Class Definition
class Score {
    date;
    score;
    percentage;
    constructor(date, score, percentage) {
        this.date = date;
        this.score = score;
        this.percentage = percentage;
    }
}

/**
 * seconds: starting seconds of game
 * countdown: the counting interval
 * score: the score that you get for completing the word
 * highScoreList: gets the high scores stored in localStorage
 * higherScoreList: gets the higher scores stored in localStorage
 * scrPercentage: percentage of hits based on the current mode word list
 * hardModeOn: boolean that specifies if the game is in hardmode
 * intervalActive: boolean that makes sure if first time starting the game
 * wordCopy: a copy of the current mode's word list
 */
let seconds = 99; // Modify to test turn back to 99
let countdown;
let score = 0;
let highScoreList = JSON.parse(localStorage.getItem('highScores'));
let higherScoreList = JSON.parse(localStorage.getItem('higherScores'));
let scrPercentage;
let hardModeOn = false;
let intervalActive = false;
let wordCopy;

textInp.disabled = true;

if (!highScoreList) {
    highScoreList = [];
}
if (!higherScoreList) {
    higherScoreList = [];
}

/*------------------- Main Function -------------------*/
// Get stored scores

// Delay dialog opening for style
setTimeout(() => {
    instructionDlg.showModal();
}, 500);

// Start an interval that counts down every second for x amount of seconds,
// when seconds reach 0, stop the game, get the date, percentage of hits, and 
// reset the dialogs, create a new score object, push it into its respective
// mode's array, sort the array by its object's score, and remove all but the
// first 9 scores, then push this array as a string into localStorage,
// then create a div with the score values, place it into its dialog, and show
// the respective dialog, then resets the score and reveals the hardmode button
function startInterval() {
    countdown = setInterval(function() {
        seconds--;
        timer.innerHTML = `<i class="fa-solid fa-clock"></i> Time Left: ${seconds}`;
        if (seconds === 0) {
            BgMusic.pause();
            hardmodeMusic.pause();
            BgMusic.currentTime = 0;
            hardmodeMusic.currentTime = 0;

            clearInterval(countdown);
            currentScoreText.innerHTML = `<i class="fa-solid fa-star"></i> Score: 0`;
            textInp.disabled = true;

            const date = new Date();
            const options = {month: 'short', day: 'numeric', year: 'numeric'};
            const formattedDate = date.toLocaleDateString('en-US', options);
            
            if (!hardModeOn) {
                highScoreDlg.innerHTML = '<h3>High Score</h3>';
                scrPercentage = ((score / wordList.length) * 100).toFixed(2);
                const newScore = new Score(formattedDate, score, scrPercentage);
                highScoreList.push(newScore);
                highScoreList.sort((a, b) => b.score - a.score);
                highScoreList.splice(9);
                const scoreToText = JSON.stringify(highScoreList);
                localStorage.setItem('highScores', scoreToText);
                createScoreText(highScoreList);
                highScoreDlg.classList.add('enter-dialog');
                highScoreDlg.show();
            } else if (hardModeOn) {
                higherScoreDlg.innerHTML = '<h3>Higher Score</h3>';
                scrPercentage = ((score / harderWords.length) * 100).toFixed(2);
                const newScore = new Score(formattedDate, score, scrPercentage);
                higherScoreList.push(newScore);
                higherScoreList.sort((a, b) => b.score - a.score);
                higherScoreList.splice(9);
                const scoreToText = JSON.stringify(higherScoreList);
                localStorage.setItem('higherScores', scoreToText);
                createScoreText(higherScoreList);
                higherScoreDlg.classList.add('enter-dialog');
                higherScoreDlg.show();
            }
            score = 0;
        }
    }, 1000);
}

// Get objects from an array and create a div for each of them, add text and
// add some anim style to then push them to their respective dialog
function createScoreText(array) {
    array.forEach(object => {
        const newDiv = document.createElement('div');
        let animDelay;
        const delayBase = 0.4;
        if (!hardModeOn) {
            newDiv.classList.add('high-score-text');
            animDelay = ((highScoreList.indexOf(object) + 1) * delayBase)
        } else {
            newDiv.classList.add('higher-score-text');
            animDelay = ((higherScoreList.indexOf(object) + 1) * delayBase)
        }

        newDiv.style.animation = `1s ${animDelay}s ease-in-out forwards score-enter`

        addScoreText(object, newDiv);

        if (!hardModeOn) {
            highScoreDlg.appendChild(newDiv);
        } else {
            higherScoreDlg.appendChild(newDiv);
        }
    });
}

// Create text for the provided objects values, and add them to a div
function addScoreText(object, div) {
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');
    let p4 = document.createElement('p');

    if (!hardModeOn) {
        p1.innerHTML = `<b>#${highScoreList.indexOf(object) + 1}</b>`;
    } else {
        p1.innerHTML = `<b>#${higherScoreList.indexOf(object) + 1}</b>`;
    }
    p3.innerHTML = `${object.percentage}%`;
    p2.innerHTML = `<b>${object.score} hits</b>`;
    p4.innerHTML = `on ${object.date}`;

    div.appendChild(p1);
    div.appendChild(p3);
    div.appendChild(p2);
    div.appendChild(p4);
}

// Stops and starts the timer interval when needed
function resetInterval() {
    clearInterval(countdown);
    startInterval();
}

// When start button pressed, stops any music and plays regular modes music
// removes any hardmode styling, and creates a copy of the regular word list
// and starts the game by getting a random word, displaying, and removing it.
// restarts the time and clears and focuses in the text input, turns off
// hardmode and start the counting interval
reStartBtn.addEventListener('click', function() {
    currentWordDisplayed.innerText = 'Loading Words...';
    setTimeout(() => {
        BgMusic.currentTime = 0;
        BgMusic.play();
        hardmodeMusic.pause();
        hardmodeMusic.currentTime = 0;
        
        title.classList.remove('hard-text');
        currentWordDisplayed.classList.remove('hard-text');
        body.style.backgroundImage = 'url("./assets/image/gameBG.jpg")';
        
        wordCopy = JSON.parse(JSON.stringify(wordList));
        let randWord = Math.round((Math.random() * wordCopy.length) - 1);
        currentWordDisplayed.innerText = wordCopy[randWord];
        wordCopy.splice(randWord, 1);
        
        reStartBtn.innerText = 'Restart';
        timer.innerHTML = `<i class="fa-solid fa-clock"></i> Time Left: 99`
        textInp.value = '';
        
        textInp.disabled = false;
        textInp.focus();

        hardModeOn = false;

    if (!intervalActive) {
        startInterval();
        intervalActive = true;
    } else {
        seconds = 99; // modify to test, turn back to 99
        resetInterval();
    }
}, 1000);
})

// Activates every time you change the inputs value, gets a random word from
// the list copy, and when the inputed word is the same as the displayed word.
// adds a point to the score, displays it, and displays and removes the new 
// random word from the copy list as to not repeat it, clears the input value,
// and limits the correct sound play time
textInp.addEventListener('input', function() {
    let randWord = Math.round((Math.random() * wordCopy.length) - 1);
    if (textInp.value === currentWordDisplayed.innerText){
        correctSound.play()
        score++;
        currentScoreText.innerHTML = `<i class="fa-solid fa-star"></i> Score: ${score}`;
        currentWordDisplayed.innerText = wordCopy[randWord];
        wordCopy.splice(randWord, 1);
        textInp.value = '';
        setTimeout(function() {
            correctSound.pause();
            correctSound.currentTime = 0;
        }, 1000);
    }
})

// Start a round in HardMode, applying hardmode styles, creates a copy of the
// hardmode word list, and gets & displays it same as on normal mode, rest of
// functionality is the same as normal button
hardModeBtn.addEventListener('click', function() {
    currentWordDisplayed.innerText = 'Loading Words...';
    setTimeout(() => {
    hardmodeMusic.currentTime = 0;
    hardmodeMusic.play();
    BgMusic.pause();
    BgMusic.currentTime = 0;

    title.classList.add('hard-text');
    currentWordDisplayed.classList.add('hard-text');
    body.style.backgroundImage = 'url("./assets/image/gameBGneg.jpg")';
    
    wordCopy = JSON.parse(JSON.stringify(harderWords));
    let randWord = Math.round((Math.random() * wordCopy.length) - 1);
    currentWordDisplayed.innerText = wordCopy[randWord];
    wordCopy.splice(randWord, 1);
    
    reStartBtn.innerText = 'Restart';
    timer.innerHTML = `<i class="fa-solid fa-clock"></i> Time Left: 99`
    textInp.value = '';
    
    textInp.disabled = false;
    textInp.focus();

    hardModeOn = true;

    if (!intervalActive) {
        startInterval();
        intervalActive = true;
    } else {
        seconds = 99; // modify to test, turn back to 99
        resetInterval();
    }
}, 1000);
})

// Instruction Dialog closing function, closes score dialogs if you click
// outside of them,  with a smooth animation
body.addEventListener('click', function(e) {
    instructionDlg.close()
    if (!highScoreDlg.contains(e.target) && highScoreDlg.open) {
        highScoreDlg.classList.remove('enter-dialog');
        highScoreDlg.classList.add('exit-dialog');
        setTimeout(() => {
            highScoreDlg.close();
            highScoreDlg.classList.remove('exit-dialog');
        }, 500);
        return;
    }
    if (!higherScoreDlg.contains(e.target) && higherScoreDlg.open) {
        higherScoreDlg.classList.remove('enter-dialog');
        higherScoreDlg.classList.add('exit-dialog');
        setTimeout(() => {
            higherScoreDlg.close();
            higherScoreDlg.classList.remove('exit-dialog');
        }, 500);
        return;
    }
})

// Display and close score dialog functions, event (e) doesnt activate other 
// event listeners. Update the scores array, recreate the dialog content
// depending on the state of the array, also opens the selected dialog, and 
// closes the other one with smooth animations
highScoreBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    highScoreList = JSON.parse(localStorage.getItem('highScores'));
    if (!highScoreList) {
        highScoreList = [];
    }
    if (highScoreList.length > 0) {
        highScoreDlg.innerHTML = '<h3>High Score</h3>';
        createScoreText(highScoreList);
    } else {
        highScoreDlg.innerHTML = '<h3>High Score</h3><h3>No Scores yet</h3>';
    }
    highScoreDlg.classList.add('enter-dialog');
    highScoreDlg.show();
    higherScoreDlg.classList.add('exit-dialog');
    setTimeout(() => {
        higherScoreDlg.close();
        higherScoreDlg.classList.remove('exit-dialog');
    }, 500);
});

// Same as previous function, but for this dialog
higherScoreBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    higherScoreList = JSON.parse(localStorage.getItem('higherScores'));
    if (!higherScoreList) {
        higherScoreList = [];
    }
    if (higherScoreList.length > 0) {
        higherScoreDlg.innerHTML = '<h3>Higher Score</h3>';
        hardModeOn = true;
        createScoreText(higherScoreList);
        hardModeOn = false;
    } else {
        higherScoreDlg.innerHTML = '<h3>Higher Score</h3><h3>No Scores yet</h3>';
    }
    higherScoreDlg.classList.add('enter-dialog');
    higherScoreDlg.show();
    highScoreDlg.classList.add('exit-dialog');
    setTimeout(() => {
        highScoreDlg.close();
        highScoreDlg.classList.remove('exit-dialog');
    }, 500);
});

// Prevents accidental use of space in the game
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        e.preventDefault();
    }
})

// Opens the delete scores dialog
openDeleteDlgBtn.addEventListener('click', () => {
    deleteDlg.showModal();
})

// Closese the delete scores dialog if clicked outside of itself
deleteDlg.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    if (e.clientY < rect.top || e.clientY > rect.bottom || e.clientX < rect.left || e.clientX > rect.right) {
        deleteDlg.close();
    }
})

// Clears the localStorage, essentialy deleting the scores
deleteScoresBtn.addEventListener('click', () => {
    localStorage.clear();
    deleteDlg.close();
})

// Word arrays
const wordList = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 
'building', 'population','weather', 'bottle', 'history', 'dream', 'character', 
'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 
'rainbow', 'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 
'developer', 'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 
'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 
'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 
'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 'baseball', 
'beyond', 'evolution', 'banana', 'perfumer', 'computer', 'management', 
'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 
'bedroom', 'delivery', 'enemy', 'button', 'superman', 'library', 'unboxing', 
'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 
'awesome', 'challenge', 'science', 'mystery', 'famous', 'league', 'memory', 
'leather', 'planet', 'software', 'update', 'yellow', 'keyboard', 'window'];

const harderWords = ['alphabetization', 'accomplishments', 'acknowledgeable', 
'blameworthiness', 'bibliographical', 'bacteriological', 'characteristics', 
'congratulations', 'confidentiality', 'desertification', 'disorganization', 
'diversification', 'excommunication', 'experimentation', 'electrification', 
'familiarization', 'faithworthiness', 'featurelessness', 'gentlemanliness', 
'grandmotherhood', 'gravitationally', 'housebrokenness', 'hypercorrection', 
'hypercorrection', 'interdependence', 'instrumentation', 'insubordination', 
'kindheartedness', 'kinesthetically', 'kaleidoscopical', 'lightheadedness', 
'lackadaisically', 'lexicographical', 'misappreciation', 'marginalization', 
'materialization', 'nationalization', 'neurobiological', 'noninterruption', 
'overcalculation', 'oversensitivity', 'oversufficiency', 'procrastinating', 
'prenotification', 'physiologically', 'responsibleness', 'reapportionment', 
'redetermination', 'straightforward', 'sententiousness', 'supernaturalism', 
'thermochemistry', 'trustworthiness', 'transplantation', 'unconditionally', 
'underproduction', 'unqualification', 'vascularization', 'vasoconstrictor', 
'vasovesiculitis', 'weatherboarding', 'wrongheadedness', 'warrantableness']
