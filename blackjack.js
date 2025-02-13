//shuffle the cards: deck count set to 6

//https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6

//Draw a card:  Be sure to replace deck_id with a valid deck_id.
//TIP: replace <<deck_id>> with "new" to create a shuffled deck and draw cards
// from that deck in the same request.

//https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2

//Reshuffle the cards

//https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/
//https://deckofcardsapi.com/api/deck/<<deck_id>>/shuffle/?remaining=true

//Brand new deck

//https://deckofcardsapi.com/api/deck/new/

//Adding to piles
//Note: This will not work with multiple decks.

//https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S

//Drawing from piles

//https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/draw/?cards=AS
//https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/draw/?count=2
//https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/draw/bottom/
//https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/draw/random/

const playBtn = document.getElementById("playBtn");

let dealerSum = 0;
let playerSum = 0;

let dealerAceCount = 0;
let playerAceCount = 0;

let hidden;
let deck;
let deckId;

let canHit = true;

//function to shuffle a deck of cards and draw 2 cards
const drawNewCards = () =>{
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
   .then(response => {
    if(!response.ok){
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
   .then(getDeckId => {
      fetch(`https://deckofcardsapi.com/api/deck/${getDeckId.deck_id}/draw/?count=2`)
        .then(response => {
          if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(drawCards => {return drawCards})
    })
}

const play = () => {
  drawNewCards();
  document.getElementById('dealer-cards')
  document.querySelector('dealer-cards').innerHTML = drawCards;

}

playBtn.addEventListener("click", play());




