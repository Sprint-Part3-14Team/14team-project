import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';

// NOTE - POST
export default async function postFetcher(url: string, body: object) {
  const token = cookies().get('token')?.value;

  const res = await fetch(`${TEAM_BASE_URL}/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    switch (res.status) {
      case 400:
        throw new Error(data.message);
      case 401:
        throw new Error(data.message);
      case 403:
        throw new Error(data.message);
      case 404:
        throw new Error(data.message);
      default:
        throw new Error('서버 오류가 발생했습니다');
    }
  }

  return data;
}
