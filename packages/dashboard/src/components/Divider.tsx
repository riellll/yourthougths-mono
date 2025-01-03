import { FC } from "react"
import { twMerge } from "tailwind-merge"

interface DividerProps {
  className?: string
}

const Divider: FC<DividerProps> = ({ className }) => {
  const classNameFull = twMerge("w-px h-full border-r border-neutral-300", className)

  return <div className={classNameFull} />
}

export default Divider
