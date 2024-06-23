import Image from 'next/image';

export default function DashboardCard({
  title,
  tags,
  imageUrl = '',
  createdAt,
  assignee,
}: {
  title: string;
  tags: string[];
  imageUrl: string;
  createdAt: Date;
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
          <Image src={imageUrl} alt="card-image" fill />
        </div>
      )}
      <div className="mt-[10px] flex w-full flex-col md:mt-0 md:gap-y-[10px] xl:mt-3 xl:gap-y-0">
        <p className="font-medium">{title}</p>
        <div className="w-full md:flex xl:flex-col">
          <div className="my-[6px] flex gap-x-[6px] md:my-0 xl:my-[10px]">
            {tags?.map((tag) => <p key={tag}>{tag}</p>)}
          </div>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-x-[6px] md:ml-4 xl:ml-0">
              <Image
                src="/icons/icon_calendar.svg"
                width={16}
                height={16}
                alt="calendar"
              />
              <p>{createdAt.toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-x-[6px]">
              <Image
                src={assignee.profileImageUrl}
                width={16}
                height={16}
                alt="assignee"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
