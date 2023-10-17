'use client';

import React, { useState } from 'react';
import Modal from '@components/common/modal/Modal';

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {' '}
      <div onClick={showModal}>find_a_caregiver</div>
      {isModalOpen && (
        <Modal
          title={'Modal'}
          open={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Page;
