// React Libary
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, Menu } from 'antd';
import { EditOutlined, KeyOutlined } from '@ant-design/icons';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { accountLogout } from 'actions/accountAction';

// NextJS
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

//Component
const HomePage = dynamic(() => import('components/HomePage'));
const MessageRoom = dynamic(() => import('components/Chat/MessageRoom'));
const Directory = dynamic(() => import('components/Directory'));
const FriendList = dynamic(() => import('components/Directory/FriendList'));
const PhoneBook = dynamic(() => import('components/Directory/PhoneBook'));
const SearchComponent = dynamic(() => import('components/Search'));
const Update = dynamic(() => import('components/Account/Update'));
const GroupList = dynamic(() => import('components/Directory/GroupList'));
const ChangePasswordUser = dynamic(() =>
  import('components/Account/ChangePassword')
);

// Common
import { classPrefixor } from 'utils/classPrefixor';
import useFetchAllGroup from 'components/common/hook/useFetchAllGroup';

const prefix = 'sidebar-tab';
const c = classPrefixor(prefix);
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const SideBarTab = () => {
  const [infoRoom, setInfoRoom] = useState({});
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { userProfile } = useSelector(state => state.userData);
  const { listGroup } = useFetchAllGroup();

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

  const renderRooms = () => {
    return listGroup?.map((_, key) => {
      return (
        <>
          <TabPanel key={key}>
            <MessageRoom infoRoom={infoRoom} />
          </TabPanel>
        </>
      );
    });
  };
  const handleClickRoom = value => {
    setInfoRoom(value);
  };
  const renderNameListRoom = () => {
    return listGroup?.map((room, key) => {
      return (
        <>
          <Tab onClick={() => handleClickRoom(room)}>
            <div className="message_tab_chat" key={key}>
              <div className="list_user_room">
                <div className="info_user_room">
                  {room.group ? (
                    <p className="group__name">{room.name}</p>
                  ) : (
                    <p className="group__name">{room?.users[1]?.name}</p>
                  )}
                </div>
              </div>
            </div>
          </Tab>
        </>
      );
    });
  };

  const renderData = () => {
    return (
      <>
        <secion className={prefix}>
          <Tabs
            forceRenderTabPanel
            defaultIndex={0}
            className={c`tabs`}
            selectedTabClassName="is-selected"
          >
            <TabList className={c`tabs__tablist`}>
              <div className="tablist__content">
                <Menu className="menuUser">
                  <SubMenu
                    className="Submenu"
                    title={
                      <div className="avatar" style={{ cursor: 'pointer' }}>
                        <img
                          src={userProfile?.avatar}
                          className="img_avatar"
                          data-reactid="23"
                        />

                        <div className="icon-online"></div>
                      </div>
                    }
                  >
                    <MenuItemGroup className="styleMenuItem">
                      <EditOutlined className="styleIcon" />
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={showModal}
                        style={{ color: 'black' }}
                      >
                        Cập nhật thông tin
                      </a>
                    </MenuItemGroup>
                    <MenuItemGroup className="styleMenuItem">
                      <KeyOutlined className="styleIcon" />
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
                <Tab style={{ padding: '24.5%' }}>
                  <i className="fa fa-comment" style={{ fontSize: '20px' }}></i>
                </Tab>
                <Tab style={{ padding: '24.5%', paddingLeft: '29%' }}>
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
                  <Menu
                    style={{ border: 'none' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                  ></Menu>
                  <div className="scrollCustom">
                    <Tab style={{ display: 'none' }}></Tab>
                    {renderNameListRoom()}
                  </div>
                </TabList>
                <TabPanel>
                  <HomePage />
                </TabPanel>
                {renderRooms()}
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Tabs forceRenderTabPanel>
                <TabList className={c`tabs__tablist`}>
                  <SearchComponent />
                  <div className="scrollCustom">
                    <Tab className="tab">
                      <img
                        src="https://zalo-chat-static.zadn.vn/v1/NewFr@2x.png"
                        alt="imgAddF"
                      />
                      <span>Danh Sách Kết Bạn</span>
                    </Tab>

                    <Tab className="tab">
                      <i
                        className="fa fa-address-book"
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          fontSize: '50px',
                          color: 'cornflowerblue',
                          marginRight: '10px'
                        }}
                      ></i>
                      <span>Danh Bạ Bạn Bè</span>
                    </Tab>
                    <Tab className="tab">
                      <img
                        src="https://zalo-chat-static.zadn.vn/v1/group@2x.png"
                        alt="imgAddF"
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%'
                        }}
                      />
                      <span>Danh Sách Nhóm</span>
                    </Tab>
                    <Directory />
                  </div>
                </TabList>
                <TabPanel>
                  <FriendList />
                </TabPanel>
                <TabPanel>
                  <PhoneBook />
                </TabPanel>
                <TabPanel>
                  <GroupList />
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
        </secion>
      </>
    );
  };
  return <>{renderData()}</>;
};

export default SideBarTab;
