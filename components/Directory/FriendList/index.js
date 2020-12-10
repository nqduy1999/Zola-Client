/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
// React Libary
import React, { useEffect } from 'react';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import Avatar from 'react-avatar';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  acceptFriendAction,
  avoidFriendRequestAcion,
  dispatchDefaultAction,
  fetchFriendsContactAction,
  fetchFriendsRequestAction
} from 'actions/friendAction';

// Common
import { classPrefixor } from 'utils/classPrefixor';

const prefix = 'listFriend';
const c = classPrefixor(prefix);
const FriendList = () => {
  const dispatch = useDispatch();
  const {
    listFriendRequest,
    messageAccept,
    messageAvoid,
    errorDataRequest
  } = useSelector(state => state.FriendReducer);
  const { userProfile } = useSelector(state => state.userData);

  useEffect(() => {
    if (userProfile?.id) {
      dispatch(fetchFriendsRequestAction(userProfile?.id));
    }
  }, [userProfile, dispatch]);

  useEffect(() => {
    if (messageAccept?.length > 0) {
      toast.success(`${messageAccept}`, {
        position: 'top-right',
        autoClose: 2000
      });
      dispatch(fetchFriendsRequestAction(userProfile.id));
      dispatch(fetchFriendsContactAction(userProfile.id));
    }
    dispatch(dispatchDefaultAction());
  }, [messageAccept]);
  let totalFriendRequest = listFriendRequest?.length;

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
      totalFriendRequest -= 1;
    }
  };

  const handleAvoidFriendRequest = userIDWantAvoid => {
    if (userProfile.id) {
      dispatch(avoidFriendRequestAcion(userProfile.id, userIDWantAvoid));
      totalFriendRequest -= 1;
    }
  };
  const renderListFriendRequest = () => {
    if (errorDataRequest && errorDataRequest.length > 0) {
      return errorDataRequest?.map((err, index) => {
        return (
          <p style={{ color: 'red' }} key={index}>
            {err?.msg}
          </p>
        );
      });
    }
    return listFriendRequest?.map(friendRq => {
      return (
        <div key={friendRq.id} className="friendReq">
          <div className="userInfo">
            {friendRq.avatar === null || friendRq.avatar === '' ? (
              <Avatar
                size="62px"
                className="avatar-request-friend"
                name={friendRq.name}
              />
            ) : (
              <img
                style={{
                  borderRadius: '50%',
                  width: '62px',
                  height: '62px',
                  marginRight: '11px'
                }}
                src={friendRq.avatar}
                alt="avatar"
              />
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
        <div className="scroll-chat">
          <div className={c`content__inside`}>
            <p>Lời mời kết bạn ({totalFriendRequest})</p>

            {renderListFriendRequest()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FriendList;
