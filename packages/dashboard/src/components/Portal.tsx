import { FC, ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom"

interface PortalProps {
  children: ReactNode
}

const Portal: FC<PortalProps> = ({ children }) => {
  const elRef = useRef<HTMLDivElement | null>(null)

  if (!elRef.current) {
    elRef.current = document.createElement("div")
  }

  useEffect(() => {
    const portalRoot = document.getElementById("portal-root")
    if (!portalRoot) {
      const newPortalRoot = document.createElement("div")
      newPortalRoot.setAttribute("id", "portal-root")
      document.body.appendChild(newPortalRoot)
      newPortalRoot.appendChild(elRef.current!)
    } else {
      portalRoot.appendChild(elRef.current!)
    }

    return () => {
      if (elRef.current) {
        elRef.current.remove()
      }
    }
  }, [])

  return createPortal(children, elRef.current)
}

export default Portal
