import React from 'react';

interface ColorPickerProps {
  register: any;
}

export default function ColorPicker({ register }: ColorPickerProps) {
  return (
    <div>
      <input
        {...register('color2')}
        type="color"
        className="h-[30px] w-[30px] cursor-pointer appearance-none rounded-full border border-gray-400 bg-white p-0.5"
        id="hs-color-input"
        title="색상 선택"
      />
    </div>
  );
}
