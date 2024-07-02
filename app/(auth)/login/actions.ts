'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';

export default async function signIn(email: string, password: string) {
  try {
    const response = await fetch(`${TEAM_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.status === 201) {
      cookies().set('token', data.accessToken);

      // 여기서 직접 redirect를 사용하면 NEXT_REDIRECT에러 발생..버그인 것 같으므로 객체로 따로 처리
      return { success: true, redirect: '/mydashboard' };
    }
    return { success: false, data };
  } catch (error) {
    throw new Error(error as string);
  }
}
