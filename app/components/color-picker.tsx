import React from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

export default function ColorPicker({
  value,
  onChange,
  disabled = false,
}: ColorPickerProps): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <input
        type="color"
        className="h-[30px] w-[30px] cursor-pointer appearance-none rounded-full border border-gray-600 bg-background p-0.5"
        id="hs-color-input"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        title="색상 선택"
      />
    </div>
  );
}
