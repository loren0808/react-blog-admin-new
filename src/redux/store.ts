import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './features/article/articlesSlice';
import tagsReducer from './features/article/tagsSlice';
import seriesReducer from './features/article/seriesSlice';
import userReducer from './features/article/userSlice';
const store = configureStore({
  // 默认包含异步中间件
  reducer: {
    articles: articlesReducer,
    tags: tagsReducer,
    series: seriesReducer,
    user: userReducer
  }
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
// 类型计算
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
