import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import wildForestNotes from '../ewmfdpewmvcpow/wildForestNotes';
import { useNavigation } from '@react-navigation/native';

const RamasNotes = () => {
    const navigation = useNavigation();
    const [forestNote, setForestNote] = useState(null);
    const [forestDictArchive, setForestDictArchive] = useState([]);

    useEffect(() => {
        loadNote();
    }, []);

    const loadNote = async () => {
        try {
        const stored = await AsyncStorage.getItem('FOREST_DICT_ARCHIVE');
        const parsed = stored ? JSON.parse(stored) : [];
        setForestDictArchive(parsed);

        const remainingNotes = wildForestNotes.filter(
            (item) => !parsed.some((a) => a.title === item.title)
        );

        if (remainingNotes.length === 0) {
            setForestNote(null);
        } else {
            const random = remainingNotes[Math.floor(Math.random() * remainingNotes.length)];
            setForestNote(random);
        }
        } catch (e) {
            Alert.alert('Error', 'Failed to load notes');
        }
    };

    const toggleArchiveNote = async () => {
        try {
            const isArchived = forestDictArchive.some((a) => a.title === forestNote.title);
            let updatedArchive;

            if (isArchived) {
                updatedArchive = forestDictArchive.filter((a) => a.title !== forestNote.title);
            } else {
                updatedArchive = [...forestDictArchive, forestNote];
            }

            await AsyncStorage.setItem('FOREST_DICT_ARCHIVE', JSON.stringify(updatedArchive));
            setForestDictArchive(updatedArchive);
        } catch (e) {
            Alert.alert('Error', 'Failed to update archive');
        }
    };

    const isArchived = forestDictArchive.some(n => n.title === forestNote?.title);
    
    return (
        <View style={{ flex: 1 }}>
            
            <View style={wildStyles.row}>
                <Text style={wildStyles.title}>Read Book of Animals</Text>
                <TouchableOpacity onPress={() => navigation.navigate('RamasDictionaryScreenGuide')}>
                    <Text style={wildStyles.dictionaryBtn}>Dictionary of Forestry</Text>
                </TouchableOpacity>
            </View>
            
            {
                forestNote ? (
                    <ScrollView style={{ width: '100%' }}>
                        
                        <Text style={wildStyles.forestTitle}>{forestNote.title}</Text>
                        <Text style={wildStyles.forestNote}>{forestNote.forestNote}</Text>

                        <View style={{marginTop: 10, alignItems: 'center'}}>
                            <Image
                                source={require('../WildRamasAssetsApp/wildRamasDecorGuide/forestCitation.png')}
                                style={{width: 318, height: 250, resizeMode: 'contain'}}
                            />
                            <View style={wildStyles.forestCitationContainer}>
                                <Text style={wildStyles.forestCitation}>{forestNote.citation}</Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={[wildStyles.archiveBtn, isArchived && {backgroundColor: '#7B7B7B'}]}
                            onPress={toggleArchiveNote}
                        >
                            <Text style={wildStyles.archiveBtnText}>{isArchived ? 'Archieved' : 'Add to archieve'}</Text>
                        </TouchableOpacity>

                        <View style={{height: 200}} />
                    </ScrollView>
                ) : (
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Image
                            source={require('../WildRamasAssetsApp/wildRamasDecorGuide/wildEmptyStorage.png')}
                            style={wildStyles.emptyStorage}
                        />
                        <Text style={wildStyles.emptyStorageText}>No more notes left!</Text>
                        <Text style={wildStyles.emptyStorageText}>We work on adding more data...</Text>
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
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 11,
        marginBottom: 39
    },

    title: {
        fontSize: 25,
        fontWeight: '600',
        lineHeight: 27,
        color: '#fff',
        width: '50%'
    },

    dictionaryBtn: {
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 22,
        color: '#D94651',
    },

    forestTitle: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 22,
        color: '#fff',
        marginBottom: 8
    },

    forestNote: {
        fontSize: 13,
        fontWeight: '400',
        lineHeight: 17,
        color: '#7B7B7B',
        marginBottom: 14
    },

    forestCitationContainer: {
        position: 'absolute',
        top: 15,
        left: 20,
        transform: [{ rotate: '-10deg' }],
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#502900',
        alignItems: 'center',
        justifyContent: 'center'
    },

    forestCitation: {
        fontSize: 11,
        fontWeight: '300',
        lineHeight: 15,
        color: '#fff',
        width: 170,
    },

    archiveBtn: {
        width: '100%',
        borderRadius: 15,
        backgroundColor: '#D94651',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },

    archiveBtnText: {
        fontSize: 15,
        fontWeight: '900',
        lineHeight: 22,
        color: '#fff', 
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
        textAlign: 'center',
        marginBottom: 10
    }


});

export default RamasNotes;