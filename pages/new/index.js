import tokenData from "../../utils/tokenData.js";
import React, { useState, useEffect } from "react";
import getBnbPrice from "../../utils/bnbPrice";

import "antd/dist/antd.css";
import { Layout, Menu, Breadcrumb } from "antd";
import { List, Card } from "antd";

import { Input, Space } from "antd";

const { Header, Content, Footer } = Layout;

const numberToText = require("number-to-text");
require("number-to-text/converters/en-us"); // load converter

export default function Home() {
  const [totalSupply, setTotalSupply] = useState("");
  const [totalFees, setTotalFees] = useState("");
  const [deadTokens, setDeadTokens] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [data, setData] = useState("");

  const [bnbPrice, setBnbPrice] = useState();

  const [tokenContract, setTokenContract] = useState(
    "0x3a2646fed69112698d3e8a9ab43ae23974e01a26"
  );

  const charlList = [
    {
      title: "https://dex.guru/token/${address}",
    },
    {
      title: "Title 2",
    },
    {
      title: "Title 3",
    },
    {
      title: "Title 4",
    },
    {
      title: "Title 5",
    },
    {
      title: "Title 6",
    },
  ];

  const numberToWord = (number) => {
    return numberToText.convertToText(Math.trunc(number)).split(",")[0];
  };

  /**
   *  fetch price and token data
   */
  const fetchData = async () => {
    try {
      const res = await tokenData(tokenContract);
      setData(res);
      setTotalSupply(res.totalSupply);
      setTotalFees(res.totalFees);
      setDeadTokens(res.balanceOfDeadAddress);
      setTokenName(res.name);
      const BSC = await getBnbPrice();
      setBnbPrice(BSC);
    } catch (error) {
      console.error(error.message);
    }
  };

  // when seach button is clicked
  const onSearch = () => {
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { Search } = Input;

  return (
    <Layout className="layout" className="container">
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
          <Menu.Item key="1">Panda</Menu.Item>
          <Menu.Item key="2">Rhino</Menu.Item>
          <Menu.Item key="3">Bambo</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px", margin: "1em" }}>
        <Search
          placeholder="input contract address"
          suffix={`BNB ${bnbPrice} $`}
          onChange={(e) => setTokenContract(e.target.value)}
          onSearch={onSearch}
          style={{ padding: "1em" }}
        />

        <div className="site-layout-content">
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 4,
              lg: 4,
              xl: 6,
              xxl: 3,
            }}
            dataSource={charlList}
            renderItem={(item) => (
              <List.Item>
                <Card title={item.title}>Card content</Card>
              </List.Item>
            )}
          />
        </div>
      </Content>

      <Footer style={{ textAlign: "center" }}>Powered by moon</Footer>

      <style jsx>{`
        .site-layout-content {
          min-height: 280px;
          padding: 24px;
          background-image: linear-gradient(skyblue, #fbe0c4);
        }

      `}</style>
    </Layout>
  );
}
