import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { classPrefixor } from 'utils/classPrefixor';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUser } from 'actions/userAction';
import SideBarTab from './SideBarTab';
import { getListMessage } from 'actions/messageAction';
import io from 'socket.io-client';
const prefix = 'layout-main';
const c = classPrefixor(prefix);
const DefaultLayout = () => {
  const { auth_token } = useSelector(state => state.accountData);
  const dispatch = useDispatch();
  const socket = io(
    'http://localhost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiVGFvIGxhIGFkbWluIiwicGhvbmUiOiIwMzIzNDU2Nzg5IiwiZW1haWwiOiJkbG10cnVvbmcxNjA5QGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiJ9LCJpYXQiOjE2MDUzNTAxMTYsImV4cCI6MTYwNTQzNjUxNn0.qPGlshQlHon7nZK0m3CFCzYqhaljY7uid7yBK3Px43I',
    {
      reconnectionDelay: 1000,
      reconnection: true,
      reconnectionAttempts: 10,
      transports: ['polling'],
      agent: false, // [2] Please don't set this to true
      upgrade: false,
      rejectUnauthorized: false
    }
  );
  useEffect(() => {
    auth_token && dispatch(getProfileUser(auth_token));

    console.log(socket);
  }, [auth_token, dispatch]);

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
