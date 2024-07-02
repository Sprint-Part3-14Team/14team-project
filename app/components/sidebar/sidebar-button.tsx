'use client';

import NewDashboardModal from '@/app/(dashboard)/mydashboard/_components/new-dashboard-modal';
import addDashboard from '@/public/icons/add_dashboard.svg';
import Image from 'next/image';
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
    <div>
      <button
        className="relative h-5 w-5"
        type="button"
        onClick={handleOpenModal}
      >
        <Image src={addDashboard} alt="대시보드 추가 버튼" fill />
      </button>
      <NewDashboardModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
