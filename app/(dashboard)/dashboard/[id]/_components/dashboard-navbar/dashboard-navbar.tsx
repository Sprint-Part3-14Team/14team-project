import getFetcher from '@/lib/api/getFetcher';
import { Dashboard } from '@/types/dashboard';

export default async function DashboardNavbar({ id }: { id: number }) {
  const data = (await getFetcher(`/dashboards/${id}`)) as Dashboard;

  const params = new URLSearchParams({
    dashboardId: id.toString(),
    page: '1',
    size: '10',
  });

  // NOTE - 대시보드 참여 멤버 목록
  const { members } = await getFetcher(`/members?${params.toString()}`);
  console.log(members);

  return (
    <section className="sticky top-[60px] z-[9] h-[60px] border-b border-gray-300 bg-white md:top-[70px]">
      <h2>{data.title}</h2>
      {/* TODO - 관리버튼 추가 */}
      {data.createdByMe && <p>관리</p>}
    </section>
  );
}
