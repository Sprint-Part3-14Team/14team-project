'use client';

import ImageInputField from '@/app/components/image-input-field';
import InputField from '@/app/components/input-field';
import Modal from '@/app/components/modal';
import createTodoSchema from '@/lib/schemas/createToDo';
import { toDoCardValue } from '@/types/toDoCard';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { postToDoCard } from '../../action';
import AddDueDateInput from './add-due-date-input';
import AddTagInput from './add-tag-input';
import AssigneeUserDropdown from './assignee-user-dropdown';

interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
}
export default function AddToDoModal({
  isOpen,
  onClose,
  columnId,
}: AddToDoModalProps) {
  const methods = useForm<toDoCardValue>({
    resolver: yupResolver(createTodoSchema),
    mode: 'onChange',
  });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = methods;
  const [tags, setTags] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();

  const onSubmit: SubmitHandler<toDoCardValue> = async (data) => {
    const { assigneeUserId, title, description } = data;

    const formData = new FormData();
    // NOTE - 필수값
    formData.append('assigneeUserId', assigneeUserId.toString());
    formData.append('dashboardId', id.toString());
    formData.append('columnId', columnId.toString());
    formData.append('title', title);
    formData.append('description', description);

    // NOTE - 선택값
    if (tags.length > 0) {
      formData.append('tags', JSON.stringify(tags));
    }

    if (data.dueDate) {
      formData.append('dueDate', data.dueDate);
    }

    if (data.imageUrl) {
      formData.append('imageUrl', data.imageUrl);
    }

    try {
      const res = await postToDoCard(formData);
      if (res) {
        onClose();
      }
    } catch (error) {
      // TODO - 에러났을 경우 토스트로 보여주기
      console.error('할 일 카드 생성 중 오류 발생:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex h-[70vh] w-[327px] flex-col text-left md:w-[506px] md:px-7 md:pb-7"
    >
      <h2 className="md:md-[32px] mb-[24px] px-5 pt-8 text-xl font-bold md:text-2xl">
        할 일 생성
      </h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow flex-col overflow-hidden px-5 pb-5"
        >
          <div className="flex flex-grow flex-col gap-6 overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col gap-y-2">
              <p className="text-base font-medium md:text-lg">담당자</p>
              <AssigneeUserDropdown dashboardId={id} />
            </div>
            <InputField
              id="title"
              label="제목 *"
              type="text"
              placeholder="제목을 입력해 주세요"
              register={register}
              labelClassName="'font-medium text-base md:text-lg'"
              error={errors.title?.message || ''}
            />
            <div className="flex flex-col gap-y-2">
              <label
                htmlFor="description"
                className="'font-medium md:text-lg' text-base"
              >
                설명 *
              </label>
              <textarea
                id="description"
                className="h-[84px] resize-none rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
                placeholder="설명을 입력해 주세요"
                {...register('description')}
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            <AddDueDateInput />
            <AddTagInput tags={tags} setTags={setTags} />
            <div className="mb-4 flex flex-col gap-y-2">
              <p className="text-base font-medium md:text-lg">이미지</p>
              <ImageInputField id="imageUrl" setValue={setValue} />
            </div>
          </div>
          <div className="mt-5 flex gap-[11px] md:ml-auto">
            <button
              type="button"
              className="h-[42px] w-full rounded border border-gray-300 bg-white text-center text-sm font-medium text-gray-500 md:w-[120px] md:text-base"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="submit"
              className="h-[42px] w-full rounded bg-violet-primary text-center text-sm font-medium text-white disabled:bg-gray-400 md:w-[120px] md:text-base"
              disabled={!isValid}
            >
              생성
            </button>
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
