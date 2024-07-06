/* eslint-disable */
'use client';

import ColumnTag from '@/app/components/column-tag';
import Dropdown from '@/app/components/dropdown';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { ColumnData } from '@/types/card';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

/* eslint-disable */

/* eslint-disable */

interface ColumnDropdownProps {
  dashboardId: string;
  columnId: number;
}

export default function ColumnDropdown({
  dashboardId,
  columnId,
}: ColumnDropdownProps) {
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const token = getCookie('token');

  const { register, setValue } = useFormContext();

  async function getColumns() {
    const res = await fetch(
      `${TEAM_BASE_URL}/columns?dashboardId=${dashboardId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const { data } = await res.json();
    setColumns(data);
  }

  const handleItemClick = (id: number) => {
    setValue('columnId', id, { shouldDirty: true });
  };

  useEffect(() => {
    getColumns();
  }, [getColumns]);

  return (
    <div className="flex flex-col gap-y-2 md:w-1/2">
      <p className="text-base font-medium md:text-lg">상태</p>
      <Dropdown>
        <Dropdown.Toggle>
          <div className="flex h-full w-full cursor-pointer items-center">
            <ColumnTag
              title={
                columns.find((column) => column.id === columnId)?.title ??
                'Default Title'
              }
            />
          </div>
        </Dropdown.Toggle>
        <Dropdown.List>
          {columns.map((column) => (
            <Dropdown.Item key={column.id}>
              <div
                className="flex h-full w-full cursor-pointer items-center"
                onClick={() => handleItemClick(column.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleItemClick(column.id);
                  }
                }}
              >
                <input
                  className="appearance-none"
                  type="radio"
                  id={`columnId-${column.id}`}
                  value={column.id}
                  {...register('columnId')}
                />
                <ColumnTag title={column.title} />
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      </Dropdown>
    </div>
  );
}
