import React from 'react';

interface ColorRadioProps {
  color: 'red' | 'green' | 'purple' | 'orange' | 'sky' | 'pink';
  value: string;
  register: any;
  onClick: () => void;
}

export default function ColorRadio({
  color,
  value,
  register,
  onClick,
}: ColorRadioProps) {
  return (
    <label>
      <input
        {...register('color')}
        className={`h-[30px] w-[30px] cursor-pointer appearance-none rounded-full bg-center checked:bg-[url('/icons/checked.svg')]`}
        type="radio"
        name="color"
        value={value}
        style={{ backgroundColor: value }}
        onClick={onClick}
      />
      <span className="sr-only">{color}</span>
    </label>
  );
}
