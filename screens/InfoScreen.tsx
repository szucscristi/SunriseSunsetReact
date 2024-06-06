import React, { useEffect, useState } from 'react';
import { View, Text, Image, Button, StyleSheet, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { getSunriseSunset, getTomorrowSunriseSunset, SunriseSunsetData } from '../src/SunriseSunsetApi';
import { RootStackParamList } from '../src/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme } from '../src/themeContext';

type InfoScreenRouteProp = RouteProp<RootStackParamList, 'Info'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Calendar'>;

const InfoScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute<InfoScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { latitude, longitude, country } = route.params || { latitude: null, longitude: null, country: '' };

  const [todayData, setTodayData] = useState<SunriseSunsetData | null>(null);
  const [tomorrowData, setTomorrowData] = useState<SunriseSunsetData | null>(null);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const fetchData = async () => {
        const todayResponse = await getSunriseSunset(latitude, longitude);
        const tomorrowResponse = await getTomorrowSunriseSunset(latitude, longitude);

        setTodayData(todayResponse.results);
        setTomorrowData(tomorrowResponse.results);
      };

      fetchData();
    }
  }, [latitude, longitude]);

  if (latitude === null || longitude === null) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.errorText, { color: theme.textColor }]}>Invalid location parameters.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.section}>
        <Text style={[styles.title, { color: theme.textColor }]}>Today</Text>
        {todayData ? (
          <>
            <SunriseInfo title="Sunrise" time={todayData.sunrise} />
            <Text style={[styles.infoText, { color: theme.textColor }]}>Dawn: {todayData.dawn}</Text>
            <Text style={[styles.highlightText, { color: theme.textColor }]}>
              Sunrise today in {country} will be at {todayData.sunrise}.
            </Text>
            <SunsetInfo title="Sunset" time={todayData.sunset} />
            <Text style={[styles.infoText, { color: theme.textColor }]}>Dusk: {todayData.dusk}</Text>
            <Text style={[styles.highlightText, { color: theme.textColor }]}>
              Sunset today in {country} will be at {todayData.sunset}.
            </Text>
          </>
        ) : (
          <Text style={[styles.infoText, { color: theme.textColor }]}>Loading...</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.title, { color: theme.textColor }]}>Tomorrow</Text>
        {tomorrowData ? (
          <>
            <SunriseInfo title="Sunrise" time={tomorrowData.sunrise} />
            <Text style={[styles.infoText, { color: theme.textColor }]}>Dawn: {tomorrowData.dawn}</Text>
            <Text style={[styles.highlightText, { color: theme.textColor }]}>
              Sunrise tomorrow in {country} will be at {tomorrowData.sunrise}.
            </Text>
            <SunsetInfo title="Sunset" time={tomorrowData.sunset} />
            <Text style={[styles.infoText, { color: theme.textColor }]}>Dusk: {tomorrowData.dusk}</Text>
            <Text style={[styles.highlightText, { color: theme.textColor }]}>
              Sunset tomorrow in {country} will be at {tomorrowData.sunset}.
            </Text>
          </>
        ) : (
          <Text style={[styles.infoText, { color: theme.textColor }]}>Loading...</Text>
        )}
      </View>

      <Button
        title="Go to Calendar"
        onPress={() => navigation.navigate('Calendar', { latitude, longitude })}
      />
    </ScrollView>
  );
};

const SunriseInfo: React.FC<{ title: string; time: string }> = ({ title, time }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.infoTitle, { color: theme.textColor }]}>{title}</Text>
      <Image source={require('../assets/sunrise.png')} style={styles.image} />
      <Text style={[styles.infoText, { color: theme.textColor }]}>{time}</Text>
    </View>
  );
};

const SunsetInfo: React.FC<{ title: string; time: string }> = ({ title, time }) => {
  const { theme } = useTheme();
  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.infoTitle, { color: theme.textColor }]}>{title}</Text>
      <Image source={require('../assets/sunset.png')} style={styles.image} />
      <Text style={[styles.infoText, { color: theme.textColor }]}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'red',
    marginBottom: 16,
  },
  image: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default InfoScreen;
