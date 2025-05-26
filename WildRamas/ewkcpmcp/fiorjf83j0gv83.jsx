import React, { useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';

const WildAnimation = () => {
    const navigation = useNavigation();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        const timeout = setTimeout(() => {
            navigation.replace('WildHomeScreenGuide');
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View style={{ flex: 1 }}>
            
            <Animated.View style={[animation.textContainer, { opacity: fadeAnim }]}>
                <Text style={animation.wildRamasGuide} numberOfLines={3}>
                    Wild Ramas Guide
                </Text>
                <View style={animation.line} />
            </Animated.View>

            <Image
                source={require('../WildRamasAssetsApp/wildRamasDecorGuide/sideRamasDeer.png')}
                style={animation.wildRamasDeer}
            />

        </View>
    )
};

const animation = StyleSheet.create({

    textContainer: {
        width: '60%'
    },

    wildRamasGuide: {
        fontSize: 55,
        color: '#fff',
        fontWeight: '900',
        lineHeight: 60
    },

    line: {
        width: '100%',
        height: 2,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 7
    },

    wildRamasDeer: {
        width: '100%',
        height: 400,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 30,
        right: -50
    }

})

export default WildAnimation