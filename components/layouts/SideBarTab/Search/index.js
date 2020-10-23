import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import { useSelector } from 'react-redux';
import logo from 'assets/images/zola-logo.png';

const { Search } = Input;

const SearchComponent = () => {
  const { userProfile } = useSelector(state => state.userData);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userProfile) {
      setUserData(userProfile);
    }
  }, [userProfile]);

  return (
    <div className="zola-section">
      <Row className="zola-header">
        <Col
          span={5}
          className="logo-header"
          style={{
            display: 'inline-block'
          }}
        >
          <img src={logo} alt="hihi" />
        </Col>
        <Col span={8}>
          <span>- {userData ? userData.name : ''}</span>
        </Col>
      </Row>
      <Row className="zola-section-mid">
        <Col span={15} className="search-zola-message">
          <Search placeholder="Nhập vào tin nhắn" enterButton />
        </Col>
        <Col span={6} className="icon-zola-message">
          <i className="fa fa-user-plus" style={{ marginRight: '20px' }}></i>
          <i className="fa fa-plus"></i>
        </Col>
      </Row>
    </div>
  );
};

export default SearchComponent;
