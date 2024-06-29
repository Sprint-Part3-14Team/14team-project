'use client';

import ProfileImage from '@/app/components/profile/profile-image';

import DeleteButton from './delete-item-button';

interface DataListProps {
  listType: 'member' | 'invitation';
}

export default function DataList({ listType }: DataListProps) {
  // NOTE: 데이터 패칭 로직 추가될 예정
  return (
    <ul>
      {/* NOTE: state로 데이터 매핑될 예정입니다. */}
      <li className="flex items-center justify-between gap-2 border-b border-solid border-gray-200 px-5 py-4 last:border-0 md:px-7 md:py-5">
        {listType === 'member' ? (
          <ProfileImage nickname="test" id={3950} size="34" />
        ) : (
          ''
        )}
        <p className="grow text-left text-sm md:text-base">
          {listType === 'member' ? '김서영' : 'test1234@naver.com'}
        </p>
        <DeleteButton listType={listType} />
      </li>
      <li className="flex items-center justify-between gap-2 border-b border-solid border-gray-200 px-5 py-4 last:border-0 md:px-7 md:py-5">
        {listType === 'member' ? (
          <ProfileImage nickname="test" id={3950} size="34" />
        ) : (
          ''
        )}
        <p className="grow text-left text-sm md:text-base">
          {listType === 'member' ? '김서영' : 'test1234@naver.com'}
        </p>
        <DeleteButton listType={listType} />
      </li>
      <li className="flex items-center justify-between gap-2 border-b border-solid border-gray-200 px-5 py-4 last:border-0 md:px-7 md:py-5">
        {listType === 'member' ? (
          <ProfileImage nickname="test" id={3950} size="34" />
        ) : (
          ''
        )}
        <p className="grow text-left text-sm md:text-base">
          {listType === 'member' ? '김서영' : 'test1234@naver.com'}
        </p>
        <DeleteButton listType={listType} />
      </li>
      <li className="flex items-center justify-between gap-2 border-b border-solid border-gray-200 px-5 py-4 last:border-0 md:px-7 md:py-5">
        {listType === 'member' ? (
          <ProfileImage nickname="test" id={3950} size="34" />
        ) : (
          ''
        )}
        <p className="grow text-left text-sm md:text-base">
          {listType === 'member' ? '김서영' : 'test1234@naver.com'}
        </p>
        <DeleteButton listType={listType} />
      </li>
    </ul>
  );
}
