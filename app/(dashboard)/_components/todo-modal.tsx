'use client';

import ColumnTag from '@/app/components/column-tag';
import Modal from '@/app/components/modal';
import ProfileImage from '@/app/components/profile/profile-image';
import TaskOption from '@/app/components/task-option';
import formatDate from '@/utils/formatDate';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import Tag from './tag';
import TodoModalComment from './todo-modal-comment';

export default function ToDoModal({
  isOpen,
  onClose,
  id,
  title,
  tags,
  imageUrl,
  assignee,
  dueDate,
  description,
  columnTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  id: number;
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
  columnTitle: string;
}) {
  const [isTaskOptionOpen, setIsTaskOptionOpen] = useState(false);
  const router = useRouter();

  async function deleteTask(cardId: number) {
    const token = getCookie('token');

    const response = await fetch(
      `https://sp-taskify-api.vercel.app/6-14/cards/${cardId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    // onClose가 없으면 어색하게 작동하여 추가
    onClose();
    router.refresh();
  }

  const handleTaskOptionToggle = () => {
    setIsTaskOptionOpen((prev) => !prev);
  };

  const handleDeleteTask = async (cardId: number) => {
    await deleteTask(cardId);
  };

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
            <button
              type="button"
              className="relative size-6 md:size-8"
              onClick={handleTaskOptionToggle}
            >
              <Image
                src="/icons/icon_three_point.svg"
                alt="세 점 아이콘"
                fill
              />
              {isTaskOptionOpen && (
                <TaskOption>
                  <li className="flex h-[30px] w-full items-center justify-center rounded-md hover:bg-violet-primary/10 md:h-[32px]">
                    수정하기
                  </li>
                  {/* eslint-disable-next-line */}
                  <li
                    className="flex h-[30px] w-full items-center justify-center rounded-md hover:bg-violet-primary/10 md:h-[32px]"
                    onClick={() => handleDeleteTask(id)}
                  >
                    삭제하기
                  </li>
                </TaskOption>
              )}
            </button>
            <button
              type="button"
              className="relative size-6 cursor-pointer md:size-8"
            >
              <Image
                src="/icons/icon_close.svg"
                alt="닫기 아이콘"
                onClick={onClose}
                fill
              />
            </button>
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
          <div className="mb-[44px] mt-4 w-full overflow-y-auto md:mt-0">
            <div className="h-full w-full md:pr-6">
              <div className="flex h-5 items-center gap-x-5">
                <ColumnTag title={columnTitle} />
                {tags?.length > 0 && <div className="h-full border-l" />}
                {tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
              <p className="my-4">{description}</p>

              {imageUrl && (
                <div className="relative size-fit h-[300px] w-full md:h-[400px]">
                  <Image
                    src={imageUrl}
                    alt="modal-image"
                    layout="fill"
                    objectFit="cover"
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
