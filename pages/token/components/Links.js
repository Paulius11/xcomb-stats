import React from 'react'

export default function Links({ id }) {
    return (
        <div>
          <h2>Charts</h2>
          <a href={`https://dex.guru/token/${id}`}> Dex Guru</a> <br />
          <a href={`https://poocoin.app/tokens/${id}`}> Poop coin</a> <br />
          <a href={`https://kek.tools/t//${id}`}> Kek tools</a> <br />
          <a href={`https://unidexbeta.app/bscCharting?token=${id}`} > Unidexbeta</a> <br />   
          <a href={`https://charts.bogged.finance/?token=${id}`} > Bogged chart </a>
          <h2>Dex-Exchanges</h2>
          <a
            href={`https://exchange.pancakeswap.finance/#/swap?0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c&outputCurrency=/${id}`}
          >
            Pancakeswap
          </a>{" "}
          <br />
          <a href={`https://app.1inch.io/#/56/swap/BNB/${id}`}>1inch</a>
          <h2>Tools</h2>
          <a href={`https://tokensniffer.com/token/${id}`}>Tokensniffer</a><br/>
          <a href={`https://tokenfomo.io/`}>Tokenfomo</a>
        </div>
    )
}
