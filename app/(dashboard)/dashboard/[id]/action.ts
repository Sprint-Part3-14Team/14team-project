'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// NOTE - 이미지 업로드
export async function postToDoCardImage(cardImage: FormData, columnId: number) {
  const token = cookies().get('token')?.value;

  const res = await fetch(`${TEAM_BASE_URL}/columns/${columnId}/card-image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: cardImage,
  });

  const data = await res.json();

  // NOTE - 에러 핸들링
  if (!res.ok) {
    throw new Error('서버 오류가 발생했습니다');
  }

  return data.imageUrl;
}

// NOTE - 할 일 카드 생성
export async function postToDoCard(jsonObject: { [key: string]: any }) {
  const token = cookies().get('token')?.value;

  const response = await fetch(`${TEAM_BASE_URL}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonObject),
  });

  const data = await response.json();

  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error(data.message);
      case 404:
        throw new Error(data.message);
      default:
        throw new Error('서버 오류가 발생했습니다');
    }
  }

  revalidatePath(`/dashboard/${jsonObject.dashboardId}`);
  return data;
}

// NOTE - 할 일 카드 수정
export async function updateToDoCard(
  jsonObject: { [key: string]: any },
  cardId: number
) {
  const token = cookies().get('token')?.value;

  const response = await fetch(`${TEAM_BASE_URL}/cards/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonObject),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('카드 수정 실패:', errorData);
    throw new Error('카드 수정 실패');
  }

  const data = await response.json();
  revalidatePath(`/dashboard/${jsonObject.dashboardId}`);
  return data;
}
