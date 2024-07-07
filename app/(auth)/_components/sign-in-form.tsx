'use client';

import { loginSchema } from '@/lib/schemas/auth';
import { SignInInput } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import InputField from '../../components/input-field';
import signIn from '../login/actions';
import SignModal from './auth-modal';
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

  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  const onSubmit: SubmitHandler<SignInInput> = async (data) => {
    const { email, password } = data;
    const resData = await signIn(email, password);
    if (!resData.success) {
      setModalOpen(true);
      setErrorMessage(resData.data.message);
    } else {
      router.push(resData.redirect as string);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
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
        className="mt-5 rounded-lg bg-primary py-4 text-primary-foreground transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-accent disabled:cursor-not-allowed disabled:bg-secondary-foreground disabled:text-primary"
        disabled={!isValid}
      >
        로그인
      </button>
      {modalOpen && (
        <SignModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          message={errorMessage}
        />
      )}
    </form>
  );
}
