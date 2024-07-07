'use client';

import { signUpSchema } from '@/lib/schemas/auth';
import { SignUpInput } from '@/types/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import InputField from '../../components/input-field';
import signUp from '../signup/actions';
import SignModal from './auth-modal';
import PasswordInputField from './password-input-field';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpInput>({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange',
  });

  const router = useRouter();

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmationShown, setPasswordConfirmationShown] =
    useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isSignUpSuccess, setIsSignUpSuccess] = useState(false);

  const onSubmit: SubmitHandler<SignUpInput> = async (data) => {
    const { email, nickname, password } = data;
    const resData = await signUp(email, nickname, password);

    setModalOpen(true);
    if (resData.message) {
      setMessage(resData.message);
      setIsSignUpSuccess(false);
    } else {
      setMessage('가입이 완료되었습니다!');
      setIsSignUpSuccess(true);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const togglePasswordConfirmationVisibility = () => {
    setPasswordConfirmationShown(!passwordConfirmationShown);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (isSignUpSuccess) {
      router.push('/login');
    }
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
        className="mt-5 rounded-lg bg-primary py-4 text-primary-foreground transition-transform duration-500 ease-in-out hover:scale-105 hover:bg-accent disabled:cursor-not-allowed disabled:bg-secondary-foreground disabled:text-primary"
        disabled={!isValid}
      >
        회원가입
      </button>
      {modalOpen && (
        <SignModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          message={message}
        />
      )}
    </form>
  );
}
