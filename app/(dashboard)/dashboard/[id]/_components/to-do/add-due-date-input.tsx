import calendar from '@/public/icons/icon_calendar.svg';
import { format as formatDate } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext } from 'react-hook-form';

interface AddDueDateInputProps {
  dueDateValue?: string | null;
  isEdit: boolean;
}

export default function AddDueDateInput({
  dueDateValue,
  isEdit,
}: AddDueDateInputProps) {
  const { register, setValue } = useFormContext();
  // NOTE - 초기값 null : 어떤 날짜도 선택되지 않았음 표시
  const [dateValue, setDateValue] = useState<Date | null>(null);

  // NOTE - datepicker의 onChange
  // NOTE - (property) onChange: (date: Date | null) => void
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = formatDate(date, 'yyyy-MM-dd HH:mm');
      setValue('dueDate', formattedDate, { shouldDirty: true });
    } else {
      setValue('dueDate', '', { shouldDirty: true });
    }
    if (date !== dateValue) {
      // 상태가 바뀌었을 때만 업데이트
      setDateValue(date);
    }
  };

  useEffect(() => {
    if (dueDateValue && isEdit) {
      setDateValue(new Date(dueDateValue));
    } else {
      setDateValue(null);
    }
  }, [dueDateValue, isEdit]);

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor="dueDate">마감일</label>
      <div className="relative">
        <DatePicker
          shouldCloseOnSelect
          showTimeSelect
          selected={dateValue}
          dateFormat="yyyy/MM/dd HH:mm"
          {...register('dueDate')}
          id="dueDate"
          onChange={handleDateChange}
          className="h-[50px] rounded-lg border border-gray-300 py-4 pl-[46px] pr-4 placeholder:text-gray-400"
          placeholderText="날짜를 입력해 주세요"
          minDate={new Date()} // NOTE - 오늘 이전의 날짜 선택 불가능하게 설정
        />
        <Image
          src={calendar}
          alt="마감일 달력"
          className="absolute left-[23px] top-[50%] translate-y-[-50%]"
        />
      </div>
    </div>
  );
}
