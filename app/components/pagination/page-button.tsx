'use client';

import forwardArrow from '@/public/icons/arrow_forward_gray.svg';
import nextArrow from '@/public/icons/arrow_next.svg';
import Image from 'next/image';
import { MouseEventHandler } from 'react';

interface PageButtonProps {
  goToForward: MouseEventHandler;
  goToNext: MouseEventHandler;
}

export default function PageButton({ goToForward, goToNext }: PageButtonProps) {
  const buttonStyle = 'border border-solid border-gray-300 bg-white p-3';

  return (
    <div>
      <button
        className={`${buttonStyle} rounded-l`}
        type="button"
        onClick={goToForward}
      >
        <Image
          width={16}
          height={16}
          src={forwardArrow}
          alt="왼쪽을 향하는 꺽쇠 화살표"
        />
      </button>
      <button
        className={`${buttonStyle} rounded-r`}
        type="button"
        onClick={goToNext}
      >
        <Image
          width={16}
          height={16}
          src={nextArrow}
          alt="오른쪽을 향하는 꺽쇠 화살표"
        />
      </button>
    </div>
  );
}
