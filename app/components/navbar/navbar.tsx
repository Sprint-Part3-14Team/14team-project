import logoSmall from '@/public/images/logo_small.svg';
import textLogo from '@/public/images/text_logo.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 h-[60px] border-b border-gray-300 bg-white md:h-[70px]">
      <div>
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
      </div>
    </header>
  );
}
