'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function editPassword(password: string, newPassword: string) {
  const token = cookies().get('token')?.value;

  const response = await fetch(`${TEAM_BASE_URL}/auth/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password, newPassword }),
  });

  if (response.status !== 204) {
    const data = await response.json();

    return data;
  }

  return { message: '비밀번호 변경 성공' };
}

export async function editProfile(formData?: FormData, nickname?: string) {
  const token = cookies().get('token')?.value;

  // 이미지 업로드 함수
  async function uploadImage(imageFormData: FormData) {
    const response = await fetch(`${TEAM_BASE_URL}/users/me/image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: imageFormData,
    });

    if (response.status === 201) {
      const data = await response.json();
      return data.profileImageUrl;
    }
    return null;
  }

  // 프로필 업데이트 함수
  async function updateProfile(uploadedImageUrl?: string, nick?: string) {
    const body: { nickname?: string; profileImageUrl?: string } = {};
    if (nick !== undefined) body.nickname = nick;
    if (uploadedImageUrl !== undefined) body.profileImageUrl = uploadedImageUrl;

    const response = await fetch(`${TEAM_BASE_URL}/users/me`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (response.status !== 200) {
      return response.json();
    }
    revalidatePath('/mypage');
    return { message: '프로필 수정 성공' };
  }

  // 이미지가 있는 경우
  if (formData !== undefined) {
    const uploadedImageUrl = await uploadImage(formData);
    if (uploadedImageUrl) {
      return updateProfile(uploadedImageUrl, nickname);
    }
  }
  // 이미지가 없는 경우 또는 이미지 업로드 실패 시
  return updateProfile(undefined, nickname);
}
