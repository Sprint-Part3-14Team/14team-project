'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';

export default async function signUp(
  email: string,
  nickname: string,
  password: string
) {
  const response = await fetch(`${TEAM_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, nickname, password }),
  });

  const data = await response.json();

  // TODO - 회원가입 시 토큰 저장을 해야하는가?
  // cookies().set('token', data.accessToken);
  return data;
}
