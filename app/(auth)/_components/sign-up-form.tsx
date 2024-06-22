'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import signUp from '../signup/actions';
import InputField from './input-field';
import PasswordInputField from './password-input-field';

interface Inputs {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
  terms: boolean;
}

// TODO : schema 분리 필요 어디에 두어야 하는가?
const schema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식으로 작성해 주세요.')
    .required('이메일을 입력해 주세요.'),
  nickname: yup.string().required('닉네임을 입력해 주세요.'),
  password: yup
    .string()
    .min(8, '8자 이상 입력해 주세요.')
    .required('비밀번호를 입력해 주세요.'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 입력해 주세요.'),
  terms: yup
    .boolean()
    .oneOf([true], '이용약관에 동의해 주세요.')
    .required('이용약관에 동의해 주세요.'),
});

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { email, nickname, password } = data;
    await signUp(email, nickname, password);
  };

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
        error={errors.email?.message || ''}
      />
      <InputField
        id="nickname"
        label="닉네임"
        type="text"
        placeholder="닉네임을 입력해 주세요"
        register={register}
        error={errors.nickname?.message || ''}
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
      <PasswordInputField
        id="passwordConfirmation"
        label="비밀번호 확인"
        placeholder="비밀번호를 입력해 주세요"
        register={register}
        passwordShown={passwordConfirmationShown}
        togglePasswordVisibility={togglePasswordConfirmationVisibility}
        error={errors.passwordConfirmation?.message || ''}
      />
      <div className="flex items-center gap-x-2">
        <input
          {...register('terms')}
          type="checkbox"
          id="terms"
          className="size-5"
        />
        <label htmlFor="terms">이용약관에 동의합니다.</label>
        {errors.terms && <p className="text-red-500">{errors.terms.message}</p>}
      </div>
      <button
        type="submit"
        className="mt-5 rounded-lg bg-violet-primary py-4 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
        disabled={!isValid}
      >
        회원가입
      </button>
    </form>
  );
}
