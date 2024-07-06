import Button from '@/app/components/button';
import Modal from '@/app/components/modal';
import React from 'react';

interface WarnimgModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function WarnimgModal({
  isOpen,
  onClose,
  onDelete,
}: WarnimgModalProps) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="z-50 w-[327px] md:w-[540px]"
    >
      <h2 className="mt-[81px] text-center text-base font-medium md:mt-[108px]">
        칼럼의 모든 카드가 삭제됩니다.
      </h2>
      <div className="mb-[28px] mt-[50px] flex justify-center md:ml-[260px] md:mt-[45px]">
        <Button
          variant="mobile138x42"
          onClick={onClose}
          className="rounded-lg border border-solid border-gray-700 bg-background text-black"
        >
          취소
        </Button>
        <Button
          variant="mobile138x42"
          type="submit"
          onClick={onDelete}
          className="ml-[12px] rounded-lg bg-primary text-primary"
        >
          삭제
        </Button>
      </div>
    </Modal>
  );
}
