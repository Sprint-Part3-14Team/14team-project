'use client';

import NewDashboardModal from '@/app/(dashboard)/mydashboard/_components/new-dashboard-modal';
import clipboard from '@/public/images/clipboard.svg';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function SidebarButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  const isMydashboardPage = pathname === '/mydashboard';

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
          className="size-[50px] rounded-full bg-primary/25 text-center text-2xl font-medium text-primary hover:animate-[spin_1s_100ms] hover:bg-primary/35"
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
          className={`mb-[16px] flex size-[50px] items-center justify-center rounded-full bg-[#5A5A5A] text-center hover:bg-primary/35 ${isMydashboardPage && 'rounded-md bg-primary/70'}`}
          type="button"
        >
          <div className="relative size-[22px]">
            <Image src={clipboard} fill alt="마이대시보드로 가는 버튼" />
          </div>
        </button>
      </Link>
    </>
  );
}
