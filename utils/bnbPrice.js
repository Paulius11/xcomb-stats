
const BSC_API = "NEZQNT4IIET4VQJ9JXRD9XUAUJB9HA8RKD"
const URL_BNB_PRICE = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT"

const bnbPrice = async() => {

    const bnbResponse = await fetch(URL_BNB_PRICE);
    const bnb = await bnbResponse.json();
    console.log(bnb.price)

    return parseFloat(bnb.price).toFixed(0) 
}
export default bnbPrice;
