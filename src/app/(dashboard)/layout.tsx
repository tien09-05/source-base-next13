'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useTranslations } from '@hooks/locales.hook';
import { Avatar, Button, Layout, Menu, theme } from 'antd';
import classNames from 'classnames/bind';

import styles from './style.module.scss';

const cx = classNames.bind(styles);

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { t } = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, siderWidth, collapseSiderWidth, headerHeight },
  } = theme.useToken() as any;

  const menuItems = [
    {
      key: 'elderly_management',
      icon: <UserOutlined />,
      label: t('menu.elderly_management'),
      children: [
        {
          key: 'beneficiary_information',
          label: t('menu.beneficiary_information'),
        },
        {
          key: 'find_a_caregiver',
          label: t('menu.find_a_caregiver'),
        },
        {
          key: 'state_change',
          label: t('menu.state_change'),
        },
      ],
    },
  ];

  function keyPathToPath(keyPath: string[]) {
    return '/' + keyPath.reverse().join('/');
  }

  function onClickMenu({ keyPath }: { keyPath: string[] }) {
    router.push(keyPathToPath(keyPath));
  }

  const [defaultSelectedKeys, defaultOpenKeys] = useMemo(() => {
    return [[pathname.split('/')[2]], [pathname.split('/')[1]]];
  }, [pathname]);

  console.log(collapseSiderWidth);
  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: colorBgContainer, minHeight: '100vh' }}
        width={siderWidth}
        collapsedWidth={collapseSiderWidth}
      >
        <div className={cx('logo')}>
          {collapsed ? (
            <div></div>
          ) : (
            <Image alt="logo" src={'/h_logo.svg'} width={150} height={49} />
          )}
        </div>

        <div className={cx('admin')}>
          <div className={cx('admin-logo')}>
            <Avatar size={collapsed ? 36 : 66} icon={<UserOutlined />} />
          </div>
          {collapsed ? null : (
            <>
              <div className={cx('admin-name')}>홍길동</div>
              <div className={cx('admin-text')}>Adminnistrator</div>
            </>
          )}
        </div>

        <Menu
          mode="inline"
          defaultSelectedKeys={defaultSelectedKeys}
          defaultOpenKeys={defaultOpenKeys}
          items={menuItems}
          onClick={onClickMenu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: headerHeight,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: headerHeight,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
