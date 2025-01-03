"use client"

import { FC, ReactNode } from "react"
import * as RadixMenu from "@radix-ui/react-dropdown-menu"
import { twMerge } from "tailwind-merge"

interface DropdownProps {
  children: ReactNode
  className?: string
}

export const Root = RadixMenu.Root
export const Trigger = RadixMenu.Trigger
export const Portal = RadixMenu.Portal
export const Label = RadixMenu.Label
export const Group = RadixMenu.Group

const DropdownMenuContent: FC<DropdownProps> = ({ children, className }) => {
  const classNameFull = twMerge(
    "DropDownMenu z-50 bg-white p-1 rounded border border-neutral-400 shadow flex flex-col gap-1 mx-2 my-1",
    className
  )

  return <RadixMenu.Content className={classNameFull}>{children}</RadixMenu.Content>
}

interface DropdownMenuItemProps extends DropdownProps {
  onSelect?: (event: Event) => void // blarg
}

const DropdownMenuItem: FC<DropdownMenuItemProps> = ({ children, className, onSelect }) => {
  const classNameFull = twMerge(
    "flex items-center justify-start min-w-[120px] gap-2 px-2 py-1 rounded hover:bg-neutral-100 transition text-sm",
    className
  )

  return (
    <RadixMenu.Item onSelect={onSelect} className={classNameFull}>
      {children}
    </RadixMenu.Item>
  )
}

export { DropdownMenuContent, DropdownMenuItem }
