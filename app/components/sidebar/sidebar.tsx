import addDashboard from '@/public/icons/add_dashboard.svg';
import Image from 'next/image';

import SidebarDashboardList from './sidebar-dashboard-list';

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-[67px] flex-shrink-0 flex-col border-r border-gray-300 md:w-40 xl:w-[300px]">
      <div className="mt-[60px] flex flex-col items-center justify-center md:mx-[14px] md:mt-[70px] xl:items-stretch">
        <div className="mb-[38px] flex items-center justify-between md:mb-[30px] md:w-full">
          <p className="hidden text-xs font-bold text-gray-500 md:flex">
            Dash Boards
          </p>
          <button className="relative h-5 w-5" type="button">
            <Image src={addDashboard} alt="대시보드 추가 버튼" fill />
          </button>
        </div>
        {/* // NOTE - 대시보드 리스트 section */}
        <SidebarDashboardList />
      </div>
    </aside>
  );
}
