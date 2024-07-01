import SingleInputModal from '@/app/components/single-input-modal';
import React, { useState } from 'react';

import Invitedashboard from './postActions';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: number;
}

export default function InviteModal({
  isOpen,
  onClose,
  dashboardId,
}: InviteModalProps) {
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInviteByEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await Invitedashboard(dashboardId, inviteEmail);
      console.log('초대 성공:', result);

      onClose();
      setInviteEmail('');
    } catch (error: any) {
      console.error('대시보드 초대 오류:', error.message);
    }
  };

  return (
    <SingleInputModal
      isOpen={isOpen}
      onClose={onClose}
      title="초대하기"
      labelText="이메일"
      buttonText="초대"
      inputId="inviteEmail"
      inputValue={inviteEmail}
      setInputValue={setInviteEmail}
      onSubmit={handleInviteByEmail}
      placeholder="이메일을 입력하세요"
    />
  );
}
