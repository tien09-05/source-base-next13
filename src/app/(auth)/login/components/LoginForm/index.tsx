'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@hooks/query-hooks/useAuth';
import { useAuthStore } from '@stores/auth';
import { Button, Form, Input } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginForm: React.FC = () => {
  const router = useRouter();

  const { mutate: login } = useLogin();
  const { login: loginState } = useAuthStore();

  const onFinish = async (values: any) => {
    console.log('Success:', values);
    login(
      {
        password: values.password,
        username: values.username,
      },
      {
        onSuccess: (data: any) => {
          loginState({
            user: {
              name: values.username,
            },
            accessToken: data.token,
          });
          router.push('/dashboard');
        },
      },
    );
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        initialValue={'johnd'}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        initialValue={'m38rmF$'}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
