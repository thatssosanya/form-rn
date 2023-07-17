import { Pressable, StyleSheet, Text, ViewStyle } from "react-native"

const Button = ({
  text,
  disabled,
  onPress,
  style,
}: Props) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        disabled ? styles.bgDisabled : styles.bg,
        style,
      ]}
    >
      <Text style={{ fontSize: 15, lineHeight: 20, color: "#FCFCFC", }}>
        { text }
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#413DFF",
    alignItems: "center",
  },
  bg: {
    backgroundColor: "#413DFF",
  },
  bgDisabled: {
    backgroundColor: "#A09EFF",
  },
})

interface Props {
  text: string,
  disabled?: boolean,
  onPress?: () => void,
  style?: ViewStyle,
}

export default Button
