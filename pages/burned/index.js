import React from "react";
import { Card, Layout, Button } from "antd";
import Link from "next/link";

const URL = `https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-1-jvnaq/service/xdai_burn_query/incoming_webhook/get_all_burns`;
function Home({ data }) {
  const { Content } = Layout;

  return (
    <Layout className="layout">
      <Content style={{ padding: "1.5em" }}>
        {data.map((element, key) => (
          <Card id={element._id.$oid} style={{ margin: "0.1em" }}  >
           <li>{console.log(key)}</li>
            <li>Burned: {element.burned.$numberDouble}</li> 
            <li>Week: {element.weekday.$numberInt}</li>           
            {/* Growth */}
            <li className="growth">Growth: +{key != 0 && data[key].burned.$numberDouble - data[key-1].burned.$numberDouble }</li>
            <li>Date: {element.created.$date.$numberLong}</li>
          </Card>
        ))}
        <Button type="dashed"  style={{ margin: "0.3em" }}>
          <Link href="/">Back</Link>
        </Button>
      </Content>
    </Layout>
  );
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch(URL);
  const response = await res.json();
  // console.log(response)

  return { data: response };
};

export default Home;
