import { ReactNode } from 'react';

interface PointCardProps {
  pointNum: number;
  description: string;
  children: ReactNode;
}

export default function PointCard({
  pointNum,
  description,
  children,
}: PointCardProps) {
  return (
    <div className="relative h-[686px] w-full rounded-lg bg-gray-800 pt-[60px] text-center md:h-[972px] md:text-left xl:h-[600px]">
      <h2 className="text-lg font-medium text-gray-400 md:ml-[60px]">
        Point {pointNum}
      </h2>
      <p className="mx-[60px] mb-[100px] mt-[60px] break-keep text-[36px] font-bold leading-[50px] md:mt-[100px] md:h-[128px] md:w-[302px] md:text-[48px] md:leading-[64px]">
        {description}
      </p>
      {children}
    </div>
  );
}
