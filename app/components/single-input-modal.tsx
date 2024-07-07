import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from './button';
import Modal from './modal';

interface SingleInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete?: () => void;
  title: string;
  labelText: string;
  buttonText: string;
  inputId: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: (value: string) => Promise<void>;
  placeholder: string;
  error?: string;
}

interface FormValues {
  inputField: string;
}

export default function SingleInputModal({
  isOpen,
  onClose,
  onDelete,
  title,
  labelText,
  buttonText,
  inputId,
  inputValue,
  setInputValue,
  onSubmit,
  placeholder,
  error,
}: SingleInputModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
    setValue,
  } = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      inputField: inputValue,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({ inputField: '' });
      setInputValue('');
    }
  }, [isOpen, reset, setInputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue('inputField', e.target.value, { shouldValidate: true });
    setInputValue(e.target.value);
  };

  const handleFormSubmit: SubmitHandler<FormValues> = async ({
    inputField,
  }) => {
    await onSubmit(inputField);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="z-50 w-[327px] md:w-[540px]"
    >
      <h2 className="ml-[20px] mt-[28px] text-xl font-bold md:ml-[28px] md:mt-[32px] md:text-2xl">
        {title}
      </h2>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label
          htmlFor={inputId}
          className="ml-[20px] mt-[24px] block text-base font-medium md:ml-[28px] md:mt-[32px] md:text-lg"
        >
          {labelText}
        </label>
        <div className="flex items-center justify-center">
          <input
            id={inputId}
            type="text"
            value={inputValue}
            placeholder={placeholder}
            {...register('inputField', { required: true })}
            onChange={handleInputChange}
            className="mt-[10px] flex h-[42px] w-[287px] rounded-md border border-gray-700 pl-[16px] text-sm font-normal md:h-[48px] md:w-[484px] md:text-base"
          />
        </div>
        {error && (
          <p className="ml-[20px] mt-[8px] text-sm font-normal text-red-primary md:ml-[28px]">
            {error}
          </p>
        )}
        <div className="flex flex-col md:flex-row">
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="mb-[16px] ml-[20px] mt-[24px] flex justify-start text-sm font-normal text-gray-400 underline md:ml-[28px] md:mt-[59px]"
            >
              삭제하기
            </button>
          )}
          <div
            className={`${onDelete ? 'md:ml-[147px] md:mt-[28px]' : 'mt-[24px] md:ml-[223px]'} mb-[28px] flex justify-center`}
          >
            <Button
              variant="mobile138x42"
              onClick={onClose}
              className="rounded-lg border border-solid border-gray-700 bg-background text-primary-foreground"
            >
              취소
            </Button>
            <Button
              variant="mobile138x42"
              type="submit"
              className="ml-[12px] rounded-lg bg-primary text-primary-foreground hover:bg-accent disabled:bg-secondary-foreground"
              disabled={!isValid}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
