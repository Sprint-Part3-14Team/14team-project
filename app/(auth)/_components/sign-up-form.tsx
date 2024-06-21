'use client';

import visibilityIcon from '@/public/icons/icon_visibility.png';
import Image from 'next/image';
import { useState } from 'react';
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
    // NOTE - 로직 추가 시 구현
    // formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmationShown, setPasswordConfirmationShown] =
    useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePasswordConfirmationVisibility = () => {
    setPasswordConfirmationShown(!passwordConfirmationShown);
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
      <div className="mb-4 flex flex-col gap-y-2">
        <label htmlFor="nickname">닉네임</label>
        <input
          {...register('nickname')}
          type="nickname"
          placeholder="닉네임을 입력해 주세요"
          id="nickname"
          className="h-[50px] rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
        />
      </div>
      <div className="relative mb-4 flex flex-col gap-y-2">
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
      <div className="relative mb-6 flex flex-col gap-y-2">
        <label htmlFor="passwordConfirmation">비밀번호 확인</label>
        <input
          {...register('passwordConfirmation')}
          type={passwordConfirmationShown ? 'text' : 'password'}
          placeholder="비밀번호를 입력해 주세요"
          id="passwordConfirmation"
          className="h-[50px] rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
        />
        <button
          className="absolute bottom-[25px] right-4 translate-y-1/2 cursor-pointer"
          onClick={togglePasswordConfirmationVisibility}
          type="button"
        >
          <Image
            src={visibilityIcon}
            alt="password confirmation visibility icon"
            width={24}
            height={24}
          />
        </button>
      </div>
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
