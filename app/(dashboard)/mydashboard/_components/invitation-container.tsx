'use client';

import { INITIAL_NUMBER_OF_USERS } from '@/constants/TEAM_BASE_URL';
import search from '@/public/icons/search.svg';
import { Invitation, InvitationResponse } from '@/types/invitations';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { getInvitations } from '../actions';
import InvitationList from './invitation-list';

interface InvitationListProps {
  initialInvitations: Invitation[];
  initialCursorId: number | null;
}

export default function InvitationContainer({
  initialInvitations,
  initialCursorId,
}: InvitationListProps) {
  const [invitationList, setInvitationList] =
    useState<Invitation[]>(initialInvitations);
  const [apiCursorId, setApiCursorId] = useState(initialCursorId);
  const [searchWord, setSearchWord] = useState<string>('');
  const { ref, inView } = useInView();

  async function loadMore() {
    // NOTE - 더 이상 로드할 데이터가 없는 경우
    if (apiCursorId === null) return;

    const data: InvitationResponse = await getInvitations(
      INITIAL_NUMBER_OF_USERS,
      apiCursorId ?? undefined,
      searchWord ?? undefined
    );
    const { invitations, cursorId } = data;

    // NOTE - 새 데이터를 기존 데이터에 추가하고 cursorId를 업데이트
    setInvitationList((prevInvitations) => [
      ...prevInvitations,
      ...invitations,
    ]);
    setApiCursorId(cursorId);
  }

  async function searchInvitation() {
    const data: InvitationResponse = await getInvitations(
      INITIAL_NUMBER_OF_USERS,
      undefined,
      searchWord ?? undefined
    );
    const { invitations, cursorId } = data;

    setInvitationList(invitations);
    setApiCursorId(cursorId);
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    searchInvitation();
  };

  useEffect(() => {
    searchInvitation();
  }, [searchWord]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  return (
    <>
      <div className="relative">
        <input
          type="text"
          className="h-9 w-full rounded-md border border-gray-300 py-[10px] pl-[44px] placeholder:text-sm placeholder:text-gray-400"
          placeholder="검색"
          onChange={onChangeSearch}
        />
        <div className="absolute left-[20px] top-[50%] translate-y-[-50%]">
          <Image src={search} width={16} height={16} alt="검색" />
        </div>
      </div>
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
        <InvitationList
          invitationList={invitationList}
          setInvitationList={setInvitationList}
          setApiCursorId={setApiCursorId}
        />
        <div ref={ref} />
      </ul>
    </>
  );
}
