import * as yup from 'yup';

const inviteEmailSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식으로 작성해 주세요.')
    .required('이메일을 입력해 주세요.'),
});

export default inviteEmailSchema;
