import { Button, Input, Message } from '@arco-design/web-react';
import React, { useState } from 'react';
import s from './index.module.scss';
import { userLogin } from '@/utils/apis/auth';
import { useAppDispatch } from '@/redux/hooks';
import { receiveToken } from '@/redux/features/article/userSlice';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      if (!username || !password) return;
      const { data } = await userLogin({ username, password });
      if (data.code === 1) {
        Message.success(data.msg);
        dispatch(
          receiveToken({ token: data.token, refreshToken: data.refreshToken })
        );
        window.localStorage.setItem('__token', data.refreshToken);
        navigate('/admin/home');
      } else {
        Message.error(data.msg);
      }
    } catch (error) {}
  };
  return (
    <div className={s.container}>
      <div className={s.loginBox}>
        <h1>欢迎您,请登录</h1>
        <div className={s.bottom}>
          <Input
            size="large"
            style={{ marginBottom: 20 }}
            placeholder="请输入用户名"
            onChange={(value) => setUserName(value)}
          />
          <Input.Password
            size="large"
            style={{ marginBottom: 20 }}
            placeholder="请输入密码"
            value={password}
            onChange={(value) => setPassword(value)}
          />
          <Button type="primary" long onClick={() => handleLogin()}>
            登录
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Login;
