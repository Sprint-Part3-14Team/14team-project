import * as yup from 'yup';

// 사용자 정의 유효성 검사 함수
const imageFileValidation = (value: any) => {
  if (!value) return true; // 파일이 없는 경우 유효성 검사 통과

  // File 객체인지 확인
  if (value instanceof File) {
    // 이미지 파일인지 MIME 타입으로 확인
    return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
  }

  return false; // 그 외의 경우는 유효하지 않음
};

const createTodoSchema = yup.object().shape({
  assigneeUserId: yup.number().required('담당자를 선택해 주세요.'),
  title: yup
    .string()
    .required('제목을 입력해 주세요')
    .max(10, '제목은 최대 10글자까지 입력 가능합니다.'),
  description: yup.string().required('설명을 입력해 주세요'),
  dueDate: yup.string(),
  imageUrl: yup
    .mixed()
    .test('fileFormat', '이미지 파일 형식이어야 합니다.', imageFileValidation),
});

export default createTodoSchema;
