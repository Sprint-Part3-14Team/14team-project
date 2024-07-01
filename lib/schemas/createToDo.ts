import * as yup from 'yup';

export const createTodoSchema = yup.object().shape({
  assigneeUserId: yup.number().required('담당자를 선택해 주세요.'),
  title: yup
    .string()
    .required('제목을 입력해 주세요')
    .max(10, '제목은 최대 10글자까지 입력 가능합니다.'),
  description: yup.string().required('설명을 입력해 주세요'),
  dueDate: yup.string(),
  tags: yup.array(),
  imageUrl: yup.string(),
});
