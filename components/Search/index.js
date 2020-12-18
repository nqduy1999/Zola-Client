import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { useSelector } from 'react-redux';
import AddFriend from 'components/Friend/AddFriend';
import { UsergroupAddOutlined, PlusOutlined } from '@ant-design/icons';
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
              paddingTop: '30px'
            }}
          >
            <p>Zola</p>
            <span
              style={{
                color: 'black',
                fontSize: '16px',
                paddingLeft: '20%',
                letterSpacing: '0.5px'
              }}
            >
              Chào mừng, {userData ? userData.name : ''}
            </span>
          </Col>
        </Row>
        <Row className="zola-section-mid">
          <Col span={24}>
            <Button
              onClick={() => setVisibleModalSearch(true)}
              icon={<PlusOutlined />}
              type="primary"
              style={{ marginRight: '5px', borderRadius: '5px' }}
            >
              Thêm bạn bè
            </Button>
            <Button
              onClick={() => setShowModalAddGroup(true)}
              icon={<UsergroupAddOutlined />}
              style={{ borderRadius: '5px' }}
            >
              Tạo nhóm
            </Button>
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
    </div>
  );
};

export default SearchComponent;
