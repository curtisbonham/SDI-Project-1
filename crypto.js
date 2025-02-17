let tickerTape = document.getElementById("tickerItem");
let searchInput = document.getElementById("cryptoSearch");
let searchBtn = document.getElementById("searchBtn");
let searchTable = document.getElementById("searchTable");

const cryptoTicker = () => {
  fetch('https://api.coinlore.net/api/tickers/')
    .then(response => response.json())
    .then(currencies => {
      let top10 = currencies.data.splice(0, 10)
      tickerTape.textContent =
        (`${top10[0].name} (${top10[0].symbol}) $${top10[0].price_usd}usd (${top10[0].percent_change_24h}%) * * *
        ${top10[1].name} (${top10[1].symbol}) $${top10[1].price_usd}usd (${top10[1].percent_change_24h}%) * * *
        ${top10[2].name} (${top10[2].symbol}) $${top10[2].price_usd}usd (${top10[2].percent_change_24h}%) * * *
        ${top10[3].name} (${top10[3].symbol}) $${top10[3].price_usd}usd (${top10[3].percent_change_24h}%) * * *
        ${top10[4].name} (${top10[4].symbol}) $${top10[4].price_usd}usd (${top10[4].percent_change_24h}%) * * *
        ${top10[5].name} (${top10[5].symbol}) $${top10[5].price_usd}usd (${top10[5].percent_change_24h}%) * * *
        ${top10[6].name} (${top10[6].symbol}) $${top10[6].price_usd}usd (${top10[6].percent_change_24h}%) * * *
        ${top10[7].name} (${top10[7].symbol}) $${top10[7].price_usd}usd (${top10[7].percent_change_24h}%) * * *
        ${top10[8].name} (${top10[8].symbol}) $${top10[8].price_usd}usd (${top10[8].percent_change_24h}%) * * *
        ${top10[9].name} (${top10[9].symbol}) $${top10[9].price_usd}usd (${top10[9].percent_change_24h}%)`)
    })
    .catch(error => console.error('Error fetching data:', error));
  }

const searchBitcoin = (event) => {
  const searchTerm = searchInput.value.toLowerCase();
  searchTable.textContent = "";
  fetch('https://api.coinlore.net/api/tickers/')
    .then(response => response.json())
    .then(data => {
      const coins = data.data;
      let foundCoin = null;

      for (const coin of coins){
        if (coin.name.toLowerCase().includes(searchTerm) || coin.symbol.toLowerCase().includes(searchTerm)) {
          foundCoin = coin;
          break;
        }
      }
      if (foundCoin) {
        const { id, name, symbol, price_usd, percent_change_24h } = foundCoin;
        searchTable.innerHTML = `
        <tr>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price</th>
          <th>Percent Change</th>
        </tr>
        <tr>
          <td>${name}</td>
          <td>${symbol}</td>
          <td>$${price_usd}</td>
          <td>${percent_change_24h}%</td>
          </tr>
        `;
      } else {
        searchTable.innerHTML = `<p>Coin not found!</p>`;
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}

searchBtn.addEventListener('click', searchBitcoin);
searchInput.addEventListener('keypress', function(event) {
  if(event.key === 'Enter'){
    event.preventDefault();
    searchBtn.click();
  }
});

cryptoTicker();

