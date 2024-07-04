'use client';

import Dropdown from '@/app/components/dropdown';
import ProfileImage from '@/app/components/profile/profile-image';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { DashboardMembers } from '@/types/members';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface AssigneeUserDropdownProps {
  dashboardId: string;
  isEdit?: boolean;
  assigneeUserId?: number;
}

export default function AssigneeUserDropdown({
  dashboardId,
  isEdit,
  assigneeUserId,
}: AssigneeUserDropdownProps) {
  const token = getCookie('token');
  const [members, setMembers] = useState<DashboardMembers[]>([]);
  const [selectedMember, setSelectedMember] = useState<DashboardMembers | null>(
    null
  );

  const { register, setValue } = useFormContext();

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
      // NOTE - 수정하기인 경우 기본값
      if (isEdit && assigneeUserId) {
        const assignedMember = data.members.find(
          (member: DashboardMembers) => member.userId === assigneeUserId
        );
        setSelectedMember(assignedMember || null);
      }
    } else {
      console.error('Failed to fetch members:', res.statusText);
    }
  }

  const handleItemClick = (userId: number) => {
    // 선택된 담당자 ID를 react-hook-form 필드에 설정
    setValue('assigneeUserId', userId);
    console.log('선택된 담당자 ID:', userId);
  };

  useEffect(() => {
    getMember();
  }, [dashboardId]);

  return (
    <div className="flex flex-col gap-y-2 md:w-1/2">
      <p className="text-base font-medium md:text-lg">담당자</p>
      <Dropdown>
        <Dropdown.Toggle>
          {selectedMember ? (
            <div className="flex h-full w-full cursor-pointer items-center gap-2">
              <ProfileImage
                profileImageUrl={selectedMember.profileImageUrl}
                nickname={selectedMember.nickname}
                id={selectedMember.userId}
                size="26px"
              />
              <p className="text-sm font-normal text-gray-700">
                {selectedMember.nickname}
              </p>
            </div>
          ) : (
            <p className="text-sm font-normal text-gray-400">
              이름을 입력해 주세요
            </p>
          )}
        </Dropdown.Toggle>
        <Dropdown.List>
          {members.map((member) => (
            <Dropdown.Item key={member.userId}>
              <div
                className="flex h-full w-full cursor-pointer items-center gap-2"
                onClick={() => handleItemClick(member.userId)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleItemClick(member.userId);
                  }
                }}
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
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      </Dropdown>
    </div>
  );
}
