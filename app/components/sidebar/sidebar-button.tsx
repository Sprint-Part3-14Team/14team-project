'use client';

import NewDashboardModal from '@/app/(dashboard)/mydashboard/_components/new-dashboard-modal';
import Link from 'next/link';
import { useState } from 'react';

export default function SidebarButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div className="mb-2 border-b pb-2">
        <button
          className="size-[50px] rounded-full bg-red-200 text-center text-xl font-semibold text-primary"
          type="button"
          onClick={handleOpenModal}
        >
          +
        </button>
        <NewDashboardModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
      {/* NOTE - 나의 대시보드 페이지 */}
      <Link href="/mydashboard">
        <button
          className="mb-[16px] size-[50px] rounded-full bg-orange-200 text-center text-xl font-semibold text-primary"
          type="button"
        >
          +
        </button>
      </Link>
    </>
  );
}
