import addDashboard from '@/public/icons/add_dashboard.svg';
import logoSmall from '@/public/images/logo_small.svg';
import Image from 'next/image';
import Link from 'next/link';

import SidebarDashboardList from './sidebar-dashboard-list';

export default function Sidebar() {
  return (
    <aside className="fixed h-full w-[67px] border-r border-gray-300 md:w-40">
      <div className="my-5 flex flex-col items-center justify-center">
        <Link href="/dashboard" className="mb-[38px]">
          <Image src={logoSmall} width={24} height={28} alt="로고" />
        </Link>
        {/* // TODO - 프로필 section */}
        <section />
        <div className="mb-[38px] flex items-center gap-6">
          <p className="flex hidden text-xs font-bold md:block">Dash Boards</p>
          <div className="relative h-5 w-5">
            <Image src={addDashboard} alt="대시보드 추가 버튼" fill />
          </div>
        </div>
        {/* // NOTE - 대시보드 리스트 section */}
        <SidebarDashboardList />
      </div>
    </aside>
  );
}
