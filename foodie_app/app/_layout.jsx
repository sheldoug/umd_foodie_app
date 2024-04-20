import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {Slot, Stack} from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="index"/>
    </Stack>
    
  )
}

export default _layout
