import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const RamasDictionary = () => {
    const navigation = useNavigation();
    const [ramasDictionary, setRamasDictionary] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadRamasDictionary();
        }, [])
    );

    useEffect(() => {
        loadRamasDictionary();
    }, [ramasDictionary]);

    const loadRamasDictionary = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('FOREST_DICT_ARCHIVE');
            if (jsonValue !== null) {
            setRamasDictionary(JSON.parse(jsonValue));
            }
        } catch (e) {
            Alert.alert('Error', 'Failed to load studied deers');
        }
    };

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

            <Text style={wildStyles.title}>Dictionary of Forestry</Text>
            
            {
                ramasDictionary.length > 0 ? (
                    <ScrollView style={{width: '100%', zIndex: 10}}>
                        <View style={wildStyles.notesConatiner}>
                            {
                                ramasDictionary.map((note, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={wildStyles.noteCard}
                                        onPress={() => navigation.navigate('RamasNoteDetailsScreenGuide', {note})}
                                    >
                                        <Text style={wildStyles.noteTitle}>{note.title}</Text>
                                        <Text style={wildStyles.noteForest}>{note.forestNote}</Text>
                                    </TouchableOpacity>
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
                        <Text style={wildStyles.emptyStorageText}>You don't have any data in the dictionary yet</Text>
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

    notesConatiner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        zIndex: 10
    },

    noteCard: {
        width: '100%',
        marginBottom: 7,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#242424'
    },

    noteTitle: {
        fontSize: 16,
        fontWeight: '800',
        lineHeight: 22,
        color: '#fff',
        marginBottom: 2
    },

    noteForest: {
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 20,
        color: '#7B7B7B',
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

export default RamasDictionary;