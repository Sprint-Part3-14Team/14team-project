'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import EditColumnModal from './edit-column-modal';

export default function EditColumnButton() {
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
      <button
        type="button"
        className="relative size-[22px] md:size-6"
        aria-label="설정"
        onClick={openModal}
      >
        <Image src="/icons/setting_icon.svg" alt="설정" fill />
      </button>
      <EditColumnModal
        isOpen={isModalOpen}
        onClose={closeModal}
        dashboardId={currentDashboardId}
      />
    </div>
  );
}
