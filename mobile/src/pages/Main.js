import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps'
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location'
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

function Main({ navigation }) {
    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState('');
    const [searching, setSearching] = useState(false);
    const [currentRegion, setCurrentRegion] = useState(null);
    const [keyboardShown, setKeyboardShown] = useState(false);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();
            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const { latitude, longitude } = coords;
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                });
            }
        }

        loadInitialPosition();
        Keyboard.addListener('keyboardDidShow', ()=>setKeyboardShown(true));
        Keyboard.addListener('keyboardDidHide', ()=>setKeyboardShown(false));
    }, []);

    async function loadDevs() {
        if (searching)
            return;
        setSearching(true);
        const { latitude, longitude } = currentRegion
        const response = await api.get('/search', { params: {latitude, longitude, techs }});
        setDevs(response.data.devs);
        setSearching(false);
    }

    function handleRegionChange(region) {
        setCurrentRegion(region);
    }

    if (!currentRegion)
        return null;
    return (
        <>
            <MapView
                onRegionChangeComplete={handleRegionChange}
                initialRegion={currentRegion}
                style={styles.map}
            >
                {devs.map(dev => (
                    <Marker
                        key={dev._id}
                        coordinate={{
                            longitude: dev.location.coordinates[0],
                            latitude: dev.location.coordinates[1]
                        }}>
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }}></Image>
                        <Callout onPress={() => {
                            // Navegação
                            navigation.navigate('Profile', { github: dev.github });
                        }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={[styles.searchForm, (keyboardShown ? styles.searchTop : styles.searchBottom)]}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='Buscar devs por techs...'
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={loadDevs} disabled={searching} style={styles.searchButton}>
                    {!searching && <MaterialIcons name="my-location" size={20} color="#FFF" />}
                    { searching && <MaterialIcons name="gps-not-fixed" size={20} color="#FFF" />}
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },

    callout: {
        width: 260
    },

    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },

    devBio: {
        color: '#666',
        marginTop: 5
    },

    devTechs: {
        marginTop: 5
    },

    searchForm: {
        position: 'absolute',
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },

    searchTop: {
        top: 20
    },

    searchBottom: {
        bottom: 20
    },

    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: '#FFF',
        color: '#333',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 2
    },

    searchButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8E4DFF',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
});

export default Main;