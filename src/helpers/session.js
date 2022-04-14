import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const setSession = id => {
  cookies.set('session_id', id, { path: '/' });
};

const getSession = () => cookies.get('session_id');

const removeSession = () => {
  cookies.remove('session_id', { path: '/' });
};

export { setSession, getSession, removeSession };
