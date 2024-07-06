import Image from 'next/image';

interface AdCardProps {
  imgUrl: string;
  yPadding: 'dashboard' | 'invite' | 'member';
  title: string;
  description: string;
}

export default function AdCard({
  imgUrl,
  yPadding,
  title,
  description,
}: AdCardProps) {
  const imgContainerYPadding: { [key: string]: string } = {
    dashboard: 'py-16 md:py-[68px]',
    invite: 'py-5 md:py-[15px]',
    member: 'py-[33px] md:py-[32px]',
  };

  return (
    <div className="w-full md:w-[378px]">
      <div
        className={`h-[236px] rounded-t-lg bg-gray-600 px-10 md:h-[260px] md:px-[39px] ${imgContainerYPadding[yPadding]} `}
      >
        <div className="relative h-full w-full">
          <Image
            className="object-contain"
            fill
            src={imgUrl}
            alt={`${title} 구간 이미지`}
          />
        </div>
      </div>
      <div className="h-[124px] rounded-b-lg bg-gray-800 py-[27px] pl-[32px] text-primary md:py-[33px]">
        <p className="mb-[18px] text-lg font-bold">{title}</p>
        <p className="text-base font-medium">{description}</p>
      </div>
    </div>
  );
}
