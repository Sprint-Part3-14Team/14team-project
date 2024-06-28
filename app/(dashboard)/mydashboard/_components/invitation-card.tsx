import Button from '@/app/components/button';
import { Invitation } from '@/types/invitations';

interface InvitationCardProps {
  invitation: Invitation;
}

export default function InvitationCard({ invitation }: InvitationCardProps) {
  return (
    <li
      key={invitation.id}
      className="flex flex-col border-b border-gray-200 px-4 py-4"
    >
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-7">
          <p className="text-sm font-normal text-gray-400">이름</p>
          <p className="text-sm font-normal text-gray-700">
            {invitation.dashboard.title}
          </p>
        </div>
        <div className="flex gap-7">
          <p className="text-sm font-normal text-gray-400">초대자</p>
          <p className="text-sm font-normal text-gray-700">
            {invitation.invitee.nickname}
          </p>
        </div>
      </div>
      <div className="mt-4 flex gap-[10px]">
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
