'use client';

import Image from 'next/image';
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
        dashboardId={dashboardId}
      />
    </div>
  );
}
