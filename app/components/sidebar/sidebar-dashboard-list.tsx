'use client';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { DashboardDetail } from '@/types/dashboard';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

import PageButton from '../pagination/page-button';
import SidebarDashboardCard from './sidebar-dashboard-card';

interface SidebarDashboardListProps {
  initialData: DashboardDetail[];
}

export default function SidebarDashboardList({
  initialData,
}: SidebarDashboardListProps) {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [dashboardList, setDashboardList] =
    useState<DashboardDetail[]>(initialData);

  const token = getCookie('token');
  const url = `${TEAM_BASE_URL}/dashboards?navigationMethod=pagination&page=${page}&size=10`;

  const handleForward = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => (prev !== lastPage ? prev + 1 : prev));
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const { dashboards, totalCount } = data;
      setDashboardList(dashboards);
      setLastPage(totalCount > 10 ? Math.ceil(totalCount / 10) : 1);
    }

    fetchData();
  }, [page]);

  return (
    <>
      <ul className="flex flex-col gap-[38px] md:gap-[27px]">
        {dashboardList.map((dashboard: DashboardDetail) => (
          <SidebarDashboardCard dashboard={dashboard} key={dashboard.id} />
        ))}
      </ul>
      <div className="mt-9 hidden text-center md:fixed md:bottom-7 md:left-3 md:flex md:h-10 md:w-20">
        <PageButton
          goToForward={handleForward}
          goToNext={handleNext}
          currentPage={page}
          totalPage={lastPage}
        />
      </div>
    </>
  );
}
