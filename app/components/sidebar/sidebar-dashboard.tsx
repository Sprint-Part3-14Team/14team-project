import { SIDE_DASHBOARD_COUNT } from '@/constants/TEAM_BASE_URL';
import getFetcher from '@/lib/api/getFetcher';

import SidebarDashboardList from './sidebar-dashboard-list';

export default async function SidebarDashboard() {
  const params = new URLSearchParams({
    navigationMethod: 'pagination',
    page: '1',
    size: SIDE_DASHBOARD_COUNT.toString(),
  });

  const data = await getFetcher(`/dashboards?${params.toString()}`);
  const { dashboards, totalCount } = data;

  const lastPage = Math.ceil(totalCount / SIDE_DASHBOARD_COUNT);

  return <SidebarDashboardList initialData={dashboards} lastPage={lastPage} />;
}
