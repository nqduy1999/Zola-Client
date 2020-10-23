import { Button } from 'antd';
import PropTypes, { func } from 'prop-types';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addFriendAction } from 'actions/friendAction';
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
  const { visible, onCancelModal, userData } = props;
  const dispatch = useDispatch();
  const OnAddFriend = () => {
    const value = {
      user_id: userData?.id,
      user_request_id: userProfile?.id
    };
    dispatch(addFriendAction(value)).then(res => {
      console.log(res);
    });
  };
  return (
    <Modal
      className={c`main`}
      visible={visible}
      title="Thông tin người dùng"
      onCancel={onCancelModal}
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
              size={64}
              icon={<UserOutlined />}
              style={{ marginLeft: '44%' }}
            />
          ) : (
            <img
              className="avatar-img-user"
              style={{
                marginLeft: '5px',
                border: '0.5px solid white',
                height: '56px',
                width: '56px',
                display: 'block',
                borderRadius: '50% !important'
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
          <Button
            type="primary"
            style={{ margin: '0 auto', display: 'block' }}
            onClick={OnAddFriend}
          >
            Kết bạn
          </Button>
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
