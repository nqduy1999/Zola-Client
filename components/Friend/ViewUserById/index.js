import { Button } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { classPrefixor } from 'utils/classPrefixor';
import Avatar from 'react-avatar';
import { CheckOutlined } from '@ant-design/icons';
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

const ViewUserFriendByID = ({ ...props }) => {
  const { visible, onCancelModal, userData } = props;
  const closeModalView = () => {
    onCancelModal();
  };
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
          <Button type="primary" style={{ borderRadius: '5px' }}>
            <CheckOutlined />
            Bạn bè
          </Button>
        </div>
      </div>
      <div className="info-user">
        <div style={{ paddingLeft: '20px' }}>
          <div style={{ margin: '20px' }}>
            <div style={user_profile_line}>
              <span style={label_user}>Điện thoại</span>
              <span style={{ position: 'relative' }}>
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
export default ViewUserFriendByID;
