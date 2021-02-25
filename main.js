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
const computerWinner = document.querySelector(".computer ");
const playerWinner = document.querySelector(".player");




/*----- event listeners -----*/
document.querySelector(".deal")
    .addEventListener("click", dealCards);

document.querySelector(".next-turn")
    .addEventListener("click", nextTurn); 

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
                value: Number(rank) || (rank === "J" ? 11 : 11) || (rank === "Q" ? 12 : 12)


            })
        })
    }) 
    return carddeck;
}

function faceCards(rank){
    // Jacks
    if(rank === "J"){
        rank === "J" ? 11 : 11
    }
    // Queen
    else if (rank === "Q"){
        rank === "Q" ? 12 : 12
    }
    // King
    else if(rank === "K"){
        rank === "K" ? 13 : 13
    }
    // Aces
    else {
        rank === "A" ? 14 : 14
    }

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


// function to call ever turn, if either deck is 52, winner winner chicken dinner
function chickenDinner(){
    if((playerdeck.length === 52) || (computerdeck.length === 52)){
        if(playerdeck.length === 52){
            playerWinner.style.color = "#ff0054"; 
            playerWinner.style.fontSize = "25px"
            document.getElementById("player-score").innerHTML = "YOU WON! ";
            document.getElementById("computer-score").innerHTML = "Computer Lost";

        }
        else {
            computerWinner.style.color = "#ff0054"; 
            computerWinner.style.fontSize = "25px"
            document.getElementById("player-score").innerHTML = "You Lost";
            document.getElementById("computer-score").innerHTML = "WINNER";
        }
    }
}


function nextTurn(){
    
    // if((playerdeck.length === 52) || (computerdeck.length === 52)){
    //     // to produce and 
    // } 
    // // no winner, so play round

    // if card values are the same, WAR
    if (playerdeck[0].value === computerdeck[0].value){
        // call war function if they have array length greater than 4 
        compareWar(playerdeck, computerdeck);
        // call small war function if either deck is 
    } 
    else {
        compareValues(playerdeck, computerdeck);
        console.log(playerdeck);
        console.log(computerdeck);
    }
    
    // {
    //     // if card values are the same, WAR
    //     if(playerdeck[0].value === computerdeck[0].value){
    //         // call war function
    //         compareWar(playerdeck, computerdeck);
    //     } 
    //     // if not, compare values function
    //     else {
    //         compareValues(playerdeck, computerdeck);
    //         console.log(playerdeck);
    //         console.log(computerdeck);
    //     }
    // }
    chickenDinner();
}

// function smallWar(){
//     let warplay = [];
//     let warcomp = [];

// }

function compareWar(deck1, deck2){
    let warplay = [];
    let warcomp = [];
    // iterate and get 3 additional cards from each player
    for (let i = 0; i < 4; i++){
      let p1 = playerdeck.shift();
      warplay.push(p1);
    }
    for (let i = 0; i < 4; i++){
      let c1 = computerdeck.shift();
      warcomp.push(c1)
    }
    // to see the war decks and whats being compared 
    console.log(`warplay:`)
    console.log(warplay)
    console.log(`warcomp:`)
    console.log(warcomp);
    // compare the last placed card (last index)
    // whichever is larger in value, add array to end of deck
    if(warplay[3].value > warcomp[3].value){
        addArray(warplay, playerdeck);
        addArray(warcomp, playerdeck);
        console.log("player deck won")
        console.log(playerdeck);
    } 
    else {
        addArray(warcomp, computerdeck);
        addArray(warplay, computerdeck);
        console.log("computer deck won")
        console.log(computerdeck);
    }
    renderDeck(playerdeck, playerContainer);
    renderDeck(computerdeck, computerContainer);
    updateCardCount();
}

// function to add won array to end of deck
// otherwise deck gets added to array in an object
function addArray(start, end){
    let arrIdx = 0;
    while(arrIdx < start.length){
        end.push(start[arrIdx]);
        arrIdx += 1
    }
    return end
}

// function to see which players card has the bigger value
function compareValues(pdeck, cdeck){
    // if players top card is greater than comps top card
    // add both cards to end of player card array
    if(playerdeck[0].value > computerdeck[0].value){
        console.log(playerdeck);
        console.log(computerdeck);
        let p1 = playerdeck.shift();
        let c1 = computerdeck.shift();
        playerdeck.push(p1);
        playerdeck.push(c1);
    } 
    // if computers top card is greater than players top card
    // add both cards to end of computer card array
    else {
        let play1 = playerdeck.shift();
        let comp1 = computerdeck.shift();
        computerdeck.push(comp1);
        computerdeck.push(play1); 
    }
    renderDeck(playerdeck, playerContainer);
    renderDeck(computerdeck, computerContainer) 
    updateCardCount();
}




// fix reset game to work