import { twMerge } from "tailwind-merge"
import clsx from "clsx"

type Classes = string | object | undefined

/**
 * A light wrapper for tailwind-merge and clsx to merge classes together.
 */
const clMerge = (...classes: Classes[]) => {
  return twMerge(clsx(...classes))
}

export default clMerge
