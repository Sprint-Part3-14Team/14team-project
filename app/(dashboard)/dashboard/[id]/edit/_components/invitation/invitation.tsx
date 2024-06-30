import { getInvitation } from '../../actions';
import Title from '../section-title';
import InvitationList from './invitation-list';

export default async function Invitation({
  dashboardId,
}: {
  dashboardId: number;
}) {
  const initialData = await getInvitation(1, dashboardId);
  const { invitations } = initialData;

  return (
    <section className="relative mt-3 rounded-lg bg-white pb-5 xl:w-[620px]">
      <div className="px-5 pt-6 md:px-7 md:pt-8">
        <Title sectionTitle="초대 내역" listTitle="이메일" />
      </div>
      <InvitationList dashboardId={dashboardId} initialData={invitations} />
    </section>
  );
}
