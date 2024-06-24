import React from 'react';

import Navbar from '../components/navbar/navbar';
import Sidebar from '../components/sidebar/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // NOTE - 임시 pb-[70px] 제거 후 수정 필요 + pb를 할 경우 사이드 바에 border-r 이 사라지는 현상 발견
    <div className="flex h-screen w-screen overflow-hidden pb-[70px]">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        <main className="h-full overflow-auto bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
