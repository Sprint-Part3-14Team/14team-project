import Button from '@/app/components/button';
import { Invitation } from '@/types/invitations';

interface InvitationCardProps {
  invitation: Invitation;
}

export default function InvitationCard({ invitation }: InvitationCardProps) {
  return (
    <li
      key={invitation.id}
      className="flex flex-col border-b border-gray-200 py-4 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex flex-col gap-[10px] md:mr-[70px] md:w-full md:flex-row md:justify-between xl:mr-[140px]">
        <div className="flex gap-7">
          <p className="text-sm font-normal text-gray-400 md:hidden">이름</p>
          <p className="text-sm font-normal text-gray-700 md:text-base">
            {invitation.dashboard.title}
          </p>
        </div>
        <div className="flex gap-7">
          <p className="text-sm font-normal text-gray-400 md:hidden">초대자</p>
          <p className="text-sm font-normal text-gray-700 md:text-base">
            {invitation.invitee.nickname}
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-[10px] md:mt-0">
        <Button
          variant="mobile109x28"
          className="rounded bg-violet-primary text-xs font-medium text-white"
        >
          수락
        </Button>
        <Button
          variant="mobile109x28"
          className="rounded border border-gray-300 bg-white text-xs font-medium text-violet-primary"
        >
          거절
        </Button>
      </div>
    </li>
  );
}
