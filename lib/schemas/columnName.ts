import * as yup from 'yup';

const ColumnNameSchema = (existingColumnTitles: string[]) =>
  yup.object().shape({
    title: yup
      .string()
      .required('칼럼 이름을 입력해주세요.')
      .test(
        'is-unique',
        '중복된 칼럼 이름입니다.',
        (value) => !existingColumnTitles.includes(value || '')
      ),
  });

export default ColumnNameSchema;
