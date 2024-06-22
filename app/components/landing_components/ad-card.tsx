import Image from 'next/image';

interface AdCardProps {
  imgUrl: any;
  yPadding: string;
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
        className={`h-[236px] rounded-t-lg bg-gray-600 px-10 md:h-[260px] md:px-[39px] ${imgContainerYPadding[yPadding]}`}
      >
        <Image
          src={imgUrl}
          alt={`${title} 구간 이미지`}
          width={0}
          height={0}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className="h-[124px] rounded-b-lg bg-gray-800 py-[27px] pl-[32px] text-white md:py-[33px]">
        <p className="mb-[18px] text-lg font-bold">{title}</p>
        <p className="text-base font-medium">{description}</p>
      </div>
    </div>
  );
}
