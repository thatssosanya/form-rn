import React from "react"
import { Pressable, Text, View, StyleSheet } from "react-native"

interface Props {
  selected: boolean
  setSelected: (selected: boolean) => void
  label?: string
}

const Checkbox: React.FC<Props> = ({ selected, setSelected, label }) => {
  return (
    <Pressable style={styles.root} onPress={() => setSelected(!selected)}>
      <View style={[styles.box]}>
        {selected && <View style={styles.inner} />}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingLeft: 16,
  },
  box: {
    height: 24,
    width: 24,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#60626D",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    height: 16,
    width: 16,
    borderRadius: 5,
    backgroundColor: "#413DFF",
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "400",
    color: "#60626D",
  },
})

export default Checkbox
