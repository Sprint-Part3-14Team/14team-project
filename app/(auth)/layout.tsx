import logo from '@/public/images/checkbox_logo.png';
import textLogo from '@/public/images/todo_todo_text_logo.svg';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-[100px] flex flex-col items-center justify-center text-primary-foreground md:my-[200px]">
      <div className="relative size-[100px] md:size-[140px]">
        {/* TODO - 이미지가 LCP임에 따라 priority를 적용하였으나 preload 오류가 나옴.
                   추후 빌드 시 콘솔에 오류가 뜨는지 확인할 것 */}
        <Image
          src={logo}
          alt="logo"
          fill
          sizes="(max-width: 768px) 100vw, 140px"
          priority
          className="object-fill"
        />
      </div>
      <div className="relative my-2 h-[50px] w-[220px] md:my-0 md:h-[80px] md:w-[280px]">
        <Image src={textLogo} fill alt="logo" />
      </div>
      {children}
    </div>
  );
}
