'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';

interface ButtonProps {
  variant:
    | 'mobile351x50'
    | 'mobile138x42'
    | 'mobile84x28'
    | 'mobile52x28'
    | 'mobile284x52'
    | 'mobile235x42'
    | 'mobile109x28';
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  href?: string;
}

export default function Button({
  variant,
  children,
  className,
  onClick,
  type,
  disabled = false,
  href = '#',
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center';
  // NOTE - 모바일기준으로 가로 세로 픽셀입니다.
  const sizeClasses = {
    mobile351x50: 'w-[351px] h-[50px] md:w-[520px] md:h-[50px]',
    mobile138x42: 'w-[138px] h-[42px] md:w-[120px] md:h-[48px]',
    mobile84x28: 'w-[84px] h-[28px] md:h-[32px]',
    mobile52x28: 'w-[52px] h-[28px] md:w-[84px] md:h-[32px]',
    mobile284x52: 'w-[284px] h-[52px] md:w-[320px] md:h-[62px]',
    mobile235x42: 'w-[235px] h-[42px] md:w-[280px] md:h-[50px]',
    mobile109x28:
      'w-[109px] h-[28px] md:w-[72px] md:h-[30px] xl:w-[84px] xl:h-[32px]',
  };

  if (variant === 'mobile235x42') {
    return (
      <div className={`${baseClasses} ${sizeClasses[variant]} ${className}`}>
        <Link href={href}>{children}</Link>
      </div>
    );
  }

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${baseClasses} ${sizeClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
