import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식으로 작성해 주세요.')
    .required('이메일을 입력해 주세요.'),
  password: yup
    .string()
    .min(8, '8자 이상 입력해 주세요.')
    .required('비밀번호를 입력해 주세요.'),
});

export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email('이메일 형식으로 작성해 주세요.')
    .required('이메일을 입력해 주세요.'),
  nickname: yup.string().required('닉네임을 입력해 주세요.'),
  password: yup
    .string()
    .min(8, '8자 이상 입력해 주세요.')
    .required('비밀번호를 입력해 주세요.'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호를 입력해 주세요.'),
  terms: yup
    .boolean()
    .oneOf([true], '이용약관에 동의해 주세요.')
    .required('이용약관에 동의해 주세요.'),
});
