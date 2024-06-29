'use client';

import { INITIAL_NUMBER_OF_USERS } from '@/constants/TEAM_BASE_URL';
import { Invitation, InvitationResponse } from '@/types/invitations';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import getInvitations from '../actions';
import InvitationCard from './invitation-card';

interface InvitationListProps {
  initialInvitations: Invitation[];
  initialCursorId: number | null;
}

export default function InvitationList({
  initialInvitations,
  initialCursorId,
}: InvitationListProps) {
  const [invitationList, setInvitationList] =
    useState<Invitation[]>(initialInvitations);
  const [apiCursorId, setApiCursorId] = useState(initialCursorId);
  const { ref, inView } = useInView();

  async function loadMore() {
    // NOTE - 더 이상 로드할 데이터가 없는 경우
    if (apiCursorId === null) return;
    const data: InvitationResponse = await getInvitations(
      INITIAL_NUMBER_OF_USERS,
      apiCursorId ?? undefined
    );
    const { invitations, cursorId } = data;

    // NOTE - 새 데이터를 기존 데이터에 추가하고 cursorId를 업데이트
    setInvitationList((prevInvitations) => [
      ...prevInvitations,
      ...invitations,
    ]);
    setApiCursorId(cursorId);
  }

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  return (
    <div>
      <div className="hidden md:mt-6 md:flex md:justify-between">
        <div className="mr-[175px] flex w-full justify-between xl:mr-[270px]">
          <p className="text-base font-normal text-gray-400">이름</p>
          <p className="text-base font-normal text-gray-400">초대자</p>
        </div>
        <p className="whitespace-nowrap text-base font-normal text-gray-400">
          수락여부
        </p>
      </div>
      <ul>
        {invitationList.map((invitation: Invitation) => (
          <InvitationCard invitation={invitation} />
        ))}
        <div ref={ref} />
      </ul>
    </div>
  );
}
