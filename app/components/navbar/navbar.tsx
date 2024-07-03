import getLoggedInUser from '@/lib/api/getLoggedInUser';
import logoSmall from '@/public/images/logo_small.svg';
import textLogo from '@/public/images/text_logo.svg';
import Image from 'next/image';
import Link from 'next/link';

import NavbarProfile from './navbar-profile';

export default async function Navbar() {
  // NOTE - 사용자 정보 GET
  const user = await getLoggedInUser();

  return (
    <header className="z-5 sticky top-0 h-[60px] border-b border-gray-300 bg-white md:h-[70px]">
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
        <NavbarProfile user={user} />
      </div>
    </header>
  );
}
