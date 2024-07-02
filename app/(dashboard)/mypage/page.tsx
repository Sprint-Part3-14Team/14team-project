'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import EditPasswordForm from '../_components/edit-password-form';
import EditProfileForm from '../_components/edit-profile-form';

export default function MyPage() {
  const router = useRouter();

  return (
    <main className="p-5 xl:w-[620px]">
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className="inline-flex cursor-pointer items-center gap-[6px]"
        onClick={() => router.back()}
        role="button"
        tabIndex={0}
        aria-label="돌아가기"
      >
        <button type="button" className="relative size-[18px] md:size-5">
          <Image
            src="/icons/arrow_forward_black.svg"
            alt="arrow_forward"
            fill
            className="fill-black"
          />
        </button>
        <p>돌아가기</p>
      </div>
      <EditProfileForm />
      <EditPasswordForm />
    </main>
  );
}
