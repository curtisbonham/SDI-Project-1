let deckID = "";
let dealerCards = [];
let playerCards = [];
let dealerScore = "";
let playerScore = "";
let roundWon = false;
let roundLost = false;
let roundTied = false;
let lossCount = 0;
let winCount = 0;

//score displays areas
let dealerScoreArea = document.getElementById("dealerScore");
let playerScoreArea = document.getElementById("playerScore");

//card display areas
let dealerCardsArea = document.getElementById("dealerCards");
let playerCardsArea = document.getElementById("playerCards");

//Buttons
let startPlayBtn = document.getElementById("startPlayBtn");
let newGameBtn = document.getElementById("newGameBtn");
let hitBtn = document.getElementById("hitBtn");
let stayBtn = document.getElementById("stayBtn");

//other areas
let resultsArea = document.getElementById("results");
let winsCountArea = document.getElementById("winsArea")
let lossesCountArea = document.getElementById("lossesArea")
hitBtn.style.display = "none";
stayBtn.style.display = "none";
newGameBtn.style.display = "none";

//on-click events
startPlayBtn.addEventListener("click", () => getNewDeck());
newGameBtn.addEventListener("click", () => newGame());
hitBtn.addEventListener("click", () => hit("player"));
stayBtn.addEventListener("click", () => {
  document.getElementById("hitBtn").disabled = true;
  setTimeout(() => dealersTurn(), 1000)});

const resetPlayingArea = () => {
  dealerCards = [];
  playerCards = [];
  roundWon = false;
  roundLost = false;
  roundTied = false;
  dealerScore = "";
  playerScore = "";
  dealerScoreArea.textContent = dealerScore;
  playerScoreArea.textContent = playerScore;
  resultsArea.textContent = "";
  dealerCardsArea.textContent = "";
  playerCardsArea.textContent = "";
  document.getElementById("hitBtn").disabled = false;
}

const newGame = () => {
  resetPlayingArea();
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`)
    .then(response => response.json())
    .then(cardData => {
    dealerCards.push(cardData.cards[0], cardData.cards[1])
    playerCards.push(cardData.cards[2], cardData.cards[3])

    dealerScore = "?";
    dealerScoreArea.textContent = dealerScore;
    hitBtn.style.display = "block";
    stayBtn.style.display = "block";

    dealerCards.forEach((card, i) => {
      let cardImage = document.createElement("img");
      if(i===0) {
        cardImage.src ='./images/card.png'
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
      resultsArea.textContent = "Blackjack! Winner! Winner! Chicken Dinner!"
      incrementWinLoss(roundWon);
    }
    playerScoreArea.textContent = playerScore;

})
.catch(error => console.error('Error fetching data:', error));
}

const getNewDeck = () => {
  resetPlayingArea();
  winCount = 0;
  lossCount = 0;
  winsCountArea.textContent = "";
  lossesCountArea.textContent = "";
  fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
  .then(response => response.json())
  .then(getDeckID => {
    deckID = getDeckID.deck_id;
    newGameBtn.style.display = "block";
    hitBtn.style.display = "none";
    stayBtn.style.display = "none";
  })
  .catch(console.error)
}

const hit = (target) => {
  fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
  .then(response => response.json())
  .then(cardData => {

  if(target === "player"){
  playerCards.push(cardData.cards[0])
  let cardImage = document.createElement("img");
  cardImage.src = cardData.cards[0].image;
  playerCardsArea.appendChild(cardImage);
  playerScore = calculateScore(playerCards);
  playerScoreArea.textContent = playerScore;
  if (playerScore > 21) {
    roundLost = true;
    resultsArea.textContent = "You busted!! You lose the hand!!"
    incrementWinLoss(roundLost);
    document.getElementById("hitBtn").disabled = true;
  }

}
  if(target === "dealer"){
    let cardImage = document.createElement("img");
    dealerCards.push(cardData.cards[0]);
    cardImage.src = cardData.cards[0].image;
    dealerCardsArea.appendChild(cardImage);
    dealersTurn();
  }
})
.catch(error => console.error('Error fetching data:', error));
}

const dealersTurn = () => {
  document.getElementById("hitBtn").disabled = true;
  dealerScore = calculateScore(dealerCards);
  dealerScoreArea.textContent = dealerScore;
  dealerCardsArea.firstChild.src = dealerCards[0].image;
  if (dealerScore < 17) {
    setTimeout(()=>hit('dealer'), 900)
  }
  else if (dealerScore > 21) {
    roundWon = true;
    resultsArea.textContent = "Dealer busted!! You Win the hand!";
    incrementWinLoss(roundWon);
  }
  else if (dealerScore > playerScore) {
    roundLost = true;
    resultsArea.textContent = " Dealer's score is higher. You Lost the hand...";
    incrementWinLoss(roundLost);
  }
  else if (dealerScore === playerScore) {
    roundTied = true;
    resultsArea.textContent = "Push this round.";
  }
  else {
    roundWon = true;
    resultsArea.textContent = "You Win the hand!";
    incrementWinLoss(roundWon);
  }

}

const calculateScore = (cards) => {
  let hasAce = false;
  score = cards.reduce((acc, card) => {
    if (card.value === "ACE") {
      hasAce = true;
      return acc + 1
    }
    if (isNaN(card.value)) {return acc + 10 }
    return acc + Number(card.value);
  }, 0)
  if (hasAce) {
    score = (score + 10) > 21 ? score : score + 10;
  }
  return score;
}

const incrementWinLoss = (round) => {
  if (round === roundLost){
    lossCount++;
    lossesCountArea.textContent = lossCount;
  }
  if (round === roundWon){
    winCount++;
    winsCountArea.textContent = winCount;
  } else if (roundTied) {return}
}



