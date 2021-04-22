import React from 'react'

const BSC_API = "NEZQNT4IIET4VQJ9JXRD9XUAUJB9HA8RKD"

const URL_MARKET_CAP = 'https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=0xb27adaffb9fea1801459a1a81b17218288c097cc&apikey=' + BSC_API
const URL_BNB_PRICE = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT"
function Home({ bnbprice1, tokenCap }) {
    console.log(bnbprice1)
    console.log(tokenCap)
    return <div>BNB price: {bnbprice1.price} USDT <br/>Token MC   {(tokenCap.result/10**8).toLocaleString('en')}</div>
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}


Home.getInitialProps = async (context) => {
    const { id } = context.query;


    const [bnbprice1, tokenCap] = await Promise.all([
        fetch(URL_BNB_PRICE).then(r => r.json()),
        fetch(URL_MARKET_CAP).then(r => r.json()),
      ]);

      console.log(bnbprice1)
      return { bnbprice1, tokenCap };  
  }
export default Home
