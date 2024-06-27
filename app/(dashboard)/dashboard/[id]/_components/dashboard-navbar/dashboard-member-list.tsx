import ProfileImage from '@/app/components/profile/profile-image';
import { DashboardMembers } from '@/types/members';

interface DashboardMembersProps {
  members: DashboardMembers[];
  totalCount: number;
}

export default function DashboardMemberList({
  members,
  totalCount,
}: DashboardMembersProps) {
  const displayMembers = members.slice(0, 2);
  const remainCount = totalCount - displayMembers.length;

  return (
    <div className="flex">
      {displayMembers.map((member) => (
        <div key={member.id} className="ml-[-8px]">
          <ProfileImage
            profileImageUrl={member.profileImageUrl}
            nickname={member.nickname}
            id={member.id}
            size="26px"
          />
        </div>
      ))}
      {remainCount > 0 && (
        <div className="ml-[-8px] flex size-[26px] items-center justify-center rounded-full bg-pink-500 text-sm text-white">
          +{remainCount}
        </div>
      )}
    </div>
  );
}
