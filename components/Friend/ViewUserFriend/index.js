import { Button } from 'antd';
import PropTypes, { func } from 'prop-types';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import Avatar from 'react-avatar';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendAction, addFriendAction } from 'actions/friendAction';
const prefix = 'view-user-friend';
const c = classPrefixor(prefix);
const user_profile_line = {
  display: 'flex',
  marginBottom: '14px'
};
const label_user = {
  color: '#6d7379',
  width: '118px',
  fontSize: '15px',
  display: 'inline-block'
};

const ViewUserFriend = props => {
  const { userProfile } = useSelector(state => state.userData);
  const { listUserSentReq, listFriendContact, listFriendRequest } = useSelector(
    state => state.FriendReducer
  );
  const { visible, onCancelModal, userData } = props;
  const [idAccept, setIdAccept] = useState();
  const [statusFriend, setStatusFriend] = useState(1);
  const dispatch = useDispatch();
  const OnAddFriend = () => {
    const value = {
      user_id: userProfile?.id,
      user_request_id: userData?.id
    };
    dispatch(addFriendAction(value)).then(res => {
      if (!res.error) {
        setStatusFriend(2);
      }
    });
  };
  const closeModalView = () => {
    onCancelModal();
  };
  const AcceptFriend = () => {
    if (idAccept) {
      dispatch(acceptFriendAction(userProfile.id, idAccept));
    }
  };
  useEffect(() => {
    if (userProfile?.id == userData?.id) {
      setStatusFriend(0);
    }
  }, [userData?.id, userProfile?.id]);
  useEffect(() => {
    if (listUserSentReq?.length > 0) {
      for (var i = 0; i < listUserSentReq.length; i++) {
        if (userData?.id == listUserSentReq[i]?.id) {
          setStatusFriend(2);
        }
      }
    }
  }, [listUserSentReq, userData?.id]);
  useEffect(() => {
    if (listUserSentReq?.length > 0) {
      for (var i = 0; i < listUserSentReq.length; i++) {
        if (userData?.id == listUserSentReq[i]?.id) {
          setStatusFriend(2);
        }
      }
    }
  }, [listUserSentReq, userData?.id]);
  useEffect(() => {
    if (listFriendRequest?.length > 0) {
      for (var i = 0; i < listFriendRequest.length; i++) {
        if (userData?.id == listFriendRequest[i]?.id) {
          setStatusFriend(4);
          setIdAccept(userData.id);
        }
      }
    }
  }, [listFriendRequest, userData?.id]);
  useEffect(() => {
    if (listFriendContact?.length > 0) {
      for (var i = 0; i < listFriendContact.length; i++) {
        if (userData?.id == listFriendContact[i]?.id) {
          setStatusFriend(3);
        }
      }
    }
  }, [listFriendContact, userData?.id]);
  return (
    <Modal
      className={c`main`}
      visible={visible}
      title="Thông tin người dùng"
      onCancel={closeModalView}
      footer={null}
    >
      <div className="avatar-uploader">
        <div>
          {userData?.avatar == null || userData?.avatar === '' ? (
            <Avatar
              name={userData?.name}
              size="84px"
              className="avatar-friend-request"
            />
          ) : (
            <img
              className="avatar-img-user"
              src={userData.avatar}
              alt="avatar"
            />
          )}
        </div>
      </div>
      <div className="content-name-user">
        <div className="name-user">
          <div className="name-user-div">
            <div className="truncate">
              {userData?.name ? userData.name : ''}
            </div>
          </div>
        </div>
      </div>
      <div className="friend-profile__actions friend-profile__actions__header">
        <div>
          {statusFriend == 1 ? (
            <Button type="primary" onClick={OnAddFriend}>
              <PlusOutlined />
              Kết bạn
            </Button>
          ) : statusFriend == 2 ? (
            <Button type="success">
              <CheckOutlined />
              Đã gửi lời mời kết bạn
            </Button>
          ) : statusFriend == 3 ? (
            <Button type="primary">
              <CheckOutlined />
              Bạn bè
            </Button>
          ) : statusFriend == 4 ? (
            <Button type="success" onClick={AcceptFriend}>
              <CheckOutlined />
              Chấp nhận
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="info-user">
        <div style={{ paddingLeft: '20px' }}>
          <div style={{ margin: '20px' }}>
            <div style={user_profile_line}>
              <span style={label_user}>Điện thoại</span>
              <span style={{ position: 'relative' }}>
                {' '}
                {userData?.phone ? userData.phone : ' Chưa cập nhật'}
              </span>
            </div>
          </div>
        </div>
        <div style={{ paddingLeft: '20px' }}>
          <div style={{ margin: '20px' }}>
            <div style={user_profile_line}>
              <span style={label_user}>Email</span>
              <span style={{ position: 'relative' }}>
                {userData?.email ? userData.email : ' Chưa cập nhật'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ViewUserFriend;

ViewUserFriend.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
  onCancelModal: func,
  userData: PropTypes.objectOf(PropTypes.any),
  visible: PropTypes.any,
  setVisible: PropTypes.func
};
ViewUserFriend.defaultProps = {
  children: {},
  onCancelModal: {},
  userData: {},
  visible: {},
  setVisible: {}
};
