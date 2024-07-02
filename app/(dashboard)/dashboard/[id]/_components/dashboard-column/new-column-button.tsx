'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function NewColumnButton() {
  return (
    <div>
      <Link
        href="#!"
        className="flex h-[60px] items-center justify-center gap-x-3 rounded-lg border border-gray-300 bg-white py-6 font-bold xl:w-[354px]"
      >
        새로운 컬럼 추가하기
        <div className="relative size-5 md:size-[22px]">
          <Image
            src="/icons/icon_add_column.svg"
            alt="새로운 컬럼 추가하기"
            fill
            sizes="100vw"
          />
        </div>
      </Link>
    </div>
  );
}
