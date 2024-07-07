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
        className={`flex h-[50px] w-[50px] items-center justify-center overflow-hidden rounded-full border p-[2px] text-center text-xs font-semibold text-primary-foreground transition-transform duration-500 ease-in-out hover:scale-110 hover:rounded-md ${
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
