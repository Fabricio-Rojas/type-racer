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

const harderWords = ['Alphabetization', 'Accomplishments', 'Acknowledgeable', 'Blameworthiness', 'Bibliographical', 'Bacteriological', 'Characteristics', 'Congratulations', 'Confidentiality', 'Desertification', 'Disorganization', 'Diversification', 'Excommunication', 'Experimentation', 'Electrification', 'Familiarization', 'Faithworthiness', 'Featurelessness', 'Gentlemanliness', 'Grandmotherhood', 'Gravitationally', 'Housebrokenness', 'Hypercorrection', 'Hypercorrection', 'Interdependence', 'Instrumentation', 'Insubordination', 'Kindheartedness', 'Kinesthetically', 'Kaleidoscopical', 'Lightheadedness', 'Lackadaisically', 'Lexicographical', 'Misappreciation', 'Marginalization', 'Materialization', 'Nationalization', 'Neurobiological', 'Noninterruption', 'Overcalculation', 'Oversensitivity', 'Oversufficiency', 'Procrastinating', 'Prenotification', 'Physiologically', 'Responsibleness', 'Reapportionment', 'Redetermination', 'Straightforward', 'Sententiousness', 'Supernaturalism', 'Thermochemistry', 'Trustworthiness', 'Transplantation', 'Unconditionally', 'Underproduction', 'Unqualification', 'Vascularization', 'Vasoconstrictor', 'Vasovesiculitis', 'Weatherboarding', 'Wrongheadedness', 'Warrantableness']
