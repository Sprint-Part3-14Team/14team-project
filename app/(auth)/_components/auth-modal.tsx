'use client';

import Button from '@/app/components/button';
import Modal from '@/app/components/modal';
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
        <Button
          onClick={onClose}
          variant="mobile138x42"
          className="bg-violet-primary text-sm text-white md:text-base"
        >
          확인
        </Button>
      </div>
    </Modal>
  );
}
