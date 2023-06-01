import { baseUrl } from '@/constant';
import ajax from './ajax';

const authBaseUrl = baseUrl + '/auth';

interface LoginInfo {
  username: string;
  password: string;
}
export const userLogin = (params: LoginInfo) =>
  ajax(authBaseUrl, '/login', params, 'post');
