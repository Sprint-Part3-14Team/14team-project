'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import NewColumnModal from './new-column-modal';

export default function NewColumnButton() {
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
        className="flex h-[60px] w-full items-center justify-center gap-x-3 rounded-lg border border-gray-300 bg-white py-6 font-bold md:h-[70px] xl:w-[354px]"
        onClick={openModal}
      >
        새로운 컬럼 추가하기
        <div className="relative size-5 md:size-[22px]">
          <Image
            src="/icons/icon_add_column.svg"
            alt="새로운 컬럼 추가하기"
            fill
            sizes="100vw"
          />
        </div>
      </button>
      <NewColumnModal
        isOpen={isModalOpen}
        onClose={closeModal}
        dashboardId={currentDashboardId}
      />
    </div>
  );
}
