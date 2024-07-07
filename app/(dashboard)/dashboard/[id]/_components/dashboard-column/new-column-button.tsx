'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';

import NewColumnModal from './new-column-modal';

export default function NewColumnButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const params = useParams();
  const dashboardId = parseInt(params.id as string, 10);

  return (
    <div>
      <button
        type="button"
        className="flex h-[60px] w-full items-center justify-center gap-x-3 rounded-lg border border-gray-700 bg-background py-6 font-bold md:h-[70px] xl:w-[354px]"
        onClick={openModal}
      >
        새로운 컬럼 추가하기
        <p className="flex size-5 items-center justify-center rounded bg-primary/25 text-lg font-medium text-primary md:size-[22px]">
          +
        </p>
      </button>
      <NewColumnModal
        isOpen={isModalOpen}
        onClose={closeModal}
        dashboardId={dashboardId}
      />
    </div>
  );
}
