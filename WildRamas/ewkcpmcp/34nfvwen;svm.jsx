import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';
import wildDeersInfo from '../ewmfdpewmvcpow/wildDeersInfo';

const { height } = Dimensions.get('window');
 
const WildHome = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1 }}>
            
            <View style={wildStyles.row}>
                <Text style={wildStyles.title}>Read Book of Animals</Text>
                <TouchableOpacity onPress={() => navigation.navigate('WildHomeStudiedScreenGuide')}>
                    <Text style={wildStyles.studiedBtn}>Studied</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={{width: '100%', zIndex: 10}}>
                <View style={wildStyles.deersConatiner}>
                    {
                        wildDeersInfo.map((deer, index) => (
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

            <Image
                source={require('../WildRamasAssetsApp/wildRamasDecorGuide/sideRamasDeer.png')}
                style={wildStyles.sideDeer}
            />

        </View>
    )
};

const wildStyles = StyleSheet.create({

    row: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 11
    },

    title: {
        fontSize: 25,
        fontWeight: '600',
        lineHeight: 27,
        color: '#fff',
        width: '50%'
    },

    studiedBtn: {
        fontSize: 15,
        fontWeight: '600',
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

    sideDeer: {
        width: '100%',
        height: height * 0.4,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 30,
        right: -80
    }

});

export default WildHome;