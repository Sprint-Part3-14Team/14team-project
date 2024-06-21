'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
  terms: boolean;
}

export default function SignUpForm() {
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
      <label htmlFor="nickname">닉네임</label>
      <input
        {...register('nickname')}
        type="nickname"
        placeholder="닉네임을 입력해 주세요"
        id="nickname"
        className="mb-4 mt-2 h-[50px] rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
      />
      <label htmlFor="password">비밀번호</label>
      <input
        {...register('password')}
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        id="password"
        className="mb-4 mt-2 h-[50px] rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
      />
      <label htmlFor="passwordConfirmation">비밀번호 확인</label>
      <input
        {...register('passwordConfirmation')}
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        id="passwordConfirmation"
        className="mb-5 mt-2 h-[50px] rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
      />
      <div className="flex items-center gap-x-2">
        <input
          {...register('terms')}
          type="checkbox"
          id="terms"
          className="size-5"
        />
        <label htmlFor="terms">이용약관에 동의합니다.</label>
      </div>
      <button
        type="submit"
        className="mt-5 rounded-lg bg-violet-primary py-4 text-white"
      >
        로그인
      </button>
    </form>
  );
}
