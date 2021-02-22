/*----- constants -----*/


const suits = ["hearts", "spades", "diamonds", "clubs"];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const name = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

/*----- app's state (variables) -----*/ //use JS to reference 

let playerdeck = [];
let computerdeck = [];
let winner;
let counts;

let deck;


/*----- cached element references -----*/ //what you SEE changing


const moves = {
    // grab and place the 0 idx of playerdeck
    // player1: document.querySelector(), 
    // grab and place the 0 idx of computerdeck
    // player2: document.querySelector() 
}

/*----- event listeners -----*/


// document.querySelector(".next-turn") //  place cards or start "round"

document.querySelector(".deal")
    .addEventListener("click", dealCards); 

// document.querySelector(".reset")
//     .addEventListener("click", init)



/*----- functions -----*/


// initial value at start of game
init();

function init(){
    // initialize scores // doesn't change here 
    counts = {
        player: 0,
        computer: 0
    }

    getCards();

    render();
}

function render() {
    console.log("render is firing");

    
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


function shuffleCards(deck){
    // generate random index and assign that to deck?
    for (let i = 0; i < cards.length; i++){
        Math.floor(Math.random() * cards.length)
    }
}

// find a  way to take the deck generated in getCards() and connect to visual cards
// function makeCard(suit, value){
    // grab the div in the HTML
    // document.querySelector(".deck").innerHTML = "";
    // match the suit and value with the img from resources  
// }


function dealCards(){
    console.log("dealing the cards...");
    let i = 0
    while (i != deck.length) {
        playerdeck.push(deck[i]);
        computerdeck.push(deck[i]);
        i += 2;
    }
    updateCardCount();
}

function updateCardCount(){
    document.getElementById("player-score").innerHTML = "Count: " + playerdeck.length,
    document.getElementById("computer-score").innerHTML = "Count: " + computerdeck.length
}




// once cards are connected to html and cards are placed on the right webpage spot

// create function for next turn
    // should take card on top and place it in middle face up
    // compare cards value
        // if player value greater than copmuter, push cards to end of player array
        // if computer value greater than player, push cards to end of computer array
        // if values are the same, place three more cards face up
            // repeat process until winner


// create function for winner
    // if player or computer deck count === 52, game over
    // create alert (or something) that says which player won
    // style the winning player 


// fix reset game to work


