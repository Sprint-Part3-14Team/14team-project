'use client';

import PageButton from '@/app/components/pagination/page-button';
import { DashboardDetail } from '@/types/dashboard';
import { useEffect, useState } from 'react';

import { getDashboard } from '../actions';
import DashboardCard from './dashboard-card';

interface DashboardListProps {
  initialData: DashboardDetail[];
}

export default function DashboardList({ initialData }: DashboardListProps) {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [dashboardList, setDashboardList] =
    useState<DashboardDetail[]>(initialData);

  const handleForward = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  // TODO: 마지막 페이지에서 앞으로 이동 시 리스트 추가되는 거 고칠 것
  const handleNext = () => {
    setPage((prev) => (prev !== lastPage ? prev + 1 : prev));
  };

  useEffect(() => {
    async function getData() {
      const data = await getDashboard(page);
      const { dashboards, totalCount } = data;
      setDashboardList(dashboards);
      setLastPage(totalCount <= 6 ? 1 : Math.ceil(totalCount / 6));
    }

    getData();
  }, [page]);

  return (
    <>
      <ul className="grid grid-flow-row gap-2 md:grid-cols-2 xl:grid-cols-3">
        {dashboardList?.map((dashboard: DashboardDetail) => (
          <DashboardCard dashboard={dashboard} key={dashboard.id} />
        ))}
      </ul>

      <div className="mb-11 mt-3 text-right">
        <span className="mr-4">
          {lastPage} 페이지 중 {page}
        </span>
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
