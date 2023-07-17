import { useEffect, useState } from "react"
import { Orientation, addOrientationChangeListener, removeOrientationChangeListeners, getOrientationAsync } from "expo-screen-orientation"

const useOrientation = () => {
  const [orientation, setOrientation] = useState<Orientation>(Orientation.UNKNOWN)

  useEffect(() => {
    getOrientationAsync().then((orientation) => {
      setOrientation(orientation)
    })
    addOrientationChangeListener((event) => {
      setOrientation(event.orientationInfo.orientation)
    })
    return () => {
      removeOrientationChangeListeners()
    }
  }, [])

  const isAlbum = orientation === Orientation.LANDSCAPE_LEFT
    || orientation === Orientation.LANDSCAPE_RIGHT

  return isAlbum
}

export default useOrientation
