'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import EditPasswordForm from '../_components/edit-password-form';
import EditProfileForm from '../_components/edit-profile-form';

export default function MyPage() {
  const router = useRouter();

  return (
    <main className="p-5">
      <div className="flex items-center gap-[6px]">
        <button
          type="button"
          onClick={() => router.back()}
          className="relative size-[18px] md:size-5"
        >
          <Image
            src="/icons/arrow_forward.svg"
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
