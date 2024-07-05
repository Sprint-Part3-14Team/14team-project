import ColorPicker from '@/app/components/color-picker';
import { DASHBOARD_COLOR_LIST } from '@/constants/DASHBOARD_COLOR_LIST';

import ColorRadio from './color-radio';

interface ColorListProps {
  className: string;
  register: any;
}

export default function ColorList({ className, register }: ColorListProps) {
  return (
    <div className={`absolute flex gap-3 ${className}`}>
      <ColorRadio
        color="red"
        value={DASHBOARD_COLOR_LIST.RED}
        cssColor="bg-red-primary"
        register={register}
      />
      <ColorRadio
        color="green"
        value={DASHBOARD_COLOR_LIST.GREEN}
        cssColor="bg-green-primary"
        register={register}
      />
      <ColorRadio
        color="purple"
        value={DASHBOARD_COLOR_LIST.PURPLE}
        cssColor="bg-purple-primary"
        register={register}
      />
      <ColorRadio
        color="orange"
        value={DASHBOARD_COLOR_LIST.ORANGE}
        cssColor="bg-orange-primary"
        register={register}
      />
      <ColorRadio
        color="sky"
        value={DASHBOARD_COLOR_LIST.SKY}
        cssColor="bg-blue-primary"
        register={register}
      />
      <ColorRadio
        color="pink"
        value={DASHBOARD_COLOR_LIST.PINK}
        cssColor="bg-pink-primary"
        register={register}
      />
      <ColorPicker register={register} />
    </div>
  );
}
