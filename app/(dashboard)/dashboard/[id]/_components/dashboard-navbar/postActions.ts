'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';

export default async function Invitedashboard(
  dashboardId: number,
  email: string
) {
  if (!dashboardId || !email) {
    throw new Error('유효하지 않은 입력입니다');
  }

  const token = cookies().get('token')?.value;

  if (!token) {
    throw new Error('인증되지 않았습니다');
  }

  const url = `${TEAM_BASE_URL}/${TEAM_BASE_URL}/dashboards/${dashboardId}/invitations`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error('초대를 실패했습니다');
  }

  return response.json();
}
