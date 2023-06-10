import React, { useState } from 'react';
import { addSeries, deleteSeries } from '@/utils/apis/series';
import {
  Button,
  Input,
  Tag,
  Message,
  List,
  Avatar
} from '@arco-design/web-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import s from './index.module.scss';
import { IconDelete } from '@arco-design/web-react/icon';
import { update } from '@/redux/features/articlesSlice';
import ListItem from '../ListItem';
interface SeriesCardProps {
  seriesRun: () => void;
  seriesLoading: boolean;
}
const SeriesCard: React.FC<SeriesCardProps> = ({
  seriesRun,
  seriesLoading
}) => {
  const dispatch = useAppDispatch();
  const [seriesName, setSeriesName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { series } = useAppSelector((store) => store.series);
  const handleAdd = async () => {
    try {
      if (seriesName === '') return;
      setDisabled(true);
      const { data } = await addSeries(seriesName);
      if (data.data) {
        Message.success(data.data);
        setSeriesName('');
        seriesRun();
        dispatch(update(true));
      }
    } catch (error) {
      Message.error('出错了');
    } finally {
      setDisabled(false);
    }
  };
  const handleDelete = async (_id: string) => {
    // 删除合集后如果进入编辑页面如果当前合集被删除会出现bug
    try {
      const { data } = await deleteSeries(_id);
      if (data.data) {
        Message.success(data.data);
        seriesRun();
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
      <div className={s.seriesBox}>
        <div className={s.boxHead}>
          <Input
            allowClear
            placeholder="新建合集"
            value={seriesName}
            onChange={(value) => setSeriesName(value)}
          />
          <Button
            type="primary"
            onClick={() => handleAdd()}
            disabled={disabled}
          >
            创建
          </Button>
        </div>
        <div className={s.seriesList}>
          <List
            wrapperStyle={{ width: '100%' }}
            dataSource={series}
            bordered={false}
            render={(item) => (
              <List.Item
                style={{
                  padding: '5px',
                  alignItems: 'center'
                }}
                key={item._id}
                extra={
                  <Button
                    shape="circle"
                    icon={<IconDelete />}
                    status="danger"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  />
                }
              >
                <ListItem total={item.article.length} name={item.name} />
              </List.Item>
            )}
          />
          {/* {series.map((series) => (
            <Tag
              key={series._id}
              style={{ margin: '0 10px 10px 0 ' }}
              color="red"
              closable
              closeIcon={<IconDelete />}
              onClose={() => handleDelete(series._id)}
            >
              {series.name}
            </Tag>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default SeriesCard;
