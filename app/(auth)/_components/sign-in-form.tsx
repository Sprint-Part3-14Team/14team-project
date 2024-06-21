'use client';

import visibilityIcon from '@/public/icons/icon_visibility.png';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Inputs {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    // NOTE - 로직 추가 시 구현
    // formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
      <div className="mb-4 flex flex-col gap-y-2">
        <label htmlFor="email">이메일</label>
        <input
          {...register('email')}
          type="email"
          placeholder="이메일을 입력해 주세요"
          id="email"
          className="h-[50px] rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
        />
      </div>
      <div className="relative mb-5 flex flex-col gap-y-2">
        <label htmlFor="password">비밀번호</label>
        <input
          {...register('password')}
          type={passwordShown ? 'text' : 'password'}
          placeholder="비밀번호를 입력해 주세요"
          id="password"
          className="h-[50px] rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
        />
        <button
          className="absolute bottom-[25px] right-4 translate-y-1/2 cursor-pointer"
          onClick={togglePasswordVisibility}
          type="button"
        >
          <Image
            src={visibilityIcon}
            alt="password visibility icon"
            width={24}
            height={24}
          />
        </button>
      </div>
      <button
        type="submit"
        className="rounded-lg bg-violet-primary py-4 text-white"
      >
        로그인
      </button>
    </form>
  );
}
