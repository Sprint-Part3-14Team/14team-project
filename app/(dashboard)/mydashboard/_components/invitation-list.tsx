import getFetcher from '@/lib/api/getFetcher';
import { Invitation, Invitations } from '@/types/invitations';

import InvitationCard from './invitation-card';

export default async function InvitationList() {
  // TODO - 무한 스크롤, 검색 cursorId,title
  const params = new URLSearchParams({
    size: '10',
  });

  const data: Invitations = await getFetcher(
    `/invitations?${params.toString()}`
  );
  const { invitations } = data;
  // NOTE - inviteAccepted null인 경우만 조회됨

  return (
    <div>
      <ul>
        {invitations.map((invitation: Invitation) => (
          <InvitationCard invitation={invitation} />
        ))}
      </ul>
    </div>
  );
}
