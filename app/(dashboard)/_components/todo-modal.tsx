'use client';

import ColumnTag from '@/app/components/column-tag';
import Modal from '@/app/components/modal';
import ProfileImage from '@/app/components/profile/profile-image';
import TaskOption from '@/app/components/task-option';
import { CardData } from '@/types/card';
import formatDate from '@/utils/formatDate';
import { getCookie } from 'cookies-next';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AddToDoModal from '../dashboard/[id]/_components/to-do/add-to-do-modal';
import Tag from './tag';
import TodoModalComment from './todo-modal-comment';

/* eslint-disable */

export default function ToDoModal({
  isOpen,
  onClose,
  columnTitle,
  ...props
}: {
  isOpen: boolean;
  onClose: () => void;
  columnTitle: string;
  props: CardData;
}) {
  const [isTaskOptionOpen, setIsTaskOptionOpen] = useState(false);
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { theme } = useTheme();

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

  // NOTE - 수정 모달 열기
  const handleEditTask = () => {
    setIsEditModalOpen(true);
    onClose(); // 현재 모달 닫기
  };

  const handleTaskOptionToggle = () => {
    setIsTaskOptionOpen((prev) => !prev);
  };

  const handleDeleteTask = async (cardId: number) => {
    await deleteTask(cardId);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="h-[708px] w-[calc(100vw-48px)] text-primary md:h-[770px] md:w-[calc(100vw-64px)] lg:w-[730px]"
      >
        <div className="h-full p-3 md:px-[28px] md:py-[32px]">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold md:text-2xl">
              {props.props.title}
            </h1>
            <div className="flex gap-x-6">
              <button
                type="button"
                className="relative size-6 md:size-8"
                onClick={handleTaskOptionToggle}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 22.4809C13.5187 22.4809 13.1068 22.3096 12.7641 21.9669C12.4214 21.6242 12.25 21.2122 12.25 20.731C12.25 20.2497 12.4214 19.8378 12.7641 19.4951C13.1068 19.1524 13.5187 18.981 14 18.981C14.4812 18.981 14.8932 19.1524 15.2359 19.4951C15.5786 19.8378 15.7499 20.2497 15.7499 20.731C15.7499 21.2122 15.5786 21.6242 15.2359 21.9669C14.8932 22.3096 14.4812 22.4809 14 22.4809ZM14 15.7502C13.5187 15.7502 13.1068 15.5789 12.7641 15.2361C12.4214 14.8934 12.25 14.4815 12.25 14.0002C12.25 13.519 12.4214 13.107 12.7641 12.7643C13.1068 12.4216 13.5187 12.2503 14 12.2503C14.4812 12.2503 14.8932 12.4216 15.2359 12.7643C15.5786 13.107 15.7499 13.519 15.7499 14.0002C15.7499 14.4815 15.5786 14.8934 15.2359 15.2361C14.8932 15.5789 14.4812 15.7502 14 15.7502ZM14 9.01944C13.5187 9.01944 13.1068 8.84809 12.7641 8.50538C12.4214 8.16269 12.25 7.75072 12.25 7.26947C12.25 6.78824 12.4214 6.37627 12.7641 6.03357C13.1068 5.69088 13.5187 5.51953 14 5.51953C14.4812 5.51953 14.8932 5.69088 15.2359 6.03357C15.5786 6.37627 15.7499 6.78824 15.7499 7.26947C15.7499 7.75072 15.5786 8.16269 15.2359 8.50538C14.8932 8.84809 14.4812 9.01944 14 9.01944Z"
                    fill={`${theme === 'dark' ? 'white' : 'black'}`}
                  />
                </svg>

                {isTaskOptionOpen && (
                  <TaskOption>
                    <li
                      className="flex h-[30px] w-full items-center justify-center rounded-md text-xs hover:bg-primary/10 md:h-[32px] md:text-sm"
                      onClick={handleEditTask}
                    >
                      수정하기
                    </li>
                    {/* eslint-disable-next-line */}
                    <li
                      className="flex h-[30px] w-full items-center justify-center rounded-md text-xs hover:bg-primary/10 md:h-[32px] md:text-sm"
                      onClick={() => handleDeleteTask(props.props.id)}
                    >
                      삭제하기
                    </li>
                  </TaskOption>
                )}
              </button>
              <button
                type="button"
                className="relative size-6 cursor-pointer md:size-8"
                onClick={onClose}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 17.4051L9.23585 24.1692C9.05125 24.3538 8.8192 24.4482 8.53972 24.4525C8.26025 24.4568 8.02394 24.3624 7.83078 24.1692C7.6376 23.976 7.54102 23.7418 7.54102 23.4666C7.54102 23.1914 7.6376 22.9573 7.83078 22.7641L14.5949 16L7.83078 9.23585C7.64616 9.05125 7.55172 8.8192 7.54745 8.53972C7.54316 8.26025 7.6376 8.02394 7.83078 7.83078C8.02394 7.6376 8.25812 7.54102 8.53332 7.54102C8.80852 7.54102 9.04269 7.6376 9.23585 7.83078L16 14.5949L22.7641 7.83078C22.9487 7.64616 23.1808 7.55172 23.4602 7.54745C23.7397 7.54316 23.976 7.6376 24.1692 7.83078C24.3624 8.02394 24.4589 8.25812 24.4589 8.53332C24.4589 8.80852 24.3624 9.04269 24.1692 9.23585L17.4051 16L24.1692 22.7641C24.3538 22.9487 24.4482 23.1808 24.4525 23.4602C24.4568 23.7397 24.3624 23.976 24.1692 24.1692C23.976 24.3624 23.7418 24.4589 23.4666 24.4589C23.1914 24.4589 22.9573 24.3624 22.7641 24.1692L16 17.4051Z"
                    fill={`${theme === 'dark' ? 'white' : 'black'}`}
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="mt-4 flex h-full flex-col md:flex-row-reverse">
            {/* TODO - 담당자 옆에 마진 */}
            <div className="flex w-full items-center justify-between rounded-lg border p-4 md:h-[155px] md:w-[180px] md:flex-col lg:w-[200px] xl:ml-2">
              <div className="flex w-full flex-col">
                <p className="text-[10px] font-semibold md:text-xs">담당자</p>
                {/* NOTE - 담당자 없을 때도 있습니다 */}
                {props.props.assignee ? (
                  <div className="mt-1 flex items-center gap-x-2">
                    <div className="relative flex size-[26px] items-center md:size-[34px]">
                      <ProfileImage
                        profileImageUrl={props.props.assignee.profileImageUrl}
                        nickname={props.props.assignee.nickname}
                        id={props.props.assignee.id}
                        size="24px"
                      />
                    </div>
                    <p>{props.props.assignee.nickname}</p>
                  </div>
                ) : (
                  <p className="mt-1 text-xs md:text-sm">
                    담당자가 존재하지 않습니다.
                  </p>
                )}
              </div>
              <div className="flex-flex-col w-full">
                <p className="text-[10px] font-semibold md:text-xs">마감일</p>
                <p className="mt-1 text-xs md:text-sm">
                  {props.props.dueDate
                    ? formatDate(new Date(props.props.dueDate))
                    : '마감일이 설정되지 않았습니다.'}
                </p>
              </div>
            </div>
            <div className="mb-[44px] mt-4 w-full overflow-y-auto pt-[2px] md:mt-0">
              <div className="h-full w-full md:pr-6">
                <div className="flex h-5 items-center gap-x-5">
                  <ColumnTag title={columnTitle} />
                  {props.props.tags?.length > 0 && (
                    <div className="h-full border-l" />
                  )}
                  {props.props.tags?.map((tag: string) => (
                    <Tag tag={tag} key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </div>
                <p className="my-4">{props.props.description}</p>

                {props.props.imageUrl && (
                  <div className="relative size-fit h-[300px] w-full md:h-[400px]">
                    <Image
                      src={props.props.imageUrl!}
                      alt="modal-image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                )}
                <TodoModalComment {...props} />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <AddToDoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        columnIdProp={props.props.columnId}
        toDoValue={props.props}
        cardId={props.props.id}
      />
    </>
  );
}
