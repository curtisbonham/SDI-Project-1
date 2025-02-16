let currency1 = "";
let currency2 = "";
let currency3 = "";
let currency4 = "";
let currency5 = "";



let tickerOne = document.getElementById("tickerItem1")
let tickerTwo = document.getElementById("tickerItem2")
let tickerThree = document.getElementById("tickerItem3")
let tickerFour = document.getElementById("tickerItem4")
let tickerFive = document.getElementById("tickerItem5")

const topFiveBitcoins = () => {
  fetch('https://api.coinlore.net/api/coin/markets/?id=90')
    .then(response => response.json())
    .then(currencies => {
      let top5 = currencies.splice(0, 5);
      tickerOne.textContent = (`Name: ${top5[0].name}, Price: ${top5[0].price}, Volume: ${top5[0].volume}`);
      tickerTwo.textContent = (`Name: ${top5[1].name}, Price: ${top5[1].price}, Volume: ${top5[1].volume}`);
      tickerThree.textContent = (`Name: ${top5[2].name}, Price: ${top5[2].price}, Volume: ${top5[2].volume}`);
      tickerFour.textContent = (`Name: ${top5[3].name}, Price: ${top5[3].price}, Volume: ${top5[3].volume}`);
      tickerFive.textContent = (`Name: ${top5[4].name}, Price: ${top5[4].price}, Volume: ${top5[4].volume}`);
    })
}

const searchBitcoin = () => {

}


topFiveBitcoins();

