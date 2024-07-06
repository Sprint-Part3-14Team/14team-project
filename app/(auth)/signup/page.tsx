import Link from 'next/link';

import SignUpForm from '../_components/sign-up-form';

export default function SignUp() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-3 md:px-28 xl:mx-auto xl:w-[520px] xl:px-0">
      <p className="mb-10 font-medium">첫 방문을 환영합니다!</p>
      <SignUpForm />
      <p className="mt-6">
        이미 가입하셨나요?{' '}
        <Link href="/login" className="text-primary underline">
          로그인하기
        </Link>
      </p>
    </div>
  );
}
