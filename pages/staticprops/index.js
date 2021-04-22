import React, { useState, useEffect } from "react";
const BSC_API = "NEZQNT4IIET4VQJ9JXRD9XUAUJB9HA8RKD"

const URL_MARKET_CAP = 'https://api.bscscan.com/api?module=stats&action=tokenCsupply&contractaddress=0xb27adaffb9fea1801459a1a81b17218288c097cc&apikey=' + BSC_API
const URL_BNB_PRICE = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT"


export async function getStaticProps() {
  const bnbResponse = await fetch(URL_BNB_PRICE);
  const bnb = await bnbResponse.json();
  const tokenResponse = await fetch(URL_MARKET_CAP);
  const token = await tokenResponse.json();
  console.log(value)
  return {
    props:  {bnb, token},
  }
}


export default function Home( {bnb, token}) {
  const [tokenContract, setTokenContract] = useState("test");

    return (
      <>
    {/* <div>{bnb.price} </div>
    <div>{token.result} </div> */}
    <div>BNB price: {bnb.price} USDT <br/>Token MC   {(token.result/10**8).toLocaleString('en')}</div>
      </>
  
    )}
