import React from 'react';
import App from 'next/app';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import configStore from '../store/configStore';
import 'antd/dist/antd.css';
import 'nprogress/nprogress.css';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/styles/main.scss';

const store = configStore();

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer limit={3} />
    </Provider>
  );
};

MyApp.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default MyApp;

MyApp.propTypes = {
  router: PropTypes.objectOf(PropTypes.any),
  Component: PropTypes.func,
  pageProps: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};
