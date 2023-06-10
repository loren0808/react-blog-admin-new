import React, { useState } from 'react';
import { addTag, deleteTag } from '@/utils/apis/tags';
import { Button, Input, Tag, Message } from '@arco-design/web-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import s from './index.module.scss';
import { IconDelete } from '@arco-design/web-react/icon';
import { update } from '@/redux/features/articlesSlice';
interface TagCardProps {
  tagRun: () => void;
  tagLoading: boolean;
}
const TagCard: React.FC<TagCardProps> = ({ tagRun, tagLoading }) => {
  const dispatch = useAppDispatch();
  const [tagName, setTagName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { tags } = useAppSelector((store) => store.tags);
  const handleAdd = async () => {
    try {
      if (tagName === '') return;
      setDisabled(true);
      const { data } = await addTag(tagName);
      if (data.data) {
        Message.success(data.data);
        setTagName('');
        tagRun();
        dispatch(update(true));
      }
    } catch (error) {
      Message.error('出错了');
    } finally {
      setDisabled(false);
    }
  };
  const handleDelete = async (_id: string) => {
    try {
      const { data } = await deleteTag(_id);
      if (data.data) {
        Message.success(data.data);
        tagRun();
        dispatch(update(true));
      } else {
        return Promise.reject();
      }
    } catch (error) {
      Message.error('出错了');
    }
  };
  return (
    <div className={s.main}>
      <div className={s.tagBox}>
        <div className={s.boxHead}>
          <Input
            allowClear
            placeholder="新建标签"
            value={tagName}
            onChange={(value) => setTagName(value)}
          />
          <Button
            type="primary"
            onClick={() => handleAdd()}
            disabled={disabled}
          >
            创建
          </Button>
        </div>
        <div className={s.tagList}>
          {tags.map((tag) => (
            <Tag
              key={tag._id}
              style={{ margin: '0 10px 10px 0 ' }}
              color="red"
              closable
              closeIcon={<IconDelete />}
              onClose={() => handleDelete(tag._id)}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagCard;
