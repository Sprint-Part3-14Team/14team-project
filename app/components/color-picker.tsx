import React from 'react';

interface ColorPickerProps {
  register: any;
  setValue: any;
  onColorChange: (color: string) => void;
}

export default function ColorPicker({
  register,
  setValue,
  onColorChange,
}: ColorPickerProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setValue('color', color);
    onColorChange(color);
  };

  return (
    <div>
      <input
        {...register('color2', { require: true })}
        type="color"
        className="h-[30px] w-[30px] cursor-pointer appearance-none rounded-full border border-gray-600 bg-background p-0.5"
        id="hs-color-input"
        title="색상 선택"
        onChange={handleChange}
      />
    </div>
  );
}
