'use client';

import forwardArrowBlack from '@/public/icons/arrow_forward_black.svg';
import forwardArrowGray from '@/public/icons/arrow_forward_gray.svg';
import nextArrowBlack from '@/public/icons/arrow_next_black.svg';
import nextArrowGray from '@/public/icons/arrow_next_gray.svg';
import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface PageButtonProps {
  goToForward: MouseEventHandler;
  goToNext: MouseEventHandler;
  currentPage: number;
  totalPage: number;
}

export default function PageButton({
  goToForward,
  goToNext,
  currentPage,
  totalPage,
}: PageButtonProps) {
  const buttonStyle = 'border border-solid border-gray-300 bg-white p-3';

  return (
    <>
      <button
        className={`${buttonStyle} rounded-l`}
        type="button"
        onClick={goToForward}
        disabled={currentPage === 1}
      >
        {currentPage === 1 ? (
          <Image
            width={16}
            height={16}
            src={forwardArrowGray}
            alt="왼쪽을 향하는 꺽쇠 화살표"
          />
        ) : (
          <Image
            width={16}
            height={16}
            src={forwardArrowBlack}
            alt="왼쪽을 향하는 꺽쇠 화살표"
          />
        )}
      </button>
      <button
        className={`${buttonStyle} rounded-r`}
        type="button"
        onClick={goToNext}
        disabled={totalPage === currentPage}
      >
        {totalPage === currentPage ? (
          <Image
            width={16}
            height={16}
            src={nextArrowGray}
            alt="오른쪽을 향하는 꺽쇠 화살표"
          />
        ) : (
          <Image
            width={16}
            height={16}
            src={nextArrowBlack}
            alt="오른쪽을 향하는 꺽쇠 화살표"
          />
        )}
      </button>
    </>
  );
}
