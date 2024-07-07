'use client';

import Button from '@/app/components/button';
import ColorList from '@/app/components/color-list';
import ColorPicker from '@/app/components/color-picker';
import Modal from '@/app/components/modal';
import { Dashboard } from '@/types/dashboard';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Postdashboard from './actions';

interface NewDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewDashboardModal({
  isOpen,
  onClose,
}: NewDashboardModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isValid, errors },
  } = useForm<Dashboard>({
    mode: 'onChange',
  });
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      reset({ title: '', color: '' });
    }
  }, [isOpen, reset]);

  const handleColorChange = (color: string) => {
    setValue('color', color);
  };

  const createDashboardInfo: SubmitHandler<Dashboard> = async (data) => {
    const { title, color } = data;
    try {
      const createdDashboard = await Postdashboard(title, color);
      router.push(`/dashboard/${createdDashboard.id}`);
      setTimeout(() => {
        window.location.reload();
      }, 400);

      onClose();
    } catch (error: any) {
      console.error('대시보드 생성 오류:', error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="h-[340px] w-[327px] md:h-[375px] md:w-[540px]"
    >
      <h2 className="ml-[20px] mt-[28px] text-xl font-bold md:ml-[28px] md:mt-[32px] md:text-2xl">
        새로운 대시보드
      </h2>
      <form onSubmit={handleSubmit(createDashboardInfo)}>
        <label
          htmlFor="dashboardName"
          className="ml-[20px] mt-[24px] block text-base font-medium md:ml-[28px] md:mt-[32px] md:text-lg"
        >
          대시보드 이름
        </label>
        <div className="flex items-center justify-center">
          <input
            {...register('title', {
              required: true,
              maxLength: {
                value: 10,
                message: '대시보드 이름은 최대 10자입니다.',
              },
            })}
            id="title"
            type="text"
            placeholder="대시보드 이름"
            className="mt-[10px] flex h-[42px] w-[287px] rounded-md border border-gray-700 pl-[16px] text-sm font-normal md:h-[48px] md:w-[484px] md:text-base"
          />
        </div>
        {errors.title && (
          <p className="mt-1 w-full pl-6 text-red-500">
            {errors.title.message}
          </p>
        )}
        <div className="ml-[261px] mt-[10px] text-sm md:ml-[270px]">
          <p>색상 선택</p>
        </div>
        <ColorList
          className="ml-[20px] mt-[5px] flex md:ml-[28px] md:mt-[8px]"
          register={register}
          setValue={setValue}
          onColorChange={handleColorChange}
        />
        <div className="ml-[273px] mt-[5px] md:ml-[280px] md:mt-[8px]">
          <ColorPicker
            register={register}
            setValue={setValue}
            onColorChange={handleColorChange}
          />
        </div>
        <div className="mb-[28px] mt-[18px] flex justify-center md:mt-[15px] md:justify-end">
          <Button
            variant="mobile138x42"
            onClick={onClose}
            className="rounded-lg border border-solid border-gray-700 bg-background text-primary-foreground"
          >
            취소
          </Button>
          <Button
            variant="mobile138x42"
            type="submit"
            className="ml-[12px] rounded-lg bg-primary text-primary-foreground md:mr-[28px]"
            disabled={!isValid}
          >
            생성
          </Button>
        </div>
      </form>
    </Modal>
  );
}
