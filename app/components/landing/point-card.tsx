import { ReactNode } from 'react';

interface PointCardProps {
  pointNum: number;
  firstDesc: string;
  secondDesc: string;
  children: ReactNode;
  isReverse: boolean;
}

export default function PointCard({
  pointNum,
  firstDesc,
  secondDesc,
  children,
  isReverse = false,
}: PointCardProps) {
  return (
    <div className="relative h-[686px] w-full rounded-lg bg-gray-800 pt-[60px] text-center md:h-[972px] md:text-left xl:h-[600px] xl:pt-[123px]">
      <div className={`${isReverse ? 'xl:ml-[610px]' : ''} md:ml-[60px]`}>
        <h2 className="text-lg font-medium text-gray-400">Point {pointNum}</h2>
        <div className="mb-[100px] mt-[60px] text-[36px] font-bold leading-[50px] md:text-[48px] md:leading-[64px] xl:mt-[100px]">
          <p>{firstDesc}</p>
          <p>{secondDesc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
