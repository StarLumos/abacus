import React, { useState } from 'react'
import RNPickerSelect from 'react-native-picker-select'
import { View } from 'react-native'
import { Exercise } from '@/models/exercises/Exercise'
import { Simple } from '@/models/exercises/Simple'
import { Friends } from '@/models/exercises/Friends'
import { Relatives } from '@/models/exercises/Relatives'
import { Mixed } from '@/models/exercises/Mixed'
import { TwoDigits } from '@/models/exercises/TwoDigits'
import { ThreeDigits } from '@/models/exercises/ThreeDigits'

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
    { label: 'Mixed concept', value: 'mixed'},
    { label: 'Two digits', value: 'two'},
    { label: 'Three digits', value: 'three'}
  ]

  return (
    <View>
      <RNPickerSelect
        placeholder={placeholder}
        items={options}
        onValueChange={(value) => {
          setSelectedValue(value)
          
          if (value === 'simple') 
            setExercise(new Simple(5))
          if (value === 'friend')
            setExercise(new Friends(5))
          if (value === 'relatives')
            setExercise(new Relatives(5))
          if (value === 'mixed')
            setExercise(new Mixed(5))
          if (value === 'two')
            setExercise(new TwoDigits(5))
          if (value === 'three')
            setExercise(new ThreeDigits(5))
        }}
        value={selectedValue}
      />
    </View>
  )
}

export { ExerciseDropdown }
