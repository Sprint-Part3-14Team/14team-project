import Link from 'next/link';

export default function SignUp() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-3 md:px-28 lg:mx-auto lg:w-[520px]">
      <p className="mb-10 font-medium">첫 방문을 환영합니다!</p>
      {/* NOTE - 폼 넣을 곳 */}
      <input
        type="text"
        placeholder="폼 들어갈 곳"
        className="w-full bg-black"
      />
      <p className="mt-6">
        이미 가입하셨나요?{' '}
        <Link href="/signin" className="text-violet-primary underline">
          로그인하기
        </Link>
      </p>
    </div>
  );
}
