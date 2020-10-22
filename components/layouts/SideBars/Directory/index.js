/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Collapse, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFriendsContactAction } from 'actions/friendAction';
import {
  UserAddOutlined,
  UserOutlined,
  EllipsisOutlined
} from '@ant-design/icons';

const { Panel } = Collapse;

const Directory = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector(state => state.userData);
  const { errorData, listFriendContact } = useSelector(
    state => state.FriendReducer
  );

  useEffect(() => {
    if (userProfile.id) {
      dispatch(fetchFriendsContactAction(userProfile.id));
    }
  }, []);

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
          <span className="right">
            <EllipsisOutlined />
          </span>
        </div>
      );
    });
  };

  const totalFriend = listFriendContact?.length;

  return (
    <div className="content-zola-directory">
      <div className="addFriend">
        <p>
          <UserAddOutlined />
          Thêm Bạn Bằng Số Điện Thoại
        </p>
      </div>
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
          {renderListFriend()}
        </Panel>
      </Collapse>
    </div>
  );
};

export default Directory;