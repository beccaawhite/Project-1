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
    

    
    render();
}

function render() {
    console.log("render is firing");

    getCards();
    shuffle();

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


// function to update DOM with card faces, called in dealCards()
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

// function to split master deck into two players, render in DOM
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




function nextTurn(){
    //check for winner
    if((playerdeck.length === 52) || (computerdeck.length === 52)){
        console.log("Game Over");
        // if player wins
        if(playerdeck.length === 52){
            // style winner to change colors and increase px
        } 
        // if computer wins
        else {
            // style winner to change color and increase px
        }
    } 
    
    // no winner, so play round
    else {
        // if card values are the same, WAR
        if(playerdeck[0].value === computerdeck[0].value){
            // call war function
        } 
        // if not, compare values function
        else {
            compareValues(playerdeck, computerdeck);
            console.log(playerdeck);
            console.log(computerdeck);
        }
    }
}

// function war(pdeck, cdeck){
//     // play next 3 cards

//     // compare values of two cards


//     // greater value push it into arr

// }

function compareValues(pdeck, cdeck){
    if(playerdeck[0].value > computerdeck[0].value){
        console.log(playerdeck);
        console.log(computerdeck);
        let p1 = playerdeck.shift();
        let c1 = computerdeck.shift();
        playerdeck.push(p1);
        playerdeck.push(c1);
        // return playerdeck
        renderDeck(playerdeck, playerContainer);
        renderDeck(computerdeck, computerContainer)
        
    } else {
        let play1 = playerdeck.shift();
        let comp1 = computerdeck.shift();
        computerdeck.push(comp1);
        computerdeck.push(play1);
        // return computerdeck
        renderDeck(playerdeck, playerContainer);
        renderDeck(computerdeck, computerContainer) 
    }
    updateCardCount();
}



// fix reset game to work