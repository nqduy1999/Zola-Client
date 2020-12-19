/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withNotAuth from 'components/common/withNotAuth';
import DefaultLayout from 'components/layouts';
import { isTokenExpired } from 'actions/accountAction';
import { SocketIOContext } from 'components/common/context/SocketIOContext';
const HomePage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userProfile } = useSelector(state => state.userData);
  const { socket } = useContext(SocketIOContext);

  useEffect(() => {
    if (!isAuthenticated) dispatch(isTokenExpired());
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (Object.keys(userProfile).length > 0) {
      socket.emit('is-online', userProfile?.id);
    }
  }, [userProfile]);

  return <DefaultLayout></DefaultLayout>;
};

export default withNotAuth(HomePage);
HomePage.pageName = 'HomePage';
