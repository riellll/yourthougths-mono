"use client"

import { FC, ReactNode, useState, useRef, useEffect } from "react"
import clMerge from "../lib/clMerge"
import Portal from "./Portal"

interface ToolTipProps {
  children: ReactNode
  tip: string
  classNames?: {
    container?: string
    content?: string
  }
  position?: "center" | "left" | "right"
}

const ToolTip: FC<ToolTipProps> = ({ children, tip, classNames, position = "center" }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const containerRef = useRef<HTMLDivElement | null>(null)

  const classesContainer = clMerge("relative group", classNames?.container)
  const classesContent = clMerge(
    {
      "absolute z-40 mb-2 w-max transition-opacity duration-100": true,
      "bg-neutral-700 text-white text-xs rounded py-1 px-2 shadow pointer-events-none": true,
      "opacity-100": isHovered,
      "opacity-0": !isHovered,
    },
    classNames?.content
  )

  useEffect(() => {
    if (isHovered && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()

      const left = (() => {
        if (position === "left") return rect.left
        if (position === "right") return rect.right
        return rect.left + rect.width / 2
      })()

      setTooltipPosition({
        top: rect.top - 10,
        left,
      })
    }
  }, [isHovered, position])

  const transform = (() => {
    if (position === "left") return ""
    if (position === "right") return "translateX(0)"
    return "translateX(-50%)"
  })()

  return (
    <div
      className={classesContainer}
      onMouseEnter={() => setIsHovered(true)} //
      onMouseLeave={() => setIsHovered(false)}
      ref={containerRef}
    >
      {children}

      <Portal>
        <span
          className={classesContent}
          style={{
            position: "fixed",
            top: tooltipPosition.top - 20,
            left: tooltipPosition.left,
            transform,
          }}
          aria-label={tip}
        >
          {tip}
        </span>
      </Portal>
    </div>
  )
}

export default ToolTip
