'use client';

import NewDashboardModal from '@/app/(dashboard)/mydashboard/_components/new-dashboard-modal';
import Link from 'next/link';
import React, { useState } from 'react';

import SignModal from '../_components/auth-modal';
import SignInForm from '../_components/sign-in-form';

export default function SignIn() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTestModalOpen, setTestModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openTestModal = () => setTestModalOpen(true);
  const closeTestModal = () => setTestModalOpen(false);

  return (
    <div className="flex w-full flex-col items-center justify-center px-3 md:px-28 xl:mx-auto xl:w-[520px] xl:px-0">
      <p className="mb-10 font-medium">오늘도 만나서 반가워요!</p>
      <SignInForm />
      <p className="mt-6">
        회원이 아니신가요?{' '}
        <Link href="/signup" className="text-violet-primary underline">
          회원가입하기
        </Link>
      </p>
      {/* //NOTE - 테스트용 */}
      <div>
        <button type="button" onClick={openModal}>
          모달 열기
        </button>
        <SignModal
          isOpen={isModalOpen}
          onClose={closeModal}
          variant="passwordError"
        />
      </div>

      <button type="button" onClick={openTestModal}>
        모달 열기
      </button>
      <NewDashboardModal isOpen={isTestModalOpen} onClose={closeTestModal} />
    </div>
  );
}
