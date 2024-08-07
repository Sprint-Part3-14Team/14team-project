import SingleInputModal from '@/app/components/single-input-modal';
import inviteEmailSchema from '@/lib/schemas/inviteEmail';
import React, { useEffect, useState } from 'react';

import { Invitedashboard } from './actions';

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
  const [emailError, setEmailError] = useState<string>('');

  useEffect(() => {
    setInviteEmail('');
    setEmailError('');
  }, [isOpen]);

  const handleInviteByEmail = async () => {
    try {
      await inviteEmailSchema.validate({ email: inviteEmail });
      await Invitedashboard(dashboardId, inviteEmail);
      window.location.reload();
      onClose();
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        setEmailError(error.errors[0]);
      } else {
        setEmailError('존재하지 않는 유저입니다.');
      }
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
      error={emailError}
    />
  );
}
