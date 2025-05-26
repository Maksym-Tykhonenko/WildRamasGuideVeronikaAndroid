import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

const marks = [
    'Observation',
    'Mood',
    'Thought',
    'Topic note'
];

const weathers = [
    '☀️ Sunny',
    '☁️ Cloudy',
    '🌧️ Rainy',
    '🌦️ Variable Clouds',
    '🌩️ Thunderstorm',
    '❄️ Snowy',
    '🌫️ Fog',
    '🌬️ Windy'
];

const CreateWildJournal = ({ journal }) => {
    const navigation = useNavigation();
    const [title, setTitle] = useState(journal ? journal.title : null);
    const [images, setImages] = useState(journal?.images?.length ? journal.images : [null]);
    const [selectedMark, setSelectedMark] = useState(journal ? journal.mark : null);
    const [notes, setNotes] = useState(journal ? journal.notes : null);
    const [selectedWeather, setSelectedWeather] = useState(journal ? journal.weather : null);

    const addJournalImage = async (index) => {
        try {
            const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });

            if (result?.assets && result.assets.length > 0) {
                const uri = result.assets[0].uri;
                const newImages = [...images];
                newImages[index] = uri;
                setImages(newImages);
            }
        } catch (error) {
            console.warn('Image selection error:', error);
        }
    };

    const addImageEntry = () => {
        setImages([...images, null]);
    };

    const addWildJournal = async () => {
        try {
            const now = new Date();
            const formattedDate = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;

            const stored = await AsyncStorage.getItem('WILD_JOURNALS');
            const existingJournals = stored ? JSON.parse(stored) : [];

            const cleanedImages = images.filter(uri => uri); 

            const updatedJournal = {
                id: journal?.id || Date.now(),
                date: formattedDate,
                title,
                images: cleanedImages,
                mark: selectedMark,
                notes,
                weather: selectedWeather
            };

            let updatedList;
            if (journal?.id) {
                updatedList = existingJournals.map(j => j.id === journal.id ? updatedJournal : j);
            } else {
                updatedList = [updatedJournal, ...existingJournals];
            }

            await AsyncStorage.setItem('WILD_JOURNALS', JSON.stringify(updatedList));
            navigation.navigate('WildJournalScreenGuide');
        } catch (e) {
            Alert.alert('Error', 'Failed to save journal');
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

            <Text style={wildStyles.title}>{journal ? 'Edit data' : 'Add data'}</Text>

            <ScrollView style={{ width: '100%' }}>
                
                {title && (<Text style={wildStyles.label}>Title</Text>)}
                <View style={{width: '100%'}}>
                    <TextInput
                        style={wildStyles.journalInput}
                        value={title}
                        onChangeText={setTitle}
                        placeholder='Title'
                        placeholderTextColor='#7B7B7B'
                    />
                    {
                        title && (
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 8, right: 5 }}
                                onPress={() => setTitle(null)}
                            >
                                <Image
                                    source={require('../WildRamasAssetsApp/wildIconsGuide/resetCross.png')}
                                    style={{width: 24, height: 24, resizeMode: 'contain'}}
                                />
                            </TouchableOpacity>
                        )
                    }
                </View>

                <View style={{height: 120}}>
                    <ScrollView horizontal>
                        {images.map((img, index) => (
                            <View key={index} style={{ position: 'relative', marginRight: 4 }}>
                                <TouchableOpacity
                                    style={{
                                        width: 115,
                                        height: 115,
                                        borderRadius: 13,
                                        backgroundColor: '#242424',
                                        overflow: 'hidden',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onPress={() => addJournalImage(index)}
                                >
                                    {img ? (
                                        <Image
                                            source={{ uri: img }}
                                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                                        />
                                        ) : (
                                        <Image
                                            source={require('../WildRamasAssetsApp/wildRamasDecorGuide/journalImageHolder.png')}
                                            style={{ width: 72, height: 76, resizeMode: 'contain' }}
                                    />
                                    )}
                                </TouchableOpacity>

                                {
                                    images.length > 1 && (
                                        <TouchableOpacity
                                            style={{ position: 'absolute', top: 5, right: 5 }}
                                            onPress={() => {
                                                const newImages = [...images];
                                                newImages.splice(index, 1);
                                                if (newImages.length === 0) newImages.push(null);
                                                setImages(newImages);
                                            }}
                                        >
                                            <Image
                                            source={require('../WildRamasAssetsApp/wildIconsGuide/resetCross.png')}
                                            style={{ width: 24, height: 24, resizeMode: 'contain' }}
                                            />
                                        </TouchableOpacity>
                                    )
                                }

                            </View>
                        ))}

                        <TouchableOpacity onPress={addImageEntry}>
                            <Image
                            source={require('../WildRamasAssetsApp/wildIconsGuide/addImage.png')}
                            style={{ width: 24, height: 24, resizeMode: 'contain', marginTop: 45}}
                            />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <Text style={wildStyles.label}>Mark as</Text>
                <View style={[wildStyles.row, {flexWrap: 'wrap'}]}>
                    {
                        marks.map((mark, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedMark(mark)}
                                style={[wildStyles.typeBtn, selectedMark === mark && {backgroundColor: '#D94651'}]}
                            >
                                <Text
                                    style={[wildStyles.typeBtnText, selectedMark === mark && { fontWeight: '800' }]}
                                >
                                    {mark}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                {notes && (<Text style={wildStyles.label}>Notes</Text>)}
                <View style={{width: '100%'}}>
                    <TextInput
                        style={[wildStyles.journalInput, {minHeight: 130}]}
                        value={notes}
                        onChangeText={setNotes}
                        placeholder='Notes'
                        placeholderTextColor='#7B7B7B'
                        multiline
                    />
                    {
                        notes && (
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 8, right: 5 }}
                                onPress={() => setNotes(null)}
                            >
                                <Image
                                    source={require('../WildRamasAssetsApp/wildIconsGuide/resetCross.png')}
                                    style={{width: 24, height: 24, resizeMode: 'contain'}}
                                />
                            </TouchableOpacity>
                        )
                }
                </View>

                <Text style={wildStyles.label}>Weather (optional)</Text>
                <View style={[wildStyles.row, {flexWrap: 'wrap'}]}>
                    {
                        weathers.map((wheather, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedWeather(wheather)}
                                style={[wildStyles.typeBtn, selectedWeather === wheather && {backgroundColor: '#D94651'}]}
                            >
                                <Text
                                    style={[wildStyles.typeBtnText, selectedWeather === wheather && { fontWeight: '800' }]}
                                >
                                    {wheather}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                <TouchableOpacity
                    style={[
                        wildStyles.doneBtn,
                        (!title || !selectedMark || !notes) && { backgroundColor: '#7B7B7B' }]}
                    disabled={!title || !selectedMark || !notes}
                    onPress={addWildJournal}
                >
                    <Text style={wildStyles.doneBtnText}>Done</Text>
                </TouchableOpacity>

                <View style={{height: 100}} />
            </ScrollView>

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

    backText: {
        fontSize: 15,
        fontWeight: '700',
        lineHeight: 22,
        color: '#D94651',
    },

    title: {
        fontSize: 25,
        fontWeight: '600',
        lineHeight: 27,
        color: '#fff',
        marginBottom: 15
    },

    label: {
        fontSize: 13,
        fontWeight: '300',
        lineHeight: 22,
        color: '#7B7B7B',
        marginBottom: 3
    },

    journalInput: {
        width: '100%',
        padding: 10,
        paddingRight: 35,
        borderRadius: 12,
        backgroundColor: '#242424',
        fontSize: 15,
        fontWeight: '600',
        lineHeight: 20,
        color: '#fff', 
        marginBottom: 12
    },

    typeBtn: {
        padding: 10,
        borderRadius: 34,
        backgroundColor: '#242424',
        margin: 2.5
    },

    typeBtnText: {
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 22,
        color: '#fff', 
    },

    doneBtn: {
        width: '100%',
        borderRadius: 15,
        backgroundColor: '#D94651',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15
    },

    doneBtnText: {
        fontSize: 15,
        fontWeight: '900',
        lineHeight: 22,
        color: '#fff', 
    }


});

export default CreateWildJournal;