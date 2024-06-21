'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import InputField from './input-field';
import PasswordInputField from './password-input-field';

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
      <InputField
        id="email"
        label="이메일"
        type="email"
        placeholder="이메일을 입력해 주세요"
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
      <button
        type="submit"
        className="mt-5 rounded-lg bg-violet-primary py-4 text-white"
      >
        로그인
      </button>
    </form>
  );
}
