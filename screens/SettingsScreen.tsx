/*import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, Button } from 'react-native';

const SettingsScreen = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const toggleDarkMode = () => setIsDarkMode((previousState) => !previousState);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Dark Mode</Text>
                <Switch
                    onValueChange={toggleDarkMode}
                    value={isDarkMode}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Enter default latitude"
                value={latitude}
                onChangeText={setLatitude}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter default longitude"
                value={longitude}
                onChangeText={setLongitude}
            />
            <Button title="Save" onPress={() => {}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    settingText: {
        fontSize: 18,
    },
    input: {
        width: '100%',
        padding: 8,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
});

export default SettingsScreen;*/