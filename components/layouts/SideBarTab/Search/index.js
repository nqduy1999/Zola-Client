import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import AddFriend from 'components/Friend/AddFriend';
import { UsergroupAddOutlined } from '@ant-design/icons';
import AddGroup from './AddGroup';

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
            span={24}
            className="logo-header"
            style={{
              display: 'inline-block',
              paddingTop: '30px',
              paddingLeft: '20px'
            }}
          >
            <p style={{ fontSize: '17px', fontWeight: 'bold' }}>
              Zola - {userData ? userData.name : ''}
            </p>
          </Col>
        </Row>
        <hr></hr>
        <Row className="zola-section-mid">
          <Col span={24}>
            <span
              onClick={() => setVisibleModalSearch(true)}
              style={{
                cursor: 'pointer',
                marginRight: '10px',
                fontWeight: 'bold'
              }}
            >
              <span
                style={{
                  marginLeft: '20px',
                  marginRight: '10px'
                }}
              >
                Thêm bạn bè
              </span>
              <i className="fa fa-user-plus"></i>
            </span>
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
        <hr></hr>
        {showModalAddGroup && (
          <AddGroup
            showModalAddGroup={showModalAddGroup}
            closeModalAddGroup={setShowModalAddGroup}
          />
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
