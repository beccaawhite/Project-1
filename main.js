/*----- constants -----*/


const suits = ["h", "s", "d", "c"]; // naming it this way so that it matches the css file
const ranks = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "J", "Q", "K", "A"];
const vals = ["02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14"];

const masterDeck = getCards();


/*----- app's state (variables) -----*/ //use JS to reference 

let playerdeck = [];
let computerdeck = [];
let winner;
let deck;
let shuffledDeck;



/*----- cached element references -----*/ //what you SEE changing

// selects middle deck container
const placeholder = document.getElementById('shuffled-deck-container');
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
    suits.forEach(function (suit) {
        ranks.forEach(function (rank) {
            let value = Number(rank)
            // if this is J --> value: 11
            if (rank == "J") {
                value = 11
            } else if (rank == "Q") {
                value = 12
            } else if (rank == "K") {
                value = 13
            } else if (rank == "A") {
                value = 14
            }
            carddeck.push({
                //the "face" property maps to the lib CSS classes for cards .card.dA,
                face: `${suit}${rank}`,
                // Setting the value property for a game of war
                value: value,

            })
        })
    })
    return carddeck
}


// function to update DOM with card faces, called in dealCards()
function renderDeck(deck, container) {
    container.innerHTML = [];
    const cardsHtml = deck.reduce(function (html, card) {
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
    for (let i = 0; i < shuffledDeck.length; i++) {
        if (i % 2) {
            playerdeck.push(shuffledDeck[i]);
        } else {
            computerdeck.push(shuffledDeck[i]);
        }
    }
    updateCardCount();
    playerContainer.classList.add("back-blue");
    playerContainer.classList.add("card");
    computerContainer.classList.add("back-blue");
    computerContainer.classList.add("card");
}

// function to get rid of back of card 
function removeClass() {
    playerContainer.classList.remove("back-blue");
    playerContainer.classList.remove("card");
    computerContainer.classList.remove("back-blue");
    computerContainer.classList.remove("card");
}

// function to update the DOM with the length of each players deck array
function updateCardCount() {
    document.getElementById("player-score").innerHTML = "Count: " + playerdeck.length,
        document.getElementById("computer-score").innerHTML = "Count: " + computerdeck.length
}


// function to call ever turn, if either deck is 52, winner winner chicken dinner
function chickenDinner() {
    if ((playerdeck.length === 52) || (computerdeck.length === 52)) {
        if (playerdeck.length === 52) {
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
            computerContainer.classList.add("back-blue");
            computerContainer.classList.add("card");
        }
    }
}




function nextTurn() {
    // takes off the back of card decor
    removeClass();
    placeholder.innerHTML = ""

    console.log(playerdeck[0].value)
    console.log(computerdeck[0].value)
    // if card values are the same, WAR
    if (playerdeck[0].value === computerdeck[0].value) {
        placeholder.innerHTML = "WAR"
        if ((playerdeck.length > 3) && (computerdeck.length > 3)) {
            // call small war function if either deck is 
            bigWar(playerdeck, computerdeck)
        }
        else {
            smallWar(playerdeck, computerdeck)
        }
        // card that has greater value, wins    
    }
    else {
        compareValues(playerdeck, computerdeck);
        console.log(playerdeck);
        console.log(computerdeck);
    }
    // check for winner once every turn is taken
    chickenDinner();
    renderDeck(playerdeck, playerContainer);
    renderDeck(computerdeck, computerContainer);
    updateCardCount();

}


// function for if both players have an additional 3 cards to play
function bigWar(deck1, deck2) {
    let warplay = [];
    let warcomp = [];
    // iterate and get 3 additional cards from each player
    for (let i = 0; i < 4; i++) {
        let p1 = playerdeck.shift();
        warplay.push(p1);
    }
    for (let i = 0; i < 4; i++) {
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
    if (warplay[3].value > warcomp[3].value) {
        addArray(warplay, playerdeck);
        addArray(warcomp, playerdeck);
        console.log("player deck won")
        console.log(playerdeck);
        placeholder.innerHTML = "You won the war"
    }
    else {
        addArray(warcomp, computerdeck);
        addArray(warplay, computerdeck);
        console.log("computer deck won")
        console.log(computerdeck);
        placeholder.innerHTML = "Computer won the war"
    }
    renderDeck(playerdeck, playerContainer);
    renderDeck(computerdeck, computerContainer);
    updateCardCount();
}

// function for if one deck doesn't have enough cards for war, they lose
function smallWar(deck1, deck2) {
    // if player deck is smaller, copmuter gets all the cards
    if (playerdeck.length < computerdeck.length) {
        addArray(playerdeck, computerdeck)
        let warcomp = computerdeck.shift();
        addArray(warcomp, computerdeck)
        playerdeck = [];
    }
    else {
        addArray(computerdeck, playerdeck)
        let warplay = playerdeck.shift();
        addArray(warplay, playerdeck)
        computerdeck = [];
    }
    console.log(computerdeck)
    console.log(playerdeck)
}


// function to add won array to end of deck
// otherwise deck gets added to array in an object
function addArray(start, end) {
    let arrIdx = 0;
    while (arrIdx < start.length) {
        end.push(start[arrIdx]);
        arrIdx += 1
    }
    return end
}

// function to see which players card has the bigger value
function compareValues(pdeck, cdeck) {
    // if players top card is greater than comps top card
    // add both cards to end of player card array
    if (playerdeck[0].value > computerdeck[0].value) {
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