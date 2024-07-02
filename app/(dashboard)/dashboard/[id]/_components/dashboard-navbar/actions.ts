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

  const url = `${TEAM_BASE_URL}/dashboards/${dashboardId}/invitations`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `초대 실패: ${response.status} - ${response.statusText} - ${errorText}`
      );
      throw new Error(`초대 실패: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();
    console.log('초대 성공:', result);

    return result;
  } catch (error) {
    console.error('서버 요청 중 오류 발생:', error);
    throw new Error('서버 요청 중 오류 발생');
  }
}
