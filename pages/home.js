import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import withNotAuth from 'components/common/withNotAuth';
import DefaultLayout from 'components/layouts';
import { isTokenExpired } from 'actions/accountAction';
const HomePage = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.userData);

  useEffect(() => {
    if (!isAuthenticated) dispatch(isTokenExpired());
  }, [isAuthenticated, dispatch]);

  return <DefaultLayout></DefaultLayout>;
};

export default withNotAuth(HomePage);
HomePage.pageName = 'HomePage';
