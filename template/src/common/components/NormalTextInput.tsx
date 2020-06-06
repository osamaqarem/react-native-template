import React, { memo, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler"
import Svg, { Path } from "react-native-svg"

interface Props {
  value?: string
  onChangeText?: (text: string) => void
  placeholder?: string
  required?: boolean
  secureEntry?: boolean
  editIcon?: boolean
  multiline?: boolean
}

export const INPUT_WIDTH = 298

/**
 * This component is made up of two TextInputs. One is fake.
 *
 * Reasoning: if we had a single TextInput that took on the full width of
 * the container, then it works perfectly. However, we cant dynamically
 * place the asterisk based on the width of the placeholder text, since
 * that placeholder text width would become equal to the continer width.
 *
 * With two inputs, we absolutely position the first one and use it to
 * display the placeholder text. Now the width of the placeholder text is
 * useful for calculating the placement of the asterisk. This fake
 * input is removed from the view once the text value of the real
 * text input is more than 0 characters.
 *
 */
const NormalTextInput = memo(
  ({
    value = "",
    placeholder = "",
    required = false,
    secureEntry = false,
    onChangeText,
    editIcon = false,
    multiline = false,
  }: Props) => {
    const [showPassword, setShowPassword] = useState(true)
    const [inputWidth, setInputWidth] = useState(0)
    const hasInput = value?.length > 0

    const togglePasswordVisibility = () =>
      setShowPassword((prevState) => !prevState)
    return (
      <View
        style={[
          styles.box,
          {
            paddingVertical: multiline ? 10 : 0,
          },
        ]}
      >
        {!hasInput && (
          <>
            <View
              pointerEvents="none"
              style={[styles.innerContainer, { flex: hasInput ? 1 : 0 }]}
            >
              <TextInput
                placeholder={placeholder}
                placeholderTextColor={theme.colors.grey}
                style={[
                  styles.inputText,
                  {
                    position: "absolute",
                  },
                ]}
                onLayout={(e) => setInputWidth(e.nativeEvent.layout.width + 6)}
              />
              {!hasInput && required && (
                <Text style={[styles.asterisk, { left: inputWidth }]}>*</Text>
              )}
            </View>
          </>
        )}
        <TextInput
          multiline={multiline}
          secureTextEntry={secureEntry ? showPassword : false}
          onChangeText={onChangeText}
          style={[
            styles.inputText,
            {
              width: INPUT_WIDTH * 0.76,
              minHeight: multiline ? 104 : 52,
              textAlignVertical: multiline ? "top" : "center",
            },
          ]}
        />
        {secureEntry && (
          <ToggleSecureEntryIcon onPress={togglePasswordVisibility} />
        )}
        {editIcon && <EditIcon />}
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

interface TextInputIconProps {
  onPress?: () => void
}
const EditIcon = ({ onPress }: TextInputIconProps) => {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      containerStyle={[
        styles.eyeContainer,
        { justifyContent: "flex-start", top: 6 },
      ]}
    >
      <TextInputIconSvg />
    </TouchableWithoutFeedback>
  )
}

function TextInputIconSvg() {
  return (
    <Svg width={18} height={18} viewBox="0 0 474 475" fill="none">
      <Path
        d="M269.16 86.865l118.495 118.5-257.307 257.317L24.7 474.346a22.213 22.213 0 01-18.154-6.38 22.212 22.212 0 01-6.365-18.159l11.755-105.726L269.16 86.865zm191.782-17.643l-55.638-55.64a44.451 44.451 0 00-62.857 0l-52.341 52.345 118.495 118.5 52.341-52.345a44.457 44.457 0 000-62.86z"
        fill="#999"
      />
    </Svg>
  )
}

const styles = StyleSheet.create({
  box: {
    alignSelf: "center",
    flexDirection: "row",
    width: INPUT_WIDTH,
    borderRadius: 5,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.0,
    elevation: 10,
  },
  innerContainer: {
    justifyContent: "center",
  },
  inputText: {
    marginLeft: 28,
  },
  eyeContainer: {
    position: "absolute",
    right: 0,
    height: "100%",
    justifyContent: "center",
    padding: 10,
  },
  eye: {
    height: 22,
    width: 22,
  },
  icon: { height: 18, width: 18 },
  asterisk: {
    color: "red",
    position: "absolute",
    marginLeft: 28,
    top: 14,
  },
})

NormalTextInput.displayName = "NormalTextInput"

export default NormalTextInput
