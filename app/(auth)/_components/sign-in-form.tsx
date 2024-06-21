'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
      <label htmlFor="email">이메일</label>
      <input
        {...register('email')}
        type="email"
        placeholder="이메일을 입력해 주세요"
        id="email"
        className="mb-4 mt-2 h-[50px] rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
      />
      <label htmlFor="password">비밀번호</label>
      <input
        {...register('password')}
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        id="password"
        className="mb-5 mt-2 h-[50px] rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
      />
      <button
        type="submit"
        className="rounded-lg bg-violet-primary py-4 text-white"
      >
        로그인
      </button>
    </form>
  );
}
