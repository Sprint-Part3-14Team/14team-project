'use client';

import ImageInputField from '@/app/components/image-input-field';
import Modal from '@/app/components/modal';
import createTodoSchema from '@/lib/schemas/createToDo';
import { CardData } from '@/types/card';
import { ToDoCardValue } from '@/types/toDoCard';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

import { postToDoCard, postToDoCardImage, updateToDoCard } from '../../action';
import AddDueDateInput from './add-due-date-input';
import AddTagInput from './add-tag-input';
import AddToDoTitleInput from './add-to-do-title-input';
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
  const defaultValues = {
    assigneeUserId: toDoValue?.assignee?.id || null,
    title: toDoValue?.title || '',
    description: toDoValue?.description || '',
    dueDate: toDoValue?.dueDate || undefined,
    imageUrl: toDoValue?.imageUrl || '',
  };

  const methods = useForm<ToDoCardValue>({
    resolver: yupResolver(createTodoSchema),
    mode: 'onChange',
    defaultValues,
  });
  const {
    register,
    unregister,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, isDirty },
  } = methods;
  const [tags, setTags] = useState<string[]>(toDoValue?.tags || []);
  const [column, setColumn] = useState(columnId);
  const { id } = useParams<{ id: string }>(); // 대시보드 id
  const [isEdit, setIsEdit] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const onSubmit: SubmitHandler<ToDoCardValue> = async (data) => {
    const { assigneeUserId, title, description, dueDate, imageUrl } = data;

    // NOTE - 필수값
    const jsonObject: { [key: string]: any } = {
      dashboardId: Number(id),
      columnId: column,
      title,
      description,
    };

    // NOTE - 선택값
    if (assigneeUserId) jsonObject.assigneeUserId = assigneeUserId;
    if (tags.length > 0) jsonObject.tags = tags;
    if (dueDate) jsonObject.dueDate = dueDate;

    // 이미지 업로드 처리
    if (imageUrl && imageUrl instanceof File) {
      const formData = new FormData();
      formData.append('image', imageUrl);
      const imageResponse = await postToDoCardImage(formData, columnId);
      jsonObject.imageUrl = imageResponse;
    } else if (imageUrl) {
      // 수정하기에서 사용자가 사진 변경 안 하고 그대로 수정하는 경우
      jsonObject.imageUrl = imageUrl;
    } else if (!imageUrl && isEdit) {
      // 생성하기에서 사진 없이 생성하는 경우
      jsonObject.imageUrl = null;
    }

    if (isEdit && !assigneeUserId) {
      jsonObject.assigneeUserId = null;
    }

    try {
      if (isEdit && cardId) {
        await updateToDoCard(jsonObject, cardId);
      } else {
        await postToDoCard(jsonObject);
      }
      onClose();
    } catch (error) {
      console.error(
        isEdit ? '할 일 카드 수정 오류' : '할 일 카드 생성 오류',
        error
      );
    }
  };

  useEffect(() => {
    if (toDoValue && !isEdit) {
      setIsEdit(true);
      setTags(toDoValue.tags);
      reset(defaultValues);
    }
  }, [isEdit, reset, toDoValue]);

  // NOTE - 모달이 닫힐 때 폼 초기화
  useEffect(() => {
    if (!isOpen) {
      reset({
        assigneeUserId: null,
        title: '',
        description: '',
        dueDate: undefined,
        imageUrl: '',
      });
      setTags([]);
      setIsEdit(false);
    }
  }, [isOpen, reset]);

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
            <AddToDoTitleInput />
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
                size="76px"
                setIsChange={setIsChange}
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
                disabled={!(isDirty && isValid) && !isChange}
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
