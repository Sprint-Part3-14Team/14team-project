'use client';

import Button from '@/app/components/button';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { Invitation } from '@/types/invitations';
import { getCookie } from 'cookies-next';

interface InvitationCardProps {
  dashboardId: number;
  invitation: Invitation;
  invitationId: number;
}

export default function InvitationCard({
  dashboardId,
  invitation,
  invitationId,
}: InvitationCardProps) {
  const token = getCookie('token');

  const handleDeleteInvitation = async () => {
    await fetch(
      `${TEAM_BASE_URL}/dashboards/${dashboardId}/invitations/${invitationId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <li className="flex items-center justify-between gap-2 border-b border-solid border-gray-200 px-5 py-4 last:border-0 md:px-7 md:py-5">
      <p className="grow text-left text-sm md:text-base">
        {invitation.invitee.email}
      </p>
      <Button
        variant="mobile52x28"
        className="rounded border border-gray-300 text-xs text-violet-primary md:text-sm"
        onClick={handleDeleteInvitation}
      >
        취소
      </Button>
    </li>
  );
}
