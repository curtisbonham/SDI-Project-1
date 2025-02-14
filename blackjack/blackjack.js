let deckID = "";
let dealerCards = [];
let playerCards = [];
let dealerScore = "";
let playerScore = 0;
let roundWon = false;
let roundLost = false;
let roundTied = false;

let dealerAceCount = 0;
let playerAceCount = 0;

//score displays areas
let dealerScoreArea = document.getElementById("dealerScore");
let playerScoreArea = document.getElementById("playerScore");

//card display areas
let dealerCardsArea = document.getElementById("dealerCards");
let playerCardsArea = document.getElementById("playerCards");

//other areas
let resultsArea = document.getElementById("results");
let startPlayArea = document.getElementById("startPlayBtn");
let newGameArea = document.getElementById("newGameBtn");
let hitArea = document.getElementById("hitBtn");
let stayArea = document.getElementById("stayBtn");
hitArea.style.display = "none";
stayArea.style.display = "none";
newGameArea.style.display = "none";

//on-click events
startPlayArea.addEventListener("click", () => getNewDeck());
newGameArea.addEventListener("click", () => newGame());
hitArea.addEventListener("click", () => hit("player"));
stayArea.addEventListener("click", () => setTimeout(() => dealersTurn(), 1000));

const resetPlayingArea = () => {
  dealerCards = [];
  playerCards = [];
  roundWon = false;
  roundLost = false;
  roundTied = false;
  dealerScore = "";
  playerScore = 0;
  dealerScoreArea.textContent = dealerScore;
  resultsArea.textContent = "";
  dealerCardsArea.textContent = "";
  playerCardsArea.textContent = "";
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
    hitArea.style.display = "block";
    stayArea.style.display = "block";

    dealerCards.forEach((card, i) => {
      let cardImage = document.createElement("img");
      if(i===0) {
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
    console.log(playerCards);
    playerScore = calculateScore(playerCards);
    if(playerScore === 21) {
      roundWon = true;
      resultsArea.textContent = "Blackjack! Winner! Winner! Chicken Dinner!"
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
.catch(console.log)
}

const dealersTurn = () => {
  if (roundLost || roundWon || roundTied) {return}
  dealerScore = calculateScore(dealerCards);
  dealerScoreArea.textContent = dealerScore;
  dealerCardsArea.firstChild.src = dealerCards[0].image;
  if (dealerScore < 17) {
    setTimeout(()=>hit('dealer'), 9000)
  }
  else if (dealerScore > 21) {
    roundWon = true;
    resultsArea.textContent = "Dealer busted!! You Win the hand!";
  }
  else if (dealerScore > playerScore) {
    roundLost = true;
    resultsArea.textContent = " Dealer's score is higher. You Lost the hand...";
  }
  else if (dealerScore === playerScore) {
    roundTied = true;
    resultsArea.textContent = "Tie round...";
  }
  else {
    roundWon = true;
    resultsArea.textContent = "You Win the hand!";
  }
}

const calculateScore = (cards) => {
  let hasAce = false;
  score = cards.reduce((acc, card) => {
    if (card.value === "ACE") {
      hasAce = true;
      return acc + 1
    }
    if (isNaN(card.value)) { return acc + 10 }
    return acc + Number(card.value);
  }, 0)
  if (hasAce) {
    score = (score + 10) > 21 ? score : score + 10;
  }
  return score
}






