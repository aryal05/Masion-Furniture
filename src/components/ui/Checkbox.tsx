'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative mt-0.5">
          <input
            type="checkbox"
            ref={ref}
            className="sr-only"
            {...props}
          />
          <motion.div
            className={`
              w-5 h-5 rounded border-2 flex items-center justify-center
              transition-colors duration-200
              ${error ? 'border-red-500' : 'border-line group-hover:border-primary'}
              ${props.checked ? 'bg-primary border-primary' : 'bg-card'}
            `}
            whileTap={{ scale: 0.9 }}
          >
            {props.checked && (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-3 h-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            )}
          </motion.div>
        </div>
        {label && (
          <span className={`text-sm text-body ${error ? 'text-red-500' : ''}`}>
            {label}
          </span>
        )}
        {error && (
          <motion.span
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs text-red-500"
          >
            {error}
          </motion.span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
