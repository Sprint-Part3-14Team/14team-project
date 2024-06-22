import visibilityIcon from '@/public/icons/icon_visibility.png';
import Image from 'next/image';

interface PasswordInputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  register: any;
  passwordShown: boolean;
  togglePasswordVisibility: () => void;
  error: string;
}

export default function PasswordInputField({
  id,
  label,
  placeholder,
  register,
  passwordShown,
  togglePasswordVisibility,
  error,
}: PasswordInputFieldProps) {
  return (
    <div className="relative mb-4 flex flex-col gap-y-2">
      <label htmlFor={id}>{label}</label>
      <div className="relative flex flex-col">
        <input
          {...register(id)}
          type={passwordShown ? 'text' : 'password'}
          placeholder={placeholder}
          id={id}
          className="h-[50px] rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
        />
        <button
          className="absolute bottom-[25px] right-4 translate-y-1/2 cursor-pointer"
          onClick={togglePasswordVisibility}
          type="button"
        >
          <Image
            src={visibilityIcon}
            alt="password visibility icon"
            width={24}
            height={24}
          />
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
