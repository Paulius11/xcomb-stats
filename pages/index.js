import Head from "next/head";
import tokenData from "../utils/tokenData.js";
import React, { useState, useEffect } from "react";
import Link from 'next/link'

import { Progress, Button, Layout, Card, Col, Row } from "antd";
import { PageHeader, Tag } from "antd";

import tokenPrice from "../utils/tokenPrice";
import lastWeedBurned from "../utils/lastWeekBurn";

require("number-to-text/converters/en-us"); // load converter

export default function Home() {
  const [totalSupply, setTotalSupply] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [deadTokens, setDeadTokens] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [data, setData] = useState("");
  const [priceData, setPriceData] = useState();

  const [lastWB, setLastWB] = useState();

  // set initial coin to be displayed
  const [tokenContract, setTokenContract] = useState(
    "0x38Fb649Ad3d6BA1113Be5F57B927053E97fC5bF7"
  );

  /**
   *  fetch price and token data
   */
  const fetchData = async () => {
    try {
      const todenData = await tokenData(tokenContract);
      const lastWB = await lastWeedBurned();
      console.log(lastWB.burned.$numberDouble);
      setLastWB(parseFloat(lastWB.burned.$numberDouble));

      // Token price data
      const price = await tokenPrice();
      setPriceData(price);
      setData(todenData);
      setTotalSupply(todenData.totalSupply);
      setTotalFees(todenData.totalFees);
      setDeadTokens(todenData.balanceOfDeadAddress);
      setTokenName(todenData.name);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout className="layout">
      <PageHeader
        title="XCOMB"
        avatar={{
          src: "https://assets.coingecko.com/coins/images/16012/small/logo.png?1622603137",
        }}
        tags={<Tag color="blue">{Number(priceData).toFixed(2)} xDAi </Tag>}
        subTitle="Current price"
        extra={[
          <Link href="/burned">
          <Button ghost type="dashed" danger >
           Weekly 🔥 Stats
          </Button>
          </Link>
          ,
          <Button ghost type="primary" href="https://forum.1hive.org/">
            Forum
          </Button>,
          <Button
            type="default"
            href="https://app.honeyswap.org/#/swap?inputCurrency=0x38fb649ad3d6ba1113be5f57b927053e97fc5bf7&outputCurrency=0xe91d153e0b41518a2ce8dd3d7944fa863463a97d&chainId=100"
          >
            Honeyswap
          </Button>,
          <Button type="default" href="https://1hive.io/#/farm">
            Farms
          </Button>,
          <Button
            type="default"
            href="https://app.moontools.io/pairs/honeyswap/0x9e8e5e4a0900fe4634c02aaf0f130cfb93c53fbc"
          >
            Chart
          </Button>,
        ]}
      ></PageHeader>

      <div className="container">
        <Head>
          <title>Comb Burn Stats </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h1 className="title">
            Welcome to
            <a
              target="_blank"
              href={`https://blockscout.com/xdai/mainnet/token/${tokenContract}`}
            >
              {" "}
              {tokenName}{" "}
            </a>
          </h1>
          <hr />

          <p className="description">
            <br />
            <br />
            <code>{data.symbol} 🔥 stats</code>
            <br />
          </p>

          <div className="site-card-wrapper">
            <Row gutter={16}>
              <Col>
                <Card title="Total Supply" bordered={false}>
                  {(
                    typeof totalSupply !== "undefined" && totalSupply
                  ).toLocaleString("en")}
                </Card>
              </Col>
              <Col>
                <Card title="Total Burned" bordered={false}>
                  <a
                    href={`https://blockscout.com/xdai/mainnet/address/0x000000000000000000000000000000000000dEaD/token-transfers`}
                  >
                    {deadTokens.toLocaleString("en")}
                    <br />
                  </a>
                </Card>
              </Col>

              <Col>
                <Card title="Last Week" bordered={false}>
                  {lastWB && lastWB.toLocaleString("en")}
                </Card>
              </Col>
            </Row>
            <Progress percent={((deadTokens / totalSupply) * 100).toFixed(2)} />
          </div>
        </main>

        <footer>
          <Tag color="success">
            Support: 0xC61B9aD1E498D88F07eA0973C0fea84c90fd6f8F
          </Tag>
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
      </div>
    </Layout>
  );
}
