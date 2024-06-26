import React from 'react';

import Button from './button';
import Modal from './modal';

interface SingleInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  title: string;
  labelText: string;
  buttonText: string;
  inputId: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
}

export default function SingleInputModal({
  isOpen,
  onClose,
  onDelete,
  title,
  labelText,
  buttonText,
  inputId,
  inputValue,
  setInputValue,
  onSubmit,
  placeholder,
}: SingleInputModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-[327px] md:w-[540px]">
      <h2 className="ml-[20px] mt-[28px] text-xl font-bold md:ml-[28px] md:mt-[32px] md:text-2xl">
        {title}
      </h2>
      <form onSubmit={onSubmit}>
        <label
          htmlFor={inputId}
          className="ml-[20px] mt-[24px] block text-base font-medium text-gray-700 md:ml-[28px] md:mt-[32px] md:text-lg"
        >
          {labelText}
        </label>
        <div className="flex items-center justify-center">
          <input
            id={inputId}
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={(e) => setInputValue(e.target.value)}
            className="mt-[10px] flex h-[42px] w-[287px] rounded-md border border-gray-300 pl-[16px] text-sm font-normal text-gray-700 md:h-[48px] md:w-[484px] md:text-base"
          />
        </div>
        <div className="flex flex-col md:flex-row">
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="mb-[16px] ml-[20px] mt-[24px] flex justify-start text-sm font-normal text-gray-400 underline md:ml-[28px] md:mt-[59px]"
            >
              삭제하기
            </button>
          )}
          <div
            className={`${onDelete ? 'md:ml-[183px] md:mt-[28px]' : 'mt-[24px] md:ml-[260px]'} mb-[28px] flex justify-center`}
          >
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
              className="ml-[12px] rounded-lg bg-violet-primary text-white"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
