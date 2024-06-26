import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  // 미들웨어에서 쿠기 있는지 확인
  const isLoggedIn = request.cookies.has('token');
  // path 확인
  const { pathname } = request.nextUrl;

  // 로그인이 됐을 때 login과 signup에 접근하면 /mydashboard로 redirect
  if (
    isLoggedIn &&
    (pathname.startsWith('/login') || pathname.startsWith('/signup'))
  ) {
    return NextResponse.redirect(new URL('/mydashboard', request.url));
  }

  // 로그인이 되지 않았을때 /mydashboard, /dashboard, /mypage에 접근하면 /login으로 redirect
  if (
    !isLoggedIn &&
    (pathname.startsWith('/mydashboard') ||
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/mypage'))
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
