'use client';

import IconButtons from '@/app/components/icon-buttons';
import React, { useEffect, useState } from 'react';

import InviteModal from './invite-modal';

export default function InviteButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDashboardId, setCurrentDashboardId] = useState<number>(-1);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const dashboardId = pathSegments[pathSegments.length - 1];

    if (!Number.isNaN(parseInt(dashboardId, 10))) {
      setCurrentDashboardId(parseInt(dashboardId, 10));
    }
  }, []);

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
        dashboardId={currentDashboardId}
      />
    </div>
  );
}
