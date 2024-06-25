import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';

// NOTE - GET
export default async function getFetcher(url: string) {
  const token = cookies().get('token')?.value;

  const res = await fetch(`${TEAM_BASE_URL}/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
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
    }
  }

  return data;
}
