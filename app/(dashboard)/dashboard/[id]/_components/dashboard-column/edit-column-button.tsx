import Image from 'next/image';

export default function EditColumnButton() {
  return (
    <button
      type="button"
      className="relative size-[22px] md:size-6"
      aria-label="설정"
    >
      <Image src="/icons/setting_icon.svg" alt="설정" fill />
    </button>
  );
}
