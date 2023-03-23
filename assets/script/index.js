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

reStartBtn.addEventListener('click', function() {

})

let score = 0;
textInp.addEventListener('keyup', function() {
    if (textInp.value === currentWord.innerText){
        score++;
        console.log(score)
    }
})

const wordist = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 
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
