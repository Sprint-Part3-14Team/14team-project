'use client';

import { useState } from 'react';

import AddToDoModal from './add-to-do-modal';

interface AddToDoButtonProps {
  columnId: number;
}

export default function AddToDoButton({ columnId }: AddToDoButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button type="button" className="w-full" onClick={handleOpenModal}>
        <div className="mt-[17px] flex justify-center rounded-md border border-gray-300 bg-white py-[6px] xl:mt-0">
          <p className="flex size-5 items-center justify-center rounded bg-violet-secondary text-lg font-medium text-violet-primary md:size-[22px]">
            +
          </p>
        </div>
      </button>
      <AddToDoModal
        columnIdProp={columnId}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
