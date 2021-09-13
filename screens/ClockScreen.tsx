import React, { useEffect, useState } from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
} from 'react-native';
import {Props, globalStyles, colors} from '../App'
const Sound = require('react-native-sound')

enum Turn {
    PlayerOne,
    PlayerTwo,
    NoOne,
    GameOver
}

const styles = StyleSheet.create({
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
})

export const ClockScreen = (props: Props) => {

    const [countOne, setCountOne] = useState<number>(props.timeControl.startTime);
    const [countTwo, setCountTwo] = useState<number>(props.timeControl.startTime);
    const [turn, setTurn] = useState<Turn>(Turn.NoOne)
    const [timer, setTimer] = useState<NodeJS.Timeout>()
  
    const tick = new Sound('tick.wav', Sound.MAIN_BUNDLE, (error: string) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
    
    const playSound = () => {
        if(props.isSoundEnabled) {
            tick.play((success: boolean) => {
                if (success) {
                console.log('successfully finished playing');
                } else {
                console.log('playback failed due to audio decoding errors');
                }
            })
        }
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
        setCountOne(props.timeControl.startTime)
        setCountTwo(props.timeControl.startTime)
        setTurn(Turn.NoOne)
    }
  
    const openSettings = () => {
        pause()
        props.toggleClockDisplayed()
    }
  
    return (
      <SafeAreaView style={globalStyles.container}>
        <TouchableOpacity activeOpacity={.9} style={styles.blackButton}
          onPress={onBlackButtonPress}>
          <Text style={styles.blackButtonText}>
            {getTime(countTwo)}
          </Text>
        </TouchableOpacity>
        <View style={styles.menuBar}>
          <TouchableOpacity style={styles.menuItem} onPress={openSettings}>
            <Image style={{flex: .5, resizeMode: 'contain'}} source={require('../assets/settings.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={pause}>
            <Image style={{flex: .5, resizeMode: 'contain'}} source={require('../assets/pause.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={restart}>
            <Image style={{flex: .5, resizeMode: 'contain'}} source={require('../assets/restart.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={.5} style={styles.whiteButton}
          onPress={onWhiteButtonPress}>
          <Text style={styles.whiteButtonText}>
            {getTime(countOne)}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}

function getTime(time: number) : string {
    const hours = Math.floor(time / 60)
    const seconds = time % 60
    return `${(hours < 10 ? '0' : '') + hours} : ${(seconds < 10 ? '0' : '') + seconds}`
}
  