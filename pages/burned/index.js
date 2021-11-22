import React from "react";
import { Card } from "antd";
import Link from 'next/link'

const URL = `https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/application-1-jvnaq/service/xdai_burn_query/incoming_webhook/get_all_burns`;
function Home({ data }) {
  return (
    <>
      {data.map((element) => (
        <Card id={element._id.$oid}>
          <li>Burned: {element.burned.$numberDouble}</li>
          <li>Week: {element.weekday.$numberInt}</li>
          {/* <li>Created: {JSON.stringify(element.created.$date)}</li> */}
          <li>Date: {element.created.$date.$numberLong}</li>
        </Card>
      ))}
      <Link href="/">Back</Link>
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch(URL);
  const response = await res.json();
  // console.log(response)

  return { data: response };
};

export default Home;
