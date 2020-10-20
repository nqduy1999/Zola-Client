import React from 'react';
import { useRouter } from 'next/router';
import CookiesService from 'utils/service/cookiesServices';

export default WrappedComponent => {
  const isAuthentication = () => {
    let token;
    if (typeof window !== 'undefined') {
      token = CookiesService.getAccessToken();
    }
    return !!token;
  };
  return ({ ...props }) => {
    const { push } = useRouter();
    if (isAuthentication()) {
      // if the user has not login yet
      if (typeof window !== 'undefined') {
        push('/home');
      }
    }
    return <WrappedComponent {...props} />;
  };
};
