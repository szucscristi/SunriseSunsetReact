// src/screens/CalendarScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getSunriseSunsetRange } from '../src/SunriseSunsetApi';
import Icon from 'react-native-vector-icons/Ionicons';
import { formatISO, addMonths } from 'date-fns';

interface SunriseSunsetData {
  date: string;
  sunrise: string;
  sunset: string;
}

const CalendarScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { latitude, longitude } = route.params as { latitude: number; longitude: number };

  const [monthlySunriseSunsetData, setMonthlySunriseSunsetData] = useState<SunriseSunsetData[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchMonthlySunriseSunsetData = async () => {
      try {
        const startDate = formatISO(new Date(), { representation: 'date' });
        const endDate = formatISO(addMonths(new Date(), 1), { representation: 'date' });
        const data = await getSunriseSunsetRange(latitude, longitude, startDate, endDate);
        //setMonthlySunriseSunsetData(data);
      } catch (error) {
        setErrorMessage('Failed to fetch monthly sunrise/sunset data.');
      }
    };

    fetchMonthlySunriseSunsetData();
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon.Button
          name="arrow-back"
          backgroundColor="transparent"
          color="black"
          size={32}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Calendar for the next month</Text>
      </View>

      {errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={monthlySunriseSunsetData}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>Date: {item.date}</Text>
              <Text style={styles.itemText}>Sunrise: {item.sunrise}</Text>
              <Text style={styles.itemText}>Sunset: {item.sunset}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
});

export default CalendarScreen;