import { Button } from 'antd';
import PropTypes, { func } from 'prop-types';
import Modal from 'antd/lib/modal/Modal';
import React, { useEffect, useState } from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined, PlusOutlined, CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendAction, addFriendAction } from 'actions/friendAction';
const prefix = 'view-user-friend';
const c = classPrefixor(prefix);
const inforUser = {
  position: 'relative',
  overflow: 'hidden',
  width: '360px',
  height: '219px',
  maxHeight: '261px',
  minHeight: '120px'
};
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
      style={{
        marginRight: '32.5%'
      }}
    >
      <div className="avatar-uploader">
        <div
          style={{
            display: 'block',
            position: 'relative',
            paddingBottom: '20px'
          }}
        >
          {userData?.avatar == null || userData?.avatar === '' ? (
            <Avatar
              size={84}
              icon={<UserOutlined />}
              style={{ marginLeft: '44%' }}
            />
          ) : (
            <img
              className="avatar-img-user"
              style={{
                margin: '0px auto',
                border: '0.5px solid #0cb3ff',
                height: '84px',
                width: '84px',
                display: 'block',
                borderRadius: '50%'
              }}
              src={`https://api-ret.ml/api/v0/images/download/${userData.avatar}`}
              alt="avatar"
            />
          )}
        </div>
      </div>
      <div
        style={{
          marginTop: '0',
          height: '50px',
          textAlign: 'center',
          marginBottom: '-15px',
          color: 'black',
          position: 'relative',
          display: 'flex',
          paddingBottom: '20px'
        }}
      >
        <div
          style={{
            margin: '0 auto',
            fontSize: '14px',
            color: 'black',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            zIndex: '1'
          }}
        >
          <div
            style={{
              fontSize: '20px',
              marginBottom: 0,
              paddingRight: '3px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            <div
              className="truncate"
              style={{
                display: 'inline-block',
                margin: '0px auto',
                maxWidth: '100%',
                marginBottom: '-4px'
              }}
            >
              {userData?.name ? userData.name : ''}
            </div>
          </div>
        </div>
      </div>
      <div className="friend-profile__actions friend-profile__actions__header">
        <div style={{ paddingTop: '10px' }}>
          {statusFriend == 1 ? (
            <Button
              type="primary"
              style={{ margin: '0 auto', display: 'block' }}
              onClick={OnAddFriend}
            >
              <PlusOutlined />
              Kết bạn
            </Button>
          ) : statusFriend == 2 ? (
            <Button
              type="success"
              style={{ margin: '0 auto', display: 'block' }}
            >
              <CheckOutlined />
              Đã gửi lời mời kết bạn
            </Button>
          ) : statusFriend == 3 ? (
            <Button
              type="primary"
              style={{ margin: '0 auto', display: 'block' }}
            >
              <CheckOutlined />
              Bạn bè
            </Button>
          ) : statusFriend == 4 ? (
            <Button
              type="success"
              style={{ margin: '0 auto', display: 'block' }}
              onClick={AcceptFriend}
            >
              <PlusOutlined />
              Chấp nhận
            </Button>
          ) : (
            ''
          )}
        </div>
      </div>
      <div style={inforUser}>
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
