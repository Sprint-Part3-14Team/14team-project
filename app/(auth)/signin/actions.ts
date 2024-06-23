'use server';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { cookies } from 'next/headers';

export default async function signIn(email: string, password: string) {
  const response = await fetch(`${TEAM_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  cookies().set('token', data.accessToken);

  return data;
}
