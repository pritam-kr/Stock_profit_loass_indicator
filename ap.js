
const stockLevel = document.querySelector('#stock-symbol');
const stockQuantity = document.querySelector('#quantity');
const purchsePrice = document.querySelector('#purchase-price');

const form = document.forms[0];

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const stockLevelValue = stockLevel.value.toUpperCase();

    const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockLevelValue}&apikey=2C8P70FPKFBZGMCM`;

    // const url = `https://api.tiingo.com/tiingo/daily/${stockLevelValue}/prices`;

    fetch(stockUrl)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            const Ob = Object.values(data)[1]
            // daily prices of a stock
            const dailyPrices = Object.values(Ob)[0]
            //daily current prices
            const dailyCurrentPrice = Number(Object.values(dailyPrices)[3])
             console.log(dailyCurrentPrice)

            if (dailyCurrentPrice) {
                document.querySelector(".background").style.backgroundImage = "url('/w.webp')";
                setTimeout(() => {
                    getProfitLoss(dailyCurrentPrice)
                }, 100)
            }

        })

})


// find profit and loss

function getProfitLoss(price) {

    const currentPrice = price
    const stockQuanityValue = Number(stockQuantity.value)
    const purchasePriceValue = Number(purchsePrice.value)

    // console.log(currentPrice, stockQuanityValue, purchasePriceValue)

    if (currentPrice > 0 && stockQuanityValue > 0 && purchasePriceValue > 0) {

        // find loss
        if (purchasePriceValue > currentPrice) {
            //total Loss
            const totalLoss = ((purchasePriceValue - currentPrice) * stockQuanityValue).toFixed(2);
            //loss in percentage
            const lossPerce = (((purchasePriceValue - currentPrice) * 100) / purchasePriceValue).toFixed(2);

            if (lossPerce > 50) {
                document.querySelector(".background").style.backgroundImage = "url('/ll.webp')";
            } else if (lossPerce <= 50) {
                document.querySelector(".background").style.backgroundImage = "url('/l.webp')";
            }
            message(`You lost ${lossPerce}%, and Your total loss is ₹${totalLoss}`)

        } else {
            //total profit in cash
            const totalProfit = ((currentPrice - purchasePriceValue) * stockQuanityValue).toFixed(2);
            //profit in percentage
            const profitPer = (((currentPrice - purchasePriceValue) * 100) / purchasePriceValue).toFixed(2);

            if (profitPer > 50) {
                document.querySelector(".background").style.backgroundImage = "url('/ppp.webp')";
            } else if (profitPer <= 50) {
                document.querySelector(".background").style.backgroundImage = "url('/lp.webp')";
            }

            message(`You gain ${profitPer}%, and Your total profit is ₹${totalProfit}`)
        }
    }

}

function message(str) {
    var showMessage = ''
    showMessage = ` <div class="loss-info"><p>${str}</p></div>`
    document.querySelector(".output").innerHTML = showMessage;
}