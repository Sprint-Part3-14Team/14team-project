'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';

export default async function CreateColumn(title: string, dashboardId: number) {
  const token = cookies().get('token')?.value;

  if (!token) {
    throw new Error('인증되지 않았습니다');
  }

  const url = `${TEAM_BASE_URL}/columns`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, dashboardId }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`칼럼 생성을 실패했습니다: ${errorMessage}`);
  }

  return response.json();
}
