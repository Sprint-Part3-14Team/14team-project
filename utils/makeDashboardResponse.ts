import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { DashboardDetail } from '@/types/dashboard';

// NOTE: 대시보드 중복 제거 후 6개로 맞추는 함수
export default async function makeDashboardArr(
  arr: DashboardDetail[],
  page: number,
  size: number,
  token?: string
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
    makeDashboardArr(arr, page + 1, size - arr.length, token);
  }

  return arr;
}
