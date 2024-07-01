import SingleInputModal from '@/app/components/single-input-modal';
import React, { useState } from 'react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InviteModal({ isOpen, onClose }: InviteModalProps) {
  const [inviteEmail, setInviteEmail] = useState('');

  const handleSubmit = () => {
    console.log('입력된 이메일:', inviteEmail);
    setInviteEmail('');
    onClose();
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
      onSubmit={handleSubmit}
      placeholder="이메일을 입력하세요"
    />
  );
}
