/* eslint-disable */
'use client';

import ImageInputField from '@/app/components/image-input-field';
import InputField from '@/app/components/input-field';
import Modal from '@/app/components/modal';
import { createTodoSchema } from '@/lib/schemas/createToDo';
import { toDoCardValue } from '@/types/toDoCard';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'next/navigation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import AddDueDateInput from './add-due-date-input';
import AddTagInput from './add-tag-input';
import AssigneeUserDropdown from './assignee-user-dropdown';

/* eslint-disable */

/* eslint-disable */

interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
}
export default function AddToDoModal({
  isOpen,
  onClose,
  columnId, // columnId
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

  const { id } = useParams<{ id: string }>(); // dashboardId

  const onSubmit: SubmitHandler<toDoCardValue> = async (data) => {
    console.log(data);
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
            <AddTagInput />
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
