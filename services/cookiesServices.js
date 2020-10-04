import Cookies from 'js-cookie';

const CookiesService = (() => {
  const _setToken = tokenObj => {
    Cookies.set('access_token', tokenObj.accessToken);
    Cookies.set('refresh_token', tokenObj.refreshToken);
  };
  const _getAccessToken = () => {
    return Cookies.get('access_token');
  };
  const _getRefreshToken = () => {
    return Cookies.get('refresh_token');
  };
  const _clearToken = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
  };
  return {
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken
  };
})();
export default CookiesService;
