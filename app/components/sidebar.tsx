import logoSmall from '@/public/images/logo-small.svg';
import Image from 'next/image';

export default function Sidebar() {
  return (
    <aside className="fixed h-full w-67 border-r border-gray-300">
      <div className="my-5 flex flex-col items-center justify-center">
        <button className="mb-9" type="button">
          <Image src={logoSmall} width={24} height={28} alt="로고" />
        </button>
        {/* // TODO - 프로필 section */}
        <section />
        {/* // NOTE - 대시보드 리스트 section */}
        <section>
          <ul>
            <li>1</li>
            <li>2</li>
          </ul>
        </section>
      </div>
    </aside>
  );
}
