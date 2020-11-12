/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Avatar } from 'antd';
import { classPrefixor } from 'utils/classPrefixor';
import { useSelector, useDispatch } from 'react-redux';
import {
  dispatchDefaultAction,
  fetchFriendsByPhoneBookAction
} from 'actions/friendAction';
import { toast } from 'react-toastify';

import { UserOutlined } from '@ant-design/icons';

const prefix = 'phoneBook';
const c = classPrefixor(prefix);

const PhoneBook = () => {
  const dispatch = useDispatch();
  const { listFriendPhoneBook, messageDeletePhoneBook } = useSelector(
    state => state.FriendReducer
  );
  const { userProfile } = useSelector(state => state.userData);

  useEffect(() => {
    if (userProfile?.id) {
      dispatch(fetchFriendsByPhoneBookAction(userProfile?.id));
    }
  }, [userProfile, dispatch]);

  useEffect(() => {
    if (messageDeletePhoneBook?.length > 0) {
      toast.success(`${messageDeletePhoneBook}`, {
        position: 'top-right',
        autoClose: 2000
      });
      dispatch(fetchFriendsByPhoneBookAction(userProfile.id));
    }
    dispatch(dispatchDefaultAction());
  }, [messageDeletePhoneBook]);

  const renderListFriendPhoneBook = () => {
    if (listFriendPhoneBook?.length < 0) return null;
    return listFriendPhoneBook?.map(friend => {
      return (
        <>
          <div className="friend-center-item-v2">
            <div className="avatar avatar--huge">
              {friend.avatar === null || friend.avatar === '' ? (
                <Avatar
                  size="large"
                  icon={<UserOutlined />}
                  style={{ marginRight: '10px' }}
                />
              ) : (
                <img
                  src={`https://api-ret.ml/api/v0/images/download/${friend.avatar}`}
                  alt="avatar"
                />
              )}
            </div>
            <div className="truncate">{friend.name}</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  marginTop: 4,
                  fontSize: 14,
                  color: 'rgb(130, 130, 130)'
                }}
              >
                Từ danh bạ của bạn
              </div>
            </div>
          </div>
        </>
      );
    });
  };

  return (
    <section className={prefix}>
      <div className={c`header`}>
        <img
          src="https://zalo-chat-static.zadn.vn/v1/group@2x.png"
          alt="imgAddF"
        />
        <span>Danh Bạ Bạn Bè</span>
      </div>
      <div className={c`content`}>
        <div className={c`content__inside`}>{renderListFriendPhoneBook()}</div>
      </div>
    </section>
  );
};

export default PhoneBook;