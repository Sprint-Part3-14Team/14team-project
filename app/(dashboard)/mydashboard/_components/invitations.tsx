import { INITIAL_NUMBER_OF_USERS } from '@/constants/TEAM_BASE_URL';
import search from '@/public/icons/search.svg';
import invitation from '@/public/images/none_invitation.svg';
import { InvitationResponse } from '@/types/invitations';
import Image from 'next/image';

import { getInvitations } from '../actions';
import InvitationList from './invitation-list';

export default async function Invitations() {
  // NOTE - inviteAccepted null인 경우만 조회됨
  const data: InvitationResponse = await getInvitations(
    INITIAL_NUMBER_OF_USERS
  );
  const { invitations, cursorId } = data;

  return (
    <section className="mt-6 w-full bg-white px-4 py-6 md:px-7 md:py-8">
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
        <>
          <div className="relative">
            <input
              type="text"
              className="h-9 w-full rounded-md border border-gray-300 py-[10px] pl-[44px] placeholder:text-sm placeholder:text-gray-400"
              placeholder="검색"
            />
            <div className="absolute left-[20px] top-[50%] translate-y-[-50%]">
              <Image src={search} width={16} height={16} alt="검색" />
            </div>
          </div>
          <InvitationList
            initialInvitations={invitations}
            initialCursorId={cursorId}
          />
        </>
      )}
    </section>
  );
}
