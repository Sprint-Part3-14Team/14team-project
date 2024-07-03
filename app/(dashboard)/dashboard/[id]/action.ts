'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';

// NOTE - 이미지 업로드
export async function postToDoCardImage(cardImage: File, columnId: number) {
  const token = cookies().get('token')?.value;

  const imageFormData = new FormData();
  imageFormData.append('image', cardImage);

  const response = await fetch(
    `${TEAM_BASE_URL}/columns/${columnId}/card-image`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: imageFormData,
    }
  );

  if (response.status === 201) {
    const data = await response.json();
    return data.imageUrl;
  }
  return null;
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

  if (response.status === 201) {
    const data = await response.json();
    console.log('카드 생성 성공:', data);
    return data;
  }
  const errorData = await response.json();
  console.error('카드 생성 실패:', errorData);
  return null;
}

// NOTE - 수정 PUT
export async function updateToDoCard(formData: FormData, cardId: number) {
  let imageUrl;
  // NOTE - 이미지가 파일 객체로 제공될 경우에만 이미지 업로드 처리(이미지를 추가하거나 변경하는 경우)
  const imageUrlValue = formData.get('imageUrl');
  if (typeof imageUrlValue === 'object' && imageUrlValue instanceof File) {
    const imageFile = imageUrlValue as File;
    const columnId = parseInt(formData.get('columnId') as string, 10);
    imageUrl = await postToDoCardImage(imageFile, columnId);
    formData.set('imageUrl', imageUrl); // 업로드된 이미지 URL로 formData 업데이트
    console.log(`이미지 url 생성 : ${imageUrl}`);
  }

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

  const response = await fetch(`${TEAM_BASE_URL}/cards/${cardId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(jsonObject),
  });

  if (response.status === 200) {
    const data = await response.json();
    console.log('카드 수정 성공:', data);
    return data;
  }
  const errorData = await response.json();
  console.error('카드 수정 실패:', errorData);
  return null;
}
