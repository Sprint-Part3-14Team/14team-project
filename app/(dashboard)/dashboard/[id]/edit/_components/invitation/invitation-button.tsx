'use client';

import IconButtons from '@/app/components/icon-buttons';
import React, { useEffect, useState } from 'react';

import InviteModal from '../../../_components/dashboard-navbar/invite-modal';

export default function InvitationButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDashboardId, setCurrentDashboardId] = useState<number>(-1);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const pathSegments = window.location.pathname.split('/');
    const dashboardId = pathSegments[pathSegments.length - 2];

    if (!Number.isNaN(parseInt(dashboardId, 10))) {
      setCurrentDashboardId(parseInt(dashboardId, 10));
    }
  }, []);
  return (
    <div>
      <IconButtons
        variant="invite"
        className="absolute right-7 top-9"
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
