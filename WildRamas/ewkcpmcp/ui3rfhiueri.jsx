import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const WildJournalDetails = ({ journal }) => {
    const navigation = useNavigation();
    const [moreImages, setMoreImages] = useState(false);

    const deleteJournalData = async () => {
        try {
            const stored = await AsyncStorage.getItem('WILD_JOURNALS');
            const journals = stored ? JSON.parse(stored) : [];

            const filtered = journals.filter(j => j.id !== journal.id);
            await AsyncStorage.setItem('WILD_JOURNALS', JSON.stringify(filtered));

            navigation.goBack();
        } catch (error) {
            Alert.alert('Error', 'Failed to delete the journal entry.');
            console.warn(error);
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

            <Text style={wildStyles.title}>{journal.title}</Text>
            
            <View style={{width: '100%', height: height * 0.6}}>
                <ScrollView style={{ width: '100%' }}>
                    
                    <View style={{ width: '100%' }}>
                        <Image
                            source={{uri: journal.images[0]}}
                            style={wildStyles.journalImage}
                        />
                        <View style={[wildStyles.typeContainer, {bottom: 67}]}>
                            <Text style={wildStyles.journalType}>{journal.mark}</Text>
                        </View>
                        {
                            journal.weather && (
                                <View style={[wildStyles.typeContainer, {bottom: 17}]}>
                                    <Text style={wildStyles.journalType}>{journal.weather}</Text>
                                </View>
                            )
                        }
                    </View>

                    {
                        moreImages && (
                            <View style={{width: '100%'}}>
                                {
                                    journal.images.map((image, index) => (
                                        <View key={index} style={{width: '100%'}}>
                                            {
                                                index !== 0 && (
                                                    <Image
                                                        source={{uri: image}}
                                                        style={wildStyles.journalImage}
                                                    />
                                                )
                                            }
                                        </View>
                                    ))
                                }
                            </View>
                        )
                    }

                    {
                        journal.images.length > 1 && (
                            <TouchableOpacity
                                style={[
                                    {
                                        width: 41,
                                        height: 3,
                                        backgroundColor: '#7B7B7B',
                                        borderRadius: 5,
                                        marginBottom: 10,
                                        marginTop: 5,
                                        alignSelf: 'center'
                                    },
                                    moreImages && {backgroundColor: '#D94651'}
                                ]}
                                onPress={() => setMoreImages((prev) => !prev)}
                            />
                        )
                    }

                    <Text style={wildStyles.journalLabel}>Date</Text>
                    <Text style={wildStyles.journalValue}>{journal.date}</Text>

                    <Text style={wildStyles.journalLabel}>Notes</Text>
                    <Text style={wildStyles.journalValue}>{journal.notes}</Text>
        
                    <View style={{height: 100}} />

                </ScrollView>
            </View>

            <View style={{width: '100%', position: 'absolute', bottom: 50}}>
                <TouchableOpacity
                    style={[wildStyles.deleteBtn, {backgroundColor: '#006FFD'}]}
                    onPress={() => navigation.navigate('CreateWildJournalScreenGuide', {journal})}
                >
                    <Text style={wildStyles.deleteBtnText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={wildStyles.deleteBtn}
                    onPress={deleteJournalData}
                >
                    <Text style={wildStyles.deleteBtnText}>Delete</Text>
                </TouchableOpacity>
            </View>

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

    typeContainer: {
        padding: 10,
        borderRadius: 34,
        backgroundColor: '#D94651',
        position: 'absolute',
        right: 10
    },

    journalType: {
        fontSize: 15,
        fontWeight: '800',
        lineHeight: 22,
        color: '#fff',
    },

    journalImage: {
        width: '100%',
        height: 305,
        borderRadius: 21,
        resizeMode: 'cover',
        alignSelf: 'center',
        marginBottom: 6
    },

    journalLabel: {
        fontSize: 13,
        fontWeight: '300',
        lineHeight: 22,
        color: '#fff',
        marginBottom: 5,
        marginTop: 7
    },

    journalValue: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
        color: '#fff',
        marginBottom: 5
    },

    deleteBtn: {
        width: '100%',
        borderRadius: 15,
        backgroundColor: '#FF182A',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    deleteBtnText: {
        fontSize: 15,
        fontWeight: '900',
        lineHeight: 22,
        color: '#fff', 
    }

});

export default WildJournalDetails;