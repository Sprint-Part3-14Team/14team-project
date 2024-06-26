'use client';

import Modal from '@/app/components/modals';
import React from 'react';

interface SignModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: 'signupComplete' | 'passwordError' | 'emailDuplicate';
}

export default function SignModal({
  isOpen,
  onClose,
  variant,
}: SignModalProps) {
  if (!isOpen) return null;

  const getMessage = () => {
    switch (variant) {
      case 'signupComplete':
        return '가입이 완료되었습니다!';
      case 'passwordError':
        return '비밀번호가 일치하지 않습니다.';
      case 'emailDuplicate':
        return '이미 사용 중인 이메일입니다.';
      default:
        return '';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="relative flex h-[220px] w-[327px] flex-col items-center justify-center md:h-[250px] md:w-[540px]"
    >
      <h2 className="text-center text-base md:text-lg">{getMessage()}</h2>
      <div className="absolute bottom-7 right-24 md:right-7">
        <button
          onClick={onClose}
          type="button"
          className="h-[42px] w-[138px] rounded-md bg-violet-primary text-base text-white md:h-[48px] md:w-[120px]"
        >
          확인
        </button>
      </div>
    </Modal>
  );
}
