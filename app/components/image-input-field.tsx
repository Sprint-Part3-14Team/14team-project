import Image from 'next/image';
import { useState } from 'react';

export default function ImageInputField() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <label htmlFor="image-input" className="inline-block size-[100px]">
        {selectedImage ? (
          <div className="relative size-[100px]">
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
          <>
            <input
              id="image-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="size-[100px] cursor-pointer rounded-md bg-gray-200" />
          </>
        )}
      </label>
    </div>
  );
}
