// const playBtn = document.getElementById("playBtn");

let dealerSum = 0;
let playerSum = 0;

let dealerAceCount = 0;
let playerAceCount = 0;

let hidden;
let deck;
let deckId;

let canHit = true;

// window.onload = function() {
//   getCardValue();
//   playGame();
// }

//function to shuffle a deck of cards and draw 2 cards
const getCardData = () =>{
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
        .then(cardData => {
          getCardValue(cardData)
          getCardImage(cardData)
          return cardData})
    })
}

const getCardValue = (cardData) => {
    let cardCode = [];
      for(let key in cardData){
        for(let subKey in cardData[key]){
          if (cardData[key][subKey].code === undefined){
            continue;
          }
          cardCode.push(cardData[key][subKey].code[0])}
        }
      cardCode.forEach(value => {
        if (isNaN(value)){
          if (value === "A"){
            console.log(11)
            return 11;
          }
          console.log(10)
          return 10;
        }
        if(!isNaN(value)){
          console.log(parseInt(value))
          return parseInt(value);
        }
      })
    }

const getCardImage = (cardData) => {
  cardImage = [];
  for(let key in cardData){
    for(let subKey in cardData[key]){
      if (cardData[key][subKey].image === undefined){
        continue;
      }
      cardImage.push(cardData[key][subKey].image)}
    }
    console.log(cardImage);
}

const playGame = () => {
  document.getElementById('dealer-cards')
  document.querySelector('dealer-cards').innerHTML = value;
}

getCardData();
// getCardValue();
// getCardImage();
// playGame();
// playBtn.addEventListener("click", play());






