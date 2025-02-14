let deckID = "";
let dealerCards = [];
let playerCards = [];
let dealerSum = "";
let playerSum = 0;
let roundWon = false;
let roundLost = false;
let roundTied = false;
hitArea.style.display = "none";
stayArea.style.display = "none";
newGameArea.style.display = "none";

let dealerAceCount = 0;
let playerAceCount = 0;

//score displays areas
let dealerScoreArea = document.getElementById("dealerSum");
let playerScoreArea = document.getElementById("playerSum");

//card display areas
let dealerCardsArea = document.getElementById("dealerCards");
let playerCardsArea = document.getElementById("playerCards");

//other areas
let resultsArea = document.getElementById("results");
let startPlayArea = document.getElementById("startPlayBtn");
let newGameArea = document.getElementById("newGameBtn");
let hitArea = document.getElementById("hitBtn");
let stayArea = document.getElementById("stayBtn");

//on-click events
startPlayArea.onclick = getNewDeck();
newGameArea.onclick = newGame();

const newGame = () => {
  resetPlayingArea();
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`)
    .then(response => response.json())
    .then(cardData => {
    dealerCards.push(cardData.cards[0], cardData.cards[1])
    playerCards.push(cardData.cards[2], cardData.cards[3])

    dealerScore = "?";
    dealerScoreArea.textContent = dealerScore;

    dealerCards.forEach((card, i) => {
      let cardImage = document.createElement("img");
      if(i==0) {
        cardImage.src ='./card.png'
      } else {
        cardImage.src = card.image;
      }
      dealerCardsArea.appendChild(cardImage)
    })

    playerCards.forEach((card, i) =>{
      let cardImage = document.createElement("img");
      cardImage.src = card.image;
      playerCardsArea.appendChild(cardImage);
    })

    playerScore = calculateScore(playerCards);
    if(playerScore === 21) {
      roundWon = true;
    }
    playerScoreArea.textContent = playerScore;
})
.catch(console.error)
}

const getNewDeck = () => {
  resetPlayingArea();
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
  .then(response => response.json())
  .then(getDeckID => {
    deckID = getDeckID.deck_id;
    newGameArea.style.display = "block";
    hitArea.style.display = "none";
    stayArea.style.display = "none";
  })
  .catch(console.error)
}

const hit = () => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
  .then(response => response.json())
  .then(cardData => {
  playerCards.push(cardData.cards[0])
})
}

const calculateScore = () => {
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
          if(value === "0"){
            console.log(10);
          return 10;
          }
          console.log(parseInt(value))
          return parseInt(value);
        }
      })
    }

    const resetPlayingArea = () => {
      dealerCards = [];
      playerCards = [];
      roundWon = false;
      roundLost = false;
      roundTied = false;
      dealerSum = "";
      playerSum = 0;
      dealerScoreArea.textContent = dealerScore;
      resultsArea.textContent = "";
    }











// getCardData();
// // getCardValue();
// // getCardImage();
// // playGame();
// //function to shuffle a deck of cards and draw 2 cards
// const getCardData = () =>{
//   fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
//    .then(response => {
//     if(!response.ok){
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json();
//   })
//    .then(getDeckId => {
//       fetch(`https://deckofcardsapi.com/api/deck/${getDeckId.deck_id}/draw/?count=2`)
//         .then(response => {
//           if(!response.ok){
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then(cardData => {
//           getCardValue(cardData)
//           getCardImage(cardData)
//           return cardData})
//     })
// }

// const getCardValue = (cardData) => {
//     let cardCode = [];
//       for(let key in cardData){
//         for(let subKey in cardData[key]){
//           if (cardData[key][subKey].code === undefined){
//             continue;
//           }
//           cardCode.push(cardData[key][subKey].code[0])}
//         }
//       cardCode.forEach(value => {
//         if (isNaN(value)){
//           if (value === "A"){
//             console.log(11)
//             return 11;
//           }
//           console.log(10)
//           return 10;
//         }
//         if(!isNaN(value)){
//           if(value === "0"){
//             console.log(10);
//           return 10;
//           }
//           console.log(parseInt(value))
//           return parseInt(value);
//         }
//       })
//     }

// const getCardImage = (cardData) => {
//   cardImage = [];
//   for(let key in cardData){
//     for(let subKey in cardData[key]){
//       if (cardData[key][subKey].image === undefined){
//         continue;
//       }
//       cardImage.push(cardData[key][subKey].image)}
//     }
//     return cardImage;
// }

// const playGame = () => {
//   getCardData();
//   getCardValue();
//   getCardImage();
//   let dealerCardImg = document.getElementById('dealer-cards');
//   dealerCardImg.className = "d-cards";
//   dealerCardImg.appendChild(document.createElement('img'));
//   let dealerCards = document.querySelector('dealer-cards')
//   dealerCards.appendChild(dealerCardImg);
//   document.querySelector('.d-cards').src = cardImage;

//   let playerCardImg = document.getElementById('player-cards');
//   playerCardImg.className = "p-cards";
//   playerCardImg.appendChild(document.createElement('img'));
//   let playerCards = document.querySelector('player-cards')
//   playerCards.appendChild(playerCardImg);
//   document.querySelector('.p-cards').src = cardImage[0];
// }





