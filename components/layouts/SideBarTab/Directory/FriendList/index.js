/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import { useSelector, useDispatch } from 'react-redux';
import {
  acceptFriendAction,
  avoidFriendRequestAcion,
  dispatchDefaultAction,
  fetchFriendsContactAction,
  fetchFriendsRequestAction
} from 'actions/friendAction';
import { Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

const prefix = 'listFriend';
const c = classPrefixor(prefix);
const FriendList = () => {
  const dispatch = useDispatch();
  const { listFriendRequest, messageAccept, messageAvoid } = useSelector(
    state => state.FriendReducer
  );
  const { userProfile } = useSelector(state => state.userData);

  useEffect(() => {
    if (userProfile.id) {
      dispatch(fetchFriendsRequestAction(userProfile.id));
    }
  }, [userProfile, dispatch]);

  useEffect(() => {
    if (messageAccept.length > 0) {
      toast.success(`${messageAccept}`, {
        position: 'top-right',
        autoClose: 2000
      });
      dispatch(fetchFriendsRequestAction(userProfile.id));
      dispatch(fetchFriendsContactAction(userProfile.id));
    }
    dispatch(dispatchDefaultAction());
  }, [messageAccept]);

  useEffect(() => {
    if (messageAvoid.length > 0) {
      toast.success(`Avoid Friend Request Success`, {
        position: 'top-right',
        autoClose: 2000
      });
      dispatch(fetchFriendsRequestAction(userProfile.id));
    }
    dispatch(dispatchDefaultAction());
  }, [messageAvoid]);

  const handleAcceptFriend = userIDWantAccept => {
    if (userProfile.id) {
      dispatch(acceptFriendAction(userProfile.id, userIDWantAccept));
    }
  };

  const handleAvoidFriendRequest = userIDWantAvoid => {
    if (userProfile.id) {
      dispatch(avoidFriendRequestAcion(userProfile.id, userIDWantAvoid));
    }
  };

  const renderListFriendRequest = () => {
    if (listFriendRequest?.length < 0) return null;
    return listFriendRequest?.map(friendRq => {
      return (
        <div key={friendRq.id} className="friendReq">
          <div className="userInfo">
            {friendRq.avatar === null || friendRq.avatar === '' ? (
              <Avatar
                size="large"
                icon={<UserOutlined />}
                style={{ marginRight: '10px' }}
              />
            ) : (
              <img src={friendRq.avatar} alt="avatar" />
            )}
            <span>{friendRq.name}</span>
          </div>

          <div className="friendReq__btn">
            <Button
              type="primary"
              danger
              className="btn"
              onClick={() => handleAvoidFriendRequest(friendRq.id)}
            >
              Bỏ Qua
            </Button>
            <Button
              type="primary"
              className="btn"
              onClick={() => handleAcceptFriend(friendRq.id)}
            >
              Đồng ý
            </Button>
          </div>
        </div>
      );
    });
  };

  const totalFriendRequest = listFriendRequest?.length;

  return (
    <section className={prefix}>
      <div className={c`header`}>
        <img
          src="https://zalo-chat-static.zadn.vn/v1/NewFr@2x.png"
          alt="imgAddF"
        />
        <span>Danh Sách Kết Bạn</span>
      </div>
      <div className={c`content`}>
        <div className={c`content__inside`}>
          <p>Lời mời kết bạn ({totalFriendRequest})</p>
          {renderListFriendRequest()}
        </div>
      </div>
    </section>
  );
};

export default FriendList;
