import * as yup from 'yup';

const editPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, '8자 이상 입력해 주세요.')
    .required('비밀번호를 입력해 주세요.'),
  newPassword: yup
    .string()
    .min(8, '8자 이상 입력해 주세요.')
    .required('새 비밀번호를 입력해 주세요.'),
  newPasswordConfimation: yup
    .string()
    .oneOf([yup.ref('newPassword')], '새 비밀번호가 일치하지 않습니다.')
    .required('새 비밀번호를 입력해 주세요.'),
});

export default editPasswordSchema;
