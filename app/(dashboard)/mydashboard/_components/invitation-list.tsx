import getFetcher from '@/lib/api/getFetcher';
import { Invitations } from '@/types/invitations';

export default async function InvitationList() {
  // TODO - 무한 스크롤, 검색 cursorId,title
  const params = new URLSearchParams({
    size: '10',
  });

  const data: Invitations = await getFetcher(
    `/invitations?${params.toString()}`
  );
  const { invitations } = data;
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>초대 리스트');
  console.log(invitations);

  return <div />;
}
