'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';

interface ButtonProps {
  variant:
    | 'loginSignup'
    | 'dashboardFirst'
    | 'dashboardSecond'
    | 'dashboardThird'
    | 'dashboardDelete'
    | 'landingLogin'
    | 'inviteModal';
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  href?: string;
}

export default function Buttons({
  variant,
  children,
  className,
  onClick,
  type,
  disabled = false,
  href = '#',
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg';

  const sizeClasses = {
    loginSignup: 'w-[351px] h-[50px] md:w-[520px] md:h-[50px]',
    dashboardFirst: 'w-[138px] h-[42px] md:w-[120px] md:h-[48px]',
    dashboardSecond: 'w-[84px] h-[28px] md:h-[32px]',
    dashboardThird: 'w-[52px] h-[28px] md:w-[84px] md:h-[32px]',
    dashboardDelete: 'w-[284px] h-[52px] md:w-[320px] md:h-[62px]',
    landingLogin: 'w-[235px] h-[42px] md:w-[280px] md:h-[50px]',
    inviteModal: 'w-[120px] h-[48px]',
  };

  if (variant === 'landingLogin') {
    return (
      <Link href={href}>
        <a
          className={`${baseClasses} ${sizeClasses[variant]} ${className}`}
          href={href}
        >
          {children}
        </a>
      </Link>
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

Buttons.defaultProps = {
  onClick: () => {},
  className: '',
  type: 'button',
  disabled: false,
  href: '#',
};
