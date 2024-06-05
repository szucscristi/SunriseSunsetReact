// src/screens/InfoScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getSunriseSunset } from '../src/SunriseSunsetApi';

interface SunriseSunsetData {
  sunrise: string;
  sunset: string;
  dawn?: string;
  dusk?: string;
}

const InfoScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { latitude, longitude, country } = route.params as { latitude: number; longitude: number; country: string };

  const [sunriseSunsetData, setSunriseSunsetData] = useState<SunriseSunsetData | null>(null);
  const [tomorrowSunriseSunsetData, setTomorrowSunriseSunsetData] = useState<SunriseSunsetData | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchSunriseSunsetData = async () => {
      try {
        const response = await getSunriseSunset(latitude, longitude);
        setSunriseSunsetData(response.results);
      } catch (error) {
        setErrorMessage('Failed to fetch sunrise/sunset data.');
      }
    };

    const fetchTomorrowSunriseSunsetData = async () => {
      try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const date = tomorrow.toISOString().split('T')[0];
        const response = await getSunriseSunset(latitude, longitude, date);
        setTomorrowSunriseSunsetData(response.results);
      } catch (error) {
        setErrorMessage('Failed to fetch tomorrow\'s sunrise/sunset data.');
      }
    };

    fetchSunriseSunsetData();
    fetchTomorrowSunriseSunsetData();
  }, [latitude, longitude]);

  const handleGoToCalendar = () => {
    //navigation.navigate('Calendar', { latitude, longitude });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Today</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <SunriseInfo title="Sunrise" time={sunriseSunsetData?.sunrise || 'Loading...'} />
      <Text style={styles.infoText}>Dawn: {sunriseSunsetData?.dawn || 'Loading...'}</Text>
      <Text style={styles.highlightText}>Sunrise today in {country} will be at {sunriseSunsetData?.sunrise}.</Text>
      <SunsetInfo title="Sunset" time={sunriseSunsetData?.sunset || 'Loading...'} />
      <Text style={styles.infoText}>Dusk: {sunriseSunsetData?.dusk || 'Loading...'}</Text>
      <Text style={styles.highlightText}>Sunset today in {country} will be at {sunriseSunsetData?.sunset}.</Text>

      <Text style={styles.title}>Tomorrow</Text>
      <SunriseInfo title="Sunrise" time={tomorrowSunriseSunsetData?.sunrise || 'Loading...'} />
      <Text style={styles.infoText}>Dawn: {tomorrowSunriseSunsetData?.dawn || 'Loading...'}</Text>
      <Text style={styles.highlightText}>Sunrise tomorrow in {country} will be at {tomorrowSunriseSunsetData?.sunrise}.</Text>
      <SunsetInfo title="Sunset" time={tomorrowSunriseSunsetData?.sunset || 'Loading...'} />
      <Text style={styles.infoText}>Dusk: {tomorrowSunriseSunsetData?.dusk || 'Loading...'}</Text>
      <Text style={styles.highlightText}>Sunset tomorrow in {country} will be at {tomorrowSunriseSunsetData?.sunset}.</Text>

      <Button title="Go to Calendar" onPress={handleGoToCalendar} />
    </ScrollView>
  );
};

interface InfoProps {
  title: string;
  time: string;
}

const SunriseInfo: React.FC<InfoProps> = ({ title, time }) => (
  <View style={styles.infoContainer}>
    <Text style={styles.infoTitle}>{title}</Text>
    <Image source={require('../assets/sunrise.png')} style={styles.icon} />
    <Text style={styles.infoText}>{time}</Text>
  </View>
);

const SunsetInfo: React.FC<InfoProps> = ({ title, time }) => (
  <View style={styles.infoContainer}>
    <Text style={styles.infoTitle}>{title}</Text>
    <Image source={require('../assets/sunset.png')} style={styles.icon} />
    <Text style={styles.infoText}>{time}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  icon: {
    width: 64,
    height: 64,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 15,
  },
  highlightText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'red',
    marginBottom: 30,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default InfoScreen;