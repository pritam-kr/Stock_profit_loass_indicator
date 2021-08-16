const stockUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=2C8P70FPKFBZGMCM';

fetch(stockUrl)
    .then((res) => {
        return res.json()
    })
    .then((data) => {
        const Ob = Object.values(data)[1]

        // daily prices of a stock
        const dailyPrices = Object.values(Ob)[0]

        //daily current prices
        const dailyCurrentPrice = Object.values(dailyPrices)[3]
        console.log(dailyCurrentPrice)
    })