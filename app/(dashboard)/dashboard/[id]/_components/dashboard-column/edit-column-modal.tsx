'use client';

import SingleInputModal from '@/app/components/single-input-modal';
import React, { useEffect, useState } from 'react';

import { ChangeColumn, DeleteColumn } from './actions';

interface EditColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
}

export default function EditColumnModal({
  isOpen,
  onClose,
  columnId,
}: EditColumnModalProps) {
  const [changeColumnTitle, setChangeColumnTitle] = useState('');
  const [columnError, setColumnError] = useState<string>('');

  useEffect(() => {
    setChangeColumnTitle('');
    setColumnError('');
  }, [isOpen]);

  const handleChangeColumn = async () => {
    try {
      await ChangeColumn(changeColumnTitle, columnId);
      onClose();
    } catch (error: any) {
      setColumnError('칼럼 변경 중 오류 발생');
    }
  };

  const handleDelete = async () => {
    try {
      await DeleteColumn(columnId);
      onClose();
    } catch (error: any) {
      setColumnError('칼럼 삭제 중 오류 발생');
    }
  };

  return (
    <SingleInputModal
      isOpen={isOpen}
      onClose={onClose}
      onDelete={handleDelete}
      title="칼럼 관리"
      labelText="이름"
      buttonText="변경"
      inputId="NewColumnName"
      inputValue={changeColumnTitle}
      setInputValue={setChangeColumnTitle}
      onSubmit={handleChangeColumn}
      placeholder="변경할 이름을 입력하세요"
      error={columnError}
    />
  );
}
