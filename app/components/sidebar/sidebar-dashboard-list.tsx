import getDashboards from '@/api/dashboard/getDashboards';
import crown from '@/public/icons/crown_icon.svg';
import { Dashboard } from '@/types/dashboard';
import Image from 'next/image';

export default async function SidebarDashboardList() {
  const data = await getDashboards();
  const { dashboards } = data;

  return (
    <ul className="flex flex-col gap-[38px]">
      {dashboards.map((dashboard: Dashboard) => (
        <li key={dashboard.id} className="flex">
          <p
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: dashboard.color }}
           />
          <p className="hidden text-base md:block xl:text-lg">
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
