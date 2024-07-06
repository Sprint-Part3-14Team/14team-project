import { DASHBOARD_COLOR_LIST } from '@/constants/DASHBOARD_COLOR_LIST';

import ColorRadio from './color-radio';

interface ColorListProps {
  className: string;
  register: any;
  setValue: any;
  onColorChange: (color: string) => void;
}

export default function ColorList({
  className,
  register,
  setValue,
  onColorChange,
}: ColorListProps) {
  const handleColorClick = (color: string) => {
    setValue('color', color);
    onColorChange(color);
  };

  return (
    <div className={`absolute flex gap-3 ${className}`}>
      <ColorRadio
        color="red"
        value={DASHBOARD_COLOR_LIST.RED}
        cssColor="bg-red-primary"
        register={register}
        onClick={() => handleColorClick(DASHBOARD_COLOR_LIST.RED)}
      />
      <ColorRadio
        color="green"
        value={DASHBOARD_COLOR_LIST.GREEN}
        cssColor="bg-green-primary"
        register={register}
        onClick={() => handleColorClick(DASHBOARD_COLOR_LIST.GREEN)}
      />
      <ColorRadio
        color="purple"
        value={DASHBOARD_COLOR_LIST.PURPLE}
        cssColor="bg-purple-primary"
        register={register}
        onClick={() => handleColorClick(DASHBOARD_COLOR_LIST.PURPLE)}
      />
      <ColorRadio
        color="orange"
        value={DASHBOARD_COLOR_LIST.ORANGE}
        cssColor="bg-orange-primary"
        register={register}
        onClick={() => handleColorClick(DASHBOARD_COLOR_LIST.ORANGE)}
      />
      <ColorRadio
        color="sky"
        value={DASHBOARD_COLOR_LIST.SKY}
        cssColor="bg-blue-primary"
        register={register}
        onClick={() => handleColorClick(DASHBOARD_COLOR_LIST.SKY)}
      />
      <ColorRadio
        color="pink"
        value={DASHBOARD_COLOR_LIST.PINK}
        cssColor="bg-pink-primary"
        register={register}
        onClick={() => handleColorClick(DASHBOARD_COLOR_LIST.PINK)}
      />
    </div>
  );
}
