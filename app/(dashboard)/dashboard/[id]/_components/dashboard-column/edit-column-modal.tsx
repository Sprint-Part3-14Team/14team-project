'use client';

import SingleInputModal from '@/app/components/single-input-modal';
import ColumnNameSchema from '@/lib/schemas/columnName';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { ChangeColumn, DeleteColumn, GetColumnNames } from './actions';
import WarningModal from './delete-warning-modal';

interface EditColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
  dashboardId: number;
}

export default function EditColumnModal({
  isOpen,
  onClose,
  columnId,
  dashboardId,
}: EditColumnModalProps) {
  const [changeColumnTitle, setChangeColumnTitle] = useState('');
  const [columnError, setColumnError] = useState<string>('');
  const [isWarningOpen, setIsWarningOpen] = useState<boolean>(false);
  const [existingColumnTitles, setExistingColumnTitles] = useState<string[]>(
    []
  );
  const router = useRouter();

  const fetchExistingColumnTitles = async () => {
    try {
      const columnNames = await GetColumnNames(dashboardId);
      setExistingColumnTitles(columnNames);
      setColumnError('');
    } catch (error: any) {
      console.error('기존 칼럼 제목들을 불러오는 중 오류 발생:', error.message);
      setColumnError('기존 칼럼 제목을 불러오는 중 오류 발생');
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchExistingColumnTitles();
    }
    setChangeColumnTitle('');
    setColumnError('');
  }, [isOpen]);

  const handleChangeColumn = async () => {
    try {
      const schema = ColumnNameSchema(existingColumnTitles);
      await schema.validate({ title: changeColumnTitle });

      await ChangeColumn(changeColumnTitle, columnId);
      router.refresh();
      onClose();
    } catch (validationError: any) {
      setColumnError(validationError.message);
    }
  };

  const handleDelete = async () => {
    try {
      await DeleteColumn(columnId);
      router.refresh();
      onClose();
    } catch (error: any) {
      setColumnError('칼럼 삭제 중 오류 발생');
    }
  };

  const handleWarningClose = () => {
    setIsWarningOpen(false);
  };

  const handleWarningDelete = () => {
    handleDelete();
    setIsWarningOpen(false);
  };

  const handleDeleteClick = () => {
    setIsWarningOpen(true);
    onClose();
  };

  return (
    <div>
      <SingleInputModal
        isOpen={isOpen}
        onClose={onClose}
        onDelete={handleDeleteClick}
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
      <WarningModal
        isOpen={isWarningOpen}
        onClose={handleWarningClose}
        onDelete={handleWarningDelete}
      />
    </div>
  );
}
