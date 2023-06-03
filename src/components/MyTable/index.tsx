import React from 'react';
import classNames from 'classnames';
import { Pagination, Table, TableColumnProps } from '@arco-design/web-react';

import { defaultPageSize } from '@/constant';
import s from './index.module.scss';

interface MyTableProps {
  loading: boolean;
  columns: TableColumnProps[];
  data: any[];
  total: number;
  page: number;
  pageSize?: number;
  noHeader?: boolean;
  setPage: (page: number) => void;
}
const MyTable: React.FC<MyTableProps> = ({
  loading,
  columns,
  data,
  total,
  page,
  pageSize = defaultPageSize,
  noHeader = false,
  setPage
}) => (
  <>
    <div className={classNames(s.myTableBox, { [s.noHeader]: noHeader })}>
      <Table
        className={s.myTable}
        border
        borderCell
        loading={loading}
        data={data}
        columns={columns}
        rowKey={(columns) => columns._id}
        pagePosition="bottomCenter"
        pagination={false}
      />
    </div>
    <div className={s.paginationBox}>
      <Pagination
        size="large"
        current={page}
        total={total}
        pageSize={pageSize}
        sizeCanChange={false}
        onChange={(page: number) => setPage(page)}
        hideOnSinglePage={true}
        showTotal={true}
      />
    </div>
  </>
);

export default MyTable;
