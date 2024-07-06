import logo from '@/public/images/auth_logo.png';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-[100px] flex flex-col items-center justify-center text-primary-foreground md:my-[200px]">
      <div className="relative h-[195px] w-[140px] md:h-[279px] md:w-[200px]">
        {/* TODO - 이미지가 LCP임에 따라 priority를 적용하였으나 preload 오류가 나옴.
                   추후 빌드 시 콘솔에 오류가 뜨는지 확인할 것 */}
        <Image
          src={logo}
          alt="logo"
          fill
          sizes="(max-width: 768px) 100vw, 140px"
          priority
        />
      </div>
      {children}
    </div>
  );
}
