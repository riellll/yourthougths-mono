import React, { FC, ReactNode } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import clMerge from '../lib/clMerge';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

type Icon = FC<Parameters<typeof MagnifyingGlassIcon>[0]>;

interface FieldProps {
  name?: string
  className?: string
  variant?: "light" | "dark" | "invisible"
  children: ReactNode
  hidden?: boolean
}

export const Field: FC<FieldProps> = ({ name, className, children, variant = "light", hidden }) => {
  const classes = clMerge("flex flex-col gap-1 w-full !focus:ring-0")

  let outerChildrenStart: ReactNode[] = []
  let outerChildrenEnd: ReactNode[] = []
  let innerChildren: ReactNode[] = []

  let isBeforeInput = true

  React.Children.map(children, (child, index) => {
    if (React.isValidElement<LabelProps>(child) && child.type === Label) {
      const childWithProps = React.cloneElement(child, { key: index, htmlFor: name, variant });
      if (isBeforeInput) {
        outerChildrenStart.push(childWithProps);
      } else {
        outerChildrenEnd.push(childWithProps);
      }
    }
    if (React.isValidElement<LabelProps>(child) && child.type === InnerLabel) {
      const childWithProps = React.cloneElement(child, { key: index, htmlFor: name, variant });
      innerChildren.push(childWithProps);
    }
    if (
      React.isValidElement<InputProps>(child) &&
      (child.type === Input || child.type === Textarea)
    ) {
      innerChildren.push(React.cloneElement(child, { key: index, name, variant }));
      isBeforeInput = false;
    }
  });
  
  if (hidden) {
    return (
      <div className="hidden">
        {outerChildrenStart}
        {innerChildren}
        {outerChildrenEnd}
      </div>
    )
  }

  return (
    <div className={classes}>
      {outerChildrenStart}
      <InputWrapper variant={variant} className={className}>
        {innerChildren}
      </InputWrapper>
      {outerChildrenEnd}
    </div>
  )
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  key?: number
  htmlFor?: string
  variant?: "light" | "dark" | "invisible"
  className?: string
  children: ReactNode
}

export const Label: FC<LabelProps> = ({ htmlFor, className, children, variant, ...props }) => {
  const classes = clMerge(
    "text-sm font-bold", //
    {
      "text-black": variant === "light",
      "text-white": variant === "dark",
    },
    className
  )

  return (
    <label htmlFor={htmlFor} aria-labelledby={htmlFor} className={classes} {...props}>
      {children}
    </label>
  )
}

export const InnerLabel: FC<LabelProps> = ({ htmlFor, className, children, variant, ...props }) => {
  const classes = clMerge(
    "text-sm font-medium bg-neutral-100 h-full grow-y px-3 py-2", //
    className,
    {
      "text-neutral-700 border-neutral-800/20": variant === "light",
      "text-neutral-100 bg-neutral-800 border-neutral-500": variant === "dark",
    }
  )

  return (
    <label htmlFor={htmlFor} className={classes} {...props}>
      {children}
    </label>
  )
}

interface InputWrapperProps {
    children: ReactNode
    className?: string
    variant?: "light" | "dark" | "invisible"
  }
  
  export const InputWrapper: FC<InputWrapperProps> = ({ children, variant }) => {
    const baseClasses =
      "group rounded-md divide-x border overflow-hidden rounded shadow font-medium grow flex items-center w-full !group-focus:ring-0"
    const classes = clMerge(baseClasses, {
      "bg-white border-neutral-800/20": variant === "light",
      "bg-neutral-700 border-neutral-500 text-white placeholder-neutral-300": variant === "dark",
      "border-0 bg-transparent !focus:ring-0": variant === "invisible",
    })
  
    return <div className={classes}>{children}</div>
  }

  interface InputProps {
    key?: number;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    Icon?: Icon;
    className?: string;
    name?: string;
    type?: string;
    variant?: 'light' | 'dark' | 'invisible';
    required?: boolean;
  }
  
  export const Input: FC<InputProps> = ({
    className,
    type = 'text',
    variant = 'light',
    Icon,
    ...props
  }) => {
    const baseClasses = 'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:none focus:ring-blue-500 focus:border-transparent';
    const classes = twMerge(
      baseClasses,
      clsx({
        'bg-white placeholder-neutral-500': variant === 'light',
        'bg-neutral-700 border-gray-700 text-white placeholder-neutral-300': variant === 'dark',
        'bg-transparent': variant === 'invisible',
      }),
      className
    );
  
    return (
      <div className="relative w-full max-w-md">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <input type={type} className={classes} id={props.name} {...props} />
      </div>
    );
  };

  interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string
    name?: string
    variant?: "light" | "dark"
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  }
  
  export const Textarea: FC<TextareaProps> = ({ className, variant = "light", ...props }) => {
    const baseClasses = "grow border-0 text-sm px-4 py-3 font-medium"
    const classes = clMerge(baseClasses, className, {
      "bg-white": variant === "light",
      "bg-neutral-700 text-white placeholder-neutral-300": variant === "dark",
    })
  
    return <textarea className={classes} id={props.name} {...props} />
  }
