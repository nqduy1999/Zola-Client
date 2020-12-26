/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unreachable */
// React Libary
import React, { useEffect } from 'react';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import Avatar from 'react-avatar';
import AddFriendPage from 'components/Friend/AddFriendPage';
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
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

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
      dispatch(fetchFriendsRequestAction(userProfile.id));
    }
  }, [userProfile, dispatch]);

  useEffect(() => {
    if (messageAccept?.length > 0 && userProfile?.id) {
      toast.success(`${messageAccept}`, {
        position: 'top-right',
        autoClose: 2000
      });
      dispatch(fetchFriendsRequestAction(userProfile?.id));
      dispatch(fetchFriendsContactAction(userProfile?.id));
    }
    dispatch(dispatchDefaultAction());
  }, [messageAccept]);
  let totalFriendRequest = listFriendRequest?.length;

  useEffect(() => {
    if (messageAvoid.length > 0 && userProfile?.id) {
      toast.success(`Avoid Friend Request Success`, {
        position: 'top-right',
        autoClose: 2000
      });
      dispatch(fetchFriendsRequestAction(userProfile?.id));
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
    dispatch(avoidFriendRequestAcion(userIDWantAvoid));
    totalFriendRequest -= 1;
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
                round={true}
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
            <span style={{ paddingLeft: '15px' }}>{friendRq.name}</span>
          </div>

          <div className="friendReq__btn">
            <Button
              type="primary"
              className="btn"
              style={{ borderRadius: '5px' }}
              onClick={() => handleAcceptFriend(friendRq.id)}
              icon={<CheckOutlined />}
            >
              Đồng ý
            </Button>
            <Button
              type="primary"
              danger
              className="btn"
              style={{ borderRadius: '5px' }}
              onClick={() => handleAvoidFriendRequest(friendRq.id)}
              icon={<CloseOutlined />}
            >
              Bỏ Qua
            </Button>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <div className={c`header`}>
        <img
          src="https://zalo-chat-static.zadn.vn/v1/NewFr@2x.png"
          alt="imgAddF"
        />
        <span>Danh Sách Kết Bạn</span>
      </div>
      {listFriendRequest?.length >= 1 ? (
        <section className={prefix}>
          <div className={c`content`}>
            <div className="scroll-chat">
              <div className={c`content__inside`}>
                <p>Lời mời kết bạn ({totalFriendRequest})</p>
                {renderListFriendRequest()}
              </div>
            </div>
          </div>{' '}
        </section>
      ) : (
        <AddFriendPage />
      )}
    </>
  );
};

export default FriendList;
