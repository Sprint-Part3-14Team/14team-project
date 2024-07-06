'use client';

import forwardArrowBlack from '@/public/icons/arrow_forward_black.svg';
import forwardArrowGray from '@/public/icons/arrow_forward_gray.svg';
import nextArrowBlack from '@/public/icons/arrow_next_black.svg';
import nextArrowGray from '@/public/icons/arrow_next_gray.svg';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface PageButtonProps {
  goToForward: MouseEventHandler;
  goToNext: MouseEventHandler;
  currentPage: number;
  totalPage: number;
}

function getForwardArrowSrc(currentPage: number, theme: string) {
  if (currentPage === 1) {
    return theme === 'dark' ? forwardArrowBlack : forwardArrowGray;
  }
  return theme === 'dark' ? forwardArrowGray : forwardArrowBlack;
}

function getNextArrowSrc(
  currentPage: number,
  totalPage: number,
  theme: string
) {
  if (totalPage === currentPage) {
    return theme === 'dark' ? nextArrowBlack : nextArrowGray;
  }
  return theme === 'dark' ? nextArrowGray : nextArrowBlack;
}

export default function PageButton({
  goToForward,
  goToNext,
  currentPage,
  totalPage,
}: PageButtonProps) {
  const { theme } = useTheme();
  const buttonStyle =
    'border border-solid border-gray-600 bg-secondary-foreground p-3';

  return (
    <>
      <button
        className={`${buttonStyle} rounded-l`}
        type="button"
        onClick={goToForward}
        disabled={currentPage === 1}
      >
        <Image
          width={16}
          height={16}
          src={getForwardArrowSrc(currentPage, theme!)}
          alt="왼쪽을 향하는 꺽쇠 화살표"
        />
      </button>
      <button
        className={`${buttonStyle} rounded-r`}
        type="button"
        onClick={goToNext}
        disabled={totalPage === currentPage}
      >
        <Image
          width={16}
          height={16}
          src={getNextArrowSrc(currentPage, totalPage, theme!)}
          alt="오른쪽을 향하는 꺽쇠 화살표"
        />
      </button>
    </>
  );
}
