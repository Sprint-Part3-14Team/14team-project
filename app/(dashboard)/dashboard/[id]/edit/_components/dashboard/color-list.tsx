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
        value="#D6173A"
        cssColor="bg-red-primary"
        register={register}
      />
      <ColorRadio
        color="green"
        value="#7AC555"
        cssColor="bg-green-primary"
        register={register}
      />
      <ColorRadio
        color="purple"
        value="#760DDE"
        cssColor="bg-purple-primary"
        register={register}
      />
      <ColorRadio
        color="orange"
        value="#FFA500"
        cssColor="bg-orange-primary"
        register={register}
      />
      <ColorRadio
        color="sky"
        value="#76A5EA"
        cssColor="bg-blue-primary"
        register={register}
      />
      <ColorRadio
        color="pink"
        value="#E876EA"
        cssColor="bg-pink-primary"
        register={register}
      />
    </div>
  );
}
