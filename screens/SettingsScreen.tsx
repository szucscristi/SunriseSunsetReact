import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import * as Location from 'expo-location';
import { useTheme } from '../src/themeContext';

const SettingsScreen: React.FC = () => {
  const { isDarkTheme, theme, toggleTheme } = useTheme();
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.getPermissionsAsync();
      setIsLocationEnabled(status === 'granted');
    })();
  }, []);

  const handleLocationPermissionToggle = async () => {
    if (isLocationEnabled) {
      Alert.alert("Location permission can't be turned off from the app settings");
    } else {
      const { status } = await Location.requestPermissionsAsync();
      setIsLocationEnabled(status === 'granted');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: theme.textColor }]}>Dark Theme</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
      <View style={styles.settingItem}>
        <Text style={[styles.settingText, { color: theme.textColor }]}>Location Permission</Text>
        <Switch value={isLocationEnabled} onValueChange={handleLocationPermissionToggle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  settingText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
