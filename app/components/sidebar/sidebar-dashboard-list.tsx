import crown from '@/public/icons/crown_icon.svg';
import { Dashboard } from '@/types/dashboard';
import Image from 'next/image';

export default async function SidebarDashboardList() {
  const res = await fetch('http://localhost:3000/api/dashboard');
  const { dashboards } = await res.json();

  return (
    <ul className="flex flex-col gap-[38px] md:gap-[27px]">
      {dashboards.map((dashboard: Dashboard) => (
        <li key={dashboard.id} className="flex items-center">
          <p
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: dashboard.color }}
          />
          <p className="ml-4 mr-1 hidden text-base font-medium text-gray-500 md:block xl:mr-[6px] xl:text-lg">
            {dashboard.title}
          </p>
          {dashboard.createdByMe && (
            <div className="relative hidden h-3 w-4 md:block">
              <Image src={crown} alt="내가 만든 대시보드 왕관" fill />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
