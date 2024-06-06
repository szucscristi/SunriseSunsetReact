import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { getSunriseSunsetRange, SunriseSunsetData } from '../src/SunriseSunsetApi';
import { RootStackParamList } from '../src/types';
import { useTheme } from '../src/themeContext';

type CalendarScreenRouteProp = RouteProp<RootStackParamList, 'Calendar'>;

const CalendarScreen: React.FC = () => {
  const { theme } = useTheme();
  const route = useRoute<CalendarScreenRouteProp>();
  const { latitude, longitude } = route.params;
  const [data, setData] = useState<SunriseSunsetData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const endDate = new Date();
      endDate.setMonth(today.getMonth() + 1);
      const startDateString = today.toISOString().split('T')[0];
      const endDateString = endDate.toISOString().split('T')[0];

      try {
        const response = await getSunriseSunsetRange(latitude, longitude, startDateString, endDateString);
        setData(response.results);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [latitude, longitude]);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Calendar for the next month</Text>
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
      <FlatList
        data={data}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={[styles.text, { color: theme.textColor }]}>Date: {item.date}</Text>
            <Text style={[styles.text, { color: theme.textColor }]}>Sunrise: {item.sunrise}</Text>
            <Text style={[styles.text, { color: theme.textColor }]}>Sunset: {item.sunset}</Text>
            <Text style={[styles.text, { color: theme.textColor }]}>Dawn: {item.dawn}</Text>
            <Text style={[styles.text, { color: theme.textColor }]}>Dusk: {item.dusk}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    paddingVertical: 8,
  },
  text: {
    fontSize: 18,
  },
});

export default CalendarScreen;
