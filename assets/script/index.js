'use strict';

// Declaring Elements

const timer = document.querySelector('.timer');
const currentWord = document.querySelector('.curr-word');
const textInp = document.querySelector('#txt-input');
const reStartBtn = document.querySelector('#start-reset');
const currentScore = document.querySelector('.curr-score');
const highScore = document.querySelector('.high-score');
const higherScore = document.querySelector('.higher-score');

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
function startInterval() {
    countdown = setInterval(function() {
        seconds--;
        timer.innerText = `Time Left: ${seconds}`
        if (seconds === 0) {
            clearInterval(countdown);
            currentScore.innerText = `Score: 0`;
            textInp.disabled = true;
            if (score > hiScore) {
                hiScore = score;
                highScore.innerText = `High Score: ${hiScore}`;
            }
            score = 0;
        }
    }, 1000);
}   

function resetInterval() {
    clearInterval(countdown);
    startInterval();
}

let intervalActive = false;
let wordCopy;
reStartBtn.addEventListener('click', function() {
    wordCopy = JSON.parse(JSON.stringify(wordList));
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
