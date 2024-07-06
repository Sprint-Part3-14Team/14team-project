import getLoggedInUser from '@/lib/api/getLoggedInUser';
import logoSmall from '@/public/images/checkbox_logo.png';
import textLogo from '@/public/images/todo_todo_text_logo.svg';
import Image from 'next/image';
import Link from 'next/link';

import NavbarProfile from './navbar-profile';

export default async function Navbar() {
  // NOTE - 사용자 정보 GET
  const user = await getLoggedInUser();

  return (
    <header className="z-5 h-[60px] border-b border-gray-600 bg-background md:h-[70px]">
      <div className="flex items-center justify-between px-3 py-[13px] md:px-10 md:py-4">
        <Link href="/mydashboard">
          <div className="flex items-center justify-center gap-2">
            <div className="relative size-[25px]">
              <Image
                src={logoSmall}
                alt="테스키파이 로고"
                sizes="30px"
                className="object-fill"
              />
            </div>
            <div className="relative h-[22px] w-[100px]">
              <Image src={textLogo} alt="테스키파이 텍스트 로고" fill />
            </div>
          </div>
        </Link>
        <NavbarProfile user={user} />
      </div>
    </header>
  );
}
