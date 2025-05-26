import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import guideApp from "../ewmfdpewmvcpow/guideApp";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const AppGuide = () => {
    const navigation = useNavigation();
    const [wildScreenCurrent, setWildScreenCurrent] = useState('WildHomeScreenGuide');  

    useEffect(() => {
        const handleFocus = () => {
            const state = navigation.getState();
            setWildScreenCurrent(state.routes[state.index]?.name || 'UnknownWildRamasGuideScreen');
        };

        const unsubscribe = navigation.addListener('focus', handleFocus);

        return () => {
            unsubscribe();
        };
    }, [navigation]);

    return (
        <View style={styles.wildGuidNavi}>
            {
                guideApp.map((wildScreen, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setWildScreenCurrent(wildScreen.guideScreen);
                            navigation.navigate(wildScreen.guideScreen);
                        }}
                        style={{width: 52, height: '100%', alignItems: 'center', justifyContent: 'space-between'}}
                    >
                        <View style={[
                            styles.wildScreenGuideMarker,
                            wildScreenCurrent === wildScreen.guideScreen && { backgroundColor: '#D94651' }]}
                        />

                        <Image
                            source={wildScreen.wildImage}
                            style={[{ width: 21, height: 21, resizeMode: 'contain' },
                            wildScreenCurrent === wildScreen.guideScreen && { tintColor: '#D94651' }]}
                        />

                        <Text style={[
                            styles.guideScreenText,
                            wildScreenCurrent === wildScreen.guideScreen && { color: '#D94651' }
                        ]}
                        >
                            {wildScreen.wildName}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </View>
    )
};

const styles = StyleSheet.create({

    wildGuidNavi: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 86,
        paddingBottom: 26,
        paddingHorizontal: 20,
        backgroundColor: '#242424',
        zIndex: 10
    },

    wildScreenGuideMarker: {
        width: '100%',
        height: 2,
        borderRadius: 5,
        backgroundColor: 'transparent'
    },

    guideScreenText: {
        fontSize: 11,
        fontWeight: '400',
        color: '#7B7B7B'
    }

})

export default AppGuide;