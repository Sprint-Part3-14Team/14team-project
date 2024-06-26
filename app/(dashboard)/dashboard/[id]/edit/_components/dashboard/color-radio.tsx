interface ColorRadioProps {
  color: 'red' | 'green' | 'purple' | 'orange' | 'sky' | 'pink';
  value: string;
  cssColor: string;
  register: any;
}

export default function ColorRadio({
  color,
  value,
  cssColor,
  register,
}: ColorRadioProps) {
  const listClassName = `h-[30px] w-[30px] cursor-pointer rounded-full appearance-none checked:bg-black`;
  return (
    <label>
      <input
        {...register('color')}
        className={`${listClassName} ${cssColor}`}
        type="radio"
        name="color"
        value={value}
      />
      <span className="sr-only">{color}</span>
    </label>
  );
}
