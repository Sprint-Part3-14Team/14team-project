'use client';

import PageButton from '@/app/components/pagination/page-button';
import { EDIT_PAGE_DATA_SIZE } from '@/constants/TEAM_BASE_URL';
import { DashboardMembers } from '@/types/members';
import { useEffect, useState } from 'react';

import { getMember } from '../../actions';
import MemberCard from './member-card';

interface MemberListProps {
  dashboardId: number;
  initialData: DashboardMembers[];
}

export default function MemberList({
  dashboardId,
  initialData,
}: MemberListProps) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [dataList, setDataList] = useState<DashboardMembers[]>(initialData);

  async function getData() {
    const data = await getMember(page, dashboardId);
    const { members } = data;
    setDataList(members);
    const { totalCount } = data;
    setTotal(totalCount);
  }

  const handleForward = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) =>
      prev !== Math.ceil(total / EDIT_PAGE_DATA_SIZE) ? prev + 1 : prev
    );
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <>
      <ul>
        {dataList?.map((data: DashboardMembers) => (
          <MemberCard key={data.id} member={data} memberId={data.id} />
        ))}
      </ul>

      <div className="absolute right-9 top-8">
        <span className="mr-4 text-sm">
          {Math.ceil(total / EDIT_PAGE_DATA_SIZE)} 페이지 중 {page}
        </span>
        <PageButton goToForward={handleForward} goToNext={handleNext} />
      </div>
    </>
  );
}
