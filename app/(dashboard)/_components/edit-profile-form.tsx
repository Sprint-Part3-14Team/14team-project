'use client';

import Button from '@/app/components/button';
import ImageInputField from '@/app/components/image-input-field';
import InputField from '@/app/components/input-field';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { editProfileSchema } from '@/lib/schemas/profileUpdate';
import { EditProfile } from '@/types/profileUpdate';
import { User } from '@/types/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { editProfile } from '../mypage/actions';

export default function EditProfileForm() {
  const {
    register,
    setValue,
    handleSubmit,
    unregister,
    formState: { errors },
  } = useForm<EditProfile>({
    resolver: yupResolver(editProfileSchema),
    mode: 'onChange',
  });

  const token = getCookie('token');
  const [user, setUser] = useState<User | null>(null);

  const onSubmit: SubmitHandler<EditProfile> = async (data) => {
    const { profileImageUrl, nickname } = data;

    const formData = new FormData();

    if (profileImageUrl) {
      formData.append('image', profileImageUrl);
    } else {
      formData.append('image', 'null');
    }

    const res = await editProfile(formData, nickname);
    // NOTE - 성공 메시지 출력
    toast.success(res.message);
  };

  useEffect(() => {
    async function fetchUserMe() {
      const res = await fetch(`${TEAM_BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUser(data);
    }
    fetchUserMe();
  }, [token]);

  return (
    <div className="mt-6 rounded-lg bg-white p-5">
      <p className="text-xl font-bold md:text-2xl">프로필</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex w-full flex-col md:mt-8 md:flex-row md:gap-x-4"
      >
        <ImageInputField
          id="profileImageUrl"
          setValue={setValue}
          imageUrlValue={user?.profileImageUrl}
          unregister={unregister}
        />
        <div className="flex w-full flex-col">
          <InputField
            id="email"
            label="이메일"
            type="email"
            placeholder={user?.email || ''}
            register={register}
            disabled
          />
          <InputField
            id="nickname"
            label="닉네임"
            type="text"
            placeholder={user?.nickname || ''}
            register={register}
            error={errors.nickname?.message || ''}
          />
          <Button
            type="submit"
            variant="mobile84x28"
            className="ml-auto mt-4 rounded bg-violet-primary text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            저장
          </Button>
        </div>
      </form>
    </div>
  );
}
