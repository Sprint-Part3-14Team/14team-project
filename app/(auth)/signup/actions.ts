'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { redirect } from 'next/navigation';

export default async function signUp(
  email: string,
  nickname: string,
  password: string
) {
  await fetch(`${TEAM_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, nickname, password }),
  });

  // TODO - 회원가입 시 토큰 저장을 해야하는가?
  // const data = await response.json();
  // cookies().set('token', data.accessToken);

  redirect('/login');
}
