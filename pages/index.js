import Head from 'next/head'
import tokenData from '../utils/tokenData.js'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [totalSupply , setTotalSupply ] = useState('');
  const [totalFees, setTotalFees] = useState('');
  const [burnpercentage, setBurnpercentage] = useState('');

  useEffect(() => {
    let repeat;
    async function fetchData() {
        try {
            const res = await tokenData()
            setTotalSupply(res.totalSupply)
            setTotalFees(res.totalFees)
            setBurnpercentage(res.percentageFees)
            console.log(res)

            repeat = setTimeout(fetchData, 60000); // request again after a minute
        } catch (error) {
            console.error(error.message)
        }
    }
    fetchData();
    return () => {
        if (repeat) {
            clearTimeout(repeat);
        }
    }
}, []);
const router = useRouter()
const { id } = router.query;
debugger;

  return (
    <div className="container">
      <Head>
        <title>Doge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="title">
          Welcome to <a href="https://dogemoon.space/">MoonDoge</a>
        </h1>

        <p className="description">
          <code>🔥 stats</code>
        </p>

        <div className="grid">
          <a href="#" className="card">
            <h3>Total Supply &rarr;</h3>
            <p>{(typeof totalSupply !== "undefined"  && totalSupply).toLocaleString('en')}</p>
            
          </a>

          <a href="#" className="card">
            <br/>
            <h3>Total burned &rarr;</h3>
            <p>{(typeof totalFees !== "undefined"  && totalFees).toLocaleString('en')}</p>
          </a>

          <a
            href="https://bscscan.com/token/0x3a2646fed69112698d3e8a9ab43ae23974e01a26?a=0x000000000000000000000000000000000000dead"
            className="card"
          >
            <h3>Circulating supply &rarr;</h3>
            <p>{ (totalSupply - totalFees).toLocaleString('en') }</p>
            <div>➖ burned tokens</div>
            
          </a>

          <a
            href="#"
            className="card"
          >
            <h3>Burned percentage &rarr;</h3>
            <p>
              {parseFloat(burnpercentage).toFixed(2)} %
            </p>
          </a>
        </div>
      </main>

      <footer>
          Powered by Moon{' '}
          {/* <img src="/vercel.svg" alt="Vercel Logo" className="logo" /> */}
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-image: linear-gradient(skyblue, #fbe0c4);

        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;

        }
      `}</style>
    </div>
  )
}
