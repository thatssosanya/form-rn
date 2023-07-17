import React, { useEffect, useRef, useState } from "react"
import { TextInput, View, Text, Animated, StyleSheet, ViewStyle } from "react-native"

const TextField = ({
  value,
  errorMessage,
  placeholder,
  keyboardType = "default",
  roundedLeft = true,
  noLabel = false,
  onChange,
  onFocus,
  mask,
  unmask,
  style,
}: Props) => {
  const [focused, setFocused] = useState(false)
  // 0 === small, 1 === large
  const labelPosition = useRef(new Animated.Value(value === "" ? 1 : 0)).current
  // -1 === error, 0 === none, 1 === focus
  const status = useRef(new Animated.Value(getStatus(focused, errorMessage))).current

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: noLabel || (!focused && !value) ? 1 : 0,
      ...animationSettings,
    }).start()
    Animated.timing(status, {
      toValue: getStatus(focused, errorMessage),
      ...animationSettings,
    }).start()
  }, [focused, errorMessage])

  const handleFocus = (newFocused: boolean) => {
    onFocus?.()
    setFocused(newFocused)
  }

  return (
    <View style={[styles.root, style]}>
      {!(noLabel && value) && (
        <View pointerEvents="none" style={styles.labelView}>
          <Animated.Text
            style={[
              styles.label,
              styles.text,
              {
                paddingTop: labelPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [9, 18],
                }),
                fontSize: labelPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [12, 15],
                }),
                lineHeight: labelPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: [16, 20],
                }),
                color: labelPosition.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["#60626D", "#1E1E20"]
                }),
              },
            ]}
          >
            {placeholder}
          </Animated.Text>
        </View>
      )}
      <AnimatedTextInput
        keyboardType={keyboardType}
        value={mask ? mask(value) : value}
        onChangeText={(value) => onChange(unmask ? unmask(value) : value)}
        style={[
          styles.text,
          styles.input,
          !roundedLeft && styles.noRoundedLeft,
          {
            paddingTop: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [26, 18],
            }),
            paddingBottom: labelPosition.interpolate({
              inputRange: [0, 1],
              outputRange: [10, 18],
            }),
            borderColor: status.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: ["#FF450B", "#FFF", "#413DFF"]
            }),
          },
        ]}
        onFocus={() => handleFocus(true)}
        onBlur={() => handleFocus(false)}
      />
      {errorMessage &&
        <Text style={styles.errorText}>{errorMessage}</Text>
      }
    </View>
  )
}

const getStatus = (focused: boolean, errorMessage?: string) => {
  if (errorMessage) {
    return -1
  }
  if (focused) {
    return 1
  }
  return 0
}

const animationSettings = {
  duration: 200,
  useNativeDriver: false,
}

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const styles = StyleSheet.create({
  root: {
    position: "relative",
    gap: 8,
  },
  labelView: {
    position: "absolute",
    zIndex: 1,
  },
  label: {
    position: "absolute",
  },
  text: {
    height: 56,
    paddingLeft: 16,
    paddingRight: 23,
    fontSize: 15,
    lineHeight: 20,
  },
  input: {
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
  },
  noRoundedLeft: {
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  errorText: {
    paddingLeft: 16,
    color: "#FF450B",
    fontSize: 13,
    lineHeight: 18,
  },
})

interface Props {
  value: string,
  errorMessage: string,
  placeholder: string,
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad",
  roundedLeft?: boolean,
  noLabel?: boolean,
  onChange: (value: string) => void,
  onFocus?: () => void,
  mask?: (value: string) => string,
  unmask?: (value: string) => string,
  style?: ViewStyle,
}

export default TextField
