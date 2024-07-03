'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// NOTE - 이미지 업로드
export async function postToDoCardImage(cardImage: File, columnId: number) {
  const token = cookies().get('token')?.value;

  const imageFormData = new FormData();
  imageFormData.append('image', cardImage);

  const res = await fetch(`${TEAM_BASE_URL}/columns/${columnId}/card-image`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: imageFormData,
  });

  const data = await res.json();

  // NOTE - 에러 핸들링
  if (!res.ok) {
    throw new Error('서버 오류가 발생했습니다');
  }

  return data.imageUrl;
}

// NOTE - 할 일 카드 생성
export async function postToDoCard(formData: FormData) {
  let imageUrl;
  // NOTE - 이미지가 있는 경우 이미지 url api 요청해서 formData 업데이트
  if (formData.has('imageUrl')) {
    const imageFile = formData.get('imageUrl') as File;
    const columnId = parseInt(formData.get('columnId') as string, 10);
    imageUrl = await postToDoCardImage(imageFile, columnId);
    formData.set('imageUrl', imageUrl);
    console.log(`이미지 url 생성 : ${imageUrl}`);
  }

  // NOTE - POST 요청
  const token = cookies().get('token')?.value;

  const jsonObject: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    if (
      key === 'assigneeUserId' ||
      key === 'dashboardId' ||
      key === 'columnId'
    ) {
      jsonObject[key] = parseInt(value as string, 10);
    } else if (key === 'tags') {
      jsonObject[key] = JSON.parse(value as string); // tags를 JSON 파싱
    } else {
      jsonObject[key] = value;
    }
  });

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

  revalidatePath(`/dashboard/${formData.get('dashboardId')}`);
  return data;
}
