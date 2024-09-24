import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { View, Text } from 'react-native'

function ExerciseDropdown() {
  const [selectedValue, setSelectedValue] = useState(null)

  const placeholder = {
    label: 'Select an option...',
    value: null,
  }

  const options = [
    { label: 'Simple concept', value: 'simple' },
    { label: 'Friends concept', value: 'friend' },
    { label: 'Relatives concept', value: 'option3' },
  ]

  return (
    <View>
      <RNPickerSelect
        placeholder={placeholder}
        items={options}
        onValueChange={(value) => setSelectedValue(value)}
        value={selectedValue}
      />
    </View>
  )
}

export { ExerciseDropdown }
