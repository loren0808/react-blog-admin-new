import axios from '../apis/axios';

export default function ajax(
  baseURL: string,
  url: string,
  data = {},
  method = 'get'
) {
  if (method === 'get') {
    return axios({
      baseURL,
      url,
      method,
      params: data
    });
  } else {
    return axios({
      baseURL,
      url,
      method,
      data
    });
  }
}
