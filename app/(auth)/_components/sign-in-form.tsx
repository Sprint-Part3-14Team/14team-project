'use client';

import { loginSchema } from '@/lib/schemas/auth';
import { SignInInput } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import InputField from '../../components/input-field';
import signIn from '../login/actions';
import PasswordInputField from './password-input-field';

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInInput>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    const { email, password } = data;
    await signIn(email, password);
  };

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
        error={errors.email?.message || ''}
      />
      <PasswordInputField
        id="password"
        label="비밀번호"
        placeholder="비밀번호를 입력해 주세요"
        register={register}
        passwordShown={passwordShown}
        togglePasswordVisibility={togglePasswordVisibility}
        error={errors.password?.message || ''}
      />
      <button
        type="submit"
        className="mt-5 rounded-lg bg-violet-primary py-4 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={!isValid}
      >
        로그인
      </button>
    </form>
  );
}
