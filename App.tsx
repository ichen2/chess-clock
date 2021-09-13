import React, { useEffect, useState } from 'react';
import {
    Platform,
    StyleSheet,
    StatusBar,
    StatusBarIOS,
    View,
} from 'react-native';
import {ClockScreen} from './screens/ClockScreen'
import {SettingsScreen} from './screens/SettingsScreen'

export const colors = {
  white: '#FFFFFF',
  creamWhite: '#FAFAFA',
  black: '#000000',
  lightGrey: '#BBBBBB',
  darkGrey: '#444444',
  green: '#0EAD4E',
  darkGreen: '#042B14'
}

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.creamWhite,
  },
});

export interface TimeControl {
  startTime: number,
  interval: number,
}

export interface Props {
  timeControl: TimeControl,
  setTimeControl: () => void,
  toggleClockDisplayed: () => void,
  isSoundEnabled: boolean,
  toggleSoundEnabled: () => void,
  vibrationEnabled?: boolean,
}

export default function App() {
  const [timeControl, setTimeControl] = useState<TimeControl>({startTime: 600, interval: 0})
  const [isClockDisplayed, setIsClockDisplayed] = useState<boolean>(true)
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true)

  if(isClockDisplayed) {
    return <ClockScreen 
      timeControl={timeControl} 
      setTimeControl={() => setTimeControl} 
      toggleClockDisplayed={() => setIsClockDisplayed(prevState => !prevState)}
      isSoundEnabled={isSoundEnabled} 
      toggleSoundEnabled={() => {}}
    />
  } else {
    return <SettingsScreen 
      timeControl={timeControl} 
      setTimeControl={() => setTimeControl} 
      toggleClockDisplayed={() => setIsClockDisplayed(prevState => !prevState)}
      isSoundEnabled={isSoundEnabled} 
      toggleSoundEnabled={() => setIsSoundEnabled(prevState => !prevState)}
    />
  }
}