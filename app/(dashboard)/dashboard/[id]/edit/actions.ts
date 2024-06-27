'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';

export default async function changeDashboardAction(
  title: string,
  color: string,
  dashboardId: number
) {
  const token = cookies().get('token')?.value;
  const url = `${TEAM_BASE_URL}/dashboards/${dashboardId}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, color }),
  });

  return res.json();
}
