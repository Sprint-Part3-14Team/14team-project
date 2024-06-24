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

  switch (variant) {
    case 'setting':
      buttonClasses =
        'w-[49px] h-[30px] md:w-[85px] md:h-[36px] xl:w-[88px] xl:h-[40px] rounded-lg bg-white border border-gray-300';
      iconStyles = 'hidden md:block md:mt-0.5 md:ml-3.5';
      textStyles =
        'text-sm text-gray-500 font-medium mt-0 ml-3 md:ml-2.5 xl:text-base xl:ml-3';
      break;

    case 'dashboard':
      buttonClasses =
        'w-[73px] h-[30px] md:w-[109px] md:h-[36px] xl:w-[116px] xl:h-[40px] rounded-lg bg-white border border-gray-300';
      iconStyles = 'hidden md:block md:mt-0 md:ml-3.5';
      textStyles =
        'text-sm text-gray-500 font-medium mt-0 ml-3 md:ml-2.5 xl:text-base xl:ml-3';
      break;

    case 'invite':
      buttonClasses =
        'w-[86px] h-[28px] md:w-[105px] md:h-[32px] rounded-lg bg-violet-primary border';
      iconStyles = 'mt-0 ml-2 md:mt-0 md:ml-3.5';
      textStyles =
        'text-xs text-white font-medium mt-0 ml-2 md:text-sm md:ml-2.5 xl:ml-3';
      break;
    default:
      break;
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
          <span className={textStyles}>관리</span>
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
          <span className={textStyles}>초대하기</span>
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

IconButtons.defaultProps = {
  onClick: () => {},
  className: '',
};
