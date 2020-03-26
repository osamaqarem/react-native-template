import React, { memo, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import {
  TextInput,
  TouchableWithoutFeedback
} from "react-native-gesture-handler"
import { colors, typography } from "../theme"

interface Props {
  value?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  required?: boolean
  secureEntry?: boolean
}

export const INPUT_WIDTH = 298

const NormalTextInput = memo(
  ({
    value = "",
    placeholder = "",
    required = false,
    secureEntry = false,
    onChangeText
  }: Props) => {
    const [showPassword, setShowPassword] = useState(true)
    const [inputWidth, setInputWidth] = useState(0)
    const hasInput = value?.length > 0

    const togglePasswordVisibility = () =>
      setShowPassword(prevState => !prevState)
    return (
      <View style={styles.box}>
        {!hasInput && (
          <>
            <View style={[styles.innerContainer, { flex: hasInput ? 1 : 0 }]}>
              <TextInput
                placeholder={placeholder}
                placeholderTextColor={colors.darkGrey}
                style={[
                  styles.inputText,
                  {
                    position: "absolute"
                  }
                ]}
                onLayout={e => setInputWidth(e.nativeEvent.layout.width + 6)}
              />
              {!hasInput && required && (
                <Text style={[styles.asterisk, { left: inputWidth }]}>*</Text>
              )}
            </View>
          </>
        )}
        <TextInput
          value={value}
          secureTextEntry={secureEntry ? showPassword : false}
          onChangeText={onChangeText}
          style={[styles.inputText, { width: INPUT_WIDTH * 0.76 }]}
        />
        {secureEntry && (
          <ToggleSecureEntryIcon onPress={togglePasswordVisibility} />
        )}
      </View>
    )
  }
)

interface ToggleSecureEntryIconProps {
  onPress: () => void
}
const ToggleSecureEntryIcon = ({ onPress }: ToggleSecureEntryIconProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      containerStyle={styles.eyeContainer}
    >
      <View style={styles.eye} />
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  box: {
    alignSelf: "center",
    flexDirection: "row",
    marginVertical: 8,
    width: INPUT_WIDTH,
    height: 52,
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.0,
    elevation: 10
  },
  innerContainer: {
    justifyContent: "center"
  },
  inputText: {
    fontFamily: typography.fontFamily.normal,
    fontSize: typography.fontSize.input,
    marginLeft: 28
  },
  eyeContainer: {
    position: "absolute",
    right: 0,
    height: "100%",
    justifyContent: "center",
    padding: 10
  },
  eye: {
    backgroundColor: colors.darkGrey,
    height: 20,
    width: 20,
    borderRadius: 10
  },
  asterisk: {
    color: colors.red,
    fontFamily: typography.fontFamily.normal,
    position: "absolute",
    marginLeft: 28,
    top: 14
  }
})

export default NormalTextInput
