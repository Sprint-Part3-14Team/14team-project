'use client';

import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

import EditPasswordForm from '../_components/edit-password-form';
import EditProfileForm from '../_components/edit-profile-form';

export default function MyPage() {
  const { theme } = useTheme();
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
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.1126 7.99937L11.1344 13.0212C11.2669 13.1536 11.3314 13.3113 11.328 13.4942C11.3246 13.6771 11.2566 13.8348 11.1241 13.9673C10.9917 14.0998 10.834 14.166 10.6511 14.166C10.4682 14.166 10.3105 14.0998 10.178 13.9673L5.07416 8.8532C4.95365 8.73269 4.86434 8.59765 4.80621 8.44808C4.7481 8.2985 4.71905 8.14893 4.71905 7.99937C4.71905 7.8498 4.7481 7.70023 4.80621 7.55065C4.86434 7.40108 4.95365 7.26604 5.07416 7.14553L10.1883 2.03143C10.3207 1.89896 10.4767 1.83442 10.6562 1.83783C10.8357 1.84125 10.9917 1.9092 11.1241 2.04168C11.2566 2.17416 11.3229 2.33185 11.3229 2.51475C11.3229 2.69765 11.2566 2.85534 11.1241 2.98782L6.1126 7.99937Z"
            fill={`${theme === 'dark' ? '#fff' : '#000'}`}
          />
        </svg>
        <p>돌아가기</p>
      </div>
      <EditProfileForm />
      <EditPasswordForm />
    </main>
  );
}
