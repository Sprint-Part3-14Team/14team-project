'use client';

import ImageInputField from '@/app/components/image-input-field';
import InputField from '@/app/components/input-field';
import Modal from '@/app/components/modal';
import createTodoSchema from '@/lib/schemas/createToDo';
import { CardData } from '@/types/card';
import { toDoCardValue } from '@/types/toDoCard';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { postToDoCard, updateToDoCard } from '../../action';
import AddDueDateInput from './add-due-date-input';
import AddTagInput from './add-tag-input';
import AssigneeUserDropdown from './assignee-user-dropdown';
import ColumnDropdown from './column-dropdown';

interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
  toDoValue?: CardData;
  cardId?: number;
}
export default function AddToDoModal({
  isOpen,
  onClose,
  columnId,
  toDoValue,
  cardId,
}: AddToDoModalProps) {
  const methods = useForm<toDoCardValue>({
    resolver: yupResolver(createTodoSchema),
    mode: 'onChange',
    defaultValues: {
      assigneeUserId: toDoValue?.assignee.id || undefined,
      title: toDoValue?.title || '',
      description: toDoValue?.description || '',
      dueDate: toDoValue?.dueDate || undefined,
      imageUrl: toDoValue?.imageUrl || '',
    },
  });
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isValid, isDirty },
  } = methods;
  const [tags, setTags] = useState<string[]>(toDoValue?.tags || []);
  const [column, setColumn] = useState(columnId);
  const { id } = useParams<{ id: string }>(); // 대시보드 id
  const [isEdit, setIsEdit] = useState(false);

  // 감시할 필드들을 설정
  const watchFields = watch([
    'assigneeUserId',
    'title',
    'description',
    'dueDate',
    'imageUrl',
  ]);

  const isFormChanged =
    isDirty ||
    isValid ||
    JSON.stringify(watchFields) !==
      JSON.stringify({
        assigneeUserId: toDoValue?.assignee.id || undefined,
        title: toDoValue?.title || '',
        description: toDoValue?.description || '',
        dueDate: toDoValue?.dueDate || undefined,
        imageUrl: toDoValue?.imageUrl || null,
      });

  const onSubmit: SubmitHandler<toDoCardValue> = async (data) => {
    const { assigneeUserId, title, description } = data;

    const formData = new FormData();
    formData.append('assigneeUserId', assigneeUserId.toString());
    formData.append('dashboardId', id.toString());
    formData.append('columnId', column.toString());
    formData.append('title', title);
    formData.append('description', description);

    if (tags.length > 0) {
      formData.append('tags', JSON.stringify(tags));
    }

    if (data.dueDate) {
      formData.append('dueDate', data.dueDate);
    }

    if (data.imageUrl) {
      formData.append('imageUrl', data.imageUrl);
    }

    if (isEdit && cardId) {
      try {
        const res = await updateToDoCard(formData, cardId);
        if (res) {
          onClose();
        }
      } catch (e) {
        console.error('할 일 카드 수정 오류');
      }
    } else {
      try {
        const res = await postToDoCard(formData);
        if (res) {
          onClose();
        }
      } catch (e) {
        console.error('할 일 카드 생성 오류');
      }
    }
  };

  useEffect(() => {
    if (toDoValue && !isEdit) {
      setIsEdit(true);
      reset({
        assigneeUserId: toDoValue.assignee.id,
        title: toDoValue.title,
        description: toDoValue.description,
        dueDate: toDoValue.dueDate || '',
        imageUrl: toDoValue?.imageUrl || null,
      });
    }
  }, [isEdit, reset, toDoValue]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="flex h-[70vh] w-[327px] flex-col text-left md:w-[506px] md:px-7 md:pb-7"
    >
      <h2 className="md:md-[32px] mb-[24px] px-5 pt-8 text-xl font-bold md:text-2xl">
        {isEdit ? '할 일 수정' : '할 일 생성'}
      </h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-grow flex-col overflow-hidden px-5 pb-5"
        >
          <div className="flex flex-grow flex-col gap-6 overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col gap-2 md:flex-row">
              {isEdit && (
                <ColumnDropdown
                  dashboardId={id}
                  columnId={column}
                  setColumn={setColumn}
                />
              )}
              <AssigneeUserDropdown
                dashboardId={id}
                isEdit={isEdit}
                assigneeUserId={toDoValue?.assignee?.id}
              />
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
            <AddDueDateInput
              dueDateValue={toDoValue?.dueDate}
              isEdit={isEdit}
            />
            <AddTagInput tags={tags} setTags={setTags} />
            <div className="mb-4 flex flex-col gap-y-2">
              <p className="text-base font-medium md:text-lg">이미지</p>
              <ImageInputField
                id="imageUrl"
                setValue={setValue}
                imageUrlValue={toDoValue?.imageUrl}
                unregister={unregister}
              />
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
            {isEdit ? (
              <button
                type="submit"
                className="h-[42px] w-full rounded bg-violet-primary text-center text-sm font-medium text-white disabled:bg-gray-400 md:w-[120px] md:text-base"
                disabled={!isFormChanged}
              >
                수정
              </button>
            ) : (
              <button
                type="submit"
                className="h-[42px] w-full rounded bg-violet-primary text-center text-sm font-medium text-white disabled:bg-gray-400 md:w-[120px] md:text-base"
                disabled={!isValid}
              >
                생성
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </Modal>
  );
}
