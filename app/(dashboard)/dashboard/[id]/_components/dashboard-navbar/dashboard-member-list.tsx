'use client';

import ProfileImage from '@/app/components/profile/profile-image';
import { DashboardMembers } from '@/types/members';
import { useMediaQuery } from 'react-responsive';

interface DashboardMembersProps {
  members: DashboardMembers[];
  totalCount: number;
}

export default function DashboardMemberList({
  members,
  totalCount,
}: DashboardMembersProps) {
  const isPC = useMediaQuery({ minWidth: 1280 });
  const displayMembers = isPC ? members.slice(0, 4) : members.slice(0, 2);
  const remainCount = totalCount - displayMembers.length;

  return (
    <div className="flex">
      {displayMembers.map((member) => (
        <div className="ml-[-8px]" key={member.userId}>
          <ProfileImage
            profileImageUrl={member.profileImageUrl}
            nickname={member.nickname}
            id={member.userId}
            size="26px"
          />
        </div>
      ))}
      {remainCount > 0 && (
        <div className="ml-[-8px] flex size-[26px] items-center justify-center rounded-full border-2 border-white bg-[#F4D7DA] text-sm text-white">
          +{remainCount}
        </div>
      )}
    </div>
  );
}
