'use client';

import Button from '@/app/components/button';
import ColorList from '@/app/components/color-list';
import ColorPicker from '@/app/components/color-picker';
import Modal from '@/app/components/modal';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Postdashboard from '../postActions';

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
  const router = useRouter();

  const handleCreateDashboard = async () => {
    try {
      if (!dashboardName || !selectedColor) return;
      const createdDashboard = await Postdashboard(
        dashboardName,
        selectedColor
      );
      router.push(`/dashboard/${createdDashboard.id}`);
      onClose();
    } catch (error: any) {
      console.error('대시보드 생성 오류:', error.message);
    }
  };

  const handleColorChange = (color: any) => {
    setSelectedColor(color);
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
        <div className="ml-[261px] mt-[10px] text-sm md:ml-[270px]">
          <p>색상 선택</p>
        </div>
        <ColorList
          className="ml-[20px] mt-[5px] flex md:ml-[28px] md:mt-[8px]"
          register={(color: string) => setSelectedColor(color)}
        />
        <div className="ml-[273px] mt-[5px] md:ml-[280px] md:mt-[8px]">
          <ColorPicker value={selectedColor} onChange={handleColorChange} />
        </div>
        <div className="mt-[18px] flex justify-center md:mt-[15px] md:justify-end">
          <Button
            variant="mobile138x42"
            onClick={onClose}
            className="rounded-lg border border-solid border-gray-300 bg-white text-black"
          >
            취소
          </Button>
          <Button
            variant="mobile138x42"
            type="submit"
            className={`ml-[12px] rounded-lg bg-primary text-white md:mr-[28px] ${dashboardName && selectedColor ? 'cursor-default' : 'cursor-not-allowed'}`}
            disabled={!dashboardName || !selectedColor}
          >
            생성
          </Button>
        </div>
      </form>
    </Modal>
  );
}
