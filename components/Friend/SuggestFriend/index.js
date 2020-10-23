import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';
import ViewUserFriend from '../ViewUserFriend';

const SuggestFriend = props => {
  const { suggestF } = props;
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    setUserData(suggestF);
  }, [suggestF]);
  const cancelModal = () => {
    setVisible(false);
  };
  return (
    <div className="tabSearchUser" style={{ cursor: 'pointer' }}>
      <div
        className="recent-search-item"
        style={{ display: 'flex', padding: '7px 15px' }}
        onClick={() => setVisible(true)}
      >
        <div className="avatar-img  flx flx-center flx-al-c">
          {suggestF.avatar === null || suggestF.avatar === '' ? (
            <Avatar
              size="large"
              icon={<UserOutlined />}
              style={{ marginRight: '10px' }}
            />
          ) : (
            <img
              className="avatar-img-user"
              src={`https://api-ret.ml/api/v0/images/download/${suggestF.avatar}`}
              alt="avatar"
            />
          )}
        </div>
        <div className="recent-search-content" style={{ width: '300px' }}>
          <div
            className="rsi-name truncate"
            style={{
              fontWeight: '500',
              fontSize: '14px',
              color: 'rgb(17, 17, 17)'
            }}
          >
            {suggestF?.name}
          </div>
          <div
            className="rsi-number"
            style={{
              marginTop: '2px',
              fontSize: '12px',
              color: 'rgb(109, 115, 121)'
            }}
          >
            {suggestF?.phone}
            <span style={{ marginLeft: '10px' }}>{suggestF?.email}</span>
          </div>
        </div>
        <div className="rsi-close">
          <i className="fa fa-close"></i>
        </div>
      </div>
      <ViewUserFriend
        visible={visible}
        onCancelModal={cancelModal}
        userData={userData}
      />
    </div>
  );
};
export default SuggestFriend;
SuggestFriend.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
  suggestF: PropTypes.objectOf(PropTypes.any)
};
SuggestFriend.defaultProps = {
  children: {}
};
