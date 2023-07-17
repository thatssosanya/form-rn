import { useContext, useEffect, useRef, useState } from "react"
import { Text, Animated, ScrollView, Pressable, StyleSheet } from "react-native"
import type { ViewStyle } from "react-native"
import OrientationContext from "../features/OrientationContext"

const Select = ({
  value,
  options,
  roundedLeft = false,
  onSelect,
  style,
}: Props) => {
  const [open, setOpen] = useState(false)
  const openAnim = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.timing(openAnim, {
      toValue: open ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [open])
  const handleSelect = (value: string) => {
    onSelect(value)
    setOpen(false)
  }

  const { isAlbum } = useContext(OrientationContext)

  return (
    <Animated.View
      style={[
        styles.root,
        style,
      ]}
    >
      <Option
        label={options.find(o => o.value === value)?.label}
        onPress={() => setOpen(!open)}
        style={{
          ...(roundedLeft && (isAlbum ? {
            borderBottomLeftRadius: 12,
            borderTopLeftRadius: openAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [12, 0],
            }),
          } : {
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: openAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [12, 0],
            }),
          }))
        }}
      />
      <Animated.View
        style={[
          styles.options,
          isAlbum ? styles.optionsPositionAlbum : styles.optionsPositionPortrait,
          roundedLeft && (isAlbum ? styles.optionsRadiusAlbum : styles.optionsRadiusPortrait),
          {
            height: openAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 56 * 2]
            })
          },
        ]}
      >
        <AnimatedScrollView contentContainerStyle={styles.optionsInner}>
          {options.map(({ label, value }) => (
            <Option label={label} onPress={() => handleSelect(value)} key={value} />
          ))}
        </AnimatedScrollView>
      </Animated.View>
    </Animated.View>
  )
}

const Option = ({ label, onPress, style }: OptionProps) => {
  return (
    <AnimatedPressable
      onPress={onPress}
      style={[styles.option, style]}
    >
      <Text>
        {label}
      </Text>
    </AnimatedPressable>
  )
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

const styles = StyleSheet.create({
  root: {
    position: "relative",
    height: 56,
  },
  options: {
    position: "absolute",
    overflow: "hidden",
    left: 0,
    right: 0,
    zIndex: 1,
  },
  optionsInner: {
    flexGrow: 1,
  },
  optionsPositionAlbum: {
    bottom: 60,
  },
  optionsPositionPortrait: {
    top: 60,
  },
  optionsRadiusAlbum: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  optionsRadiusPortrait: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  option: {
    height: 56,
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
  },
})

interface OptionProps {
  label?: string,
  onPress: () => void,
  style?: Animated.AnimatedProps<ViewStyle>,
}

interface Props {
  value: string,
  options: { value: string, label: string }[],
  roundedLeft?: boolean,
  onSelect: (value: string) => void,
  style?: ViewStyle,
}

export default Select
