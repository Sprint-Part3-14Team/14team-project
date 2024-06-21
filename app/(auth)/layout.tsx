import logo from '@/public/images/auth_logo.png';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-[195px] w-[140px] md:h-[279px] md:w-[200px]">
        <Image src={logo} alt="logo" fill />
      </div>
      {children}
    </div>
  );
}
