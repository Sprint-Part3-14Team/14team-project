import getDashboardList from '@/api/dashboardApi';
import { Dashboard } from '@/types/dashboard';

export default async function SidebarDashboardList() {
  const data = await getDashboardList();
  const { dashboards, totalCount } = data;

  return (
    <section>
      <p>대시보드 개수 : {totalCount}</p>
      {dashboards.map((dashboard: Dashboard) => (
        <div key={dashboard.id}>
          <p>{dashboard.color}</p>
          <p>{dashboard.title}</p>
        </div>
      ))}
    </section>
  );
}
