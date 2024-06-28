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
    </li>
  );
}
