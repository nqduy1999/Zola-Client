import React, { useState, useEffect } from 'react';
import { Row, Col, Input } from 'antd';
import { useSelector } from 'react-redux';
import logo from 'assets/images/zola-logo.png';
import AddFriend from 'components/Friend/AddFriend';
import { UsergroupAddOutlined } from '@ant-design/icons';
import AddGroup from './AddGroup';

const { Search } = Input;
const prefix = 'search-bar';
const SearchComponent = () => {
  const { userProfile } = useSelector(state => state.userData);
  const [userData, setUserData] = useState(null);
  const [visibleModalSearch, setVisibleModalSearch] = useState(false);

  const [showModalAddGroup, setShowModalAddGroup] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setUserData(userProfile);
    }
  }, [userProfile]);
  return (
    <div className={prefix}>
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
          <UsergroupAddOutlined
            style={{ fontSize: '18px', cursor: 'pointer' }}
            onClick={() => setShowModalAddGroup(true)}
          />
        </Col>
      </Row>
      <AddFriend
        visible={visibleModalSearch}
        setVisible={setVisibleModalSearch}
      />

      {showModalAddGroup && (
        <AddGroup
          showModalAddGroup={showModalAddGroup}
          closeModalAddGroup={setShowModalAddGroup}
        />
      )}
    </div>
  );
};

export default SearchComponent;
