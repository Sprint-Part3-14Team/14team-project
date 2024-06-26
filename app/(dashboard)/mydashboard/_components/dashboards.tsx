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
    <section className="">
      <div className="mb-3 flex items-center gap-1 text-xs">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p>{totalCount}</p>
      </div>
      <ul className="grid grid-flow-row gap-2 md:grid-cols-2 xl:grid-cols-3">
        {dashboards.map((dashboard: Dashboard) => (
          <DashboardCard dashboard={dashboard} user={user} />
        ))}
      </ul>
    </section>
  );
}
