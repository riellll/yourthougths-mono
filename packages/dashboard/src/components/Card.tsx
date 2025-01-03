import { ReactNode, FC } from "react"
import { twMerge } from "tailwind-merge"

interface CardProps {
  children: ReactNode
  className?: string
  id?: string
}

const Card: FC<CardProps> = ({ children, className, ...props }) => {
  const classNameFull = twMerge("p-5 shadow border border-neutral-400 bg-white rounded-xl", className)
  const propsFull = { ...props, children, className: classNameFull }

  return <div {...propsFull} />
}

export default Card
