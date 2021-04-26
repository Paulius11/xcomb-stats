import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
const URL_MARKET_CAP = 'https://api.bscscan.com/api?module=stats&action=tokenCsupply&apikey=' + BSC_API;
const URL_BNB_PRICE = "https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT"

export default function Home() {
  const [tokenContract, setTokenContract] = useState("");
  const [savedTokencontract, setSavedTokenContract] = useStateWithLocalStorage(
    'myValueInLocalStorage'
  );
  const [bnbPrice, setBnbPrice] = useState();
  const [tokenCap, setTotenCap] = useState();

  const router = useRouter();




  // updating parameters after form 
  const handleSubmit = async (evt) => {

    evt.preventDefault();
    setSavedTokenContract(tokenContract)
    router.push(tokenContract)

    const bnbResponse = await fetch(URL_BNB_PRICE);
    const bnb = await bnbResponse.json();
    setBnbPrice(bnb.price)

    const urlMcap = URL_MARKET_CAP + `&contractaddress=${tokenContract}`;
    const tokenResponse = await fetch(urlMcap)
                                .then(r => r.json())
                                .catch((error) => { console.log(error)})
    console.log(tokenResponse)
    setTotenCap(tokenResponse.result)

  };

  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>Token name </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Stats for {id} <br/>
      <hr/>
      <div>
        BNB price: {bnbPrice} USDT 
        <br/>Token MC:   {(typeof tokenCap !== "undefined"  && tokenCap/10**8).toLocaleString('en')}
      </div>
        {/* <Header/> */}
      <main>
        <hr/>
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

