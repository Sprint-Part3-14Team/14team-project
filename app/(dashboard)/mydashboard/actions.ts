'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { DashboardResponse } from '@/types/dashboard';
import { InvitationResponse } from '@/types/invitations';
import { DashboardMembersResponse } from '@/types/members';
import { cookies } from 'next/headers';

export async function getInvitations(
  size: number,
  cursorId?: number,
  searchTitle?: string
): Promise<InvitationResponse> {
  const token = cookies().get('token')?.value;

  let url = `${TEAM_BASE_URL}/invitations?size=${size}`;

  // NOTE - cursorId가 존재하면 쿼리 파라미터에 추가
  if (cursorId !== undefined) {
    url += `&cursorId=${cursorId}`;
  }

  if (searchTitle) {
    url += `&title=${searchTitle}`;
  }

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data: InvitationResponse = await res.json();
  return data;
}

export async function putInvitation(id: number, inviteAccepted: boolean) {
  const token = cookies().get('token')?.value;

  const res = await fetch(`${TEAM_BASE_URL}/invitations/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id, inviteAccepted }),
  });

  if (!res.ok) {
    throw new Error('Failed to update invitation');
  }

  const data = await res.json();
  return data.dashboard.title;
}

export async function getDashboard(page: number): Promise<DashboardResponse> {
  const token = cookies().get('token')?.value;

  const url = `${TEAM_BASE_URL}/dashboards?navigationMethod=pagination&page=${page}&size=6`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}

export async function getDashboardMember(
  dashboardId: number
): Promise<DashboardMembersResponse> {
  const token = cookies().get('token')?.value;

  const url = `${TEAM_BASE_URL}/members?dashboardId=${dashboardId}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data;
}
