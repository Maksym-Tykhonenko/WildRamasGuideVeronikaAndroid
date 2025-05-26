import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const WildHomeStudied = () => {
    const navigation = useNavigation();
    const [studiedDeers, setStudiedDeers] = useState([]);

    useEffect(() => {
        const loadStudiedDeers = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('STUDIED_DEERS');
            if (jsonValue !== null) {
            setStudiedDeers(JSON.parse(jsonValue));
            }
        } catch (e) {
            Alert.alert('Error', 'Failed to load studied deers');
        }
        };

        loadStudiedDeers();
    }, []);

    return (
        <View style={{ flex: 1 }}>

            <TouchableOpacity
                style={wildStyles.row}
                onPress={() => navigation.goBack()}
            >
                <Image
                    source={require('../WildRamasAssetsApp/wildIconsGuide/backArrow.png')}
                    style={{width: 7, height: 13, resizeMode: 'contain', marginRight: 7}}
                />
                <Text style={wildStyles.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={wildStyles.title}>Studied</Text>
            
            {
                studiedDeers.length > 0 ? (
                    <ScrollView style={{width: '100%', zIndex: 10}}>
                        <View style={wildStyles.deersConatiner}>
                            {
                                studiedDeers.map((deer, index) => (
                                    <View key={index} style={wildStyles.deerCard}>
                                        <View style={{width: '80%', height: '100%', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                            <Image
                                                source={deer.deerImage}
                                                style={wildStyles.deerImage}
                                            />
                                            <Text style={wildStyles.deerName}>{deer.name}</Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('WildDeerDetailsScreenGuide', { deer })}
                                        >
                                            <Image
                                                source={require('../WildRamasAssetsApp/wildIconsGuide/arrow45.png')}
                                                style={wildStyles.navIcon}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
                ) : (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Image
                            source={require('../WildRamasAssetsApp/wildRamasDecorGuide/wildEmptyStorage.png')}
                            style={wildStyles.emptyStorage}
                        />
                        <Text style={wildStyles.emptyStorageText}>You don't have any studied deer yet</Text>
                    </View>
                )
            }

        </View>
    )
};

const wildStyles = StyleSheet.create({

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24
    },

    title: {
        fontSize: 25,
        fontWeight: '600',
        lineHeight: 27,
        color: '#fff',
        marginBottom: 15
    },

    backText: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 22,
        color: '#D94651',
    },

    deersConatiner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        zIndex: 10
    },

    deerCard: {
        width: '49%',
        height: 132,
        marginBottom: 8,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#242424',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },

    deerImage: {
        width: 81,
        height: 81,
        borderRadius: 10,
        resizeMode: 'cover',
    },

    deerName: {
        fontSize: 12,
        fontWeight: '800',
        lineHeight: 16,
        color: '#fff',
    },

    navIcon: {
        width: 32,
        height: 32,
        resizeMode: 'contain'
    },
    
    emptyStorage: {
        width: 148,
        height: 148,
        resizeMode: 'contain',
        marginVertical: 50
    },

    emptyStorageText: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22,
        color: '#fff',
        textAlign: 'center'
    }

});

export default WildHomeStudied;