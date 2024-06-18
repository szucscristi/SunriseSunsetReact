import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types';
import { useTheme } from '../src/themeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Info'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { theme } = useTheme();
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');

  const goToInfoScreen = () => {
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    const country = "your specified location"
    navigation.navigate('Info', { latitude: lat, longitude: lng, country });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Image source={require('../assets/sun_logo.png')} style={styles.image} />
      <Text style={[styles.title, { color: theme.textColor }]}>SunriseSunset</Text>
      <TextInput
        style={[styles.input, { color: theme.textColor, borderColor: theme.textColor }]}
        placeholder="Enter latitude"
        placeholderTextColor={theme.textColor}
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, { color: theme.textColor, borderColor: theme.textColor }]}
        placeholder="Enter longitude"
        placeholderTextColor={theme.textColor}
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />
      <Button title="Search" onPress={goToInfoScreen} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
  image: {
    width: 240,
    height: 240,
    marginBottom: 8,
  },
});

export default HomeScreen;
