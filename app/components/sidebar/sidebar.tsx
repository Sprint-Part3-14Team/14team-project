import addDashboard from '@/public/icons/add_dashboard.svg';
import logoSmall from '@/public/images/logo_small.svg';
import textLogo from '@/public/images/text_logo.svg';
import Image from 'next/image';
import Link from 'next/link';

import SidebarDashboardList from './sidebar-dashboard-list';

export default function Sidebar() {
  return (
    <aside className="fixed h-full w-[67px] border-r border-gray-300 md:w-40 xl:w-[300px]">
      <div className="my-5 flex flex-col items-center justify-center md:mx-[14px] xl:items-stretch">
        <Link href="/dashboard" className="mb-[38px] md:mb-14 xl:mb-[60px]">
          <div className="flex items-center">
            <Image
              src={logoSmall}
              width={24}
              height={28}
              alt="테스키파이 로고"
            />
            <div className="relative hidden h-[22px] w-20 md:block">
              <Image src={textLogo} alt="테스키파이 텍스트 로고" fill />
            </div>
          </div>
        </Link>
        {/* // TODO - 프로필 section */}
        <section />
        <div className="mb-[38px] flex items-center justify-between md:mb-[30px] md:w-full">
          <p className="flex hidden text-xs font-bold text-gray-500 md:block">
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
