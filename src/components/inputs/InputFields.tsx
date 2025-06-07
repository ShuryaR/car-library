import React, { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, useState } from 'react';
import { Caption } from '../common/Typography';
import { EyeIcon, EyeSlashIcon } from '../icons/Icons';

// --- Common Base Types --- //

/** Base props for all input types */
interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  required?: boolean;
}

// --- Text Input --- //

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>, BaseInputProps {}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  required = false,
  className = '',
  placeholder,
  ...props
}) => {
  const baseStyles = 'px-4 py-3 border rounded-[10px] focus:outline-none focus:ring-2 transition-all font-nunito';
  const errorStyles = error 
    ? 'border-red-500 focus:ring-red-300 bg-red-50' 
    : 'border-gray-200 focus:ring-purple-300 focus:border-purple-500';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className={`mb-4 ${widthStyle}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-800 mb-1.5 font-nunito">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        className={`${baseStyles} ${errorStyles} ${className}`}
        placeholder={placeholder}
        {...props}
      />
      {error ? (
        <Caption className="mt-1 text-red-600">{error}</Caption>
      ) : helperText ? (
        <Caption className="mt-1 text-gray-500">{helperText}</Caption>
      ) : null}
    </div>
  );
};

// --- Password Input --- //

interface PasswordInputProps extends Omit<TextInputProps, 'type'> {}

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  return (
    <div className="relative">
      <TextInput
        {...props}
        type={showPassword ? 'text' : 'password'}
        className="pr-10"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 focus:outline-none"
        tabIndex={-1}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        {showPassword ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
      </button>
    </div>
  );
};

// --- Select Dropdown --- //

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement>, BaseInputProps {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  required = false,
  className = '',
  options,
  placeholder,
  ...props
}) => {
  const baseStyles = 'px-4 py-3 border rounded-[10px] focus:outline-none focus:ring-2 transition-all appearance-none bg-white font-nunito';
  const errorStyles = error 
    ? 'border-red-500 focus:ring-red-300 bg-red-50' 
    : 'border-gray-200 focus:ring-purple-300 focus:border-purple-500';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className={`mb-4 ${widthStyle}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-800 mb-1.5 font-nunito">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          className={`${baseStyles} ${errorStyles} ${className}`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {error ? (
        <Caption className="mt-1 text-red-600">{error}</Caption>
      ) : helperText ? (
        <Caption className="mt-1 text-gray-500">{helperText}</Caption>
      ) : null}
    </div>
  );
};

// --- Checkbox --- //

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, BaseInputProps {}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  helperText,
  className = '',
  ...props
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          className={`h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 ${className}`}
          {...props}
        />
        {label && (
          <label className="ml-2 block text-sm font-nunito">
            {label}
          </label>
        )}
      </div>
      {error ? (
        <Caption className="mt-1 text-red-600">{error}</Caption>
      ) : helperText ? (
        <Caption className="mt-1 text-gray-500">{helperText}</Caption>
      ) : null}
    </div>
  );
};

// --- Textarea --- //

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseInputProps {}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  required = false,
  className = '',
  placeholder,
  rows = 4,
  ...props
}) => {
  const baseStyles = 'px-4 py-3 border rounded-[10px] focus:outline-none focus:ring-2 transition-all font-nunito';
  const errorStyles = error 
    ? 'border-red-500 focus:ring-red-300 bg-red-50' 
    : 'border-gray-200 focus:ring-purple-300 focus:border-purple-500';
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className={`mb-4 ${widthStyle}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-800 mb-1.5 font-nunito">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        className={`${baseStyles} ${errorStyles} ${className}`}
        placeholder={placeholder}
        rows={rows}
        {...props}
      />
      {error ? (
        <Caption className="mt-1 text-red-600">{error}</Caption>
      ) : helperText ? (
        <Caption className="mt-1 text-gray-500">{helperText}</Caption>
      ) : null}
    </div>
  );
};
