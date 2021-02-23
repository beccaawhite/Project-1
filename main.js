/*----- constants -----*/


const suits = ["h", "s", "d", "c"]; // naming it this way so that it matches the css file
const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];

const masterDeck = getCards();




/*----- app's state (variables) -----*/ //use JS to reference 

let playerdeck = [];
let computerdeck = [];
let winner;
let deck;
let shuffledDeck;

let flipped = false;


/*----- cached element references -----*/ //what you SEE changing

// selects middle deck container
const shuffledContainer = document.getElementById('shuffled-deck-container');
const playerContainer = document.getElementById("playerHand");
const computerContainer = document.getElementById("computerHand");





/*----- event listeners -----*/
document.querySelector(".deal")
    .addEventListener("click", dealCards);

// document.querySelector(".reset")
//     .addEventListener("click", init)



/*----- functions -----*/


// initial value at start of game
init();

function init() {
    // initialize scores // doesn't change here 
    

    getCards();
    shuffle();
    render();
}

function render() {
    console.log("render is firing");


}

// function to create a card deck with 52 cards
function getCards() {
    const carddeck = [];
    suits.forEach(function(suit){
        ranks.forEach(function(rank){
            carddeck.push({
                //the "face" property maps to the lib CSS classes for cards .card.dA,
                face: `${suit}${rank}`, 
                // Setting the value property for a game of war
                value: Number(rank) || (rank === "J" ? 11 : 11)
                // --------------------------------------- all face cards have a vlaue of 11, come back to fix---------------- // 
            })
        })
    }) 
    return carddeck;
}


function renderDeck(deck, container){
    container.innerHTML = [];
    const cardsHtml = deck.reduce(function(html, card){
        return html + `<div class="card ${card.face}"></div>`
    }, []);

    container.innerHTML = cardsHtml;

}



function shuffle() {
    const tempDeck = [...masterDeck];
    shuffledDeck = [];
    while (tempDeck.length) {
      // Get a random index for a card still in the tempDeck
      const rndIdx = Math.floor(Math.random() * tempDeck.length);
      // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
      shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
    }
    return shuffledDeck
    console.log(shuffledDeck)
}





// function to split master deck into two players
function dealCards() {
    
    console.log("dealing the cards...");
    

    for(let i = 0; i < shuffledDeck.length; i++){
        if(i%2){
            playerdeck.push(shuffledDeck[i]);
        } else {
            computerdeck.push(shuffledDeck[i]);
        }
    }
    updateCardCount();
    console.log(playerdeck)
    console.log(computerdeck)
    // render each container to have DOM element cards
    renderDeck(playerdeck, playerContainer);
    renderDeck(computerdeck, computerContainer);

}


// function to update the DOM with the length of each players deck array
function updateCardCount() {
    document.getElementById("player-score").innerHTML = "Count: " + playerdeck.length,
    document.getElementById("computer-score").innerHTML = "Count: " + computerdeck.length
}







// once cards are connected to html and cards are placed on the right webpage spot

// create function for next turn
    // should take card on top and place it in middle face up
           // playerdeck.pop()
           // computerdeck.pop()
    // compare cards value
        // if player value greater than copmuter, push cards to end of player array
        // if computer value greater than player, push cards to end of computer array
        // if values are the same, place three more cards face up
            // repeat process until winner


// create function for winner
    // if player or computer deck count === 52, game over
    // create alert (or something) that says which player won
    // style the winning player 

    // if(playerdeck.length === 52){
    //     console.log("winner!")
    // } 


// fix reset game to work