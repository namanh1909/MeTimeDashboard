import React, { useRef } from 'react';
import { Icons } from '@/components/icons/icons';
import { Controller, Control } from 'react-hook-form';

type ImagePickerProps = {
  control: Control<any>;
  name: string;
};

const ImagePicker: React.FC<ImagePickerProps> = ({ control, name }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearImage = (onChange: (value: any) => void) => {
    onChange(null);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div className="relative border border-gray-200 w-36 h-36 p-1 flex items-center justify-center">
          {!value && (
            <Icons.fileImage
              onClick={handleIconClick}
              className="cursor-pointer w-24 h-24 rounded-full"
            />
          )}
          <input
            type="file"
            accept="image/png, image/jpg"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files?.[0];
              if (file) {
                onChange(file);
              }
            }}
            ref={fileInputRef}
            className="hidden"
          />
          {value && (
            <>
              <img
                onClick={handleIconClick}
                src={
                  typeof value === 'string'
                    ? `http://localhost:8090/${value}`
                    : URL.createObjectURL(value)
                }
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <Icons.close
                onClick={() => handleClearImage(onChange)}
                className="absolute top-1 right-1 cursor-pointer text-red-500"
              />
            </>
          )}
        </div>
      )}
    />
  );
};

export { ImagePicker };
