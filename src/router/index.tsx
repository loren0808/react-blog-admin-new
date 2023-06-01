import RequireAuth from '@/components/RequireAuth';
import Article from '@/pages/Admin/Article';
import Articles from '@/pages/Admin/Articles';
import Home from '@/pages/Admin/Home';
import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
const Admin = lazy(
  () =>
    import(/* webpackChunkName:'Admin', webpackPrefetch:true */ '@/pages/Admin')
);
const Login = lazy(
  () =>
    import(/* webpackChunkName:'Login', webpackPrefetch:true */ '@/pages/Login')
);
const routes = [
  {
    path: '/',
    element: <Navigate to="/admin/home" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin',
    element: (
      <RequireAuth requireLogin={true} to="/login">
        <Admin />
      </RequireAuth>
    ),
    children: [
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'article',
        element: <Article />
      },
      {
        path: 'articles',
        element: <Articles />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
];
export default routes;
