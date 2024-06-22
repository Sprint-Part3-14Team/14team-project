import { ACCESS_TOKEN, TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';

export default async function getDashboardList() {
  const params = new URLSearchParams({
    navigationMethod: 'pagination',
    page: '1',
    size: '10',
  });

  const url = `${TEAM_BASE_URL}dashboards?${params.toString()}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
