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

export default function NewColumnModal({
  isOpen,
  onClose,
  dashboardId,
}: NewColumnModalProps) {
  const [newColumnTitle, setNewColumnTitle] = useState('');
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

  const handleCreateColumn = async () => {
    try {
      const schema = ColumnNameSchema(existingColumnTitles);
      await schema.validate({ title: newColumnTitle });

      await CreateColumn(newColumnTitle, dashboardId);
      onClose();
    } catch (validationError: any) {
      setcolumnError(validationError.message);
    }
  };

  return (
    <SingleInputModal
      isOpen={isOpen}
      onClose={onClose}
      title="새 칼럼 생성"
      labelText="이름"
      buttonText="생성"
      inputId="NewColumnName"
      inputValue={newColumnTitle}
      setInputValue={setNewColumnTitle}
      onSubmit={handleCreateColumn}
      placeholder="이름을 입력하세요"
      error={columnError}
    />
  );
}