import { useState } from "react"

/**
 * Boilerplate hook for handling visibility of modals.
 */
export const useModal = (defaultState?: "OPEN" | "CLOSED") => {
  const [visible, setIsVisible] = useState(
    defaultState === "OPEN" ? true : false
  )

  const openModal = () => {
    setIsVisible(true)
  }

  const closeModal = () => {
    setIsVisible(false)
  }

  return { visible, openModal, closeModal }
}
