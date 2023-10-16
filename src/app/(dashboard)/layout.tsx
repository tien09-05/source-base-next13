'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { UserOutlined } from '@ant-design/icons';
import Icon from '@ant-design/icons/lib/components/Icon';
import { useTranslations } from '@hooks/locales.hook';
import { Avatar, Button, Layout, Menu, Space, theme } from 'antd';
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
    token: {
      colorBgContainer,
      siderWidth,
      collapseSiderWidth,
      headerHeight,
      bgColor,
    },
  } = theme.useToken() as any;

  const menuItems = [
    {
      key: 'dashboard',
      icon: <Icon component={() => <i className="xi-home-o"></i>} />,
      label: t('menu.dashboard'),
    },
    {
      key: 'elderly_management',
      icon: <Icon component={() => <i className="xi-user-o"></i>} />,
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
    {
      key: 'staff_management',
      icon: <Icon component={() => <i className="xi-users-o"></i>} />,
      label: t('menu.staff_management'),
      children: [
        {
          key: 'staff_information',
          label: t('menu.staff_information'),
        },
      ],
    },
  ];

  function keyPathToPath(keyPath: string[]) {
    return '/' + keyPath.reverse().join('/');
  }

  function onClickMenu({ keyPath }: { keyPath: string[] }) {
    const path = keyPathToPath(keyPath);
    router.push(path);
  }

  const [defaultSelectedKeys, defaultOpenKeys] = useMemo(() => {
    return [[pathname.split('/')[2]], [pathname.split('/')[1]]];
  }, [pathname]);

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
            <Image
              alt="logo"
              src={'/h_logo.svg'}
              width={150}
              height={headerHeight}
            />
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
          defaultSelectedKeys={
            defaultSelectedKeys[0] ? defaultSelectedKeys : defaultOpenKeys
          }
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
            justifyContent: 'space-between',
            backgroundColor: bgColor,
          }}
        >
          <Button
            type="text"
            icon={
              <Icon
                component={() => <i className="xi-bars text-white"></i>}
              ></Icon>
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: headerHeight,
            }}
          />
          <Space size={'middle'}>
            <div className={cx('chip')}>9월 12일 월요일 14:22</div>
            <Icon
              component={() => (
                <i className={cx('xi-user-o ', 'text-quaternary', 'icon')}></i>
              )}
            ></Icon>
            <Icon
              component={() => (
                <i className={cx('xi-log-out ', 'text-quaternary', 'icon')}></i>
              )}
            ></Icon>
          </Space>
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
