import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ImageInputField({
  id,
  setValue,
  imageUrlValue,
  unregister,
  size,
  setIsChange,
}: {
  id: string;
  setValue: any;
  unregister?: any;
  imageUrlValue?: string | null;
  size?: string;
  setIsChange?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [initialImage, setInitialImage] = useState<string | null>(null);

  useEffect(() => {
    if (imageUrlValue) {
      setInitialImage(imageUrlValue);
    }
  }, [imageUrlValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setValue(id, file);
      if (setIsChange) {
        setIsChange(true);
      }
    }
  };

  const handleImageDelete = () => {
    unregister(id);
    setSelectedImage(null);
    setInitialImage(null);
    if (setIsChange) {
      setIsChange(true);
    }
  };

  return (
    <div>
      {initialImage || selectedImage ? (
        <div
          className="relative size-[100px] md:size-[182px]"
          style={{ width: size, height: size }}
        >
          <Image
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : (initialImage as string)
            }
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
          className="relative inline-block size-[100px] md:size-[182px]"
          style={{ width: size, height: size }}
        >
          <input
            id={id}
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            className="hidden"
          />
          <div className="absolute left-1/2 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 md:size-[30px]">
            <svg
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.5783 16.4221H7.418C7.01898 16.4221 6.68224 16.2848 6.40778 16.0104C6.13332 15.7359 5.99609 15.3992 5.99609 15.0002C5.99609 14.6012 6.13332 14.2645 6.40778 13.99C6.68224 13.7155 7.01898 13.5783 7.418 13.5783H13.5783V7.418C13.5783 7.01898 13.7155 6.68224 13.99 6.40778C14.2645 6.13332 14.6012 5.99609 15.0002 5.99609C15.3992 5.99609 15.7359 6.13332 16.0104 6.40778C16.2848 6.68224 16.4221 7.01898 16.4221 7.418V13.5783H22.5824C22.9814 13.5783 23.3181 13.7155 23.5926 13.99C23.8671 14.2645 24.0043 14.6012 24.0043 15.0002C24.0043 15.3992 23.8671 15.7359 23.5926 16.0104C23.3181 16.2848 22.9814 16.4221 22.5824 16.4221H16.4221V22.5824C16.4221 22.9814 16.2848 23.3181 16.0104 23.5926C15.7359 23.8671 15.3992 24.0043 15.0002 24.0043C14.6012 24.0043 14.2645 23.8671 13.99 23.5926C13.7155 23.3181 13.5783 22.9814 13.5783 22.5824V16.4221Z"
                fill="none"
                className="fill-primary"
              />
            </svg>
          </div>
          <div
            className="size-[100px] cursor-pointer rounded-md bg-secondary-foreground md:size-[182px]"
            style={{ width: size, height: size }}
          />
        </label>
      )}
    </div>
  );
}
