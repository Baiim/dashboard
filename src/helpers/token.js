import { Cookies } from 'react-cookie';
import JwtAuthentication from './jwtAuthentication';

const cookies = new Cookies();

const setToken = idToken => {
  cookies.set('id_token', idToken, { path: '/' });
};

const getToken = () => cookies.get('id_token');

const removeToken = () => {
  cookies.remove('id_token', { path: '/' });
};

const isAuth = () => {
  // Checks if there is a saved token and it's still valid
  const token = getToken();
  const localToken = JwtAuthentication.checkExpirity(token);
  return !!token && !!localToken.token; // handwaiving here
};

export { setToken, getToken, removeToken, isAuth };
