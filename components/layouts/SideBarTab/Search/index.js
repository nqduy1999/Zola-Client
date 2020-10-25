import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import { useSelector } from 'react-redux';
import logo from 'assets/images/zola-logo.png';
import AddFriend from 'components/Friend/AddFriend';

const { Search } = Input;

const SearchComponent = () => {
  const { userProfile } = useSelector(state => state.userData);
  const [userData, setUserData] = useState(null);
  const [visibleModalSearch, setVisibleModalSearch] = useState(false);

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
            display: 'inline-block',
            paddingTop: '30px',
            paddingLeft: '20px'
          }}
        >
          <img src={logo} alt="hihi" />
        </Col>
        <Col span={8}>
          <span
            style={{
              display: 'block',
              marginTop: '38px',
              marginLeft: '28px',
              width: '150px'
            }}
          >
            - {userData ? userData.name : ''}
          </span>
        </Col>
      </Row>
      <Row className="zola-section-mid">
        <Col span={15} className="search-zola-message">
          <Search placeholder="Nhập vào tin nhắn" enterButton />
        </Col>
        <Col span={6} className="icon-zola-message">
          <i
            className="fa fa-user-plus"
            style={{ marginRight: '20px', cursor: 'pointer' }}
            onClick={() => setVisibleModalSearch(true)}
          ></i>
          <i className="fa fa-plus"></i>
        </Col>
      </Row>
      <AddFriend
        visible={visibleModalSearch}
        setVisible={setVisibleModalSearch}
      />
    </div>
  );
};

export default SearchComponent;
