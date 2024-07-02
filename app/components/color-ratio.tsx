interface ColorRadioProps {
  color: 'red' | 'green' | 'purple' | 'orange' | 'sky' | 'pink';
  value: string;
  cssColor: string;
  register: (color: string) => void;
}

export default function ColorRadio({
  color,
  value,
  cssColor,
  register,
}: ColorRadioProps) {
  return (
    <label>
      <input
        className={`h-[30px] w-[30px] cursor-pointer appearance-none rounded-full checked:bg-black ${cssColor}`}
        type="radio"
        name="color"
        value={value}
        onChange={() => register(value)}
      />
      <span className="sr-only">{color}</span>
    </label>
  );
}
