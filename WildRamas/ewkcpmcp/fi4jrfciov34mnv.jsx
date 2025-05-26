import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const RamasNoteDetails = ({ note }) => {
    const navigation = useNavigation();
    const [forestDictArchive, setForestDictArchive] = useState([]);

    useEffect(() => {
        loadNote();
    }, []);

    const loadNote = async () => {
        try {
            const stored = await AsyncStorage.getItem('FOREST_DICT_ARCHIVE');
            const parsed = stored ? JSON.parse(stored) : [];
            setForestDictArchive(parsed);
        } catch (e) {
            Alert.alert('Error', 'Failed to load notes');
        }
    };

    const deleteForestNote = async () => {
        try {
            const isArchived = forestDictArchive.some((a) => a.title === note.title);
            let updatedArchive;

            if (isArchived) {
                updatedArchive = forestDictArchive.filter((a) => a.title !== note.title);
            } else {
                updatedArchive = [...forestDictArchive, note];
            }

            await AsyncStorage.setItem('FOREST_DICT_ARCHIVE', JSON.stringify(updatedArchive));
            setForestDictArchive(updatedArchive);
            navigation.goBack()
        } catch (e) {
            Alert.alert('Error', `Failed to deleting ${note.title}`);
        }
    };

    const isArchived = forestDictArchive.some(n => n.title === note.title);
    
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
            
            <ScrollView style={{ width: '100%' }}>
                                    
                <Text style={wildStyles.forestTitle}>{note.title}</Text>
                <Text style={wildStyles.forestNote}>{note.forestNote}</Text>

                <View style={{marginTop: 10, alignItems: 'center'}}>
                    <Image
                        source={require('../WildRamasAssetsApp/wildRamasDecorGuide/forestCitation.png')}
                        style={{width: 318, height: 250, resizeMode: 'contain'}}
                    />
                    <View style={wildStyles.forestCitationContainer}>
                        <Text style={wildStyles.forestCitation}>{note.citation}</Text>
                    </View>
                </View>

                <View style={{height: 200}} />
            </ScrollView>

            <TouchableOpacity
                style={wildStyles.deleteBtn}
                onPress={deleteForestNote}
            >
                <Text style={wildStyles.deleteBtnText}>Delete</Text>
            </TouchableOpacity>

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

    deleteBtn: {
        width: '100%',
        borderRadius: 15,
        backgroundColor: '#FF182A',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center'
    },

    deleteBtnText: {
        fontSize: 15,
        fontWeight: '900',
        lineHeight: 22,
        color: '#fff', 
    }

});

export default RamasNoteDetails;