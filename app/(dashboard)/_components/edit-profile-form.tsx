'use client';

import Button from '@/app/components/button';
import ImageInputField from '@/app/components/image-input-field';
import InputField from '@/app/components/input-field';
import { editProfileSchema } from '@/lib/schemas/profileUpdate';
import { EditProfile } from '@/types/profileUpdate';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { editProfile } from '../mypage/actions';

export default function EditProfileForm() {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<EditProfile>({
    resolver: yupResolver(editProfileSchema),
    mode: 'onChange',
  });

  const profileImageUrlInput = watch('profileImageUrl');
  const nicknameInput = watch('nickname');

  const isFormValid =
    isValid && (profileImageUrlInput !== null || nicknameInput !== '');

  const onSubmit: SubmitHandler<EditProfile> = async (data) => {
    const { profileImageUrl, nickname } = data;

    const formData = new FormData();
    formData.append('image', profileImageUrl!);

    const res = await editProfile(formData, nickname);
    // NOTE - 오류 메시지 출력
    console.log(res);
  };

  return (
    <div className="mt-6 rounded-lg bg-white p-5">
      <p className="text-xl font-bold md:text-2xl">프로필</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 md:mt-8">
        <ImageInputField id="profileImageUrl" setValue={setValue} />
        <InputField
          id="email"
          label="이메일"
          type="email"
          placeholder="현재 이메일"
          register={register}
          disabled
        />
        <InputField
          id="nickname"
          label="닉네임"
          type="text"
          placeholder="새 닉네임 입력"
          register={register}
          error={errors.nickname?.message || ''}
        />
        <Button
          type="submit"
          variant="mobile84x28"
          className="ml-auto mt-4 rounded bg-violet-primary text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={!isFormValid}
        >
          저장
        </Button>
      </form>
    </div>
  );
}
