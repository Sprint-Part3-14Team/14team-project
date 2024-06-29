import Image from 'next/image';
import { useState } from 'react';

export default function ImageInputField({
  id,
  setValue,
}: {
  id: string;
  setValue: any;
}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setValue(id, file);
    }
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
    setValue(id, null);
  };

  return (
    <div>
      {selectedImage ? (
        <div className="relative size-[100px] md:size-[182px]">
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="Selected Image"
            sizes="(min-width: 768px) 100vw"
            fill
            className="rounded-md"
          />
          <button
            type="button"
            onClick={handleImageDelete}
            className="absolute right-0 top-0 size-4"
          >
            x
          </button>
        </div>
      ) : (
        // NOTE - label이 form안에 직접적으로 있어야 하나 x button 동작으로 다시 한번 input되는 문제가 발생하여 eslint disable처리
        // eslint-disable-next-line jsx-a11y/label-has-associated-control
        <label
          htmlFor={id}
          className="inline-block size-[100px] md:size-[182px]"
        >
          <input
            id={id}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            className="hidden"
          />
          <div className="size-[100px] cursor-pointer rounded-md bg-gray-200 md:size-[182px]" />
        </label>
      )}
    </div>
  );
}
