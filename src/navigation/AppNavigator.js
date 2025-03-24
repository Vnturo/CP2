import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import WebViewScreen from '../screens/WebViewScreen';
import CampusMapScreen from '../screens/CampusMapScreen';
import EmailScreen from '../screens/EmailScreen';
import RoomFinderScreen from '../screens/RoomFinderScreen';
import FoodScreen from '../screens/FoodScreen';
import BusTrainScreen from '../screens/BusTrainScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="WebView" component={WebViewScreen} />
        <Stack.Screen name="CampusMap" component={CampusMapScreen} />
        <Stack.Screen name="EmailScreen" component={EmailScreen} />
        <Stack.Screen name="FoodScreen" component={FoodScreen} />
        <Stack.Screen name="RoomFinder" component={RoomFinderScreen} /> 
        <Stack.Screen name="BusTrainScreen" component={BusTrainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
