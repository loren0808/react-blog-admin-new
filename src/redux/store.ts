import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './features/articlesSlice';
import tagsReducer from './features/tagsSlice';
import seriesReducer from './features/seriesSlice';
import userReducer from './features/userSlice';
import { isDevelopment } from '@/constant';
const store = configureStore({
  // 默认包含异步中间件
  reducer: {
    articles: articlesReducer,
    tags: tagsReducer,
    series: seriesReducer,
    user: userReducer
  },
  devTools: isDevelopment
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
// 类型计算
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
