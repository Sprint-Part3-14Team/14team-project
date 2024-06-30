'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { DashboardInvitationResponse } from '@/types/invitations';
import { DashboardMembersResponse } from '@/types/members';
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

export async function getMember(
  page: number,
  dashboardId: number
): Promise<DashboardMembersResponse> {
  const token = cookies().get('token')?.value;

  const res = await fetch(
    `${TEAM_BASE_URL}/members?page=${page}&size=5&dashboardId=${dashboardId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function getInvitation(
  page: number,
  dashboardId: number
): Promise<DashboardInvitationResponse> {
  const token = cookies().get('token')?.value;

  const res = await fetch(
    `${TEAM_BASE_URL}/dashboards/${dashboardId}/invitations?page=${page}&size=5`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
}
