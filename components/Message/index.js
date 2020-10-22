import { Col, Row, Tabs } from 'antd';
import HomePage from 'components/HomePage';
import React from 'react';
import { useSelector } from 'react-redux';
const MessageList = () => {
  const { userProfile } = useSelector(state => state.userData);
  const { TabPane } = Tabs;
  const handleChangeTab = e => {
    console.log(e);
  };
  return (
    <Tabs
      style={{ width: '357px', height: 'auto' }}
      tabPosition="left"
      className="tab-message"
      defaultActiveKey="0"
      onChange={handleChangeTab}
    >
      <TabPane
        style={{
          position: 'absolute',
          marginTop: '-80%'
        }}
        key="0"
      >
        <HomePage />
      </TabPane>
      <TabPane
        style={{
          width: '357px',
          height: 'auto'
        }}
        tab={
          <Row className="message-view">
            <Col span={6} className="avatar">
              <img
                src={userProfile?.avatar ? userProfile?.avatar : 'avatar'}
                className="img_avatar"
                data-reactid="23"
              />
            </Col>
            <Col span={15}>
              <h4 className="name-message-room">Quoc Duy</h4>
              <p className="content-message-room">Anh iu em </p>
            </Col>
            <Col span={3}>
              <span className="last-time-message-room">1h</span>
              <p className="open-option-message-room">...</p>
            </Col>
          </Row>
        }
        key="1"
      ></TabPane>
      <TabPane
        key="2"
        style={{
          width: '357px',
          height: 'auto'
        }}
        tab={
          <Row className="message-view">
            <Col span={6} className="avatar">
              <img
                src={userProfile?.avatar ? userProfile?.avatar : 'avatar'}
                className="img_avatar"
                data-reactid="23"
              />
            </Col>
            <Col span={15}>
              <h4 className="name-message-room">Quoc Duy</h4>
              <p className="content-message-room">Anh iu em </p>
            </Col>
            <Col span={3}>
              <span className="last-time-message-room">1h</span>
              <p className="open-option-message-room">...</p>
            </Col>
          </Row>
        }
      ></TabPane>
    </Tabs>
  );
};
export default MessageList;
