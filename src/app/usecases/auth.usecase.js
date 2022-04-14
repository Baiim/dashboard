// eslint-disable-next-line import/no-cycle
import { authLogin } from '../repository/auth.repository';

export default {
  async login(email, password, callback) {
    try {
      const user = await authLogin({ email, password });
      this.saveAuthCred(user.data);
      callback();
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('token');
  },

  checkIsUser() {
    const user = this.getActiveUser();
    if (!user) {
      return false;
    }

    return true;
  },

  getActiveUser() {
    const userStr = localStorage.getItem('token');
    return JSON.parse(userStr);
  },

  saveAuthCred(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
};
