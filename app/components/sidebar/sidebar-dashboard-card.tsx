'use client';

import { DashboardDetail } from '@/types/dashboard';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function SidebarDashboardCard({
  dashboard,
}: {
  dashboard: DashboardDetail;
}) {
  const { theme } = useTheme();
  const params = useParams<{ id: string }>();
  const isActive = params?.id === dashboard.id.toString();

  return (
    <Link href={`/dashboard/${dashboard.id}`}>
      <li
        key={dashboard.id}
        className={`flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full border p-[2px] text-xs font-semibold text-primary-foreground transition ease-in-out hover:rounded-md ${
          // TODO - 스타일 다르게 주기
          isActive &&
          (theme === 'dark'
            ? 'rounded-md border-white'
            : 'rounded-md border-black')
        }`}
        style={{ backgroundColor: dashboard.color }}
      >
        {dashboard.title}
      </li>
    </Link>
  );
}
