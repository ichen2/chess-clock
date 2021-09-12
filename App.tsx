/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const Sound = require('react-native-sound')

const colors = {
  white: "#FFFFFF",
  black: "#000000",
  lightGrey: "#BBBBBB",
  darkGrey: "#444444",
}

/*
White is player one
Black is player two
*/

interface TimeControl {
  startTime: number,
  interval: number,
}

enum Turn {
  PlayerOne,
  PlayerTwo,
  NoOne,
  GameOver
}

export default function App() {

  let timeControl = {startTime: 600, interval: 0}

  const [countOne, setCountOne] = useState(timeControl.startTime);
  const [countTwo, setCountTwo] = useState(timeControl.startTime);
  const [turn, setTurn] = useState<Turn>(Turn.NoOne)
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const tick = new Sound('tick.wav', Sound.MAIN_BUNDLE, (error: string) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });
  
  const playSound = () => {
    tick.play((success: boolean) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    })
  }

  const onBlackButtonPress = () => {
    if(turn === Turn.NoOne || turn === Turn.PlayerTwo) {
      playSound()
      setTurn(Turn.PlayerOne)
      if(timer) { clearInterval(timer) }
      setTimer(
        setInterval(() => {
          setCountOne(prevCountOne => {
            if(prevCountOne > 1) {
              return Math.max(prevCountOne - 1, 0)
            } else {
              clearInterval(timer as NodeJS.Timeout)
              setTurn(Turn.GameOver)
              return 0
            }
          })
        }, 998)
      )
    }
  }

  const onWhiteButtonPress = () => {
    if(turn === Turn.NoOne || turn === Turn.PlayerOne) {
      playSound()
      setTurn(Turn.PlayerTwo)
      if(timer) { clearInterval(timer) }
      setTimer(
        setInterval(() => {
          setCountTwo(prevCountTwo => {
            if(prevCountTwo > 1) {
              return Math.max(prevCountTwo - 1, 0)
            } else {
              clearInterval(timer as NodeJS.Timeout)
              setTurn(Turn.GameOver)
              return 0
            }
          })
        }, 998)
      )
    }
  }

  const pause = () => {
    if(timer) { clearInterval(timer) }
    setTurn(Turn.NoOne)
  }

  const restart = () => {
    if(timer) { clearInterval(timer) }
    setCountOne(timeControl.startTime)
    setCountTwo(timeControl.startTime)
    setTurn(Turn.NoOne)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={.9} style={styles.blackButton}
        onPress={onBlackButtonPress}>
        <Text style={styles.blackButtonText}>
          {getTime(countTwo)}
        </Text>
      </TouchableOpacity>
      <View style={styles.menuBar}>
        <TouchableOpacity style={styles.menuItem}>
          <Image style={{flex: .5, resizeMode: 'contain'}} source={require('./assets/settings.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={pause}>
          <Image style={{flex: .5, resizeMode: 'contain'}} source={require('./assets/pause.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={restart}>
          <Image style={{flex: .5, resizeMode: 'contain'}} source={require('./assets/restart.png')} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={.1} style={styles.whiteButton}
        onPress={onWhiteButtonPress}>
        <Text style={styles.whiteButtonText}>
          {getTime(countOne)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function getTime(time: number) : string {
  const hours = Math.floor(time / 60)
  const seconds = time % 60
  return `${(hours < 10 ? '0' : '') + hours} : ${(seconds < 10 ? '0' : '') + seconds}`
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  blackButton: {
    flex: 3,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteButton: {
    flex: 3,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.darkGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    flex: 1,
    flexDirection: 'column',
    transform: [{ rotate: '90deg'}],
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteButtonText: {
    fontSize: 64,
    color: colors.black,
    transform: [{ rotate: '90deg'}],
  },
  blackButtonText: {
    fontSize: 64,
    color: colors.white,
    transform: [{ rotate: '90deg'}],
  },
});