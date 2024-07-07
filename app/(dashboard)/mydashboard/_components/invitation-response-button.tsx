'use client';

import { INITIAL_NUMBER_OF_USERS } from '@/constants/TEAM_BASE_URL';
import { Invitation, InvitationResponse } from '@/types/invitations';

import { getInvitations, putInvitation } from '../actions';

interface InvitationResponseProps {
  invitationId: number;
  setInvitationList: (invitations: Invitation[]) => void;
  setApiCursorId: (cursorId: number | null) => void;
}

export default function InvitationResponseButton({
  invitationId,
  setInvitationList,
  setApiCursorId,
}: InvitationResponseProps) {
  let boardTitle;
  let updatedInvitations: InvitationResponse;

  async function handleAccept() {
    boardTitle = await putInvitation(invitationId, true);
    if (boardTitle) {
      updatedInvitations = await getInvitations(INITIAL_NUMBER_OF_USERS);
      setInvitationList(updatedInvitations.invitations);
      setApiCursorId(updatedInvitations.cursorId);
    }
  }

  async function handleDecline() {
    boardTitle = await putInvitation(invitationId, false);
    if (boardTitle) {
      updatedInvitations = await getInvitations(INITIAL_NUMBER_OF_USERS);
      setInvitationList(updatedInvitations.invitations);
      setApiCursorId(updatedInvitations.cursorId);
    }
  }

  return (
    <div className="mt-4 flex gap-[10px] md:mt-0">
      <input
        type="button"
        value="수락"
        className="inline-flex h-[28px] w-full min-w-[109px] cursor-pointer items-center justify-center rounded bg-primary text-xs font-medium text-primary-foreground hover:bg-accent md:h-[30px] md:min-w-[72px] xl:h-[32px] xl:min-w-[84px]"
        onClick={handleAccept}
      />
      <input
        type="button"
        value="거절"
        className="inline-flex h-[28px] w-full min-w-[109px] cursor-pointer items-center justify-center rounded border border-gray-700 text-xs font-medium text-primary-foreground hover:text-primary md:h-[30px] md:min-w-[72px] xl:h-[32px] xl:min-w-[84px]"
        onClick={handleDecline}
      />
    </div>
  );
}
