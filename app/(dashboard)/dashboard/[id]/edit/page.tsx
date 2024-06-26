import LeftArrow from '@/app/components/icons/left-arrow';
import Link from 'next/link';

import DashboardInfoChange from './_components/dashboard/dashboard-info-change';

export default function DashboardEdit({ params }: { params: { id: number } }) {
  return (
    <main className="px-3 pt-3 md:px-5 md:pt-5 [&_path]:fill-black [&_svg]:h-5 [&_svg]:w-5">
      <Link
        className="mb-5 flex items-center gap-1"
        href={`/dashboard/${params.id}`}
      >
        <LeftArrow />
        돌아가기
      </Link>

      <DashboardInfoChange dashboardId={params.id} />
    </main>
  );
}
