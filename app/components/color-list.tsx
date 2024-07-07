import { DASHBOARD_COLOR_LIST } from '@/constants/DASHBOARD_COLOR_LIST';
import { useEffect } from 'react';

import ColorRadio from './color-radio';

interface ColorListProps {
  className: string;
  register: any;
  setValue: any;
  getValues?: any;
  onColorChange: (color: string) => void;
}

export default function ColorList({
  className,
  register,
  setValue,
  getValues,
  onColorChange,
}: ColorListProps) {
  const handleColorClick = (color: string) => {
    setValue('color', color);
    onColorChange(color);
  };

  useEffect(() => {
    // NOTE - 생성하기인 경우 기본값 설정
    if (!getValues) {
      setValue('color', DASHBOARD_COLOR_LIST.RED);
    }
  }, [DASHBOARD_COLOR_LIST.RED, setValue, getValues]);

  return (
    <div className={`absolute flex gap-3 ${className}`}>
      <ColorRadio
        color="red"
        value={DASHBOARD_COLOR_LIST.RED}
        register={register}
        onClick={() => handleColorClick(DASHBOARD_COLOR_LIST.RED)}
      />
      <ColorRadio
        color="green"
        value={DASHBOARD_COLOR_LIST.GREEN}
        register={register}
        onClick={() => handleColorClick(DASHBOARD_COLOR_LIST.GREEN)}
      />
      <ColorRadio
        color="purple"
        value={DASHBOARD_COLOR_LIST.PURPLE}
        register={register}
        onClick={() => handleColorClick(DASHBOARD_COLOR_LIST.PURPLE)}
      />
      <ColorRadio
        color="orange"
        value={DASHBOARD_COLOR_LIST.ORANGE}
        register={register}
        onClick={() => handleColorClick(DASHBOARD_COLOR_LIST.ORANGE)}
      />
      <ColorRadio
        color="sky"
        value={DASHBOARD_COLOR_LIST.SKY}
        register={register}
        onClick={() => handleColorClick(DASHBOARD_COLOR_LIST.SKY)}
      />
      <ColorRadio
        color="pink"
        value={DASHBOARD_COLOR_LIST.PINK}
        register={register}
        onClick={() => handleColorClick(DASHBOARD_COLOR_LIST.PINK)}
      />
    </div>
  );
}
