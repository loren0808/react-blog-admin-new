import { baseUrl } from '@/constant';
import ajax from './ajax';

const seriesBaseUrl = baseUrl + '/series';
// 获得所有标签
export const getAllSeries = () => ajax(seriesBaseUrl, '/get/allSeries');
// 添加标签
export const addSeries = (params: string) =>
  ajax(seriesBaseUrl, '/add', { seriesName: params }, 'post');
// 删除标签
export const deleteSeries = (params: string) =>
  ajax(seriesBaseUrl, '/delete', { seriesId: params }, 'delete');
  