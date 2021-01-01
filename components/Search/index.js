import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button } from 'antd';
import { useSelector } from 'react-redux';
import AddFriend from 'components/Friend/AddFriend';
import { UsergroupAddOutlined, PlusOutlined } from '@ant-design/icons';
import AddGroup from './AddGroup';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';

const prefix = 'search-bar';
const SearchComponent = () => {
  const { userProfile } = useSelector(state => state.userData);
  const [userData, setUserData] = useState(null);

  const [showModalAddGroup, setShowModalAddGroup] = useState(false);
  const { visibleAddFriend, setVisibleAddFriend } = useContext(InfoRoomContext);

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
              onClick={() => setVisibleAddFriend(true)}
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
        {visibleAddFriend ? <AddFriend /> : ''}

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
