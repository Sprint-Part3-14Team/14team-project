import { ACCESS_TOKEN, TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { NextResponse } from 'next/server';

export default async function GET() {
  const params = new URLSearchParams({
    navigationMethod: 'pagination',
    page: '1',
    size: '10',
  });

  const url = `${TEAM_BASE_URL}/dashboards?${params.toString()}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error('데이터를 가져오는데 실패했습니다');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    // console.error('대시보드를 가져오는 중 오류 발생:', error);
    return NextResponse.json({ error: '내부 서버 오류' }, { status: 500 });
  }
}
