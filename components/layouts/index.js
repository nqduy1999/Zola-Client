import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { classPrefixor } from 'utils/classPrefixor';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from 'actions/userAction';
import SideBarTab from './SideBarTab';
import { getListMessage } from 'actions/messageAction';

const prefix = 'layout-main';
const c = classPrefixor(prefix);

const DefaultLayout = () => {
  const { auth_token } = useSelector(state => state.accountData);
  const { messageRooms } = useSelector(state => state.messageData);
  const dispatch = useDispatch();
  useEffect(() => {
    auth_token && dispatch(getProfileUser(auth_token));
  }, [auth_token, dispatch]);
  console.log(messageRooms);
  useEffect(() => {
    dispatch(getListMessage(1));
  }, [dispatch]);
  return (
    <main aria-hidden="true">
      <div aria-hidden="true" className={c`container`}>
        <SideBarTab />
      </div>
    </main>
  );
};
export default DefaultLayout;
DefaultLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

DefaultLayout.defaultProps = {
  children: {}
};
