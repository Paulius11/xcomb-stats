import Head from "next/head";
import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";


import dynamic from 'next/dynamic'



// Components
import Links from './components/Links'



// Local storage 
const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    // prevent undefined
    typeof window !== "undefined" && localStorage.getItem(localStorageKey) || ''
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
 
  return [value, setValue];
};

const BSC_API = "NEZQNT4IIET4VQJ9JXRD9XUAUJB9HA8RKD"
const URL_MARKET_CAP = 'https://api.bscscan.com/api?module=stats&action=tokenCsupply&apikey=' + BSC_API
const URL_BNB_PRICE = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT"

export default function Home({ bnbprice1, tokenCap  }) {
  const [tokenContract, setTokenContract] = useState("");
  const [savedTokencontract, setSavedTokenContract] = useStateWithLocalStorage(
    'myValueInLocalStorage'
  );
  const router = useRouter();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSavedTokenContract(tokenContract)
    router.push(tokenContract)

  };

  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>Token name </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>BNB price: {bnbprice1.price} USDT <br/>Token MC   {(tokenCap && tokenCap.result/10**8).toLocaleString('en')}</div>
        {/* <Header/> */}
      <main>
        Stats for {id} <br/>
        <br />
        <form onSubmit={handleSubmit}>
          <label>
            Token
            <input
              type="text"
              value={tokenContract}
              onChange={(e) => setTokenContract(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </main>
      <favorites>
          <Links id={id}/>
      </favorites>
      <h2>Last used</h2>
      {savedTokencontract}
      <footer></footer>
    </div>
  );
}

Home.getInitialProps = async (context) => {
  const { id } = context.query;

  const [bnbprice1, tokenCap] = await Promise.all([
      fetch(URL_BNB_PRICE).then(r => r.json()),
      fetch(URL_MARKET_CAP + `&contractaddress=${id}`)
        .then(r => r.json())
        .catch((error) => { console.log(error)})
    ]);

    return { bnbprice1, tokenCap };  
}