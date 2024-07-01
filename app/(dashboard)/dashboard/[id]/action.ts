'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';

// NOTE - 이미지 업로드
export default async function postToDoCardImage(
  cardImage: FormData,
  columnId: number
) {
  const token = cookies().get('token')?.value;
  const response = await fetch(
    `${TEAM_BASE_URL}/columns/${columnId}/card-image`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: cardImage,
    }
  );

  if (response.status === 201) {
    const data = await response.json();
    return data.imageUrl;
  }
  return null;
}

// NOTE - 할 일 카드 생성
// export async function postToDoCard(cardImageUrl?: string) {}
