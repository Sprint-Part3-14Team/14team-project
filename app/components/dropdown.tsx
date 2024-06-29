'use client';

import Image from 'next/image';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedItem: React.ReactNode;
  setSelectedItem: (selectedItem: React.ReactNode) => void;
}

const DropdownContext = createContext<DropdownContextType | null>(null);

function Item({ children }: { children: React.ReactNode }) {
  const { setIsOpen, setSelectedItem, selectedItem } = useContext(
    DropdownContext
  ) as DropdownContextType;

  const handleClick = () => {
    setIsOpen(false);
    setSelectedItem(children);
  };

  const isSelected = selectedItem === children;

  return (
    // eslint-disable-next-line
    <li
      onClick={handleClick}
      className={`flex h-[48px] w-full cursor-pointer items-center border-b px-4 first:rounded-t-md last:rounded-b-md last:border-b-0 ${isSelected ? 'bg-red-500' : ''}`}
    >
      {children}
    </li>
  );
}

function List({ children }: { children: React.ReactNode }) {
  const { isOpen } = useContext(DropdownContext) as DropdownContextType;

  return (
    <div>
      {isOpen && <ul className="mt-2 rounded-md border">{children}</ul>}
    </div>
  );
}

function Toggle() {
  const { isOpen, setIsOpen, selectedItem } = useContext(
    DropdownContext
  ) as DropdownContextType;

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      role="button"
      tabIndex={0}
      onClick={() => setIsOpen(!isOpen)}
      className="flex h-[48px] w-full items-center justify-between rounded-md border px-4"
    >
      {selectedItem || <p>표시할 아이템 + 스타일링</p>}
      <Image
        src="/icons/arrow_down.svg"
        alt={isOpen ? '드롭다운 닫기' : '드롭다운 열기'}
        width={26}
        height={26}
      />
    </div>
  );
}

function Dropdown({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<React.ReactNode>(null);

  // 드롭다운 외부를 클릭하면 사라지는 Ref
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      // ul 즉 아이템 리스트가 있고 리스트 안에 클릭한 게 없으면 닫힘
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', onClickOutside);
    return () => window.removeEventListener('mousedown', onClickOutside);
  }, [setIsOpen]);

  const value = useMemo(
    () => ({ isOpen, setIsOpen, selectedItem, setSelectedItem }),
    [isOpen, selectedItem]
  );

  return (
    <DropdownContext.Provider value={value}>
      <div ref={dropdownRef}>{children}</div>
    </DropdownContext.Provider>
  );
}

Dropdown.Toggle = Toggle;
Dropdown.List = List;
Dropdown.Item = Item;

export default Dropdown;
