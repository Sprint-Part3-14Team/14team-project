'use client';

import { Invitation } from '@/types/invitations';

import InvitationCard from './invitation-card';

interface InvitationListProps {
  invitationList: Invitation[];
  setInvitationList: (invitations: Invitation[]) => void;
  setApiCursorId: (cursorId: number | null) => void;
}

export default function InvitationList({
  invitationList,
  setInvitationList,
  setApiCursorId,
}: InvitationListProps) {
  return (
    <>
      {invitationList.map((invitation: Invitation) => (
        <InvitationCard
          invitation={invitation}
          key={invitation.id}
          setInvitationList={setInvitationList}
          setApiCursorId={setApiCursorId}
        />
      ))}
    </>
  );
}
