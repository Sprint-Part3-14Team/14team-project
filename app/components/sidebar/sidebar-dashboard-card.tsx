'use client';

import { DashboardDetail } from '@/types/dashboard';
import Link from 'next/link';

export default function SidebarDashboardCard({
  dashboard,
}: {
  dashboard: DashboardDetail;
}) {
  return (
    <Link href={`/dashboard/${dashboard.id}`}>
      <li
        key={dashboard.id}
        className="flex size-[50px] items-center justify-center overflow-hidden rounded-full p-[2px] text-xs font-semibold text-white"
        style={{ backgroundColor: dashboard.color }}
      >
        {dashboard.title}
      </li>
    </Link>
  );
}
