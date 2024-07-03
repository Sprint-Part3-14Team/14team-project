'use client';

import SingleInputModal from '@/app/components/single-input-modal';
import ColumnNameSchema from '@/lib/schemas/columnName';
import React, { useEffect, useState } from 'react';

import { CreateColumn, getColumnNames } from './actions';

interface NewColumnModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: number;
}

export default function EditColumnModal({
  isOpen,
  onClose,
  dashboardId,
}: NewColumnModalProps) {
  const [changeColumnTitle, setChangeColumnTitle] = useState('');
  const [existingColumnTitles, setExistingColumnTitles] = useState<string[]>(
    []
  );
  const [columnError, setcolumnError] = useState<string>('');

  const fetchExistingColumnTitles = async () => {
    try {
      const columnNames = await getColumnNames(dashboardId);
      setExistingColumnTitles(columnNames);
      setcolumnError('');
    } catch (error: any) {
      console.error('기존 칼럼 제목들을 불러오는 중 오류 발생:', error.message);
      setcolumnError('기존 칼럼 제목을 불러오는 중 오류 발생');
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchExistingColumnTitles();
    }
  }, [isOpen]);

  const handleChangeColumn = async () => {
    try {
      const schema = ColumnNameSchema(existingColumnTitles);
      await schema.validate({ title: changeColumnTitle });

      await CreateColumn(changeColumnTitle, dashboardId);
      onClose();
    } catch (validationError: any) {
      setcolumnError(validationError.message);
    }
  };

  const handleDelete = async () => {};

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
