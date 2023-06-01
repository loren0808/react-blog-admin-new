import { Button } from '@arco-design/web-react';
import React from 'react';

import s from './index.module.scss';

interface PageHeaderProps {
  text: string;
  onClick: (e: Event) => void;
  render?: () => React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({ text, onClick, render }) => {
  return (
    <div className={s.pageHeaderBox}>
      <Button type="primary" size="large" onClick={onClick}>
        {text}
      </Button>
      {render && <>{render()}</>}
    </div>
  );
};

export default PageHeader;
