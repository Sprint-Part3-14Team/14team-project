'use client';

import PageButton from '@/app/components/pagination/page-button';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { DashboardDetail } from '@/types/dashboard';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

import DashboardCard from './dashboard-card';

const token = getCookie('token');

// NOTE: 대시보드 중복 제거 후 6개로 맞추는 함수
async function makeDashboardArr(
  arr: DashboardDetail[],
  page: number,
  size: number
): Promise<DashboardDetail[]> {
  const url = `${TEAM_BASE_URL}/dashboards?navigationMethod=pagination&page=${page + 1}&size=${size}`;

  async function reFetch() {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    const { dashboards } = data;
    return dashboards;
  }

  const fetchArr: DashboardDetail[] = await reFetch();

  const checkDashboard: DashboardDetail[] = fetchArr.reduce(
    (acc: DashboardDetail[], cur: DashboardDetail) => {
      if (acc.findIndex(({ id }) => id === cur.id) === -1) {
        acc.push(cur);
      }
      return acc;
    },
    []
  );

  arr.push(...checkDashboard);

  if (arr.length < 6) {
    makeDashboardArr(arr, page + 1, size - arr.length);
  }

  return arr;
}

interface DashboardListProps {
  initialData: DashboardDetail[];
  lastPage: number;
}

export default function DashboardList({
  initialData,
  lastPage,
}: DashboardListProps) {
  const [page, setPage] = useState(1);
  const [dashboardList, setDashboardList] =
    useState<DashboardDetail[]>(initialData);

  async function getData() {
    const url = `${TEAM_BASE_URL}/dashboards?navigationMethod=pagination&page=${page}&size=6`;

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    const { dashboards } = data;

    const checkDashboard: DashboardDetail[] = dashboards.reduce(
      (acc: DashboardDetail[], cur: DashboardDetail) => {
        if (acc.findIndex(({ id }) => id === cur.id) === -1) {
          acc.push(cur);
        }
        return acc;
      },
      []
    );

    // NOTE: 6개 이하일 경우(=중복 데이터 존재) 함수 호출
    if (checkDashboard.length < 6) {
      setDashboardList(
        await makeDashboardArr(checkDashboard, page, 6 - checkDashboard.length)
      );
      return;
    }

    setDashboardList(checkDashboard);
  }

  const handleForward = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => (prev < lastPage ? prev + 1 : prev));
  };

  useEffect(() => {
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
