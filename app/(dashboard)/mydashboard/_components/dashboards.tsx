import getFetcher from '@/lib/api/getFetcher';
import getLoggedInUser from '@/lib/api/getLoggedInUser';
import { Dashboard } from '@/types/dashboard';

import DashboardCard from './dashboard-card';

export default async function DashBoards() {
  const params = new URLSearchParams({
    navigationMethod: 'pagination',
    page: '1',
    size: '6',
  });

  const data = await getFetcher(`/dashboards?${params.toString()}`);
  const { dashboards, totalCount } = data;

  // NOTE - 사용자 정보 GET
  const user = await getLoggedInUser();

  return (
    <section>
      <div className="mb-3 flex items-center gap-1 text-xs">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p>{totalCount}</p>
      </div>
      <ul className="flex flex-col gap-2">
        {dashboards.map((dashboard: Dashboard) => (
          <DashboardCard dashboard={dashboard} user={user} />
        ))}
      </ul>
    </section>
  );
}
