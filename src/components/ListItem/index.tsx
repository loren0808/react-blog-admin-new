import React from 'react';
import { Avatar } from '@arco-design/web-react';
import s from './index.module.scss';

interface ListItem {
  total: number;
  name: string;
}
const ListItem: React.FC<ListItem> = ({ total, name }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar size={32} style={{ backgroundColor: '#14a9f8' }}>
        {total}
      </Avatar>
      <div
        style={{
          flex: '1',
          overflow: 'hidden',
          fontSize: '18px',
          textAlign: 'center',
          margin: '0 10px 0 10px'
        }}
      >
        <span className={s.seriesTag}>{name}</span>
      </div>
    </div>
  );
};

export default ListItem;
