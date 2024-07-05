import { MyEmail } from '@/app/(dashboard)/dashboard/[id]/_components/dashboard-navbar/actions';
import * as yup from 'yup';

const inviteEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식으로 작성해 주세요.')
    .required('이메일을 입력해 주세요.')
    .test('is-self-email', '본인은 초대할 수 없습니다.', async (value) => {
      const myEmail = await MyEmail();
      return value !== myEmail;
    }),
});

export default inviteEmailSchema;
