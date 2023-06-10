import React, { useCallback, useMemo, useState } from 'react';
import {
  getAllArticles,
  getTotal,
  deleteArticleById,
  getArticle
} from '@/utils/apis/articles';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  editArticle,
  editReset,
  receiveAllArticles,
  receiveTotal,
  update
} from '@/redux/features/articlesSlice';
import { useRequest, useMount } from 'ahooks';
import PageHeader from '@/components/PageHeader';
import { useNavigate } from 'react-router-dom';
import s from './index.module.scss';
import {
  Input,
  Message,
  TableColumnProps,
  Tag,
  Button,
  Popconfirm
} from '@arco-design/web-react';
import MyTable from '@/components/MyTable';
import dayjs from 'dayjs';
import { useOtherData } from '@/utils/hooks/useOtherData';
interface TagAndSeries {
  _id: string;
  name: string;
}
const Articles: React.FC = () => {
  // console.log('Article组件刷新了');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const { articles, total, done, needUpdate, edit } = useAppSelector(
    (store) => store.articles
  );
  const { run: searchRun, loading } = useRequest(
    (page: number) =>
      Promise.all([getAllArticles({ count: 10, page }), getTotal()]),
    {
      manual: true,
      onSuccess: (res) => {
        dispatch(receiveAllArticles(res[0].data));
        dispatch(receiveTotal(res[1].data));
        dispatch(update(false));
      }
    }
  );
  const handleDelete = async (_id: string) => {
    const { data } = await deleteArticleById(_id);
    if (data.data) {
      if (_id === edit._id) {
        dispatch(editReset());
      }
      searchRun(page);
    } else {
      console.log('删除文章失败');
    }
  };
  const handleEdit = async (_id: string) => {
    const { data } = await getArticle(_id);
    if (data._id) {
      dispatch(editArticle({ ...data, state: 'edit' }));
      navigate(`/admin/article`);
    }
  };
  const columns: TableColumnProps[] = useMemo(
    () => [
      {
        title: '标题',
        dataIndex: 'title'
      },
      {
        title: '合集',
        dataIndex: 'series',
        render: (series: TagAndSeries[]) =>
          series.map((series) => <Tag key={series._id}>{series.name}</Tag>)
      },
      {
        title: '标签',
        dataIndex: 'tag',
        render: (tag: TagAndSeries[]) =>
          tag.map((tag) => <Tag key={tag._id}>{tag.name}</Tag>)
      },
      {
        title: '发布日期',
        dataIndex: 'create_at',
        render: (timeLine: string) =>
          dayjs(timeLine).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '操作',
        render: (_, { _id }) => (
          <>
            <Button
              type="primary"
              style={{ marginRight: '20px' }}
              onClick={() => handleEdit(_id)}
            >
              编辑
            </Button>
            <Popconfirm
              position="br"
              title="确定要删除该文章吗？"
              onOk={() => handleDelete(_id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" status="danger">
                删除
              </Button>
            </Popconfirm>
          </>
        )
      }
    ],
    []
  );

  // const search = useCallback(() => {
  //   if (!searchTitle && !searchClass && !searchTag.length) {
  //     Message.info('请选择搜索内容！');
  //     return;
  //   }
  //   setPage(1);
  //   searchRun();
  // }, []);
  const render = useCallback(
    () => (
      <div className={s.searchBox}>
        <div className={s.search}>
          <Input
            size="large"
            allowClear
            className={s.articleInputBox}
            placeholder="正在开发中"
            disabled
            // value={searchTitle}
            // onChange={(value) => setSearchTitle(value)}
            // onPressEnter={search}
          />
        </div>
      </div>
    ),
    []
  );
  const changePage = (page: number) => {
    setPage(page);
    if (!new Set(done).has(page)) {
      searchRun(page);
    }
  };
  useMount(() => {
    if (needUpdate) searchRun(page);
  });
  return (
    <>
      <PageHeader
        text="写文章"
        onClick={() => navigate(`/admin/article`)}
        render={render}
      />
      <MyTable
        page={page}
        setPage={changePage}
        total={total}
        loading={loading}
        data={articles[page]}
        columns={columns}
      />
    </>
  );
};

export default Articles;
