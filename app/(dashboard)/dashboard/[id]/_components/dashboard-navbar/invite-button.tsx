'use client';

import IconButtons from '@/app/components/icon-buttons';
import React, { useState } from 'react';

import InviteModal from './invite-modal';

export default function InviteButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <IconButtons
        variant="dashboard"
        className="flex items-center gap-1"
        onClick={openModal}
      />
      <InviteModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
