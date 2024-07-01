'use client';

import Dropdown from '@/app/components/dropdown';
import ProfileImage from '@/app/components/profile/profile-image';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { DashboardMembers } from '@/types/members';
import { toDoCardValue } from '@/types/toDoCard';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface AssigneeUserDropdownProps {
  dashboardId: string;
  onSelectAssignee: (assigneeId: number) => void;
  register: UseFormRegister<toDoCardValue>;
}

export default function AssigneeUserDropdown({
  dashboardId,
  onSelectAssignee,
  register,
}: AssigneeUserDropdownProps) {
  const token = getCookie('token');
  const [members, setMembers] = useState<DashboardMembers[]>([]);

  // NOTE - 대시보드 참여 멤버 목록
  const params = new URLSearchParams({
    dashboardId: dashboardId.toString(),
    page: '1',
    size: '10',
  });

  async function getMember() {
    const res = await fetch(`${TEAM_BASE_URL}/members?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    // TODO - 에러 핸들링
    if (res.ok) {
      const data = await res.json();
      setMembers(data.members);
    } else {
      console.error('Failed to fetch members:', res.statusText);
    }
  }

  useEffect(() => {
    getMember();
  }, [dashboardId]);

  function handleAssigneeChange(userId: number) {
    onSelectAssignee(userId); // 선택된 담당자 ID를 부모 컴포넌트로 전달
    console.log('선택된 담당자 ID:', userId);
  }

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle>이름을 입력해 주세요</Dropdown.Toggle>
        <Dropdown.List>
          {members.map((member) => (
            <Dropdown.Item
              key={member.userId}
              onClick={() => handleAssigneeChange(member.userId)}
            >
              <label
                htmlFor={`assigneeUserId-${member.userId}`}
                className="flex cursor-pointer items-center gap-2"
              >
                <input
                  className="appearance-none"
                  type="radio"
                  id={`assigneeUserId-${member.userId}`}
                  value={member.userId}
                  {...register('assigneeUserId')}
                />

                <ProfileImage
                  profileImageUrl={member.profileImageUrl}
                  nickname={member.nickname}
                  id={member.userId}
                  size="26px"
                />
                <p className="text-sm font-normal text-gray-700">
                  {member.nickname}
                </p>
              </label>
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      </Dropdown>
    </div>
  );
}
