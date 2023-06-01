import React, { useCallback, useEffect, useRef, useState } from 'react';
import { addTag, deleteTag, getAllTags } from '@/utils/apis/tags';
import { useRequest } from 'ahooks';
import { Button, Input, Select, Tag } from '@arco-design/web-react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { receiveAllTags } from '@/redux/features/article/tagsSlice';
import s from './index.module.scss';
import { IconDelete } from '@arco-design/web-react/icon';
import TagCard from '@/components/TagCard';
import SeriesCard from '@/components/SeriesCard';
import { useOtherData } from '@/utils/hooks/useOtherData';
const Home: React.FC = () => {
  const { seriesRun, seriesLoading, tagRun, tagLodaing } = useOtherData();
  return (
    <div style={{ display: 'flex' }}>
      <TagCard tagRun={tagRun} tagLoading={tagLodaing} />
      <SeriesCard seriesRun={seriesRun} seriesLoading={seriesLoading} />
    </div>
  );
};

export default Home;
