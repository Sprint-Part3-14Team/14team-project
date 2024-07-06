import ProfileImage from '@/app/components/profile/profile-image';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { DashboardDetail } from '@/types/dashboard';
import { DashboardMembers } from '@/types/members';
import { getCookie } from 'cookies-next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DashboardProps {
  dashboard: DashboardDetail;
}

export default function DashboardCard({ dashboard }: DashboardProps) {
  const [ownerUser, setOwnerUser] = useState<DashboardMembers | null>(null);

  useEffect(() => {
    async function fetchData() {
      const token = getCookie('token');
      const url = `${TEAM_BASE_URL}/members?dashboardId=${dashboard.id}`;

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const { members } = data;
      const owner = members.find(
        (member: DashboardMembers) => member.isOwner
      ) as DashboardMembers;
      setOwnerUser(owner);
    }

    fetchData();
  }, []);

  return (
    <li key={dashboard.id}>
      <Link
        href={`/dashboard/${dashboard.id}`}
        className="relative flex h-20 items-center justify-between rounded-lg border border-gray-700 bg-background px-5 py-5"
      >
        <div
          className="absolute left-0 top-[50%] h-7 w-1 translate-y-[-50%] rounded-r-lg"
          style={{ backgroundColor: dashboard.color }}
        />
        <p className="text-sm font-semibold">{dashboard.title}</p>
        {ownerUser && (
          <ProfileImage
            nickname={ownerUser.nickname}
            profileImageUrl={ownerUser.profileImageUrl}
            id={ownerUser.userId}
            size="20px"
          />
        )}
      </Link>
    </li>
  );
}
