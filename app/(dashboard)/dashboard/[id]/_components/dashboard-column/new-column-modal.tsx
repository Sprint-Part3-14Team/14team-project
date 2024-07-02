'use client';

import SingleInputModal from '@/app/components/single-input-modal';
import React, { useState } from 'react';

import CreateColumn from './actions';

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

  const handleCreateColumn = async () => {
    try {
      await CreateColumn(newColumnTitle, dashboardId);
      onClose();
    } catch (error: any) {
      console.error('칼럼 생성 오류:', error.message);
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
    />
  );
}
