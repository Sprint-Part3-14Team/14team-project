'use client';

import Dropdown from '@/app/components/dropdown';

export default function AssigneeUserDropdown() {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle />
        <Dropdown.List>
          <Dropdown.Item>
            <p>서영</p>
          </Dropdown.Item>
          <Dropdown.Item>
            <p>서영22</p>
          </Dropdown.Item>
        </Dropdown.List>
      </Dropdown>
    </div>
  );
}
