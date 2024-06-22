'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import signIn from '../signin/actions';
import InputField from './input-field';
import PasswordInputField from './password-input-field';

interface Inputs {
  email: string;
  password: string;
}

// TODO : schema 분리 필요 어디에 두어야 하는가?
const schema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식으로 작성해 주세요.')
    .required('이메일을 입력해 주세요.'),
  password: yup
    .string()
    .min(8, '8자 이상 입력해 주세요.')
    .required('비밀번호를 입력해 주세요.'),
});

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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
