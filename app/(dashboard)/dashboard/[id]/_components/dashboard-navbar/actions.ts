'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';

export async function Invitedashboard(dashboardId: number, email: string) {
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

export async function MyEmail() {
  const token = cookies().get('token')?.value;

  if (!token) {
    throw new Error('인증되지 않았습니다');
  }

  const url = `${TEAM_BASE_URL}/users/me`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `서버에서 사용자 정보를 가져오지 못했습니다. 오류 코드: ${response.status}`
      );
    }

    const userData = await response.json();
    return userData.email; // 혹은 필요한 사용자 정보를 반환
  } catch (error: any) {
    console.error('내 정보 조회 중 오류 발생:', error.message);
    throw new Error('서버 요청 중 오류 발생');
  }
}
