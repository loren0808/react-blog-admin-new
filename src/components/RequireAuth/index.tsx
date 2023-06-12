import { receiveToken } from '@/redux/features/userSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { auth } from '@/utils/apis/axios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

interface Props {
  requireLogin: boolean;
  to: string;
  children: any;
}

export default ({ requireLogin, to, children }: Props) => {
  const location = useLocation();
  const { refreshToken } = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let isLogin = false;
  let loading = false;
  if (refreshToken) {
    isLogin = true;
  } else {
    const tokenFromLocalStorage = window.localStorage.getItem('__token');
    if (tokenFromLocalStorage) {
      loading = true;
      auth(tokenFromLocalStorage).then(
        (res) => {
          loading = false;
          if (res.status === 200) {
            dispatch(
              receiveToken({
                token: res.data.token,
                refreshToken: res.data.refreshToken
              })
            );
            window.localStorage.setItem('__token', res.data.refreshToken);
            navigate(location.pathname);
          }
        },
        (err) => {
          console.log(err);
          loading = false;
        }
      );
    }
  }
  return isLogin || loading ? (
    children
  ) : (
    <Navigate to={to} state={{ from: location }} replace />
  );
};
