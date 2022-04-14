import httpService from '../service/http.service';

export async function authLogin(credential) {
  try {
    const response = await httpService.post('/api/login', credential);
    return response;
  } catch (error) {
    throw new Error(error);
  }
}
