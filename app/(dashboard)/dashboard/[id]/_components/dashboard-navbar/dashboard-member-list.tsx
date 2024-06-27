import { DashboardMembers } from '@/types/members';

interface DashboardMembersProps {
  members: DashboardMembers[];
  totalCount: number;
}

export default function DashboardMemberList({
  members,
  totalCount,
}: DashboardMembersProps) {
  // TODO - ESLint 우회, 지우기
  console.log(members);
  console.log(totalCount);
  return (
    <div />
  );
}
