'use client';

import { User } from '@/types/user';
import { useState } from 'react';

import ProfileImage from '../profile/profile-image';
import TaskOption from '../task-option';

export default function NavbarProfile({ user }: { user: User }) {
  const [isProfileOptionOpen, setIsProfileOptionOpen] = useState(false);

  const handleProfileOption = () => {
    setIsProfileOptionOpen(!isProfileOptionOpen);
  };

  return (
    // eslint-disable-next-line
    <div
      className="relative flex cursor-pointer items-center gap-3 text-base font-medium"
      onClick={handleProfileOption}
    >
      <ProfileImage
        nickname={user.nickname}
        profileImageUrl={user.profileImageUrl}
        id={user.id}
        size="34px"
      />
      <p className="hidden text-gray-700 md:block">{user.nickname}</p>
      {isProfileOptionOpen && (
        <TaskOption>
          <li className="flex h-[30px] w-full items-center justify-center rounded-md text-xs hover:bg-violet-primary/10 md:h-[32px] md:text-sm">
            마이 페이지
          </li>
          <li className="flex h-[30px] w-full items-center justify-center rounded-md text-xs hover:bg-violet-primary/10 md:h-[32px] md:text-sm">
            로그아웃
          </li>
        </TaskOption>
      )}
    </div>
  );
}
