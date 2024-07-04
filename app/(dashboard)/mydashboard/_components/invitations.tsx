import { INITIAL_NUMBER_OF_USERS } from '@/constants/TEAM_BASE_URL';
import { InvitationResponse } from '@/types/invitations';

import { getInvitations } from '../actions';
import InvitationContainer from './invitation-container';

export default async function Invitations() {
  // NOTE - inviteAccepted null인 경우만 조회됨
  const data: InvitationResponse = await getInvitations(
    INITIAL_NUMBER_OF_USERS
  );
  const { invitations, cursorId } = data;

  return (
    <section className="mt-6 bg-white px-4 py-6 md:px-7 md:py-8">
      <h2 className="mb-5 text-xl font-bold text-gray-700">
        초대받은 대시보드
      </h2>
      <InvitationContainer
        initialInvitations={invitations}
        initialCursorId={cursorId}
      />
    </section>
  );
}
