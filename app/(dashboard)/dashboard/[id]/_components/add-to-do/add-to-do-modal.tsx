/* eslint-disable */
// NOTE - 디자인 구현 시 사용되지 않는 변수가 많아 사용하였습니다.
'use client';

import InputField from '@/app/components/input-field';
import Modal from '@/app/components/modal';
import { useForm } from 'react-hook-form';

/* eslint-disable */
// NOTE - 디자인 구현 시 사용되지 않는 변수가 많아 사용하였습니다.

/* eslint-disable */
// NOTE - 디자인 구현 시 사용되지 않는 변수가 많아 사용하였습니다.

interface AddToDoModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function AddToDoModal({ isOpen, onClose }: AddToDoModalProps) {
  if (!isOpen) return null;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  s;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="h-[70vh] w-[327px] px-5 pb-5 pt-8 md:w-[506px] md:px-7 md:pb-7"
    >
      <section>
        <h2>할 일 생성</h2>
        <form>
          <InputField
            id="assigneeUserId"
            label="담당자"
            type="radio"
            placeholder="이름을 입력해 주세요"
            register={register}
          />
        </form>
      </section>
    </Modal>
  );
}
