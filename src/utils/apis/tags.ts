import { baseUrl } from '@/constant';
import ajax from './ajax';

const tagBaseUrl = baseUrl + '/tag';
// 获得所有标签
export const getAllTags = () => ajax(tagBaseUrl, '/get/allTags');
// 添加标签
export const addTag = (params: string) =>
  ajax(tagBaseUrl, '/add', { tagName: params }, 'post');
// 删除标签
export const deleteTag = (params: string) =>
  ajax(tagBaseUrl, '/delete', { tagId: params }, 'delete');
  