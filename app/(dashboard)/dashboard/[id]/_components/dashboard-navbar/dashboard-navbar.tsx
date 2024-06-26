import IconButtons from '@/app/components/icon-buttons';
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
  const { members, totalCount } = await getFetcher(
    `/members?${params.toString()}`
  );
  // TODO - ESLint 우회, 지우기
  console.log(members);
  console.log(totalCount);

  return (
    <section className="sticky top-[60px] z-[9] flex h-[60px] items-center justify-between border-b border-gray-300 bg-white px-3 py-1 md:top-[70px] md:px-10">
      <div className="flex items-center gap-1">
        <h2 className="text-lg font-bold">{data.title}</h2>
        {data.createdByMe && <IconButtons variant="setting" />}
      </div>
      <div className="flex items-center gap-1">
        {/* TODO - 참여 멤버 컴포넌트 생성 */}
        {/* NOTE -  우선 위치 잡기 위해 넣어둔 겁니다 ! */}
        <div className="flex">
          <div className="size-[26px] rounded-full bg-red-400">서</div>
          <div className="size-[26px] rounded-full bg-red-400">서</div>
        </div>
        <IconButtons variant="dashboard" />
      </div>
    </section>
  );
}
