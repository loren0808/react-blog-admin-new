import React from 'react';
import s from './index.module.scss';
import { Outlet } from 'react-router-dom';
const Main: React.FC = () => {
  return (
    <main className={s.main}>
      <Outlet />
    </main>
  );
};

export default Main;
