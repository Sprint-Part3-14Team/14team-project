'use client';

interface DeleteButtonProps {
  listType: 'member' | 'invitation';
}

export default function DeleteButton({ listType }: DeleteButtonProps) {
  return (
    <button
      className="h-7 w-[52px] rounded border border-gray-300 text-xs text-violet-primary md:h-8 md:w-[84px] md:text-sm"
      type="button"
      onClick={() => {}}
    >
      {listType === 'member' ? '삭제' : '취소'}
    </button>
  );
}
