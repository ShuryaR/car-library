import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-4 py-2 border rounded-lg focus:outline-none focus:ring-2';
  const errorStyles = error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className={`mb-4 ${widthStyle}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        className={`${baseStyles} ${errorStyles} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;
