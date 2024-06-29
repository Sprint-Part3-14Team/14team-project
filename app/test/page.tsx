'use client';

import Dropdown from '@/app/components/dropdown';

// 사용방법 : Dropdown.Item에 들어갈 컴포넌트를 mapping시키면 됩니다.

export default function Test() {
  return (
    <div className="w-[400px] p-10">
      <Dropdown>
        <Dropdown.Toggle />
        <Dropdown.List>
          <Dropdown.Item>
            <p className="text-red-600">아이템1</p>
          </Dropdown.Item>
          <Dropdown.Item>
            <p className="text-green-600">아이템2</p>
          </Dropdown.Item>
          <Dropdown.Item>
            <p className="text-blue-600">아이템3</p>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </div>
  );
}
