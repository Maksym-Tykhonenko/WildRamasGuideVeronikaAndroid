import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const WildJournal = () => {
    const navigation = useNavigation();
    const [forestJournal, setForestJournal] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadWildJournals();
        }, [])
    );

    const loadWildJournals = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('WILD_JOURNALS');
            if (jsonValue !== null) {
                setForestJournal(JSON.parse(jsonValue));
            }
        } catch (e) {
            Alert.alert('Error', 'Failed to load journals');
        }
    };


    return (
        <View style={{ flex: 1 }}>
            
            <Text style={wildStyles.title}>Forest Journal</Text>

            {
                forestJournal.length > 0 ? (
                    <ScrollView style={{width: '100%'}}>
                        <View style={wildStyles.row}>
                            {
                                forestJournal.map((journal, index) => (
                                    <View key={index} style={wildStyles.journalCard}>
                                        <View style={{width: '80%', height: '100%', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                            <Image
                                                source={{uri: journal.images[0]}}
                                                style={wildStyles.journalImage}
                                            />
                                            <Text
                                                style={wildStyles.journalTitle}
                                                numberOfLines={1}
                                                ellipsizeMode='tail'
                                            >
                                                {journal.title}
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('WildJournalDetailsScreenGuide', { journal })}
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
                        <TouchableOpacity
                            style={wildStyles.addBtn}
                            onPress={() => navigation.navigate('CreateWildJournalScreenGuide')}
                        >
                            <Text style={wildStyles.addBtnText}>Add</Text>
                        </TouchableOpacity>
                    </ScrollView>
                ) : (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Image
                            source={require('../WildRamasAssetsApp/wildRamasDecorGuide/wildEmptyStorage.png')}
                            style={wildStyles.emptyStorage}
                        />
                            <Text style={wildStyles.emptyStorageText}>There's nothing in the magazine yet..</Text>
                            <TouchableOpacity
                                style={wildStyles.addBtn}
                                onPress={() => navigation.navigate('CreateWildJournalScreenGuide')}
                            >
                                <Text style={wildStyles.addBtnText}>Add</Text>
                            </TouchableOpacity>
                    </View>
                )
            }

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

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        zIndex: 10
    },

    journalCard: {
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

    journalImage: {
        width: 81,
        height: 81,
        borderRadius: 10,
        resizeMode: 'cover',
    },

    journalTitle: {
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
    },

    addBtn: {
        width: '100%',
        borderRadius: 15,
        backgroundColor: '#D94651',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },

    addBtnText: {
        fontSize: 15,
        fontWeight: '900',
        lineHeight: 22,
        color: '#fff', 
    }

});

export default WildJournal;