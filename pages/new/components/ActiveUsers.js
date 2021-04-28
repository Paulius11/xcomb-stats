import React from "react";
import { Statistic, Row, Col, Button } from "antd";
import { Card } from 'antd';

export default function ActiveUsers() {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Market Cap" value={112893} />
      </Col>
      <Col span={12}>
        <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
        <Button style={{ marginTop: 16 }} type="primary">
          Recharge
        </Button>
      </Col>

    </Row>
  );
}
