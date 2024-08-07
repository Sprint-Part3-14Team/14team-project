import getFetcher from '@/lib/api/getFetcher';

import DashboardList from './dashboard-list';

export default async function DashBoards() {
  const params = new URLSearchParams({
    navigationMethod: 'pagination',
    page: '1',
    size: '6',
  });

  const data = await getFetcher(`/dashboards?${params.toString()}`);
  const { dashboards, totalCount } = data;

  const lastPage = Math.ceil(totalCount / 6);

  return (
    <section>
      <div className="mb-3 flex items-center gap-1 text-xs">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>
      {totalCount === 0 ? (
        <div className="h-[68px]" />
      ) : (
        <DashboardList initialData={dashboards} lastPage={lastPage} />
      )}
    </section>
  );
}
