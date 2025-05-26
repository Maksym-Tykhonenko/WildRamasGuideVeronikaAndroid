import { View, Dimensions, StyleSheet } from "react-native";
import AppGuide from "./AppGuide";

const { height } = Dimensions.get('window');

const Edfnewrnfewr = ({ children, wildGuideNavi }) => {
    return (
        <View style={layout.container}>

            <View
                style={layout.wildScreen}>
                {children}
            </View>

            {
                wildGuideNavi && (
                    <View
                        style={layout.wildNavi}>
                        <AppGuide />
                    </View>
                )
            }

        </View>
    )
};

const layout = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#395e2e'
    },

    wildScreen: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        paddingTop: height * 0.08
    },

    wildNavi: {
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
        zIndex: 10
    }

});

export default Edfnewrnfewr;