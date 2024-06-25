import Image from 'next/image';

import Tag from './tag';

export default function DashboardCard({
  title,
  tags,
  imageUrl,
  // createdAt,
  assignee,
}: {
  title: string;
  tags: string[];
  imageUrl?: string;
  // createdAt: Date;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}) {
  return (
    <div className="mt-[10px] flex flex-col rounded-md border border-gray-300 bg-white p-3 md:flex-row md:items-center md:gap-x-5 xl:w-[314px] xl:flex-col">
      {imageUrl && (
        <div className="relative h-[150px] rounded-md bg-gray-100 md:h-[53px] md:w-[90px] xl:h-[160px] xl:w-full">
          <Image src={imageUrl} alt="card-image" fill objectFit="contain" />
        </div>
      )}
      <div className="mt-[10px] flex w-full flex-col md:mt-0 md:gap-y-[10px] xl:mt-3 xl:gap-y-0">
        <p className="font-medium">{title}</p>
        <div className="w-full md:flex xl:flex-col">
          <div className="my-[6px] flex flex-wrap gap-x-[6px] gap-y-2 md:my-0 md:w-[350px] xl:my-[10px] xl:w-full">
            {tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-x-[6px] md:ml-4 xl:ml-0">
              <div className="relative size-[14px] md:size-[18px]">
                <Image
                  src="/icons/icon_calendar.svg"
                  fill
                  sizes="100vw"
                  alt="calendar"
                />
              </div>
              <p className="text-[10px] md:text-xs">
                {/* {createdAt} */}
                {/* {createdAt} */}
              </p>
            </div>
            <div className="flex items-center gap-x-[6px]">
              <div className="relative size-[22px] md:size-6">
                {assignee.profileImageUrl && (
                  <Image
                    src={assignee.profileImageUrl}
                    fill
                    sizes="100vw"
                    alt="assignee"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
