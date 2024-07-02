'use client';

import PageButton from '@/app/components/pagination/page-button';
import { EDIT_PAGE_DATA_SIZE } from '@/constants/TEAM_BASE_URL';
import { Invitation } from '@/types/invitations';
import { useEffect, useState } from 'react';

import { getInvitation } from '../../actions';
import InvitationCard from './invitation-card';

interface InvitationListProps {
  dashboardId: number;
  initialData: Invitation[];
}

export default function InvitationList({
  dashboardId,
  initialData,
}: InvitationListProps) {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [dataList, setDataList] = useState<Invitation[]>(initialData);

  async function getData() {
    const data = await getInvitation(page, dashboardId);
    const { invitations } = data;
    setDataList(invitations);
    const { totalCount } = data;
    setLastPage(Math.ceil(totalCount / EDIT_PAGE_DATA_SIZE));
  }

  const deleteData = (invitationId: number) => {
    const nextData: Invitation[] = dataList.filter(
      (data) => data.id !== invitationId
    );
    setDataList(nextData);
  };

  const handleForward = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => (prev !== lastPage ? prev + 1 : prev));
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <>
      <ul>
        {dataList?.map((data: Invitation) => (
          <InvitationCard
            key={data.id}
            dashboardId={dashboardId}
            invitation={data}
            deleteHandler={deleteData}
          />
        ))}
      </ul>

      <div className="absolute right-9 top-8">
        <span className="mr-4 text-sm">
          {lastPage || 1} 페이지 중 {page}
        </span>
        <PageButton
          goToForward={handleForward}
          goToNext={handleNext}
          currentPage={page}
          totalPage={lastPage}
        />
      </div>
    </>
  );
}
