import React from "react"
import { PortalContext } from "../../contexts/PortalContext"

/**
 * Consumes portal context.
 * Coordinates teleporting of React children to context provider.
 */
export const Portal = ({ children }: { children: React.ReactNode }) => {
  const { teleportComponent, resetComponent } = React.useContext(PortalContext)

  React.useEffect(() => {
    teleportComponent(children)

    return resetComponent
  }, [resetComponent, teleportComponent, children])

  return null
}

export default Portal
