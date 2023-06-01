import { receiveToken } from '@/redux/features/article/userSlice';
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
  if (refreshToken) {
    isLogin = true;
  } else {
    const tokenFromLocalStorage = window.localStorage.getItem('__token');
    if (tokenFromLocalStorage) {
      auth(tokenFromLocalStorage)
        .then((res) => {
          if (res.status === 200) {
            dispatch(
              receiveToken({
                token: res.data.token,
                refreshToken: res.data.refreshToken
              })
            );
            window.localStorage.setItem('__token', res.data.refreshToken);
            navigate('/admin/home');
          }
        })
    }
  }
  console.log(isLogin);
  return isLogin ? (
    children
  ) : (
    <Navigate to={to} state={{ from: location }} replace />
  );
};
