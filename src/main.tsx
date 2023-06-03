import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// 全局样式
import 'reset-css';
// UI框架样式
// 组件样式
import './assets/styles/global.scss';
import App from './App.tsx';
import store from '@/redux/store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
);
