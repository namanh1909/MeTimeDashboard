import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputFormProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
  ({ className, type, placeholder, ...props }, ref) => {
    return (
      <div>
        {placeholder && (
          <label className="block text-sm font-medium text-gray-700 my-2">
            {placeholder}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
      </div>
    );
  },
);
InputForm.displayName = 'InputForm';

export { InputForm };
