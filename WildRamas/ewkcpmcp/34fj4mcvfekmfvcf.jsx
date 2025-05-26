import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const WildDeerDetails = ({ deer }) => {
    const navigation = useNavigation();
    const [studiedDeers, setStudiedDeers] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadStudiedDeers();
        }, [])
    );

    useEffect(() => {
        loadStudiedDeers();
    }, [studiedDeers]);

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

    const toggleStudyingDeer = async () => {
        try {
            const updatedList = studiedDeers.some(d => d.name === deer.name)
            ? studiedDeers.filter(d => d.name !== deer.name)
            : [...studiedDeers, deer];

            await AsyncStorage.setItem('STUDIED_DEERS', JSON.stringify(updatedList));
            setStudiedDeers(updatedList);
        } catch (e) {
            Alert.alert('Error', 'Failed to update studied deers');
        }
    };

    const isStudied = studiedDeers.some(d => d.name === deer.name);
    
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

            <Text style={wildStyles.title}>{deer.name}</Text>

            <View>
                <Image
                    source={deer.deerImage}
                    style={wildStyles.deerImage}
                />
                <View style={wildStyles.classContainer}>
                    <Text style={wildStyles.deerClass}>{deer.class}</Text>
                </View>
            </View>
            
            <ScrollView style={{width: '100%'}}>

                <Text style={wildStyles.deerLabel}>Habitat</Text>
                <Text style={wildStyles.deerValue}>{deer.habitat}</Text>

                <Text style={wildStyles.deerLabel}>Conservation Status</Text>
                <Text style={wildStyles.deerValue}>{deer.status}</Text>

                <Text style={wildStyles.deerLabel}>Interesting Behaviors</Text>
                {
                    deer.behaviour.map((b, index) => (
                        <Text key={index} style={[wildStyles.deerValue, {marginLeft: 10}]}>{`\u25E6`}  {b}</Text>
                    ))
                }

                <View style={wildStyles.citationContainer}>
                    <Text style={wildStyles.deerCitation}>{deer.citation}</Text>
                </View>
                <Image
                    source={require('../WildRamasAssetsApp/wildRamasDecorGuide/WildQuizDeer.png')}
                    style={{width: 318, height: 315, resizeMode: 'contain'}}
                />

                <TouchableOpacity
                    style={[wildStyles.studiedBtn, isStudied && {backgroundColor: '#7B7B7B'}]}
                    onPress={toggleStudyingDeer}
                >
                    <Text style={wildStyles.studiedBtnText}>{isStudied ? 'Studied' : 'Study'}</Text>
                </TouchableOpacity>

                <View style={{height: 50}} />

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

    classContainer: {
        padding: 10,
        borderRadius: 34,
        backgroundColor: '#D94651',
        position: 'absolute',
        bottom: 17,
        right: -5
    },

    deerClass: {
        fontSize: 15,
        fontWeight: '800',
        lineHeight: 22,
        color: '#fff',
    },

    deerImage: {
        width: width,
        height: 305,
        borderRadius: 21,
        resizeMode: 'cover',
        alignSelf: 'center',
        marginBottom: 6
    },

    deerLabel: {
        fontSize: 13,
        fontWeight: '300',
        lineHeight: 22,
        color: '#fff',
        marginBottom: 5,
        marginTop: 7
    },

    deerValue: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
        color: '#fff',
        marginBottom: 5
    },

    citationContainer: {
        width: 254,
        backgroundColor: '#fff',
        borderRadius: 22,
        padding: 10,
        zIndex: 10,
        marginTop: 10,
        alignSelf: 'flex-end'
    },

    deerCitation: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 18,
        color: '#000',
    },

    studiedBtn: {
        width: '100%',
        borderRadius: 15,
        backgroundColor: '#D94651',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },

    studiedBtnText: {
        fontSize: 15,
        fontWeight: '900',
        lineHeight: 22,
        color: '#fff', 
    }

});

export default WildDeerDetails;