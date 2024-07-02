import ProfileImage from '@/app/components/profile/profile-image';
import { DashboardDetail } from '@/types/dashboard';
import { DashboardMembers } from '@/types/members';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getDashboardMember } from '../actions';

interface DashboardProps {
  dashboard: DashboardDetail;
}

export default function DashboardCard({ dashboard }: DashboardProps) {
  const [ownerUser, setOwnerUser] = useState<DashboardMembers | null>(null);

  useEffect(() => {
    async function fetchData() {
      const { members } = await getDashboardMember(dashboard.id);
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
        className="relative flex h-20 items-center justify-between rounded-lg border border-gray-300 bg-white px-5 py-5"
      >
        <div
          className="absolute left-0 top-[50%] h-7 w-1 translate-y-[-50%] rounded-r-lg"
          style={{ backgroundColor: dashboard.color }}
        />
        <p className="text-sm font-semibold text-gray-700">{dashboard.title}</p>
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
