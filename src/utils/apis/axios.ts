import axios from 'axios';
import { baseUrl } from '@/constant';
import store from '@/redux/store';
import { receiveToken, resetToken } from '@/redux/features/article/userSlice';

// let token = '';
axios.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (!config.headers.Authorization && token) {
    config.headers.Authorization = token;
  }
  return config;
});
// 响应拦截器
axios.interceptors.response.use(null, (error) => {
  const { status, config } = error.response;
  if (status === 401) {
    return handle401(config);
  } else if (status === 403) {
    store.dispatch(resetToken());
  }
  return error.response;
});
export default axios;
export const auth = (refreshToken: string) =>
  axios({
    baseURL: baseUrl,
    url: '/auth/refresh',
    headers: { Authorization: refreshToken },
    method: 'get'
  });
function handle401(config) {
  return auth(store.getState().user.refreshToken).then((res) => {
    config.headers.Authorization = res.data.token;
    store.dispatch(
      receiveToken({
        token: res.data.token,
        refreshToken: res.data.refreshToken
      })
    );
    window.localStorage.setItem('__token', res.data.refreshToken);
    return axios(config);
  });
}
