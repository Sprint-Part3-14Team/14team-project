import Tag from '@/app/(dashboard)/_components/tag';
import { KeyboardEvent } from 'react';

interface AddTagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTagInput({
  tags,
  setTags,
  setIsChange,
}: AddTagInputProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        setIsChange(true);
        (e.target as HTMLInputElement).value = '';
      } else {
        // NOTE - 같은 값 입력하는 경우
        (e.target as HTMLInputElement).value = '';
      }
    }
  }

  function handleRemoveTag(index: number) {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
    setIsChange(true);
  }

  return (
    <div className="mb-4 flex flex-col gap-y-2">
      <label htmlFor="tags" className="text-base font-medium md:text-lg">
        태그
      </label>
      <input
        id="tags"
        type="text"
        name="tags"
        placeholder="입력 후 Enter"
        className="h-[50px] rounded-lg border border-gray-700 p-4 placeholder:text-gray-400"
        onKeyDown={handleKeyDown}
      />
      <div className="flex gap-1">
        {tags.map((tag: string, index: number) => (
          <div key={tag} className="flex">
            <Tag tag={tag}>
              <div className="flex items-center gap-1">
                <p>{tag}</p>
                <button
                  type="button"
                  className="text-[#555555]"
                  onClick={() => handleRemoveTag(index)}
                >
                  x
                </button>
              </div>
            </Tag>
          </div>
        ))}
      </div>
    </div>
  );
}
