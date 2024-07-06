import { useFormContext } from 'react-hook-form';

export default function AddToDoTitleInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mb-4 flex flex-col gap-y-2">
      <label htmlFor="title" className="text-base font-medium md:text-lg">
        제목
      </label>
      <input
        type="text"
        placeholder="제목을 입력해 주세요"
        className="h-[50px] rounded-lg border border-gray-700 p-4 placeholder:text-gray-400"
        {...register('title')}
      />
      {errors.title && typeof errors.title.message === 'string' && (
        <p className="text-red-500">{errors.title.message}</p>
      )}
    </div>
  );
}
