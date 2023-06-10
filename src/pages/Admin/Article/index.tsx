import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  Button,
  Popconfirm,
  Input,
  Select,
  Message
} from '@arco-design/web-react';
import s from './index.module.scss';
import { addArticle, updateArticleById } from '@/utils/apis/articles';
import { editArticle, editReset, update } from '@/redux/features/articlesSlice';
import { useOtherData } from '@/utils/hooks/useOtherData';
import dayjs from 'dayjs';
import VditorEdit from '@/components/VditorEdit';
import { useUnmount } from 'ahooks';
const Article: React.FC = () => {
  const dispatch = useAppDispatch();
  useOtherData();
  const { edit } = useAppSelector((store) => store.articles);
  const { series: seriesList } = useAppSelector((store) => store.series);
  const { tags: tagList } = useAppSelector((store) => store.tags);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [series, setSeries] = useState('');
  const [date, setDate] = useState('');
  const [tag, setTag] = useState([]);
  const confirm = () => {
    if (!text || !title || !series) {
      Message.error('请完善文章信息');
      return;
    }
    addArticle({
      series,
      title,
      text,
      tag
    })
      .then((res) => {
        console.log({
          series,
          title,
          text,
          tag
        });
        Message.success(res.data.data);
        dispatch(update(true));
        dispatch(editReset());
      })
      .catch((err) => Message.error('出错了'));
  };
  const updateArticle = () => {
    if (!text || !title) {
      Message.error('请完善文章信息');
      return;
    }
    updateArticleById({
      articleId: edit._id,
      series,
      title,
      text,
      tag
    })
      .then((res) => {
        Message.success(res.data.data);
        dispatch(update(true));
        dispatch(editReset());
      })
      .catch((err) => Message.error('出错了'));
    console.log('更新文章');
  };
  const handleSave = () => {
    dispatch(
      editArticle({
        _id: edit._id,
        title,
        series: seriesList.filter((seriesObj) => seriesObj._id === series),
        tag: tagList.filter((tagObj) => tag?.some((id) => tagObj._id === id)),
        create_at: edit.create_at,
        text,
        view: edit.view,
        state: edit.state
      })
    );
  };
  const handleReset = () => {
    dispatch(editReset());
  };
  useEffect(() => {
    console.log(edit.tag);
    setTitle(edit.title);
    setDate(dayjs(edit.create_at || dayjs()).format('YYYY-MM-DD HH:mm:ss'));
    if (
      edit.series &&
      edit.series[0] &&
      // 如果删除了合集
      seriesList.find((series) => series._id === edit.series[0]._id)
    ) {
      setSeries(edit.series[0]._id);
    } else {
      setSeries('');
    }
    setTag(
      // 如果删除了标签
      edit.tag
        .map((tag) => tag._id)
        .filter((tagId) => tagList.some(({ _id }) => tagId === _id))
    );
    setText(edit.text);
  }, [seriesList, tagList, edit]);
  // 离开页面保存数据
  useUnmount(() => {
    handleSave();
  });
  return (
    <>
      <div className={s.headBox}>
        {/* 标题输入区 */}
        <div className={s.top}>
          <Input
            className={s.topBox}
            addBefore="中文标题"
            allowClear
            size="large"
            value={title}
            onChange={(value) => setTitle(value)}
          />
          <Popconfirm
            position="br"
            title={`确定要${edit.state ? '修改' : '提交'}该文章吗？`}
            onOk={edit.state ? updateArticle : confirm}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" size="large" style={{ marginRight: '10px' }}>
              {edit.state ? '修改' : '提交'}
            </Button>
          </Popconfirm>
          <Button
            status="success"
            size="large"
            style={{ marginRight: '10px' }}
            onClick={() => handleSave()}
          >
            保存
          </Button>
          <Button status="danger" size="large" onClick={() => handleReset()}>
            重置
          </Button>
        </div>

        <div className={s.bottom}>
          <Select
            addBefore="合集"
            size="large"
            className={s.series}
            allowCreate={false}
            // showSearch
            allowClear
            unmountOnExit={false}
            value={series}
            onChange={(value) => setSeries(value)}
            options={seriesList.map((series) => ({
              value: series._id,
              label: series.name
            }))}
            // disabled={classLoading}
          />
          <Select
            addBefore="标签"
            size="large"
            className={s.tags}
            maxTagCount={6}
            mode="multiple"
            allowCreate={false}
            // showSearch
            allowClear
            unmountOnExit={false}
            value={tag}
            onChange={(value) => setTag(value)}
            // disabled={tagLoading}
            options={tagList.map((tag) => ({
              value: tag._id,
              label: tag.name
            }))}
          />
          <Input
            addBefore="上次保存时间"
            value={date}
            disabled
            placeholder="YYYY-MM-DD HH:mm:ss"
            className={s.time}
            size="large"
          />
        </div>
      </div>

      {/* 内容编辑区 */}
      <VditorEdit onChange={setText} />
      <div className={s.editBox}>
        {/* 输入区 */}
        {/* <div
          ref={inputBox}
          className={s.inputRegion}
          onInput={(e) => {
            setText((e.target as HTMLElement).innerText);
          }}
          contentEditable="true"
          suppressContentEditableWarning={true}
        /> */}
        {/* 展示区 */}
        {/* <div className={s.showRegion}>
          <MarkDown content={text} />
        </div> */}
      </div>
    </>
  );
};

export default Article;
