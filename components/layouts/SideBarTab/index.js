/* eslint-disable react-hooks/exhaustive-deps */
// React Libary
import React, { useState, useCallback, useContext, useEffect } from 'react';
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
import Avatar from 'react-avatar';
import useRenderAvatar from 'components/common/hook/useRenderAvatar';
import ManagePeopleInGroup from 'components/ManagePeople';
import { ManagePeopleGroupContext } from 'components/common/context/ManagePeopleGroupContext';
import { InfoRoomContext } from 'components/common/context/InfoRoomContext';
import { fetchFriendsContactAction } from 'actions/friendAction';

const prefix = 'sidebar-tab';
const c = classPrefixor(prefix);
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const SideBarTab = () => {
  // react hook
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState({});
  const [visiblePassword, setVisiblePassword] = useState(false);

  // redux hook
  const dispatch = useDispatch();
  const { userProfile } = useSelector(state => state.userData);
  const { listFriendContact } = useSelector(state => state.FriendReducer);

  // custom hook
  const { listGroup } = useFetchAllGroup();

  // nextjs hook
  const { push } = useRouter();

  const RenderAvatarUserGroup = group => {
    const [renderAvatarUserGroup] = useRenderAvatar(
      group,
      {
        borderRadius: '50%',
        width: '35px',
        height: '35px'
      },
      '35px'
    );
    return renderAvatarUserGroup();
  };

  // Context
  const { clickPeopleIcon } = useContext(ManagePeopleGroupContext);
  const { setStatusRoom, setInfoRoom, setLoading } = useContext(
    InfoRoomContext
  );
  const { setClickPeopleIcon } = useContext(ManagePeopleGroupContext);
  //
  const totalFriend = listFriendContact?.length;
  //

  useEffect(() => {
    if (userProfile?.id) {
      dispatch(fetchFriendsContactAction(userProfile?.id));
    }
  }, [userProfile]);

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

  const handleClickRoom = async value => {
    setLoading(true);
    setInfoRoom(value);
    if (!value.group) {
      setStatusRoom(false);
      setLoading(false);
    } else {
      setStatusRoom(true);
      setTimeout(setLoading(false), 3000);
    }
  };

  const renderRooms = () => {
    return listGroup?.map((item, key) => {
      return (
        <>
          <TabPanel key={key}>
            <MessageRoom id={item.id} />
          </TabPanel>
        </>
      );
    });
  };
  //
  const renderTabSingleChat = room => {
    return room?.users.map(user => {
      if (user.id != userProfile.id) {
        return (
          <div
            key={user.id}
            className="tab_room"
            onClick={() => setClickPeopleIcon('unClickPeopleIcon')}
          >
            <div
              style={{
                width: '74px',
                display: 'inline-block'
              }}
            >
              {user?.avatar === null || user?.avatar === '' ? (
                <Avatar size="64px" className="avatar-chat" name={user?.name} />
              ) : (
                <img
                  style={{
                    borderRadius: '50%',
                    width: '64px',
                    height: '64px',
                    marginRight: '11px'
                  }}
                  src={user?.avatar}
                  alt="avatar"
                />
              )}
            </div>
            <div
              className="content-tab-chat"
              style={{ display: 'inline-block' }}
            >
              <p className="group__name">{user?.name}</p>
            </div>
          </div>
        );
      }
    });
  };
  const renderTabNameGroupRoom = room => {
    return (
      <div className="tab_room">
        <div style={{ display: 'inline-block' }}>
          <div className="avatar-group-vip-pro">
            {RenderAvatarUserGroup(room)}
          </div>
        </div>
        <div
          className="content-tab-chat_group"
          style={{ display: 'inline-block' }}
        >
          <p className="group__name_group">{room.name}</p>
        </div>
      </div>
    );
  };
  const renderContactRooms = () => {
    return listFriendContact?.map((item, key) => {
      return (
        <>
          <TabPanel key={key}>
            <MessageRoom id={item.id} />
          </TabPanel>
        </>
      );
    });
  };
  // Hiển thị các group và single group
  const renderNameListRoom = useCallback(() => {
    return listGroup?.map((room, key) => {
      return (
        <>
          <Tab onClick={() => handleClickRoom(room)}>
            <div className="message_tab_chat" key={key}>
              <div className="list_user_room">
                <div className="info_user_room">
                  {room.group
                    ? renderTabNameGroupRoom(room)
                    : renderTabSingleChat(room)}
                </div>
              </div>
            </div>
          </Tab>
        </>
      );
    });
  }, [listGroup]);

  // Hiển thị ra các tab với các icon tương ứng
  const renderTabsIcon = () => {
    return (
      <>
        <Tab style={{ padding: '24.5%' }}>
          <i className="fa fa-comment" style={{ fontSize: '20px' }}></i>
        </Tab>
        <Tab
          style={{ padding: '24.5%', paddingLeft: '29%' }}
          onClick={() => setClickPeopleIcon('unClickPeopleIcon')}
        >
          <i className="fa fa-address-book" style={{ fontSize: '20px' }}></i>
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
      </>
    );
  };

  // Đây là submenu khi người dùng click vào avatar sẽ hiển thị ra
  const renderSubMenuWhenClickIconAvatar = useCallback(() => {
    return (
      <>
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
            <a target="_blank" onClick={showModal} style={{ color: 'black' }}>
              Cập nhật thông tin
            </a>
          </MenuItemGroup>
          <MenuItemGroup className="styleMenuItem">
            <KeyOutlined className="styleIcon" />
            <a
              target="_blank"
              onClick={() => setVisiblePassword(true)}
              style={{ color: 'black' }}
            >
              Đổi mật khẩu
            </a>
          </MenuItemGroup>
          <MenuItemGroup className="submenu__delete">
            <a
              target="_blank"
              style={{ color: 'red' }}
              onClick={() => {
                dispatch(accountLogout(push));
              }}
            >
              Đăng Xuất
            </a>
          </MenuItemGroup>
        </SubMenu>
      </>
    );
  }, [userProfile]);

  //Đây là tab để render ra bên cây màu xanh nè!
  const renderTabList = () => {
    return (
      <TabList className={c`tabs__tablist`}>
        <div className="tablist__content">
          <Menu className="menuUser" triggerSubMenuAction="click">
            {renderSubMenuWhenClickIconAvatar()}
          </Menu>
          {renderTabsIcon()}
        </div>
      </TabList>
    );
  };
  const renderFriend = () => {
    return listFriendContact?.map((friend, key) => {
      return (
        <Tab key={key} onClick={() => handleClickRoom(friend)}>
          <Directory elm={friend} totalFriend={totalFriend} />
        </Tab>
      );
    });
  };
  // Đây là tabpanel của các tab trong tab danh bạ điện thoại
  const renderTabPanelItemInIconPhoneBook = () => {
    return (
      <>
        <TabPanel>
          <FriendList />
        </TabPanel>
        <TabPanel>
          <PhoneBook />
        </TabPanel>
        <TabPanel>
          <GroupList />
        </TabPanel>
        {renderContactRooms()}
      </>
    );
  };

  // Đây là tab của icon danh bạ điện thoại
  const renderTabPanelInPhoneBook = () => {
    return (
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
                <i className="fa fa-address-book"></i>
                <span>Danh Bạ Bạn Bè</span>
              </Tab>
              <Tab className="tab">
                <img
                  src="https://zalo-chat-static.zadn.vn/v1/group@2x.png"
                  alt="imgAddF"
                />
                <span>Danh Sách Nhóm</span>
              </Tab>
              <p>Bạn bè ({totalFriend})</p>
              {renderFriend()}
            </div>
          </TabList>
          {renderTabPanelItemInIconPhoneBook()}
        </Tabs>
      </TabPanel>
    );
  };

  const renderTabPanelItemInIconChat = () => {
    return (
      <>
        <TabPanel>
          <HomePage />
        </TabPanel>
        {renderRooms()}
      </>
    );
  };

  // Đây là tab của icon chat
  const renderTabpanelInChatting = useCallback(() => {
    return (
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
          {renderTabPanelItemInIconChat()}
        </Tabs>
      </TabPanel>
    );
  }, [renderNameListRoom, renderRooms]);

  const renderTabPanel = () => {
    return (
      <>
        {renderTabpanelInChatting()}
        {renderTabPanelInPhoneBook()}
      </>
    );
  };

  const renderTabsTree = () => {
    return (
      <>
        <secion className={`${prefix} ${clickPeopleIcon}`}>
          <Tabs
            forceRenderTabPanel
            defaultIndex={0}
            className={c`tabs`}
            selectedTabClassName="is-selected"
          >
            {renderTabList()}
            {renderTabPanel()}
          </Tabs>
          <ManagePeopleInGroup />
          {visible && (
            <Update
              cancelAvatar={cancelModal}
              visible={visible}
              userProfile={userData}
              setVisible={setVisible}
              setUserProfile={setUserData}
            />
          )}
          {visiblePassword && (
            <ChangePasswordUser
              visible={visiblePassword}
              setVisible={setVisiblePassword}
              cancelPassword={onCancelPassword}
            />
          )}
        </secion>
      </>
    );
  };
  return <>{renderTabsTree()}</>;
};

export default SideBarTab;
