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
import GlobalProvider from 'components/common/context/GlobalContext';

const store = configStore();
// import useSocket from 'use-socket.io-client';

// const ENDPOINT =
//   'https://api-chat.ga?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJuYW1lIjoiVGFvIGxhIGFkbWluIiwicGhvbmUiOiIwMzIzNDU2Nzg5IiwiZW1haWwiOiJkbG10cnVvbmcxNjA5QGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiJ9LCJpYXQiOjE2MDUyODM0ODEsImV4cCI6MTYwNTM2OTg4MX0.bsxTZPzhYDMFw0T5vPQQBJgKSk4dJd5BiGP7jWvbx3A';

const MyApp = ({ Component, pageProps }) => {
  // const [socket] = useSocket(ENDPOINT);
  // useEffect(() => {
  //   socket.connect();
  //   console.log('avca\n\n\n\n\n\n\n\n\n\n\n\n\n\nawgwag', socket);
  // }, []);
  return (
    <Provider store={store}>
      <GlobalProvider>
        <Component {...pageProps} />
        <ToastContainer limit={3} />
      </GlobalProvider>
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
