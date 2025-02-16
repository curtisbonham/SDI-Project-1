let tickerTape = document.getElementById("tickerItem");

const cryptoTicker = () => {
  fetch('https://api.coinlore.net/api/tickers/')
    .then(response => response.json())
    .then(currencies => {
      let top5 = currencies.data.splice(0, 5)
      tickerTape.textContent =
        (`${top5[0].name} (${top5[0].symbol}) $${top5[0].price_usd}usd (${top5[0].percent_change_24h}%) * * *
        ${top5[1].name} (${top5[1].symbol}) $${top5[1].price_usd}usd (${top5[1].percent_change_24h}%) * * *
        ${top5[2].name} (${top5[2].symbol}) $${top5[2].price_usd}usd (${top5[2].percent_change_24h}%) * * *
        ${top5[3].name} (${top5[3].symbol}) $${top5[3].price_usd}usd (${top5[3].percent_change_24h}%) * * *
        ${top5[4].name} (${top5[4].symbol}) $${top5[4].price_usd}usd (${top5[4].percent_change_24h}%)`)
    })
  }

const searchBitcoin = () => {
  fetch('https://api.coinlore.net/api/tickers/')
    .then(response => response.json())
    .then(getId => {

    })

}

// searchBitcoin();
cryptoTicker();
