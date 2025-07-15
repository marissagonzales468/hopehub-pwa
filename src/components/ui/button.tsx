import { ButtonHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(
        'px-4 py-2 rounded-md font-medium bg-white text-black hover:bg-blue-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition',
        className
      )}
      {...props}
    />
  )
);
Button.displayName = 'Button';
