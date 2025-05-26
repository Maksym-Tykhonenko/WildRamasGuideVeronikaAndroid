import { ImageBackground, View, Dimensions } from "react-native";
import Edfnewrnfewr from "./edfnewrnfewr";
import imports from "./imports";

const { height } = Dimensions.get('window');

export const WildAnimationScreen = () => {
    return (
        <Edfnewrnfewr children={<imports.WildAnimation />} />
    )
};

export const WildHomeScreenGuide = () => {
    return (
        <Edfnewrnfewr children={<imports.WildHome />} wildGuideNavi />
    )
};

export const WildDeerDetailsScreenGuide = ({ route }) => {
    const { deer } = route.params;

    return (
        <Edfnewrnfewr children={<imports.WildDeerDetails deer={deer} />} />
    )
};

export const WildHomeStudiedScreenGuide = () => {
    return (
        <Edfnewrnfewr children={<imports.WildHomeStudied />} />
    )
};

export const RamasNotesScreenGuide = () => {
    return (
        <Edfnewrnfewr children={<imports.RamasNotes />} wildGuideNavi />
    )
};

export const RamasDictionaryScreenGuide = () => {
    return (
        <Edfnewrnfewr children={<imports.RamasDictionary />} />
    )
};

export const RamasNoteDetailsScreenGuide = ({ route }) => {
    const { note } = route.params;

    return (
        <Edfnewrnfewr children={<imports.RamasNoteDetails note={note} />} />
    )
};

export const WildJournalScreenGuide = () => {
    return (
        <Edfnewrnfewr children={<imports.WildJournal />} wildGuideNavi />
    )
};

export const CreateWildJournalScreenGuide = ({ route }) => {
    const { journal } = route.params || {};

    return (
        <Edfnewrnfewr children={<imports.CreateWildJournal journal={journal} />} />
    )
};

export const WildJournalDetailsScreenGuide = ({ route }) => {
    const { journal } = route.params;

    return (
        <Edfnewrnfewr children={<imports.WildJournalDetails journal={journal} />} />
    )
};

export const RamasGuizScreenGuide = () => {
    return (
        <ImageBackground
            source={require('../WildRamasAssetsApp/wildRamasDecorGuide/ramasQuizBackground.png')}
            style={{ flex: 1 }}
        >
            <View style={{
                width: '100%',
                height: '100%',
                paddingTop: height * 0.08
            }}>
                <imports.RamasGuiz />
            </View>
        </ImageBackground>
    )
};

export const WildSettingsScreenGuide = () => {
    return (
        <Edfnewrnfewr children={<imports.WildSettings />} wildGuideNavi />
    )
};