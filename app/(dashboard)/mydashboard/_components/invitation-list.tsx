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
        {invitations.map((invitation: Invitation) => (
          <InvitationCard invitation={invitation} />
        ))}
      </ul>
    </div>
  );
}
