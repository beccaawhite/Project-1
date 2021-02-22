/*----- constants -----*/


const suits = ["hearts", "spades", "diamonds", "clubs"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const name = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

/*----- app's state (variables) -----*/ //use JS to reference 

let playerdeck = [];
let computerdeck = [];
let winner;

let deck;


/*----- cached element references -----*/ //what you SEE changing
const deckCount = {
    // player1: document.querySelector(), // grab arr length of playerdeck
    // player2: document.querySelector() // grab arr length of computerdeck
}

const moves = {
    // grab and place the 0 idx of playerdeck
    // player1: document.querySelector(), 
    // grab and place the 0 idx of computerdeck
    // player2: document.querySelector() 
}

/*----- event listeners -----*/


// document.querySelector() //  place cards or start "round"

// document.querySelector(".deal")
//     .addEventListener("click", dealCards()); // will need to call this function somewhere

/*----- functions -----*/


// initial value at start of game
init();

function init(){

    getCards();

}

function getCards(){ 

    deck = [];
    for (let i = 0; i < suits.length; i++){
        for(let j = 0; j < values.length; j++){
            let card = {value: values[j], suit: suits[i]}
            // console.log(card);
            deck.push(card);
            // console.log(deck.length)
        }
    }
    // console.log(deck)
    // return deck
}

// need to turn deck into array

function shuffleCards(deck){
    for (let i = 0; i < cards.length; i++){
        Math.floor(Math.random() * cards.length)
    }
}

// find a  way to take the deck generated in getCards() and connect to visual cards
function makeCard(suit, value){
    // grab the div in the HTML
    document.querySelector(".deck").innerHTML = "";
    // match the suit and value with the img from resources  


}


function dealCards(){
    console.log("dealing the cards...");
    let i = 0
    while (i != deck.length) {
        playerdeck.push(deck[i]);
        computerdeck.push(deck[i]);
        i += 2;
    }
    console.log(playerdeck)
    console.log(computerdeck)

    
    // deck.forEach(function(i) {
    //     if (deck[i] % 2 === 0) {
    //         playerdeck.push(deck[i])
    //     } else {
    //         playerdeck.push(deck[i])
    //     }
    // })
   
}

