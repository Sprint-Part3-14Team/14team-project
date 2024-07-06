interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  register: any;
  error?: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}

export default function InputField({
  id,
  label,
  type,
  placeholder,
  register,
  error,
  disabled,
  className,
  labelClassName,
}: InputFieldProps) {
  const inputClassName =
    className ||
    'h-[50px] rounded-lg border border-gray-700 p-4 placeholder:text-gray-400';
  return (
    <div className="mb-4 flex flex-col gap-y-2">
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      <input
        {...register(id)}
        type={type}
        placeholder={placeholder}
        id={id}
        className={inputClassName}
        disabled={disabled}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
