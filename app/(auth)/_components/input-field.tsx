interface InputFieldProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  register: any;
}

export default function InputField({
  id,
  label,
  type,
  placeholder,
  register,
}: InputFieldProps) {
  return (
    <div className="mb-4 flex flex-col gap-y-2">
      <label htmlFor={id}>{label}</label>
      <input
        {...register(id)}
        type={type}
        placeholder={placeholder}
        id={id}
        className="h-[50px] rounded-lg border border-gray-300 p-4 placeholder:text-gray-400"
      />
    </div>
  );
}
