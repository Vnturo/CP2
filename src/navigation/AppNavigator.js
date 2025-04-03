import React from 'react';
//import navigation utilities from react-navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//import all screens used in the app
import HomeScreen from '../screens/HomeScreen';
import WebViewScreen from '../screens/WebViewScreen';
import CampusMapScreen from '../screens/CampusMapScreen';
import EmailScreen from '../screens/EmailScreen';
import RoomFinderScreen from '../screens/RoomFinderScreen';
import FoodScreen from '../screens/FoodScreen';
import BusTrainScreen from '../screens/BusTrainScreen';
import TimeTable from '../screens/ManualTimetableScreen';

//create a stack navigator
const Stack = createStackNavigator();

//define main app navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* define navigation stack without headers */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
        <Stack.Screen name="CampusMap" component={CampusMapScreen} />
        <Stack.Screen name="EmailScreen" component={EmailScreen} />
        <Stack.Screen name="FoodScreen" component={FoodScreen} />
        <Stack.Screen name="RoomFinder" component={RoomFinderScreen} />
        <Stack.Screen name="BusTrainScreen" component={BusTrainScreen} />
        <Stack.Screen name="TimeTable" component={TimeTable} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//export the navigator for use in app entry point
export default AppNavigator;
