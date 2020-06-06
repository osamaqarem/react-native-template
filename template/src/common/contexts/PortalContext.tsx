import React, { useCallback } from "react"

/**
 * Context Type
 */
export type PortalContextState = {
  /**
   * Set the component to be rendered
   */
  teleportComponent: (component: React.ReactNode) => void
  /**
   * Free up memory
   */
  resetComponent: () => void
}

/**
 * Initial context state
 */
const initialState: PortalContextState = {
  teleportComponent: null!,
  resetComponent: null!,
}

/**
 * Context
 */
export const PortalContext = React.createContext(initialState)

/**
 * Provider.
 * Renders the teleported component.
 */
export const PortalProvider = ({ children }: { children: React.ReactNode }) => {
  const [component, setComponent] = React.useState<React.ReactNode>(null)

  const teleportComponent = useCallback(
    (component: React.ReactNode) => setComponent(component),
    []
  )

  const resetComponent = useCallback(() => setComponent(null), [])

  return (
    <PortalContext.Provider value={{ teleportComponent, resetComponent }}>
      {component}
      {children}
    </PortalContext.Provider>
  )
}
