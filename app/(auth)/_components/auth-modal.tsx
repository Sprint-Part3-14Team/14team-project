'use client';

import Button from '@/app/components/button';
import Modal from '@/app/components/modal';
import React from 'react';

interface SignModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export default function SignModal({
  isOpen,
  onClose,
  message,
}: SignModalProps) {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="relative flex h-[220px] w-[327px] flex-col items-center justify-center md:h-[250px] md:w-[540px]"
    >
      <h2 className="text-center text-base md:text-lg">{message}</h2>
      <div className="absolute bottom-7 right-24 md:right-7">
        <Button
          onClick={onClose}
          variant="mobile138x42"
          className="rounded-lg bg-primary text-sm text-white md:text-base"
        >
          확인
        </Button>
      </div>
    </Modal>
  );
}
