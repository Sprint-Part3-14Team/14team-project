import Link from 'next/link';

import SignInForm from '../_components/sign-in-form';

export default function SignIn() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-3 md:px-28 lg:mx-auto lg:w-[520px] lg:px-0">
      <p className="mb-10 font-medium">오늘도 만나서 반가워요!</p>
      <SignInForm />
      <p className="mt-6">
        회원이 아니신가요?{' '}
        <Link href="/signup" className="text-violet-primary underline">
          회원가입하기
        </Link>
      </p>
    </div>
  );
}
