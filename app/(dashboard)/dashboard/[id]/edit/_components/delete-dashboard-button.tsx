'use client';

import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

interface DeleteDashboardButtonProps {
  dashboardId: number | string;
}

export default function DeleteDashboardButton({
  dashboardId,
}: DeleteDashboardButtonProps) {
  const token = getCookie('token');
  const url = `${TEAM_BASE_URL}/dashboards/${dashboardId}`;
  const router = useRouter();

  const deleteHandler = async () => {
    if (window.confirm('삭제 하시겠습니까??')) {
      await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push('/mydashboard');
    }
  };

  return (
    <button
      type="button"
      onClick={deleteHandler}
      className="my-6 h-[52px] w-[284px] rounded-lg border border-gray-300 md:my-8 md:h-[62px] md:w-80"
    >
      대시보드 삭제하기
    </button>
  );
}
