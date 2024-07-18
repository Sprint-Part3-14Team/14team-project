'use client';

import { useRouter } from 'next/navigation';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  return (
    <div className="m-14">
      <h2 className="mb-7 text-3xl">{error.message}</h2>
      <button
        type="button"
        className="rounded-sm border border-solid border-primary px-5 py-3"
        onClick={() => router.back()}
      >
        돌아가기
      </button>
    </div>
  );
}
