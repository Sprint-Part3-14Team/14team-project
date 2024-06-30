'use client';

import Button from '@/app/components/button';
import ProfileImage from '@/app/components/profile/profile-image';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { DashboardMembers } from '@/types/members';
import { getCookie } from 'cookies-next';

interface MemberCardProps {
  member: DashboardMembers;
  memberId: number;
}

export default function MemberCard({ member, memberId }: MemberCardProps) {
  const token = getCookie('token');

  const handleDeleteMember = async () => {
    await fetch(`${TEAM_BASE_URL}/members/${memberId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <li
      key={member.id}
      className="flex items-center justify-between gap-2 border-b border-solid border-gray-200 px-5 py-4 last:border-0 md:px-7 md:py-5"
    >
      <ProfileImage
        profileImageUrl={member.profileImageUrl}
        nickname={member.nickname}
        id={member.userId}
        size="34"
      />
      <p className="grow text-left text-sm md:text-base">{member.nickname}</p>
      <Button
        variant="mobile52x28"
        className="rounded border border-gray-300 text-xs text-violet-primary md:text-sm"
        onClick={handleDeleteMember}
      >
        삭제
      </Button>
    </li>
  );
}
