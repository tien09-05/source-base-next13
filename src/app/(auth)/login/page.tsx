import React from 'react';
import classNames from 'classnames/bind';

import LoginForm from '../login/components/LoginForm';
import styles from './style.module.scss';

const cx = classNames.bind(styles);

const Login = () => {
  return (
    <div className={cx('login')}>
      <LoginForm />
    </div>
  );
};

export default Login;
