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
      Xdai <br/>
      https://dai.poa.network/ <br/>
      https://xdai.poanetwork.dev/ <br/>
      https://xdai.1hive.org/ <br/>
      https://rpc.xdaichain.com/ <br/>
      <br/>
    Tokens<br/>

      
    PNDA token: <br/>
    0x47DcC83a14aD53Ed1f13d3CaE8AA4115f07557C0<br/>

    BSC BAO token: <br/>
    0x47eaf5f54d79d5c2b6537a90a0c58a534ab51c8c<br/>

    Farming contract: <br/>
    0x9942cb4c6180820E6211183ab29831641F58577A<br/>

    RHINO token: <br/>
    0xD2ECa3cff5F09Cfc9C425167d12F0a005Fc97c8c<br/>

    BAMBOO token: <br/>
    0xEF88e0d265dDC8f5E725a4fDa1871F9FE21B11E2<br/>

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
