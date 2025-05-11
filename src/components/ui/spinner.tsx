import React from 'react';
import { Spinner as RadixSpinner } from '@radix-ui/themes';

interface SpinnerProps {
  loading: boolean;
  children?: React.ReactNode;
}

const Spinner: React.FC<SpinnerProps> = ({ loading, children }) => {
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
          <RadixSpinner size="3" />
        </div>
      )}
      <div className={loading ? 'opacity-50' : ''}>{children}</div>
    </div>
  );
};

export { Spinner };
