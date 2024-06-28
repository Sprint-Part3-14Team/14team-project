import search from '@/public/icons/search.svg';
import Image from 'next/image';

import InvitationList from './invitation-list';

export default function Invitations() {
  return (
    <section className="mt-6 bg-white px-4 py-6 md:px-7 md:py-8">
      <h2 className="mb-5 text-xl font-bold text-gray-700">
        초대받은 대시보드
      </h2>
      <div className="relative">
        <input
          type="text"
          className="h-9 w-full rounded-md border border-gray-300 py-[10px] pl-[44px] placeholder:text-sm placeholder:text-gray-400"
          placeholder="검색"
        />
        <div className="absolute left-[20px] top-[50%] translate-y-[-50%]">
          <Image src={search} width={16} height={16} alt="검색" />
        </div>
      </div>
      <InvitationList />
    </section>
  );
}
