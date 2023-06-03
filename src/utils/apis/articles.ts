import { baseUrl } from '@/constant';
import ajax from './ajax';

const articleBaseUrl = baseUrl + '/article';

interface Article {
  series: string;
  title: string;
  text: string;
  tag: string[];
}
interface getAllArticlesParams {
  count: number;
  page: number;
}
interface ArticleToModify {
  articleId: string;
  series: string;
  title: string;
  text: string;
  tag: string[];
}
// 添加文章
export const addArticle = (params: Article) =>
  ajax(articleBaseUrl, '/add', params, 'post');
// 获取文章
export const getAllArticles = (params: getAllArticlesParams) =>
  ajax(articleBaseUrl, '/get/allArticles', params, 'get');
// 获取文章总数
export const getTotal = () => ajax(articleBaseUrl, '/get/total');
// 删除文章
export const deleteArticleById = (params: string) =>
  ajax(articleBaseUrl, '/delete', { articleId: params }, 'delete');
// 获得文章详细信息
export const getArticle = (params: string) =>
  ajax(articleBaseUrl, '/get/articleById', { articleId: params });
// 修改文章
export const updateArticleById = (params: ArticleToModify) =>
  ajax(articleBaseUrl, '/modify', params, 'post');
