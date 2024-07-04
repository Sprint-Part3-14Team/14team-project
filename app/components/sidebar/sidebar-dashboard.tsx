import getFetcher from '@/lib/api/getFetcher';

import SidebarDashboardList from './sidebar-dashboard-list';

export default async function SidebarDashboard() {
  const params = new URLSearchParams({
    navigationMethod: 'pagination',
    page: '1',
    size: '10',
  });

  const data = await getFetcher(`/dashboards?${params.toString()}`);
  const { dashboards } = data;

  return <SidebarDashboardList initialData={dashboards} />;
}
