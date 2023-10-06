'use client';

/* eslint-disable import/no-unused-modules */
import { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SEO } from '@configs/seo.config';
import { useTranslations } from '@hooks/locales.hook';
import { useDeleteUser, useUpdateUser } from '@hooks/query-hooks/useUsers';
import { useAuthStore } from '@stores/auth';
import { useLocalesStore } from '@stores/locales';
import { Button, Col, Row, Select, Space, Typography } from 'antd';
import { DefaultSeo } from 'next-seo';

import ModalAddEditUser from './components/ModalAddEditUser';
import TaskTable from './components/TasksTable';

const { Title } = Typography;

const Page = () => {
  const router = useRouter();
  const { locale, t } = useTranslations();

  const { logout } = useAuthStore();

  const changeLocale = useLocalesStore((state) => state.changeLocale);
  const handleChangeLocale = (value: TDefaultLocale) => {
    changeLocale(value);
  };

  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();

  const onLogout = () => {
    logout();
    router.push('/login');
  };

  const [editUserId, setEditUserId] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);

  const showModal = (id: string) => {
    setIsShowModal(true);
    setEditUserId(id);
  };

  const handleOk = (data: any) => {
    if (editUserId) {
      updateUser(data);
    }
    setIsShowModal(false);
    setEditUserId('');
  };

  const handleCancel = () => {
    setIsShowModal(false);
    setEditUserId('');
  };

  return (
    <>
      <DefaultSeo {...SEO} title="Page" />
      <div className="p-1">
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>{t(`module_1.title`)}</Title>
            <Title level={5}>{t(`module_1.description`)}</Title>
          </Col>
          <Col>
            <Space size={'small'}>
              <Select
                defaultValue={locale}
                style={{ width: 120 }}
                onChange={handleChangeLocale}
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'vi', label: 'Tiếng Việt' },
                ]}
              />
              <Button onClick={onLogout}>Logout</Button>
            </Space>
          </Col>
        </Row>
        <Suspense fallback={<div>Loading...</div>}>
          <TaskTable showModalAddEditUser={showModal} deleteUser={deleteUser} />
        </Suspense>
        {isShowModal && (
          <ModalAddEditUser
            editUserId={editUserId}
            open={isShowModal}
            handleCancel={handleCancel}
            handleOk={handleOk}
          />
        )}
      </div>
    </>
  );
};

export default Page;
