import React, { useContext } from "react"
import { ScrollView, StatusBar, StyleSheet } from "react-native"
import OrientationContext from "../features/OrientationContext"

const Layout = ({ children }: React.PropsWithChildren) => {
  const { isAlbum } = useContext(OrientationContext)

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isAlbum ? styles.paddingAlbum : styles.paddingPortrait,
      ]}
    >
      <StatusBar />
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F6F7FA",
  },
  paddingPortrait: {
    padding: 16,
  },
  paddingAlbum: {
    paddingBottom: 16,
    paddingHorizontal: 120,
  },
})

export default Layout
