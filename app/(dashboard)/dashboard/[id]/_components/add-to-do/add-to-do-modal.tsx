'use client';

import Modal from '@/app/components/modal';

interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AddToDoModal({ isOpen, onClose }: AddToDoModalProps) {
  if (!isOpen) return null;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="h-[70vh] w-[327px] md:w-[506px]"
    >
      <h2>할 일 생성</h2>
    </Modal>
  );
}
