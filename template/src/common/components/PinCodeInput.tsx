import React, { useEffect, useRef, useState } from "react"
import {
  Keyboard,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputKeyPressEventData,
  View,
  TextInput,
} from "react-native"

interface Props {
  numberOfInputs: number
  editable?: boolean
  /**
   * Called when all fields are filled up.
   */
  handlePin: (t: string) => void
  /**
   * Used to display fixed values.
   * Should match the number of inputs to avoid undefined TextInput values.
   */
  fixedValues?: string[]
}
const PinCodeInput = ({
  numberOfInputs,
  handlePin,
  editable = true,
  fixedValues,
}: Props): any => {
  const inputRefMap: any = useRef([])
  const [valueMap, setValueMap] = useState(() =>
    Array(numberOfInputs)
      .fill(0)
      .map(() => "")
  )

  const handleChange = (text: string, index: number) => {
    setValueMap((state) => {
      const newState = [...state]
      newState[index] = text[text.length - 1]
      return newState
    })

    if (text.length > 0) {
      if (index === numberOfInputs - 1) {
        Keyboard.dismiss()
        return
      }
      // focus next input
      inputRefMap.current[index + 1].focus()
    }
  }

  const handleBackspace = (
    { nativeEvent }: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    const firstElement = index === 0
    const backspaceWhenEmpty = nativeEvent.key === "Backspace"

    if (!firstElement && backspaceWhenEmpty) {
      inputRefMap.current[index - 1].focus()
    }
  }

  const handleFocus = (index: number) => {
    // clear text statefully
    setValueMap((state) => {
      const newState = [...state]
      newState[index] = ""
      return newState
    })
  }

  useEffect(() => {
    const filled = valueMap.every((item) => item.length > 0)
    if (filled) {
      const pin = valueMap.reduce((acc, value) => acc + value)
      handlePin(pin)
    }
  })

  const inputs = Array(numberOfInputs)
    .fill(0)
    .map((_, i) => (
      <View
        key={i}
        style={{
          marginHorizontal: 8,
          flex: 1,
          height: 38,
        }}
      >
        <TextInput
          style={styles.pinInput}
          keyboardType="number-pad"
          returnKeyType="done"
          onFocus={() => handleFocus(i)}
          value={!fixedValues ? valueMap[i] : fixedValues[i]}
          onChangeText={(text) => handleChange(text, i)}
          ref={(ref) => (inputRefMap.current[i] = ref)}
          onKeyPress={(e) => handleBackspace(e, i)}
          editable={editable}
        />
      </View>
    ))

  return inputs
}

const styles = StyleSheet.create({
  pinInput: {
    height: "100%",
    flex: 1,
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth * 3,
    textAlign: "center",
    fontWeight: "bold",
  },
})
export default React.memo(PinCodeInput)
