'use client';

import Buttons from '@/app/components/button';
import ColorList from '@/app/components/color-list';
import Modal from '@/app/components/modal';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NewDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewDashboardModal({
  isOpen,
  onClose,
}: NewDashboardModalProps) {
  const [dashboardName, setDashboardName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const tokenCookie = document.cookie
      .split(';')
      .find((cookie) => cookie.trim().startsWith('token='));
    const tokenValue = tokenCookie ? tokenCookie.split('=')[1] : null;
    setToken(tokenValue);
  }, []);

  const handleCreateDashboard = async () => {
    try {
      if (!dashboardName || !selectedColor) return;
      const res = await fetch(`${TEAM_BASE_URL}/dashboards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ title: dashboardName, color: selectedColor }),
      });

      if (!res.ok) {
        throw new Error('대시보드 생성 실패');
      }

      const createdDashboard = await res.json();
      router.push(`/dashboard/${createdDashboard.id}`);
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
      className="h-[293px] w-[327px] md:h-[334px] md:w-[540px]"
    >
      <h2 className="ml-[20px] mt-[28px] text-xl font-bold md:ml-[28px] md:mt-[32px] md:text-2xl">
        새로운 대시보드
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateDashboard();
        }}
      >
        <label
          htmlFor="dashboardName"
          className="ml-[20px] mt-[24px] block text-base font-medium text-gray-700 md:ml-[28px] md:mt-[32px] md:text-lg"
        >
          대시보드 이름
        </label>
        <div className="flex items-center justify-center">
          <input
            id="title"
            type="text"
            placeholder="대시보드 이름"
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
            className="mt-[10px] flex h-[42px] w-[287px] rounded-md border border-gray-300 pl-[16px] text-sm font-normal text-gray-700 md:h-[48px] md:w-[484px] md:text-base"
          />
        </div>
        <ColorList
          className="ml-[20px] mt-[24px] flex md:ml-[28px] md:mt-[28px]"
          register={(color: string) => setSelectedColor(color)}
        />
        <div className="mt-[76px] flex justify-center md:mt-[86px] md:justify-end">
          <Buttons
            variant="mobile138x42"
            onClick={onClose}
            className="rounded-lg border border-solid border-gray-300 bg-white text-black"
          >
            취소
          </Buttons>
          <Buttons
            variant="mobile138x42"
            type="submit"
            className={`ml-[12px] rounded-lg bg-violet-primary text-white md:mr-[28px] ${dashboardName && selectedColor ? 'cursor-default' : 'cursor-not-allowed'}`}
            disabled={!dashboardName || !selectedColor}
          >
            생성
          </Buttons>
        </div>
      </form>
    </Modal>
  );
}
