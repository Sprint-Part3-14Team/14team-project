import ProfileImage from '@/app/components/profile/profile-image';
import getFetcher from '@/lib/api/getFetcher';
import getUserMeFetcher from '@/lib/api/getUserMeFetcher';
import { Dashboard } from '@/types/dashboard';

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
            {dashboard.createdByMe && (
              <ProfileImage
                nickname={user.nickname}
                profileImageUrl={user.profileImageUrl}
                id={user.id}
                size="20px"
              />
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
