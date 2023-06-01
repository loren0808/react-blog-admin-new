import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  IconApps,
  IconDriveFile,
  IconList,
  IconQqZone
} from '@arco-design/web-react/icon';
import s from './index.module.scss';

const Nav: React.FC = () => {
  const router = [
    {
      to: '/admin/home',
      content: (
        <>
          <IconApps className={s.icon} />
          首页
        </>
      )
    },
    {
      to: '/admin/article',
      content: (
        <>
          <IconDriveFile className={s.icon} />
          写文章
        </>
      )
    },
    {
      to: '/admin/articles',
      content: (
        <>
          <IconList  className={s.icon} />
          文章
        </>
      )
    } /*
    {
      to: "/admin/say",
      content: "说说",
    },
    {
      to: "/admin/msg",
      content: "留言板",
    },
    {
      to: "/admin/link",
      content: "友链",
    },
    {
      to: "/admin/show",
      content: "作品",
    },
    {
      to: "/admin/about",
      content: "关于",
    },
    {
      to: "/admin/log",
      content: "建站日志",
    },
    {
      to: "/admin/draft",
      content: "草稿箱",
    }, */
  ];
  return (
    <div className={s.NavBox}>
      <div className={s.appName}>
        
        <IconQqZone className={s.topIcon} />
        <div>欢迎您</div>
      </div>

      <ul className={s.funcBtns}>
        {router.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.to}
              className={({ isActive }) => (isActive ? s.navActive : s.funcLi)}
            >
              {item.content}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;
