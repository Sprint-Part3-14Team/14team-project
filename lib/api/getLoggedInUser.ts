import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { User } from '@/types/user';
import { cookies } from 'next/headers';

export default async function getLoggedInUser(): Promise<User> {
  const token = cookies().get('token')?.value;

  const res = await fetch(`${TEAM_BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  const user = data as User;

  if (!res.ok) {
    switch (res.status) {
      case 401:
        throw new Error(data.message);
      case 404:
        throw new Error(data.message);
      default:
        throw new Error('서버 오류가 발생했습니다');
    }
  }

  return user;
}
