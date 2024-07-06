'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { DashboardDetail } from '@/types/dashboard';
import { cookies } from 'next/headers';

export default async function Postdashboard(
  dashboardName: string,
  selectedColor: string
): Promise<DashboardDetail> {
  if (!dashboardName || !selectedColor) {
    throw new Error('유효하지 않은 입력입니다');
  }

  const token = cookies().get('token')?.value;

  if (!token) {
    throw new Error('인증되지 않았습니다');
  }

  const response = await fetch(`${TEAM_BASE_URL}/dashboards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: dashboardName, color: selectedColor }),
  });

  if (!response.ok) {
    throw new Error('대시보드 생성을 실패했습니다');
  }

  const data: DashboardDetail = await response.json();

  return data;
}
