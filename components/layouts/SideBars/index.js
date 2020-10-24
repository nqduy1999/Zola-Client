import React, { useEffect, useState } from 'react';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import { accountLogout, isTokenExpired } from 'actions/accountAction';
import avatar from 'assets/images/logo.png';
import { Button, Dropdown, Menu, Tabs } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { classPrefixor } from 'utils/classPrefixor';
import Update from 'components/Account/Update';
import { useRouter } from 'next/router';
import MessageList from 'components/Message';
import Header from './Header';

const prefix = 'side-bar';
const c = classPrefixor(prefix);

const Sidebar = () => {
  const { TabPane } = Tabs;
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const { userProfile, isAuthenticated } = useSelector(state => state.userData);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const showModal = () => {
    setVisible(true);
  };
  const cancelModal = () => {
    setVisible(false);
    setUserData(userProfile);
  };
  useEffect(() => {
    if (userProfile) {
      setUserData(userProfile);
    }
  }, [userProfile]);
  const styleIcon = {
    marginRight: '8px',
    color: '#99a4b0'
  };
  const menuUser = {
    marginLeft: '30px',
    borderRadius: '2px',
    width: '270px',
    marginTop: '7px',
    fontSize: '14px'
  };
  const styleMenuItem = {
    padding: '10px 20px'
  };
  const menuList = (
    <Menu style={menuUser}>
      <Menu.Item
        icon={<EditOutlined style={styleIcon} />}
        style={styleMenuItem}
        onClick={showModal}
      >
        <a target="_blank" rel="noopener noreferrer">
          Cập nhật thông tin
        </a>
      </Menu.Item>
      <Menu.Item
        icon={<SettingOutlined style={styleIcon} />}
        style={styleMenuItem}
      >
        <a target="_blank" rel="noopener noreferrer" onClick={showModal}>
          Cài đặt
        </a>
      </Menu.Item>
      <Menu.Item
        style={{ padding: '10px 20px', color: 'red', fontWeight: '500' }}
      >
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'red' }}
          onClick={() => {
            dispatch(accountLogout(push));
          }}
        >
          Đăng Xuất
        </a>
      </Menu.Item>
    </Menu>
  );
  const messageList = (
    <Menu style={menuUser}>
      <Menu.Item style={styleMenuItem}>
        <a target="_blank" rel="noopener noreferrer" onClick={showModal}>
          Tin nhắn cá nhân
        </a>
      </Menu.Item>
      <Menu.Item style={styleMenuItem}>
        <a target="_blank" rel="noopener noreferrer" onClick={showModal}>
          Tin nhắn nhóm
        </a>
      </Menu.Item>
    </Menu>
  );
  useEffect(() => {
    if (!isAuthenticated) dispatch(isTokenExpired());
  }, [isAuthenticated, dispatch]);

  return (
    <div className={c`container`}>
      <div>
        <div className="left-section">
          <div
            style={{
              height: 'calc(13vh - 0px)'
            }}
            mode="inline"
          >
            <Dropdown overlay={menuList} placement="bottomRight">
              <div className="avatar" style={{ cursor: 'pointer' }}>
                <img
                  src={
                    userProfile?.avatar
                      ? `https://api-ret.ml/api/v0/images/download/${userProfile?.avatar}`
                      : avatar
                  }
                  className="img_avatar"
                  data-reactid="23"
                />
                <div className="icon-online"></div>
              </div>
            </Dropdown>
          </div>
          <Tabs
            style={{
              height: '78%'
            }}
            tabPosition="left"
            defaultActiveKey="1"
          >
            <TabPane
              key="1"
              style={{
                paddingBottom: '50px',
                paddingTop: '20px'
              }}
              tab={<i className="fa fa-comment"></i>}
            >
              <div className="content-zola-message">
                <div className="header-content-zola-message">
                  <Dropdown overlay={messageList}>
                    <span className="message">
                      Tin nhắn <i className="fa fa-caret-down"></i>
                    </span>
                  </Dropdown>
                </div>
                <div className="main-content-zola-message">
                  <MessageList />
                </div>
              </div>
            </TabPane>
            <TabPane
              key="2"
              style={{ paddingBottom: '50px', paddingTop: '20px' }}
              tab={<i className="fa fa-address-book"></i>}
            ></TabPane>
            <TabPane
              key="3"
              style={{ paddingBottom: '50px', paddingTop: '20px' }}
              tab={
                <i
                  className="fa fa-user-friends"
                  style={{ marginRight: '15px' }}
                ></i>
              }
            ></TabPane>
          </Tabs>
          <div mode="inline">
            <div className="sign-out">
              <Button
                style={{
                  border: 'none',
                  background: 'transparent',
                  marginLeft: '10px',
                  fontSize: '20px',
                  color: 'white'
                }}
                onClick={() => {
                  dispatch(accountLogout(push));
                }}
              >
                <i className="fa fa-sign-out-alt"></i>
              </Button>
            </div>
          </div>
        </div>
        <Header userData={userData} />
      </div>
      <Update
        cancelAvatar={cancelModal}
        userProfile={userProfile}
        visible={visible}
        setVisible={setVisible}
      />
    </div>
  );
};
export default Sidebar;
