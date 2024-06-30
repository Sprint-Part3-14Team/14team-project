'use client';

import Dropdown from '@/app/components/dropdown';
import ProfileImage from '@/app/components/profile/profile-image';
import { TEAM_BASE_URL } from '@/constants/TEAM_BASE_URL';
import { DashboardMembers } from '@/types/members';
import { getCookie } from 'cookies-next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AssigneeUserDropdown() {
  const { id } = useParams<{ id: string }>();
  const token = getCookie('token');
  const [members, setMembers] = useState<DashboardMembers[]>([]);

  // NOTE - 대시보드 참여 멤버 목록
  const params = new URLSearchParams({
    dashboardId: id.toString(),
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
  }, [id]);

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle />
        <Dropdown.List>
          {members.map((member) => (
            <Dropdown.Item key={member.id}>
              <div className="flex items-center gap-2">
                <ProfileImage
                  profileImageUrl={member.profileImageUrl}
                  nickname={member.nickname}
                  id={member.id}
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
