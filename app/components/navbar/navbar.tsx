import logoSmall from '@/public/images/logo_small.svg';
import textLogo from '@/public/images/text_logo.svg';
import Image from 'next/image';
import Link from 'next/link';

import ProfileImage from '../profile/profile-image';

export default function Navbar() {
  // NOTE - 테스트 유저 정보
  const nickname = '김서영';
  const profileImageUrl = null;
  const id = 3950;

  return (
    <header className="sticky top-0 z-10 h-[60px] border-b border-gray-300 bg-white md:h-[70px]">
      <div className="flex items-center justify-between px-3 py-[13px] md:px-10 md:py-4">
        <Link href="/mydashboard">
          <div className="flex items-center">
            <div className="relative h-[34px] w-[29px]">
              <Image src={logoSmall} fill alt="테스키파이 로고" />
            </div>
            <div className="relative h-[22px] w-20">
              <Image src={textLogo} alt="테스키파이 텍스트 로고" fill />
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-3 text-base font-medium">
          <ProfileImage
            nickname={nickname}
            profileImageUrl={profileImageUrl}
            id={id}
            size="34px"
          />
          <p className="hidden text-gray-700 md:block">{nickname}</p>
        </div>
      </div>
    </header>
  );
}
