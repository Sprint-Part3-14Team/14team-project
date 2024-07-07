'use client';

import ColorList from '@/app/components/color-list';
import { Dashboard } from '@/types/dashboard';
import { SubmitHandler, useForm } from 'react-hook-form';

import putDashboardInfo from '../../actions';

interface DashboardChangeFormProps {
  dashboardId: number;
  dashboardTitle: string;
  dashboardColor: string;
}

export default function DashboardChangeForm({
  dashboardId,
  dashboardTitle,
  dashboardColor,
}: DashboardChangeFormProps) {
  const { register, handleSubmit, setValue } = useForm<Dashboard>({
    defaultValues: {
      title: dashboardTitle,
      color: dashboardColor,
    },
  });

  const changeDashboardInfo: SubmitHandler<Dashboard> = async (data) => {
    const { title, color } = data;
    await putDashboardInfo(title, color, dashboardId);
  };

  const handleColorChange = (color: string) => {
    setValue('color', color);
  };

  return (
    <div>
      <form className="mt-6" onSubmit={handleSubmit(changeDashboardInfo)}>
        <ColorList
          setValue={setValue}
          onColorChange={handleColorChange}
          className="right-7 top-11"
          register={register}
        />
        <label htmlFor="title">대시보드 이름</label>
        <input
          {...register('title')}
          type="text"
          placeholder="변경할 이름을 입력해주세요"
          id="title"
          className="mb-4 mt-3 h-[42px] w-full rounded-lg border border-gray-700 py-3 pl-4 placeholder:text-gray-400"
        />
        <div className="text-right">
          <button
            type="submit"
            className="h-7 w-[84px] rounded bg-primary text-xs text-primary-foreground hover:bg-accent"
          >
            변경
          </button>
        </div>
      </form>
    </div>
  );
}
