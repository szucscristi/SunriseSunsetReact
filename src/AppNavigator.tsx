import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopTabNavigator from './TopTabNavigator';
import CalendarScreen from '../screens/CalendarScreen';
import InfoScreen from '../screens/InfoScreen';
import { RootStackParamList } from '../src/types';
import MyLocationScreen from '../screens/MyLocationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="TopTabs">
      <Stack.Screen name="TopTabs" component={TopTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="MyLocation" component={MyLocationScreen} />
      <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: true, title: 'Calendar' }} />
      <Stack.Screen name="Info" component={InfoScreen} options={{ headerShown: true, title: 'Sunrise and sunset times' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;