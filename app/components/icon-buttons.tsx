'use client';

import addBoardIcon from '@/public/icons/add_dashboard.svg';
import addInviteIcon from '@/public/icons/add_invite.svg';
import settingIcon from '@/public/icons/setting_icon.svg';
import Image from 'next/image';
import React from 'react';

interface IconButtonsProps {
  variant: 'setting' | 'dashboard' | 'invite';
  onClick?: () => void;
  className?: string;
}

export default function IconButtons({
  variant,
  onClick,
  className,
}: IconButtonsProps) {
  let buttonClasses = 'icon-button';
  let iconStyles = '';
  let textStyles = '';

  if (variant === 'invite') {
    buttonClasses =
      'w-[86px] h-[28px] md:w-[105px] md:h-[32px] rounded bg-primary border';
    iconStyles = 'mt-0 ml-2 md:mt-0 md:ml-3.5';
    textStyles =
      'text-xs text-primary font-medium mt-0 ml-2 md:text-sm md:ml-2.5 xl:ml-3';
  }

  buttonClasses += ` ${className}`;

  return (
    <button type="button" className={buttonClasses} onClick={onClick}>
      {variant === 'setting' && (
        <div className="relative flex h-full w-full items-center">
          <Image
            src={settingIcon}
            alt="Setting Icon"
            objectFit="contain"
            quality={100}
            className={iconStyles}
            width={20}
            height={20}
          />
        </div>
      )}

      {variant === 'dashboard' && (
        <div className="relative flex h-full w-full items-center">
          <Image
            src={addBoardIcon}
            alt="addBoard Icon"
            objectFit="contain"
            quality={100}
            className={iconStyles}
            width={20}
            height={20}
          />
        </div>
      )}

      {variant === 'invite' && (
        <div className="relative flex h-full w-full items-center">
          <Image
            src={addInviteIcon}
            alt="addInvite Icon"
            objectFit="contain"
            quality={100}
            className={iconStyles}
            width={16}
            height={16}
          />
          <span className={textStyles}>초대하기</span>
        </div>
      )}
    </button>
  );
}
