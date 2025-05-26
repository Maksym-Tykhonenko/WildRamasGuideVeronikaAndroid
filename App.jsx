import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
    WildAnimationScreen,
    WildHomeScreenGuide,
    WildHomeStudiedScreenGuide,
    WildDeerDetailsScreenGuide,
    RamasNotesScreenGuide,
    RamasDictionaryScreenGuide,
    RamasNoteDetailsScreenGuide,
    WildJournalScreenGuide,
    CreateWildJournalScreenGuide,
    WildJournalDetailsScreenGuide,
    RamasGuizScreenGuide,
    WildSettingsScreenGuide
} from './WildRamas/efcmewmcfpeow/ewmfciowemjcim';

enableScreens();

const Stack = createStackNavigator();

const App = () => {

  return (
      <NavigationContainer>
          <Stack.Navigator initialRouteName={"WildAnimationScreen" }>    
              <Stack.Screen 
                    name="WildAnimationScreen" 
                    component={WildAnimationScreen} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="WildHomeScreenGuide" 
                    component={WildHomeScreenGuide} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="WildHomeStudiedScreenGuide" 
                    component={WildHomeStudiedScreenGuide} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="WildDeerDetailsScreenGuide" 
                    component={WildDeerDetailsScreenGuide} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="RamasNotesScreenGuide" 
                    component={RamasNotesScreenGuide} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="RamasDictionaryScreenGuide" 
                    component={RamasDictionaryScreenGuide} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="RamasNoteDetailsScreenGuide" 
                    component={RamasNoteDetailsScreenGuide} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="WildJournalScreenGuide" 
                    component={WildJournalScreenGuide} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="CreateWildJournalScreenGuide" 
                    component={CreateWildJournalScreenGuide} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="WildJournalDetailsScreenGuide" 
                    component={WildJournalDetailsScreenGuide} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="RamasGuizScreenGuide" 
                    component={RamasGuizScreenGuide} 
                    options={{ headerShown: false }} 
              />
              <Stack.Screen 
                    name="WildSettingsScreenGuide" 
                    component={WildSettingsScreenGuide} 
                    options={{ headerShown: false }} 
              />
          </Stack.Navigator>
      </NavigationContainer>
    );
};

export default App;
