'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function changeDashboardAction(
  title: string,
  color: string,
  dashboardId: number
) {
  const token = cookies().get('token')?.value;
  const url = `${TEAM_BASE_URL}/dashboards/${dashboardId}`;

  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, color }),
  });

  revalidatePath(`/dashboard/${dashboardId}`);
  redirect(`/dashboard/${dashboardId}/edit`);
}
