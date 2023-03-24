'use strict';

// Declaring Elements

const title = document.querySelector('h2');
const timer = document.querySelector('.timer');
const currentWord = document.querySelector('.curr-word');
const textInp = document.querySelector('#txt-input');
const reStartBtn = document.querySelector('#start-reset');
const hardMode = document.querySelector('#hard-mode');
const currentScore = document.querySelector('.curr-score');
const highScore = document.querySelector('.high-score');
const higherScore = document.querySelector('.higher-score');

const BgMusic = new Audio('./assets/audio/BgMusic.mp3');
BgMusic.type = 'audio/mp3';
BgMusic.volume = 0.4;
const hardmodeMusic = new Audio('./assets/audio/Hardmode.mp3');
hardmodeMusic.type = 'audio/mp3';
hardmodeMusic.volume = 0.4;

// Class Definition

class Score {
    #date;
    #score;
    #percentage;
    constructor(date, score, percentage) {
        this.#date = date;
        this.#score = score;
        this.#percentage = percentage;
    }

    get date() {return this.#date}
    get score() {return this.#score}
    get percentage() {return this.#percentage}
}

// Main function
let seconds = 99;
let countdown;
let hiScore = 0;
let hiRScore = 0;
let scrPercentage;

function startInterval() {
    countdown = setInterval(function() {
        seconds--;
        timer.innerText = `Time Left: ${seconds}`
        if (seconds === 0) {
            BgMusic.pause();
            hardmodeMusic.pause();
            BgMusic.currentTime = 0;
            hardmodeMusic.currentTime = 0;

            clearInterval(countdown);
            currentScore.innerText = `Score: 0`;
            textInp.disabled = true;

            const date = new Date();
            const options = {month: 'short', day: 'numeric', year: 'numeric'};
            const formattedDate = date.toLocaleDateString('en-US', options);
            
            if (!hardModeOn) {
                scrPercentage = ((score / wordList.length) * 100).toFixed(2);
            } else if (hardModeOn) {
                scrPercentage = ((score / harderWords.length) * 100).toFixed(2);
            }

            if (score > hiScore && !hardModeOn) {
                hiScore = score;
                const newScore = new Score(formattedDate, hiScore, scrPercentage)
                highScore.innerText = `High Score: ${newScore.score} points, ${newScore.percentage}%, on ${newScore.date}`;
            } else if (score > hiRScore && hardModeOn) {
                hiRScore = score;
                const newScore = new Score(formattedDate, hiRScore, scrPercentage)
                higherScore.innerText = `Higher Score: ${newScore.score} points, ${newScore.percentage}%, on ${newScore.date}`;
            }
            score = 0;

            hardMode.style.display = 'block';
        }
    }, 1000);
}

function resetInterval() {
    clearInterval(countdown);
    startInterval();
}

let hardModeOn = false;
let intervalActive = false;
let wordCopy;

reStartBtn.addEventListener('click', function() {
    BgMusic.play();
    hardmodeMusic.pause();
    hardmodeMusic.currentTime = 0;

    title.classList.remove('hard-text');
    currentWord.classList.remove('hard-text');

    wordCopy = JSON.parse(JSON.stringify(wordList));
    let randWord = Math.round((Math.random() * wordCopy.length) - 1);
    currentWord.innerText = wordCopy[randWord];
    wordCopy.splice(randWord, 1);
    reStartBtn.innerText = 'Reset';
    timer.innerText = `Time Left: 99`
    textInp.value = '';
    textInp.disabled = false;
    textInp.focus();
    hardModeOn = false;

    if (!intervalActive) {
        startInterval();
        intervalActive = true;
    } else {
        seconds = 99;
        resetInterval();
    }
})

let score = 0;
textInp.addEventListener('keyup', function() {
    let randWord = Math.round((Math.random() * wordCopy.length) - 1);
    if (textInp.value === currentWord.innerText){
        score++;
        currentScore.innerText = `Score: ${score}`;
        currentWord.innerText = wordCopy[randWord];
        wordCopy.splice(randWord, 1);
        textInp.value = '';
    }
})

hardMode.addEventListener('click', function() {
    hardmodeMusic.play();
    BgMusic.pause();
    BgMusic.currentTime = 0;

    title.classList.add('hard-text');
    currentWord.classList.add('hard-text');

    higherScore.style.display = 'block';
    hardModeOn = true;

    wordCopy = JSON.parse(JSON.stringify(harderWords));
    let randWord = Math.round((Math.random() * wordCopy.length) - 1);
    currentWord.innerText = wordCopy[randWord];
    wordCopy.splice(randWord, 1);
    reStartBtn.innerText = 'Reset';
    timer.innerText = `Time Left: 99`
    textInp.value = '';
    textInp.disabled = false;
    textInp.focus();

    if (!intervalActive) {
        startInterval();
        intervalActive = true;
    } else {
        seconds = 99;
        resetInterval();
    }
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
