import getFetcher from '@/lib/api/getFetcher';
import getUserMeFetcher from '@/lib/api/getUserMeFetcher';
import crown from '@/public/icons/crown_icon.svg';
import { Dashboard } from '@/types/dashboard';
import Image from 'next/image';

export default async function DashBoards() {
  const params = new URLSearchParams({
    navigationMethod: 'pagination',
    page: '1',
    size: '6',
  });

  const data = await getFetcher(`/dashboards?${params.toString()}`);
  const { dashboards } = data;

  // NOTE - 사용자 정보 GET
  const user = await getUserMeFetcher();

  return (
    <section>
      <p>{user.id}</p>
      <ul className="flex flex-col gap-2">
        {dashboards.map((dashboard: Dashboard) => (
          <li className="h-20[90px] relative flex rounded-lg border border-gray-300 bg-white py-5 pl-5">
            <div
              className="absolute left-0 top-[50%] h-7 w-1 translate-y-[-50%] rounded-r-lg"
              style={{ backgroundColor: dashboard.color }}
            />
            <p>{dashboard.title}</p>
            {/* // NOTE - 만든 사람 프로필 넣기 불가능함 내가 만든 대시보드일 경우 왕관 OR 프로필 이미지(없으면 기본 프로필 이미지) */}
            {dashboard.createdByMe && (
              <div className="relative h-3 w-4">
                <Image src={crown} alt="내가 만든 대시보드 왕관" fill />
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
