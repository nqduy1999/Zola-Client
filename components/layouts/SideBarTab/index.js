import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import avatar from 'assets/images/logo.png';
import { classPrefixor } from 'utils/classPrefixor';
import { accountLogout, isTokenExpired } from 'actions/accountAction';
import SearchComponent from './Search';
import HomePage from 'components/HomePage';
import Directory from './Directory';
import FriendList from './Directory/FriendList';
import PhoneBook from './Directory/PhoneBook';
import Update from 'components/Account/Update';
import { EditOutlined, KeyOutlined } from '@ant-design/icons';
import ChangePasswordUser from 'components/Account/ChangePassword';
import MessageRoom from 'components/Chat/MessageRoom';
import Message from 'components/Chat/Message';
import { getListMessage } from 'actions/messageAction';

const prefix = 'sidebar-tab';
const c = classPrefixor(prefix);
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const SideBarTab = () => {
  const { userProfile, isAuthenticated } = useSelector(state => state.userData);
  const { messageRooms } = useSelector(state => state.messageData);
  const [messageRoom, setMessageRoom] = useState([]);
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const dispatch = useDispatch();
  const { push } = useRouter();

  useEffect(() => {
    if (userProfile) {
      setUserData(userProfile);
    }
  }, [userProfile]);

  useEffect(() => {
    if (messageRooms) {
      setMessageRoom(messageRooms);
    }
  }, [messageRooms]);

  useEffect(() => {
    if (!isAuthenticated) dispatch(isTokenExpired());
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    dispatch(getListMessage(1));
  }, [dispatch]);

  const showModal = () => {
    setVisible(true);
    setUserData(userProfile);
  };

  const cancelModal = () => {
    setVisible(false);
    setUserData(userProfile);
  };
  const onCancelPassword = () => {
    setVisiblePassword(false);
  };

  const renderListRoom = () => {
    return messageRoom?.map((value, key) => {
      return (
        <>
          {!value?.group && (
            <Tab key={key}>
              <Message data={value} />
            </Tab>
          )}
        </>
      );
    });
  };

  const styleIcon = {
    marginRight: '8px',
    color: '#99a4b0'
  };
  const menuUser = {
    height: '100px',
    width: ' 64px',
    marginTop: '7px',
    fontSize: '14px',
    backgroundColor: 'transparent'
  };
  const styleMenuItem = {
    padding: '10px 20px'
  };
  const renderData = () => {
    return (
      <>
        <section className={prefix}>
          <Tabs
            forceRenderTabPanel
            defaultIndex={0}
            className={c`tabs`}
            selectedTabClassName="is-selected"
          >
            <TabList className={c`tabs__tablist`}>
              <div className="tablist__content">
                <Menu style={menuUser}>
                  <SubMenu
                    className="Submenu"
                    title={
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
                    }
                  >
                    <MenuItemGroup style={styleMenuItem}>
                      <EditOutlined style={styleIcon} />
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={showModal}
                        style={{ color: 'black' }}
                      >
                        Cập nhật thông tin
                      </a>
                    </MenuItemGroup>
                    <MenuItemGroup style={styleMenuItem}>
                      <KeyOutlined style={styleIcon} />
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setVisiblePassword(true)}
                        style={{ color: 'black' }}
                      >
                        Đổi mật khẩu
                      </a>
                    </MenuItemGroup>
                    <MenuItemGroup
                      style={{
                        padding: '10px 20px',
                        color: 'red',
                        fontWeight: '500'
                      }}
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
                    </MenuItemGroup>
                  </SubMenu>
                </Menu>
                <Tab style={{ padding: '25%' }}>
                  <i className="fa fa-comment" style={{ fontSize: '20px' }}></i>
                </Tab>
                <Tab style={{ padding: '25%', paddingLeft: '29%' }}>
                  <i
                    className="fa fa-address-book"
                    style={{ fontSize: '20px' }}
                  ></i>
                </Tab>
                <div className="sign-out">
                  <Button
                    onClick={() => {
                      dispatch(accountLogout(push));
                    }}
                  >
                    <i className="fa fa-sign-out-alt"></i>
                  </Button>
                </div>
              </div>
            </TabList>
            <TabPanel>
              <Tabs forceRenderTabPanel>
                <TabList className={c`tabs__tablist`}>
                  <SearchComponent />
                  <Tab style={{ display: 'none' }}></Tab>
                  {messageRoom && renderListRoom()}
                </TabList>
                <TabPanel>
                  <HomePage />
                </TabPanel>
                <TabPanel>
                  <MessageRoom />
                </TabPanel>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Tabs forceRenderTabPanel>
                <TabList className={c`tabs__tablist`}>
                  <SearchComponent />
                  <Tab className="tab">
                    <img
                      src="https://zalo-chat-static.zadn.vn/v1/NewFr@2x.png"
                      alt="imgAddF"
                    />
                    <span>Danh Sách Kết Bạn</span>
                  </Tab>
                  <Tab className="tab">
                    <img
                      src="https://zalo-chat-static.zadn.vn/v1/group@2x.png"
                      alt="imgAddF"
                    />
                    <span>Danh Bạ Bạn Bè</span>
                  </Tab>
                  <Directory />
                </TabList>
                <TabPanel>
                  <FriendList />
                </TabPanel>
                <TabPanel>
                  <PhoneBook />
                </TabPanel>
              </Tabs>
            </TabPanel>
          </Tabs>
          <Update
            cancelAvatar={cancelModal}
            visible={visible}
            userProfile={userData}
            setVisible={setVisible}
            setUserProfile={setUserData}
          />
          <ChangePasswordUser
            visible={visiblePassword}
            setVisible={setVisiblePassword}
            cancelPassword={onCancelPassword}
          />
        </section>
      </>
    );
  };
  return <>{renderData()}</>;
};

export default SideBarTab;
