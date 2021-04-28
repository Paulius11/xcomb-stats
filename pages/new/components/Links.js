import React from "react";

export default function Links({ address }) {
  return (
    <div>
      <h2>Charts</h2>
      <ul>
        <li>
          {" "}
          <a href={`https://dex.guru/token/${address}`}> Dex Guru</a>{" "}
        </li>
        <li>
          <a href={`https://poocoin.app/tokens/${address}`}> Poop coin</a>{" "}
        </li>
        <li>
          {" "}
          <a href={`https://kek.tools/t//${address}`}> Kek tools</a> <br />
        </li>
        <li>
          {" "}
          <a href={`https://unidexbeta.app/bscCharting?token=${address}`}>
            {" "}
            Unidexbeta
          </a>{" "}
        </li>
        <li>
          {" "}
          <a href={`https://charts.bogged.finance/?token=${address}`}>
            {" "}
            Bogged chart{" "}
          </a>{" "}
        </li>
      </ul>

      <h2>Dex-Exchanges</h2>
      <ul>
        <li>
          {" "}
          <a
            href={`https://exchange.pancakeswap.finance/#/swap?0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=${address}`}
          >
            Pancakeswap
          </a>{" "}
        </li>
        <li>
          {" "}
          <a
            href={`https://pandaswap.xyz/#/swap?0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=${address}`}
          >
            Pandaswap
          </a>{" "}
        </li>
        <li>
          {" "}
          <a href={`https://app.1inch.io/#/56/swap/BNB/${address}`}>1inch</a>
        </li>
      </ul>
      <h2>Tools</h2>
      <ul>
        <li>  <a href={`https://tokensniffer.com/token/${address}`}>Tokensniffer</a> </li>
      </ul>
     
     
      <br />
    </div>
  );
}
