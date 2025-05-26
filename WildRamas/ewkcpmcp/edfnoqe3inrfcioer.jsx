import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet, ScrollView } from "react-native";
import GuideNavigation from '../efcmewmcfpeow/AppGuide';
import { ramasQuizInfo, ramasQuizResults } from '../ewmfdpewmvcpow/ramasQuizInfo';

const { height } = Dimensions.get('window');

const RamasQuiz = () => {
    const [wildStart, setWildStart] = useState(false);
    const [wildQuestionIndex, setWildQuestionIndex] = useState(0);
    const [seletedWildOption, setSelectedWildOption] = useState({ option: null, key: null });
    const [wildResultVisible, setWildResultVisible] = useState(false);

    const wildFinish = wildQuestionIndex > ramasQuizInfo.length - 1;

    const nextWildQuestion = () => {
        if (wildQuestionIndex <= ramasQuizInfo.length - 1) {
            setWildQuestionIndex((prev) => prev + 1);
            setWildResultVisible(false);
        }
        setSelectedWildOption({ option: null, key: null })
    }

    const restartWildQuiz = () => {
        setWildQuestionIndex(0);
        setSelectedWildOption({ option: null, key: null });
        setWildResultVisible(false);
    }

    const leaveWildQuiz = () => {
        setWildStart(false);
        setWildQuestionIndex(0);
        setSelectedWildOption({ option: null, key: null });
        setWildResultVisible(false);
    }

    return (
        <View style={{ flex: 1 }}>

            {
                (!wildStart && !wildFinish) && (
                    <View style={{
                        width: '100%',
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingBottom: height * 0.17
                    }}>
                        <Image
                            source={require('../WildRamasAssetsApp/wildRamasDecorGuide/wildQuizTitle.png')}
                            style={{
                                width: '100%',
                                height: 135,
                                resizeMode: 'contain',
                                marginTop: height * 0.1,
                                zIndex: 10
                            }}
                        />
                        <Image
                            source={require('../WildRamasAssetsApp/wildRamasDecorGuide/WildQuizDeer.png')}
                            style={{
                                width: '100%',
                                height: height * 0.35,
                                resizeMode: 'contain',
                                position: 'absolute',
                                right: -50,
                                bottom: height * 0.2
                            }}
                        />
                        <TouchableOpacity onPress={() => setWildStart(true)}>
                            <Image
                                source={require('../WildRamasAssetsApp/wildRamasDecorGuide/wildQuizStartBtn.png')}
                                style={{
                                    width: height * 0.13,
                                    height: height * 0.13,
                                    resizeMode: 'contain',                                    
                                    zIndex: 10
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }

            {
                (!wildStart && !wildFinish) && (
                    <View
                        style={{
                            width: '100%',
                            position: 'absolute',
                            alignSelf: 'center',
                            bottom: 0,
                            zIndex: 10
                        }}>
                        <GuideNavigation />
                    </View>
                )
            }

            {
                (wildStart && !wildFinish && !wildResultVisible) && (
                    <View style={{width: '100%', height: '100%', paddingHorizontal: 20}}>
                        <TouchableOpacity
                            style={{alignSelf: 'flex-end'}}
                            onPress={leaveWildQuiz}
                        >
                            <Image
                                source={require('../WildRamasAssetsApp/wildRamasDecorGuide/wildQuizLeaveBtn.png')}
                                style={{
                                    width: height * 0.045,
                                    height: height * 0.045,
                                    resizeMode: 'contain',                                    
                                    zIndex: 10,
                                }}
                            />
                        </TouchableOpacity>

                        <View style={{ position: 'relative', alignItems: 'center', justifyContent: 'center', minWidth: 100 }}>
                            {[[-1, 0], [1, 0], [0, -1], [0, 1]].map(([dx, dy], i) => (
                                <Text
                                    key={`outline-progress-${i}`}
                                    style={[
                                        wildStyles.wildQuestion,
                                        {
                                            position: 'absolute',
                                            color: 'black',
                                            transform: [{ translateX: dx }, { translateY: dy }],
                                        },
                                    ]}
                                >
                                    {wildQuestionIndex + 1} / {ramasQuizInfo.length}
                                </Text>
                            ))}
                            <Text style={wildStyles.wildQuestion}>
                                {wildQuestionIndex + 1} / {ramasQuizInfo.length}
                            </Text>
                        </View>

                        <View style={{height: height * 0.05}} />

                        <View style={{ position: 'relative', alignItems: 'center', marginTop: 8 }}>
                            {[[-1, 0], [1, 0], [0, -1], [0, 1]].map(([dx, dy], i) => (
                                <Text
                                    key={`outline-question-${i}`}
                                    style={[
                                        wildStyles.wildQuestion,
                                        {
                                        position: 'absolute',
                                        left: dx,
                                        top: dy,
                                        color: 'black',
                                        },
                                    ]}
                                >
                                    {ramasQuizInfo[wildQuestionIndex].wildQuestion}
                                </Text>
                            ))}
                            <Text style={wildStyles.wildQuestion}>
                                {ramasQuizInfo[wildQuestionIndex].wildQuestion}
                            </Text>
                        </View>

                        <View style={{height: height * 0.05}} />

                        {
                            ramasQuizInfo[wildQuestionIndex].ramasOptionsInfo.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[wildStyles.wildOptionBtn, seletedWildOption?.option === item.option && { borderWidth: 3 }]}
                                    onPress={() => seletedWildOption?.option === item.option ?
                                        setSelectedWildOption({ option: null, key: null }) :
                                        setSelectedWildOption({ option: item.option, key: item.key })}
                                >
                                    <View
                                        style={[
                                            wildStyles.orderContainer,
                                            seletedWildOption?.option === item.option && { backgroundColor: '#D94651' }
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                wildStyles.orderText,
                                                seletedWildOption?.option === item.option && { color: '#fff' }
                                            
                                            ]}
                                        >
                                            {item.order}
                                        </Text>
                                    </View>
                                    <Text style={wildStyles.wildOptionText}>{item.option}</Text>
                                </TouchableOpacity>
                            ))
                        }

                        <TouchableOpacity onPress={() => setWildResultVisible(true)}>
                            <Image
                                source={seletedWildOption?.option !== null ?
                                    require('../WildRamasAssetsApp/wildRamasDecorGuide/wildOptionSelected.png')
                                    : require('../WildRamasAssetsApp/wildRamasDecorGuide/wildNoOption.png')}
                                style={{
                                    width: height * 0.09,
                                    height: height * 0.09,
                                    resizeMode: 'contain',
                                    alignSelf: 'center',
                                    marginTop: height * 0.07
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                )
            }

            {
                (wildStart && !wildFinish && wildResultVisible) && (
                    <View style={{ width: '100%', height: '100%', paddingHorizontal: 20 }}>
                        <ScrollView style={{ width: '100%' }}>
                            
                            <TouchableOpacity
                                style={{alignSelf: 'flex-end'}}
                                onPress={leaveWildQuiz}
                            >
                                <Image
                                    source={require('../WildRamasAssetsApp/wildRamasDecorGuide/wildQuizLeaveBtn.png')}
                                    style={{
                                        width: height * 0.045,
                                        height: height * 0.045,
                                        resizeMode: 'contain',                                    
                                        zIndex: 10,
                                        marginBottom: 18
                                    }}
                                />
                            </TouchableOpacity>

                            {
                                ramasQuizResults.some((k) => k.key === seletedWildOption.key) && (
                                    <View style={{width: '100%'}}>
                                        <View style={[wildStyles.finishTextContainer,
                                            { backgroundColor: '#242424', marginBottom: 18 }]}
                                        >
                                            <Text style={wildStyles.finishTextTitle}>
                                                {ramasQuizResults.find((k) => k.key === seletedWildOption.key)?.key}
                                            </Text>
                                            <Text style={wildStyles.finishTextSubTitle}>
                                                Animal relatives in spirit
                                            </Text>
                                            {
                                                ramasQuizResults.find((k) => k.key === seletedWildOption.key)?.animalRelatives.map((text, idx) => (
                                                    <Text key={idx} style={wildStyles.finishTextWhite}>  {`\u2022`}  {text}</Text>
                                                ))
                                            }
                                        </View>

                                        <View style={[wildStyles.finishTextContainer,
                                            { backgroundColor: '#fff', width: 285, alignSelf: 'flex-end', zIndex: 10 }]}
                                        >
                                            <Text style={wildStyles.finishTextBlack}>
                                                {ramasQuizResults.find((k) => k.key === seletedWildOption.key)?.comment}
                                            </Text>
                                        </View>

                                        <Image
                                            source={require('../WildRamasAssetsApp/wildRamasDecorGuide/WildQuizDeer.png')}
                                            style={{
                                                width: '100%',
                                                height: 342,
                                                resizeMode: 'contain',
                                                marginRight: -50,
                                                marginTop: -30
                                            }}
                                        />
                                    </View>
                                )
                            }

                            <TouchableOpacity onPress={nextWildQuestion}>
                                <Image
                                    source={require('../WildRamasAssetsApp/wildRamasDecorGuide/wildQuizStartBtn.png')}
                                    style={{
                                        width: height * 0.13,
                                        height: height * 0.13,
                                        resizeMode: 'contain',                                    
                                        zIndex: 10,
                                        position: 'absolute',
                                        bottom: height * -0.04,
                                        alignSelf: 'center'
                                    }}
                                />
                            </TouchableOpacity>

                            <View style={{height: 100}} />
                        </ScrollView>
                    </View>
                )
            }

            {
                wildFinish && (
                    <View style={{
                        width: '100%',
                        flexGrow: 1,
                        justifyContent: 'space-between',
                        paddingBottom: 30,
                        paddingHorizontal: 20
                    }}>

                        <View style={[wildStyles.row, {alignSelf: 'flex-end'}]}>
                            <TouchableOpacity onPress={restartWildQuiz}>
                                <Image
                                    source={require('../WildRamasAssetsApp/wildRamasDecorGuide/wildQuizRestartBtn.png')}
                                    style={{
                                        width: height * 0.07,
                                        height: height * 0.07,
                                        resizeMode: 'contain',                                    
                                        zIndex: 10,
                                        marginRight: 10
                                    }}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={leaveWildQuiz}>
                                <Image
                                    source={require('../WildRamasAssetsApp/wildRamasDecorGuide/wildQuizLeaveBtn.png')}
                                    style={{
                                        width: height * 0.07,
                                        height: height * 0.07,
                                        resizeMode: 'contain',                                    
                                        zIndex: 10,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={{width: '100%'}}>
                            <View style={[wildStyles.finishTextContainer,
                                { backgroundColor: '#fff', width: 285, alignSelf: 'flex-end', zIndex: 10 }]}
                            >
                                <Text style={wildStyles.finishTextBlack}>Discovery begins with curiosity. You’ve just taken a powerful first step - and what you’ve found is already part of you.</Text>
                            </View>

                            <Image
                                source={require('../WildRamasAssetsApp/wildRamasDecorGuide/WildQuizDeer.png')}
                                style={{
                                    width: '100%',
                                    height: height * 0.35,
                                    resizeMode: 'contain',
                                    marginRight: -50,
                                    marginTop: -30
                                }}
                            />
                        </View>

                    </View>
                )
            }
            
        </View>
    )
};

const wildStyles = StyleSheet.create({

    wildQuestion: {
        fontSize: height > 700 ? 35 : 28,
        lineHeight: height > 700 ? 38 : 32,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center'
    },

    wildOptionBtn: {
        width: '100%',
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 11,
        borderWidth: 1,
        borderColor: '#D94651',
        backgroundColor: '#242424',
        padding: 5
    },

    orderContainer: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6
    },

    orderText: {
        fontSize: 18,
        fontWeight: '900',
        color: '#D94651'
    },

    wildOptionText: {
        fontSize: 14,
        lineHeight: 18,
        fontWeight: '500',
        color: '#fff',
        width: '70%'
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    finishTextContainer: {
        width: '100%',
        borderRadius: 17,
        padding: 12
    },

    finishTextBlack: {
        fontSize: 12,
        lineHeight: 19,
        fontWeight: '500',
        color: '#000'
    },

    finishTextTitle: {
        fontSize: 25,
        lineHeight: 45,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 8
    },

    finishTextSubTitle: {
        fontSize: 14,
        lineHeight: 45,
        fontWeight: '900',
        color: '#fff',
    },

    finishTextWhite: {
        fontSize: 12,
        lineHeight: 23,
        fontWeight: '500',
        color: '#fff',
    }

});

export default RamasQuiz;