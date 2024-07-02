'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';

export async function CreateColumn(title: string, dashboardId: number) {
  const token = cookies().get('token')?.value;

  if (!token) {
    throw new Error('인증되지 않았습니다');
  }

  const url = `${TEAM_BASE_URL}/columns`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, dashboardId }),
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`칼럼 생성을 실패했습니다: ${errorMessage}`);
  }

  return res.json();
}

export async function getColumnNames(dashboardId: number) {
  const token = cookies().get('token')?.value;

  const url = `${TEAM_BASE_URL}/columns?dashboardId=${dashboardId}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(`칼럼 이름들을 불러오는데 실패했습니다: ${errorMessage}`);
  }

  const responseData = await res.json();

  const { data } = responseData;

  if (!Array.isArray(data)) {
    throw new Error('API 응답 오류');
  }

  const columnTitles = data.map((column: any) => column.title);

  return columnTitles;
}
