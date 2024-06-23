import { ACCESS_TOKEN, TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';

export default async function getDashboards() {
  const params = new URLSearchParams({
    navigationMethod: 'pagination',
    page: '1',
    size: '10',
  });

  const url = `${TEAM_BASE_URL}/dashboards?${params.toString()}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error('데이터를 가져오는데 실패했습니다');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching dashboards:', error);
    throw error;
  }
}