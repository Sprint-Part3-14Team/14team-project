/* eslint-disable */
import { KeyboardEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function AddTagInput() {
  const [tags, setTags] = useState<string[]>([]);
  const { register, setValue } = useFormContext();

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = (e.target as HTMLInputElement).value.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
        (e.target as HTMLInputElement).value = '';
      }
    }
  }

  function handleRemoveTag(index: number) {
    tags.splice(index, 1);
    setTags(tags);
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
        className="h-[50px] rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
        onKeyDown={handleKeyDown}
        // {...register('tags')}
      />
      <div className="flex gap-1">
        {tags.map((tag: string, index: number) => (
          <div key={tag} className="flex">
            <p>{tag}</p>
            <button type="button" onClick={() => handleRemoveTag(index)}>
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
