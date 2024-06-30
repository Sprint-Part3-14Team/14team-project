/* eslint-disable */
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

/* eslint-disable */

/* eslint-disable */

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
      {isOpen && (
        <ul className="absolute z-10 mt-2 w-full rounded-md border bg-white">
          {children}
        </ul>
      )}
    </div>
  );
}

function Toggle() {
  const { isOpen, setIsOpen, selectedItem } = useContext(
    DropdownContext
  ) as DropdownContextType;

  return (
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

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
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
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Toggle = Toggle;
Dropdown.List = List;
Dropdown.Item = Item;

export default Dropdown;
