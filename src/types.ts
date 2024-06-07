import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export type RootStackParamList = {
  MyLocation: undefined;
  Info: { latitude: number; longitude: number; country: string };
  Calendar: { latitude: number; longitude: number };
  TopTabs: undefined;
};

export type MyLocationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MyLocation'
>;

export type InfoScreenRouteProp = RouteProp<RootStackParamList, 'Info'>;