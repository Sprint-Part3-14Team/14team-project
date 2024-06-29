'use client';

import PageButton from '@/app/components/pagination/page-button';

import SectionTitle from '../section-title';
import DataList from './data-list';

interface DataListContainerProps {
  title: string;
  listTitle: string;
  listType: 'member' | 'invitation';
}

export default function DataListContainer({
  title,
  listTitle,
  listType,
}: DataListContainerProps) {
  return (
    <section className="relative mt-3 rounded-lg bg-white pb-5 xl:w-[620px]">
      <div className="px-5 pt-6 md:px-7 md:pt-8">
        <SectionTitle text={title} />
        <h3 className="mb-5 mt-6 text-sm text-gray-400 md:mb-6 md:mt-8 md:text-base">
          {listTitle}
        </h3>
      </div>

      <DataList listType={listType} />

      <div className="absolute right-5 top-6">
        <PageButton goToForward={() => {}} goToNext={() => {}} />
      </div>
    </section>
  );
}
