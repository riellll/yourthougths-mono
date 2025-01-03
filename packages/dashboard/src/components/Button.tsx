import React, { FC, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { UsersIcon } from '@heroicons/react/24/outline';

type Icon = FC<Parameters<typeof UsersIcon>[0]>;

interface ButtonBaseProps {
  children?: ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'dark' | 'invisible';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a' | 'div';
  Icon?: Icon;
}

type ButtonProps = ButtonBaseProps &
  (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement> | HTMLAttributes<HTMLDivElement>);

const Button: FC<ButtonProps> = ({
  children,
  className,
  Icon,
  variant = 'default',
  size = 'md',
  as = 'button',
  ...props
}) => {
  const classes = twMerge(
    clsx(
      'border border-neutral-800 rounded font-medium shadow-sm text-sm text-left backdrop-blur flex gap-2 items-center',
      'active:shadow-inner transition justify-between text-nowrap',
      {
        'opacity-60': (props as ButtonHTMLAttributes<HTMLButtonElement>).disabled,
        'bg-gray-100 text-gray-900': variant === 'default',
        'bg-blue-500 text-white': variant === 'primary',
        'bg-green-500 text-white': variant === 'secondary',
        'bg-neutral-700 text-white': variant === 'dark',
        'bg-transparent border-0 shadow-none text-gray-800 hover:bg-gray-200': variant === 'invisible',
      },
      {
        'px-4 py-1': size === 'sm',
        'px-4 py-2': size === 'md',
        'px-6 py-3': size === 'lg',
      },
      className
    )
  );

  const iconClasses = clsx({
    'w-4 h-4': size === 'sm',
    'w-5 h-5': size === 'md',
    'w-6 h-6': size === 'lg',
  });

  if (as === 'a') {
    return (
      <a className={classes} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {Icon && <Icon className={iconClasses} />}
        {children}
      </a>
    );
  }

  if (as === 'div') {
    return (
      <div className={classes} {...(props as HTMLAttributes<HTMLDivElement>)}>
        {Icon && <Icon className={iconClasses} />}
        {children}
      </div>
    );
  }

  return (
    <button className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {Icon && <Icon className={iconClasses} />}
      {children}
    </button>
  );
};

export default Button;