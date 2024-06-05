/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ExploreScreen = () => {
    const [countries, setCountries] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await fetch('https://example.com/countries.json'); // Replace with actual path to countries.json
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error(error);
        }
    };

    const renderCountryItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() =>
                navigation.navigate('InfoScreen', {
                    latitude: item.latitude,
                    longitude: item.longitude,
                    location: item.name,
                })
            }
        >
            <Image source={{ uri: item.flagUrl }} style={styles.flag} /> {/}
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={countries}
                renderItem={renderCountryItem}
                keyExtractor={(item) => item.name}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    flag: {
        width: 40,
        height: 40,
        marginRight: 16,
    },
    itemText: {
        fontSize: 18,
    },
});

export default ExploreScreen;*/