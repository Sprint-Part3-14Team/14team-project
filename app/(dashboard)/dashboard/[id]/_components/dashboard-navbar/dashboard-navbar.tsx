import IconButtons from '@/app/components/icon-buttons';
import getFetcher from '@/lib/api/getFetcher';
import { DashboardDetail } from '@/types/dashboard';

import DashboardMemberList from './dashboard-member-list';

export default async function DashboardNavbar({ id }: { id: number }) {
  const data = (await getFetcher(`/dashboards/${id}`)) as DashboardDetail;

  const params = new URLSearchParams({
    dashboardId: id.toString(),
    page: '1',
    size: '10',
  });

  // NOTE - 대시보드 참여 멤버 목록
  const { members, totalCount } = await getFetcher(
    `/members?${params.toString()}`
  );

  return (
    <section className="sticky top-[60px] z-[9] flex h-[60px] items-center justify-between border-b border-gray-300 bg-white px-3 py-1 md:top-[70px] md:px-10">
      <div className="flex items-center gap-1">
        <h2 className="text-lg font-bold">{data.title}</h2>
        {data.createdByMe && <IconButtons variant="setting" />}
      </div>
      <div className="flex items-center gap-1">
        <DashboardMemberList members={members} totalCount={totalCount} />
        <IconButtons variant="dashboard" />
      </div>
    </section>
  );
}
