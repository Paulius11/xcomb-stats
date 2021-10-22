import Head from "next/head";
import tokenData from "../utils/tokenData.js";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from 'antd';

import "antd/dist/antd.css";
import { Input, Space } from "antd";
import { Progress } from "antd";

import { Layout, Menu, Breadcrumb } from "antd";
import { Card, Col, Row } from "antd";
const { Header, Content, Footer } = Layout;

import {
  ToolOutlined,
  AppstoreOutlined,
  AreaChartOutlined,
} from "@ant-design/icons";

const numberToText = require("number-to-text");
require("number-to-text/converters/en-us"); // load converter

export default function Home() {
  const [totalSupply, setTotalSupply] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [deadTokens, setDeadTokens] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [data, setData] = useState("");
  const [tokenPrice, setTokenPrice] = useState();

  const [bnbPrice, setBnbPrice] = useState("");
  const [seachHistory, setSearchHistory] = useState([{ name: "", url: "" }]);

  // set initial coin to be displayed
  const [tokenContract, setTokenContract] = useState(
    "0x38Fb649Ad3d6BA1113Be5F57B927053E97fC5bF7"
  );

  const numberToWord = (number) => {
    return numberToText.convertToText(Math.trunc(number)).split(",")[0];
  };

  /**
   *  fetch price and token data
   */
  const fetchData = async () => {
    try {
      console.log(`tokenContract`, tokenContract);
      const res = await tokenData(tokenContract);
      console.log(`res`, res);
      setData(res);
      setTotalSupply(res.totalSupply);
      setTotalFees(res.totalFees);
      setDeadTokens(res.balanceOfDeadAddress);
      setTokenName(res.name);
    } catch (error) {
      console.error(error.message);
    }
  };

  // when search button is clicked
  const onSearch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const router = useRouter();
  const { id } = router.query;
  const { Search } = Input;
  const { SubMenu } = Menu;

  return (
    <Layout className="layout">
      <div className="container">
        <Head>
          <title>Comb Burn Stats</title>
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
            <code>{data.symbol} 🔥 stats</code>

            <br />
        <Button type="default" href="https://app.honeyswap.org/#/swap?inputCurrency=0x38fb649ad3d6ba1113be5f57b927053e97fc5bf7&outputCurrency=0xe91d153e0b41518a2ce8dd3d7944fa863463a97d&chainId=100">Honeyswap</Button>
        <Button type="default" href="https://1hive.io/#/farm">Farms</Button>
        <Button type="default" href="https://app.moontools.io/pairs/honeyswap/0x9e8e5e4a0900fe4634c02aaf0f130cfb93c53fbc">Chart</Button>
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
                <Card title="Burned: " bordered={false}>
                  
                  <a
                    href={`https://blockscout.com/xdai/mainnet/address/0x000000000000000000000000000000000000dEaD/tokens/0x38fb649ad3d6ba1113be5f57b927053e97fc5bf7/token-transfers`}
                  >
                    {deadTokens.toLocaleString("en")}
                  </a>
                </Card>
              </Col>
            </Row>
            <Progress percent={((deadTokens / totalSupply) * 100).toFixed(2)} />
          </div>
        </main>

        <footer>Powered by Moon </footer>

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
    </Layout>
  );
}
