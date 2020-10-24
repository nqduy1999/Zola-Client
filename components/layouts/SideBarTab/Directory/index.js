/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Collapse, Avatar, Dropdown, Menu, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFriendContactAction,
  dispatchDefaultAction,
  fetchFriendsContactAction
} from 'actions/friendAction';
import { UserOutlined, EllipsisOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const prefix = 'directory';
const { Panel } = Collapse;

const Directory = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(state => state.userData);
  const {
    errorData,
    listFriendContact,
    messageDeletePhoneContact
  } = useSelector(state => state.FriendReducer);

  useEffect(() => {
    if (userProfile.id) {
      dispatch(fetchFriendsContactAction(userProfile.id));
    }
  }, [userProfile]);

  useEffect(() => {
    if (messageDeletePhoneContact?.length > 0) {
      toast.success(`${messageDeletePhoneContact}`, {
        position: 'top-right',
        autoClose: 2000
      });
      dispatch(fetchFriendsContactAction(userProfile.id));
    }
    dispatch(dispatchDefaultAction());
  }, [messageDeletePhoneContact]);
  let totalFriend = listFriendContact?.length;

  const handleDeleteFriend = userIDWantDelete => {
    if (userProfile.id) {
      dispatch(deleteFriendContactAction(userProfile.id, userIDWantDelete));
      totalFriend -= 1;
    }
  };

  const menu = id => (
    <Menu>
      <Menu.Item key="0">Xem Thông Tin</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <Popconfirm
          placement="right"
          title="Bạn muốn hủy kết bạn với người này?"
          onConfirm={() => handleDeleteFriend(id)}
          okText="Yes"
          cancelText="No"
        >
          Xóa Bạn
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const renderListFriend = () => {
    if (errorData && errorData.length > 0) {
      return errorData.map((err, index) => {
        return (
          <p style={{ color: 'red' }} key={index}>
            {err?.msg}
          </p>
        );
      });
    }
    return listFriendContact?.map(elm => {
      return (
        <div className="userContact" key={elm.id}>
          <div className="left">
            {elm.avatar === null || elm.avatar === '' ? (
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{ marginRight: '10px' }}
              />
            ) : (
              <img src={elm.avatar} alt="avatar" />
            )}
            <span>{elm.name}</span>
          </div>
          <Dropdown overlay={() => menu(elm.id)} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <span className="right">
                <EllipsisOutlined />
              </span>
            </a>
          </Dropdown>
        </div>
      );
    });
  };
  return (
    <div className={prefix}>
      <Collapse
        defaultActiveKey={['1']}
        bordered={false}
        expandIconPosition="right"
      >
        <Panel
          header={`Bạn bè (${totalFriend})`}
          key="1"
          style={{ backgroundColor: 'white' }}
        >
          <div className="scrollable-container">
            <div id="overflowTest">{renderListFriend()}</div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Directory;
