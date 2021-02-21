/*----- constants -----*/

const cardDeck = {

}

const suits = ["hearts", "spades", "diamonds", "clubs"];
const values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

/*----- app's state (variables) -----*/ //use JS to reference 
let playerdeck = [];
let computerdeck = [];
let winner;



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
    // .addEventListener("click", dealCards); // will need to call this function somewhere

/*----- functions -----*/


// initial value at start of game
function init(){

}

function getCards(){ // this will be in init function

    const deck = [];
    for (let i = 0; i < suits.length; i++){
        for(let j = 0; j < values.length; j++){
            let card = {value: values[j], suite: suits[i]}
            // console.log(card);
            deck.push(card);
            // console.log(deck.length)
        }
    }
    // console.log(deck)
    return deck
}

function dealcards(){
    console.log("dealing the cards...")
}
