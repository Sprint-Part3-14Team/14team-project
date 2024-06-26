import ProfileImage from '@/app/components/profile/profile-image';
import { Dashboard } from '@/types/dashboard';
import { User } from '@/types/user';

interface DashboardProps {
  dashboard: Dashboard;
  user: User;
}

export default function DashboardCard({ dashboard, user }: DashboardProps) {
  return (
    <li className="h-20[90px] relative flex items-center justify-between rounded-lg border border-gray-300 bg-white px-5 py-5">
      <div
        className="absolute left-0 top-[50%] h-7 w-1 translate-y-[-50%] rounded-r-lg"
        style={{ backgroundColor: dashboard.color }}
      />
      <p className="text-sm font-semibold text-gray-700">{dashboard.title}</p>
      {dashboard.createdByMe && (
        <ProfileImage
          nickname={user.nickname}
          profileImageUrl={user.profileImageUrl}
          id={user.id}
          size="20px"
        />
      )}
    </li>
  );
}
