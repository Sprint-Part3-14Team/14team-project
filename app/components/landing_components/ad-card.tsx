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
    dashboard: 'py-[64px]',
    invite: 'py-[18px]',
    member: 'py-[33px]',
  };

  return (
    <div className="w-full">
      <div
        className={`relative h-[260px] rounded-t-lg bg-gray-600 px-10 ${imgContainerYPadding[yPadding]}`}
      >
        <Image
          src={imgUrl}
          alt={`${title} 구간 이미지`}
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className="h-[124px] rounded-b-lg bg-gray-800 py-[27px] pl-[32px] text-white">
        <p className="mb-[18px] text-lg font-bold">{title}</p>
        <p className="text-base font-medium">{description}</p>
      </div>
    </div>
  );
}
