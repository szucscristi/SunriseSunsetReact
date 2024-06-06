import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types';
import { useTheme } from '../src/themeContext';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Info'>;

interface Country {
  key: string;
  latitude: number;
  longitude: number;
  name: string;
}

const ExploreScreen: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      const response = await fetch('../assets/countries.json'); // Ensure the correct path
      const data = await response.json();
      setCountries(data);
    };

    loadCountries();
  }, []);

  const renderItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate('Info', {
          latitude: item.latitude,
          longitude: item.longitude,
          country: item.name,
        })
      }
    >
      <Text style={[styles.text, { color: theme.textColor }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <FlatList
        data={countries}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 18,
  },
});

export default ExploreScreen;
