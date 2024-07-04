'use client';

import IconButtons from '@/app/components/icon-buttons';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

import InviteModal from './invite-modal';

export default function InviteButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const params = useParams();
  const dashboardId = parseInt(params.id as string, 10);

  return (
    <div>
      <IconButtons
        variant="dashboard"
        className="flex items-center gap-1"
        onClick={openModal}
      />
      <InviteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        dashboardId={dashboardId}
      />
    </div>
  );
}
