import React, { useEffect, useState } from 'react';
import {
    Platform,
    TouchableOpacity,
    SafeAreaView,
    Switch,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import {Props, globalStyles, colors} from '../App'

const styles = StyleSheet.create({
    itemWrapper: {
        flexDirection: 'row',
        padding: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleText: {
        color: colors.black,
        fontWeight: 'bold',
        fontSize: 24,
    },
    headerText: {
        color: colors.black,
        fontSize: 20,
    },
    bodyText: {
        color: colors.darkGrey,
        fontSize: 20,
    }
})

const deviceIsIphone = Platform.OS === 'ios'

export const SettingsScreen = (props: Props) => {

    const switchTrackColor = deviceIsIphone ? colors.lightGrey : colors.lightGrey
    const switchThumbColor = deviceIsIphone ? colors.white : props.isSoundEnabled ? colors.darkGreen : colors.darkGrey

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={{flexDirection: 'row', padding: 4}}>
                <TouchableOpacity onPress={props.toggleClockDisplayed} activeOpacity={.5}>
                    <Image style={{width: 32, height: 32, marginEnd: 16}} source={require('../assets/back.png')} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Settings</Text>
            </View>
            <View style={{paddingStart: 52}}>
                <View style={styles.itemWrapper}>
                    <Text style={styles.bodyText}>Sound</Text>
                    <Switch 
                        style={deviceIsIphone ? {marginHorizontal: 16} : {}}
                        value={props.isSoundEnabled} 
                        onValueChange={props.toggleSoundEnabled}
                        trackColor={{false: switchTrackColor, true: colors.green}}
                        ios_backgroundColor={switchTrackColor}
                        thumbColor={switchThumbColor}
                    />
                </View>
                <View style={styles.itemWrapper}>
                    <Text style={styles.headerText}>Time Control</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}