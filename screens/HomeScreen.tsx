// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { getSunriseSunset } from '../src/SunriseSunsetApi';

const HomeScreen: React.FC = () => {
  const [latitude, setLatitude] = useState<string>('');
  const [longitude, setLongitude] = useState<string>('');
  const [data, setData] = useState<{ sunrise: string; sunset: string } | null>(null);

  const fetchSunriseSunset = async () => {
    try {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      const response = await getSunriseSunset(lat, lng);
      setData(response.results);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sunrise and Sunset Times</Text>
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        value={latitude}
        onChangeText={setLatitude}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        value={longitude}
        onChangeText={setLongitude}
        keyboardType="numeric"
      />
      <Button title="Get Times" onPress={fetchSunriseSunset} />
      {data && (
        <View style={styles.results}>
          <Text>Sunrise: {data.sunrise}</Text>
          <Text>Sunset: {data.sunset}</Text>
        </View>
      )}
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    width: '80%',
  },
  results: {
    marginTop: 16,
  },
});

export default HomeScreen;