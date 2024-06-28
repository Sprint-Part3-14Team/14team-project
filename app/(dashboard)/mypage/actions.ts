'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';

export default async function editPassword(
  password: string,
  newPassword: string
) {
  const token = cookies().get('token')?.value;

  const response = await fetch(`${TEAM_BASE_URL}/auth/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password, newPassword }),
  });

  if (response.status !== 204) {
    const data = await response.json();

    return data;
  }

  return { message: '비밀번호 변경 성공' };
}
