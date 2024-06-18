import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { MyLocationScreenNavigationProp } from '../src/types';
import { useTheme } from '../src/themeContext';

const MyLocationScreen: React.FC = () => {
  const navigation = useNavigation<MyLocationScreenNavigationProp>();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const { theme } = useTheme();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg('Error fetching location');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleNavigate = () => {
    if (location) {
      const { latitude, longitude } = location.coords;
      navigation.navigate('Info', { latitude, longitude, country: 'your country' });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <ActivityIndicator size="large" color={theme.textColor} />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <Text style={[styles.errorText, { color: theme.textColor }]}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      {location && (
        <>
          <Text style={[styles.infoText, { color: theme.textColor }]}>
            Your location information:
          </Text>
          <Text style={[styles.infoText, { color: theme.textColor }]}>
            Latitude: {location.coords.latitude}
          </Text>
          <Text style={[styles.infoText, { color: theme.textColor }]}>
            Longitude: {location.coords.longitude}
          </Text>
        </>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="See sunrise and sunset times"
          onPress={handleNavigate}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default MyLocationScreen;
