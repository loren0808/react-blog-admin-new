import {
  receiveAllSeries,
  updateSeries
} from '@/redux/features/article/seriesSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useMount, useRequest } from 'ahooks';
import { getAllSeries } from '../apis/series';
import { receiveAllTags, updateTags } from '@/redux/features/article/tagsSlice';
import { getAllTags } from '../apis/tags';

export const useOtherData = () => {
  const dispatch = useAppDispatch();
  const { needUpdate: tagNeedUpdate } = useAppSelector((store) => store.tags);
  const { needUpdate: seriesNeedUpdate } = useAppSelector(
    (store) => store.series
  );
  const { run: seriesRun, loading: seriesLoading } = useRequest(getAllSeries, {
    manual: true,
    onSuccess: (res) => {
      dispatch(receiveAllSeries(res.data));
      dispatch(updateSeries(false));
    }
  });
  const { run: tagRun, loading: tagLodaing } = useRequest(getAllTags, {
    manual: true,
    onSuccess: (res) => {
      dispatch(receiveAllTags(res.data));
      dispatch(updateTags(false));
    }
  });
  useMount(() => {
    if (tagNeedUpdate) {
      tagRun();
    }
    if (seriesNeedUpdate) {
      seriesRun();
    }
  });
  return {
    seriesLoading,
    tagLodaing,
    seriesRun,
    tagRun
  };
};
