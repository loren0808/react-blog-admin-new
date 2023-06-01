import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { getAllArticles, getAllArticlesParams, Article } from '@/utils/apis/articles';
interface ArticlesState {
  articles: any[];
  done: number[];
  total: number;
  edit: {
    _id: string;
    title: string;
    tag: [];
    series: [];
    text: string;
    create_at: string;
    view: number;
  };
  needUpdate: boolean;
}
const initialState: ArticlesState = {
  articles: [],
  done: [],
  total: 0,
  edit: {
    _id: '',
    title: '',
    tag: [],
    series: [],
    text: '',
    create_at: '',
    view: 0
  },
  needUpdate: true
};
export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    receiveAllArticles: (state, { payload: { data, pageData } }) => {
      const newValue: any = [...state.articles];
      newValue[pageData.page] = data;
      const newDone: any = [...new Set([...state.done, pageData.page])];
      return {
        ...state,
        articles: newValue,
        done: newDone
      };
    },
    receiveTotal: (state, action) => {
      state.total = action.payload.total;
    },
    editArticle: (state, { payload }) => {
      state.edit = payload;
    },
    editReset: (state) => {
      state.edit = { ...initialState.edit };
    },
    update: (state, { payload }) => {
      state.needUpdate = payload;
    }
  }
  // extraReducers(builder) {
  //   builder
  //     // .addCase(incrementAsync.pending, (state) => {
  //     //   console.log('🚀 ~ 进行中！');
  //     // })
  //     // .addCase(incrementAsync.fulfilled, (state, { payload }) => {
  //     //   console.log('🚀 ~ fulfilled', payload);
  //     //   state.value += payload;
  //     // })
  //     // .addCase(incrementAsync.rejected, (state, err) => {
  //     //   console.log('🚀 ~ rejected', err);
  //     // });
  //     // .addCase(getAllArticlesAsync.fulfilled, (state, { payload }) => {
  //     //   console.log('🚀 ~ fulfilled', payload);
  //     //   state.articles = payload;
  //     // })
  // }
});

// const setCountAsync = (value: number): Promise<{ data: number }> => {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve({ data: value }), 500);
//   });
// };
// 异步action
// export const incrementAsync = createAsyncThunk('articles/incrementAsync', async (value: number) => {
//   const res = await setCountAsync(value);
//   return res.data;
// });

// export const getAllArticlesAsync = createAsyncThunk('articles/getAllArticles', async (value: getAllArticlesParams) => {
//   const res = await getAllArticles(value);
//   return res.data;
// });

// Action creators are generated for each case reducer function
export const {
  receiveAllArticles,
  receiveTotal,
  editArticle,
  editReset,
  update
} = articlesSlice.actions;
export default articlesSlice.reducer;
