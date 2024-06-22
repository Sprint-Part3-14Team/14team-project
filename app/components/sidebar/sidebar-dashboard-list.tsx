import getDashboardList from '@/api/dashboardApi';

export default async function SidebarDashboardList() {
  const data = await getDashboardList();
  const {dashboards} = data;
  console.log(dashboards);

  return (
    <section />
  );
}
