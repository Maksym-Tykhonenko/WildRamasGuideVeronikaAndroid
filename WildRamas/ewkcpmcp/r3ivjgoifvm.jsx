import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, Switch, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const WildSettings = () => {
    const [wildNotify, setWildNotify] = useState(false);

    useEffect(() => {
        const loadNotificationSetting = async () => {
            try {
                const stored = await AsyncStorage.getItem('WILD_NOTIFY');
                if (stored !== null) {
                    setWildNotify(JSON.parse(stored));
                }
            } catch (e) {
                Alert.alert('Error', 'Failed to load notification setting');
            }
        };

        loadNotificationSetting();
    }, []);

    const toggleWildNotify = async () => {
        try {
            const newValue = !wildNotify;
            setWildNotify(newValue);
            await AsyncStorage.setItem('WILD_NOTIFY', JSON.stringify(newValue));
        } catch (e) {
            Alert.alert('Error', 'Failed to save notification setting');
        }
    };

    return (
        <View style={{ flex: 1 }}>
            
            <Text style={wildStyles.title}>Settings</Text>

            <View style={[wildStyles.wildBtn, {paddingVertical: 14}]}>
                <Text style={wildStyles.wildBtnText}>Notifications</Text>
                <Switch
                    value={wildNotify}
                    onValueChange={toggleWildNotify}
                    trackColor={{ false: '#ccc', true: '#D94651' }}
                    thumbColor={wildNotify ? '#fff' : '#fff'}
                />
            </View>

            <View style={wildStyles.wildBtn}>
                <Text style={wildStyles.wildBtnText}>Privacy Policy</Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.termsfeed.com/live/b14a6654-3d26-4666-b4a5-6178443b461e')}>
                    <Image
                        source={require('../WildRamasAssetsApp/wildIconsGuide/wildSetArrow.png')}
                        style={{width: 7, height: 13, resizeMode: 'contain'}}
                    />
                </TouchableOpacity>
            </View>

            <Image
                source={require('../WildRamasAssetsApp/wildRamasDecorGuide/sideRamasDeer.png')}
                style={wildStyles.wildRamasDeer}
            />

        </View>
    )
};

const wildStyles = StyleSheet.create({

    title: {
        fontSize: 25,
        fontWeight: '600',
        lineHeight: 27,
        color: '#fff',
        marginBottom: 18
    },

    wildBtn: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15,
        backgroundColor: '#242424',
        paddingVertical: 18.5,
        paddingHorizontal: 14,
        marginBottom: 7
    },

    wildBtnText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
        color: '#fff',
    },

    wildRamasDeer: {
        width: '100%',
        height: 400,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 30,
        right: -80
    }

});

export default WildSettings;