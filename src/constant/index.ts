export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

export const baseUrl = isDevelopment ? 'http://127.0.0.1:4000/api' : '/api';

export const defaultPageSize = 10;
