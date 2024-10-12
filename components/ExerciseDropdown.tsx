import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { View, Text } from 'react-native'
import { Exercise, Simple, Friends } from '@/models/exercises/Exercise'

function ExerciseDropdown(
  { setExercise }: { setExercise: (exercise: Exercise) => void }
) {
  const [selectedValue, setSelectedValue] = useState('simple')

  const placeholder = {
    label: 'Select an option...',
    value: null,
  }

  const options = [
    { label: 'Simple concept', value: 'simple' },
    { label: 'Friends concept', value: 'friend' },
    { label: 'Relatives concept', value: 'relatives' },
  ]

  return (
    <View>
      <RNPickerSelect
        placeholder={placeholder}
        items={options}
        onValueChange={(value) => {
          setSelectedValue(value)
          
          if (value === 'simple') 
            setExercise(new Simple(10))
          if (value === 'friend')
            setExercise(new Friends(10))
        }}
        value={selectedValue}
      />
    </View>
  )
}

export { ExerciseDropdown }
