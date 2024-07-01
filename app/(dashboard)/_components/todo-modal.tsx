'use client';

import Modal from '@/app/components/modal';
import ProfileImage from '@/app/components/profile/profile-image';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';

import Tag from './tag';
import TodoModalComment from './todo-modal-comment';

export default function ToDoModal({
  isOpen,
  onClose,
  title,
  tags,
  imageUrl,
  assignee,
  dueDate,
  description,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tags: string[];
  imageUrl?: string;
  assignee: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  dueDate: Date;
  description: string;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="h-[708px] w-[calc(100vw-48px)] md:h-[770px] md:w-[calc(100vw-64px)] lg:w-[730px]"
    >
      <div className="h-full p-3 md:px-[28px] md:py-[32px]">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold md:text-2xl">{title}</h1>
          <div className="flex gap-x-6">
            <div className="relative size-6 md:size-8">
              <Image
                src="/icons/icon_three_point.svg"
                alt="세 점 아이콘"
                fill
              />
            </div>
            <div className="relative size-6 cursor-pointer md:size-8">
              <Image
                src="/icons/icon_close.svg"
                alt="닫기 아이콘"
                onClick={onClose}
                fill
              />
            </div>
          </div>
        </div>
        <div className="mt-4 flex h-full flex-col md:flex-row-reverse">
          <div className="flex w-full items-center justify-between rounded-lg border p-4 md:h-[155px] md:w-[180px] md:flex-col lg:w-[200px]">
            <div className="flex w-full flex-col">
              <p className="text-[10px] font-semibold md:text-xs">담당자</p>
              <div className="flex items-center gap-x-2">
                <div className="relative size-[26px] md:size-[34px]">
                  <ProfileImage
                    profileImageUrl={assignee?.profileImageUrl}
                    nickname={assignee.nickname}
                    id={assignee.id}
                    size="24px"
                  />
                </div>
                <p>{assignee.nickname}</p>
              </div>
            </div>
            <div className="flex-flex-col w-full">
              <p className="text-[10px] font-semibold md:text-xs">마감일</p>
              <p className="text-xs md:text-sm">{formatDate(dueDate)}</p>
            </div>
          </div>
          <div className="mt-4 w-full md:mt-0">
            <div className="h-full w-full overflow-y-auto md:pr-6">
              <div className="flex gap-x-5">
                <p>태그</p>
                {tags?.length > 0 && <div className="border-l" />}
                {tags?.map((tag) => <Tag>{tag}</Tag>)}
              </div>
              <p className="my-4">{description}</p>
              {imageUrl && (
                <div className="relative h-[150px] w-full object-contain md:h-[250px]">
                  <Image
                    src={imageUrl}
                    alt="modal-image"
                    fill
                    className="rounded-md"
                  />
                </div>
              )}
              <TodoModalComment />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
