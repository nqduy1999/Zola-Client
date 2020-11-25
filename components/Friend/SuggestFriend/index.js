import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import ViewUserFriend from '../ViewUserFriend';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchFriendsContactAction,
  fetchFriendsRequestAction,
  getUserSentRequestAction
} from 'actions/friendAction';

const SuggestFriend = props => {
  const { suggestF } = props;
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const { userProfile } = useSelector(state => state.userData);
  useEffect(() => {
    setUserData(suggestF);
  }, [suggestF]);
  const cancelModal = () => {
    setVisible(false);
  };
  const openModal = () => {
    dispatch(getUserSentRequestAction());
    dispatch(fetchFriendsContactAction(userProfile?.id));
    dispatch(fetchFriendsRequestAction());
    setVisible(true);
  };
  return (
    <div className="tabSearchUser" style={{ cursor: 'pointer' }}>
      <div
        className="recent-search-item"
        style={{ display: 'flex', padding: '7px 15px' }}
        onClick={openModal}
      >
        <div className="avatar-img  flx flx-center flx-al-c">
          {suggestF.avatar === null || suggestF.avatar === '' ? (
            <Avatar
              size="40px"
              name={suggestF.name}
              className="avatar-suggest"
            />
          ) : (
            <img
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1px solid #0cb3ff',
                marginRight: '10px'
              }}
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
