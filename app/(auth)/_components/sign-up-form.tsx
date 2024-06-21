'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import InputField from './input-field';
import PasswordInputField from './password-input-field';

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
      <InputField
        id="email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해 주세요"
        register={register}
      />
      <InputField
        id="nickname"
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해 주세요"
        register={register}
      />
      <PasswordInputField
        id="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해 주세요"
        register={register}
        passwordShown={passwordShown}
        togglePasswordVisibility={togglePasswordVisibility}
      />
      <PasswordInputField
        id="passwordConfirmation"
        label="비밀번호 확인"
        placeholder="비밀번호를 입력해 주세요"
        register={register}
        passwordShown={passwordConfirmationShown}
        togglePasswordVisibility={togglePasswordConfirmationVisibility}
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
        회원가입
      </button>
    </form>
  );
}
