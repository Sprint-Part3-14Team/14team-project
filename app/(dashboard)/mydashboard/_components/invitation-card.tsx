'use client';

import { Invitation } from '@/types/invitations';

import InvitationResponseButton from './invitation-response-button';

interface InvitationCardProps {
  invitation: Invitation;
  setInvitationList: (invitations: Invitation[]) => void;
  setApiCursorId: (cursorId: number | null) => void;
}

export default function InvitationCard({
  invitation,
  setInvitationList,
  setApiCursorId,
}: InvitationCardProps) {
  return (
    <li
      key={invitation.id}
      className="flex flex-col border-b border-gray-200 py-4 md:flex-row md:items-center md:justify-between"
    >
      <div className="flex flex-col gap-[10px] md:mr-[70px] md:w-full md:flex-row md:justify-between xl:mr-[140px]">
        <div className="flex gap-7">
          <p className="text-sm font-normal text-gray-400 md:hidden">이름</p>
          <p className="text-sm font-normal md:text-base">
            {invitation.dashboard.title}
          </p>
        </div>
        <div className="flex gap-7">
          <p className="text-sm font-normal text-gray-400 md:hidden">초대자</p>
          <p className="text-sm font-normal md:text-base">
            {invitation.invitee.nickname}
          </p>
        </div>
      </div>
      <InvitationResponseButton
        setInvitationList={setInvitationList}
        setApiCursorId={setApiCursorId}
        invitationId={invitation.id}
      />
    </li>
  );
}
