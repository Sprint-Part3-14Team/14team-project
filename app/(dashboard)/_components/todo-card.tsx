'use client';

import ProfileImage from '@/app/components/profile/profile-image';
import { CardData } from '@/types/card';
import formatDate from '@/utils/formatDate';
import Image from 'next/image';
import { useState } from 'react';

import Tag from './tag';
import ToDoModal from './todo-modal';

export default function ToDoCard({
  columnTitle,
  ...props
}: { columnTitle: string } & CardData) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* eslint-disable-next-line */}
      <div
        onClick={handleOpenModal}
        className="mt-[10px] flex cursor-pointer flex-col rounded-md border border-gray-700 bg-foreground p-3 text-primary-foreground md:flex-row md:items-center md:gap-x-5 xl:w-[314px] xl:flex-col"
      >
        {props.imageUrl && (
          <div className="relative h-[150px] rounded-md bg-background md:h-[53px] md:w-[90px] xl:h-[160px] xl:w-full">
            <Image
              src={props.imageUrl}
              alt="card-image"
              fill
              objectFit="contain"
            />
          </div>
        )}
        <div className="mt-[10px] flex w-full flex-col md:mt-0 md:gap-y-[10px] xl:mt-3 xl:gap-y-0">
          <p className="font-medium">{props.title}</p>
          <div className="w-full md:flex xl:flex-col">
            <div className="my-[6px] flex flex-wrap gap-x-[6px] gap-y-2 md:my-0 md:w-[350px] xl:my-[10px] xl:w-full">
              {props.tags?.map((tag) => (
                <Tag key={tag} tag={tag}>
                  {tag}
                </Tag>
              ))}
            </div>
            <div className="flex w-full items-center justify-between">
              {/* NOTE - dueDate가 아니라 createdAt으로 되어있었어요 */}
              {props.dueDate && (
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
                    {formatDate(new Date(props.dueDate))}
                  </p>
                </div>
              )}
              <div className="ml-auto flex items-center gap-x-[6px]">
                <div className="relative size-[22px] md:size-6">
                  {/* TODO 모바일일 때 size가 22px PC가 24px인데 어떻게 주어야 좋을까요 */}
                  {/* NOTE - 담당자 필수값 아닙니다! 없을 때도 있어요 */}
                  {props.assignee && (
                    <ProfileImage
                      profileImageUrl={props.assignee.profileImageUrl}
                      nickname={props.assignee.nickname}
                      id={props.assignee.id}
                      size="24px"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToDoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        columnTitle={columnTitle}
        props={props}
      />
    </>
  );
}
