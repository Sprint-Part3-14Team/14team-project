import arrow from '@/public/icons/arrow_forward_black.svg';
import Image from 'next/image';
import Link from 'next/link';

import DashboardInfoChange from './_components/dashboard/dashboard-info-change';
import DeleteDashboardButton from './_components/delete-dashboard-button';
import Invitation from './_components/invitation/invitation';
import Member from './_components/member/member';

export default function DashboardEdit({ params }: { params: { id: number } }) {
  return (
    <main className="px-3 pt-3 md:px-5 md:pt-5 [&_path]:fill-black [&_svg]:h-5 [&_svg]:w-5">
      <Link
        className="mb-5 flex w-20 items-center gap-1"
        href={`/dashboard/${params.id}`}
      >
        <Image width={20} height={20} src={arrow} alt="왼쪽 꺽쇠 모양 아이콘" />
        <span>돌아가기</span>
      </Link>

      <DashboardInfoChange dashboardId={params.id} />
      <Member dashboardId={params.id} />
      <Invitation dashboardId={params.id} />
      <DeleteDashboardButton dashboardId={params.id} />
    </main>
  );
}
