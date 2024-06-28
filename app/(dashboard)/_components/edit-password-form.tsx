import Button from '@/app/components/button';
import InputField from '@/app/components/input-field';
import editPasswordSchema from '@/lib/schemas/profileUpdate';
import { EditPassword } from '@/types/profileUpdate';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import editPassword from '../mypage/actions';

export default function EditPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EditPassword>({
    resolver: yupResolver(editPasswordSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<EditPassword> = async (data) => {
    const { password, newPassword } = data;
    const res = await editPassword(password, newPassword);
    // NOTE - res.message로 상태를 나타낼 수 있게 하였습니다.
    console.log(res.message);
  };

  return (
    <div className="mt-6 rounded-lg bg-white p-5">
      <p className="text-xl font-bold md:text-2xl">비밀번호 변경</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-6 flex w-full flex-col"
      >
        <InputField
          id="password"
          label="현재 비밀번호"
          type="password"
          placeholder="현재 비밀번호 입력"
          register={register}
          error={errors.password?.message || ''}
        />
        <InputField
          id="newPassword"
          label="새 비밀번호"
          type="password"
          placeholder="새 비밀번호 입력"
          register={register}
          error={errors.newPassword?.message || ''}
        />
        <InputField
          id="newPasswordConfimation"
          label="새 비밀번호 확인"
          type="password"
          placeholder="새 비밀번호 입력"
          register={register}
          error={errors.newPasswordConfimation?.message || ''}
        />
        <Button
          type="submit"
          variant="mobile84x28"
          className="ml-auto mt-4 rounded bg-violet-primary text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          disabled={!isValid}
        >
          변경
        </Button>
      </form>
    </div>
  );
}
