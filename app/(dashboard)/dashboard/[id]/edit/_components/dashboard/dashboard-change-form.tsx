'use client';

import { Dashboard } from '@/types/dashboard';
import { SubmitHandler, useForm } from 'react-hook-form';

import changeDashboardAction from '../../actions';
import ColorList from './color-list';

export default function DashboardChangeForm({
  dashboardId,
}: {
  dashboardId: number;
}) {
  const { register, handleSubmit } = useForm<Dashboard>();

  const changeDashboardInfo: SubmitHandler<Dashboard> = async (data) => {
    const { title, color } = data;
    const res = await changeDashboardAction(title, color, dashboardId);
    console.log(res);
  };

  return (
    <div>
      <form className="mt-6" onSubmit={handleSubmit(changeDashboardInfo)}>
        <ColorList className="right-7 top-6" register={register} />
        <label htmlFor="title">대시보드 이름</label>
        <input
          {...register('title')}
          type="text"
          placeholder="변경할 이름을 입력해주세요"
          id="title"
          className="mb-4 mt-3 h-[42px] w-full rounded-lg border border-gray-300 py-3 pl-4 placeholder:text-gray-400"
        />
        <div className="text-right">
          <button
            type="submit"
            className="h-7 w-[84px] rounded bg-violet-primary text-xs text-white"
          >
            변경
          </button>
        </div>
      </form>
    </div>
  );
}
