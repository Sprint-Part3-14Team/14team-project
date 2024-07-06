import { INITIAL_NUMBER_OF_USERS } from '@/constants/TEAM_BASE_URL';
import invitation from '@/public/images/none_invitation.svg';
import { InvitationResponse } from '@/types/invitations';
import Image from 'next/image';

import { getInvitations } from '../actions';
import InvitationContainer from './invitation-container';

export default async function Invitations() {
  // NOTE - inviteAccepted null인 경우만 조회됨
  const data: InvitationResponse = await getInvitations(
    INITIAL_NUMBER_OF_USERS
  );
  const { invitations, cursorId } = data;

  return (
    <section className="mt-6 w-full bg-background px-4 py-6 md:px-7 md:py-8">
      <h2 className="mb-5 text-xl font-bold text-gray-700">
        초대받은 대시보드
      </h2>
      {invitations.length === 0 ? (
        <div className="h-[352px] w-full">
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <div className="relative size-[60px] md:size-[100px]">
              <Image src={invitation} fill alt="초대받은 대시보드 없음" />
            </div>
            <p className="text-sm font-normal text-gray-400 md:text-lg">
              아직 초대받은 대시보드가 없어요
            </p>
          </div>
        </div>
      ) : (
        <InvitationContainer
          initialInvitations={invitations}
          initialCursorId={cursorId}
        />
      )}
    </section>
  );
}
