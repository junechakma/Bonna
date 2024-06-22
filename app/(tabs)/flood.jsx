import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import moment from 'moment';
import axios from 'axios';

const Flood = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [toggleSearch, setToggleSearch] = useState(false);
    const [rainfall, setRainfall] = useState('');
    const [response, setResponse] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        })();
    }, []);

    const handlePostRequest = async () => {
        try {
            const result = await axios.post('https://your-bengali-api-endpoint.com', { rainfall });
            setResponse(result.data);
            Alert.alert("Response", JSON.stringify(result.data));
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Something went wrong!");
        }
    };

    const currentDate = moment().format('MMMM Do, YYYY');

    return (
        <View style={styles.mainContainer}>
            <StatusBar style="light" />
            <Image
                source={require('../../assets/images/bg.png')}
                blurRadius={70}
                style={styles.backgroundImage}
            />
            <SafeAreaView style={styles.safeArea}>
                {/* <View style={[styles.searchContainer, { backgroundColor: toggleSearch ? theme.bgWhite(0.2) : 'transparent' }]}>
                    {toggleSearch && (
                        <TextInput
                            placeholder="Search City"
                            placeholderTextColor="lightgray"
                            style={styles.searchInput}
                        />
                    )}
                    <TouchableOpacity
                        onPress={() => setToggleSearch(!toggleSearch)}
                        style={styles.searchButton}
                    >
                        <AntDesign name="search1" size={18} color="white" />
                    </TouchableOpacity>
                </View> */}

                <View style={[styles.searchContainer, { backgroundColor: toggleSearch ? theme.bgWhite(0.2) : 'transparent' }]}>

                    <TextInput
                        placeholder="Enter Rainfall (mm)"
                        placeholderTextColor="lightgray"
                        style={styles.searchInput}
                        value={rainfall}
                        onChangeText={setRainfall}
                    />
                    <TouchableOpacity style={styles.button} onPress={handlePostRequest}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>

                {/* Today's Flood Report */}
                <View style={styles.reportContainer}>
                    <Text style={styles.reportTitle}>Today's Flood Report</Text>

                    <View style={styles.dateContainer}>
                        <FontAwesome name="calendar" size={24} color="white" />
                        <Text style={styles.dateText}>{currentDate}</Text>
                    </View>

                    <View style={styles.reportDetailsContainer}>
                        <View style={styles.reportBox}>
                            <MaterialIcons name="waves" size={60} color="skyblue" />
                            <Text style={[styles.reportBoxText, { color: 'red' }]}>High</Text>
                            <Text style={styles.reportBoxTitle}>Flood</Text>
                            <Text style={styles.reportBoxTitle}>Probability</Text>
                        </View>

                        <View style={styles.reportBox}>
                            <FontAwesome name="tint" size={60} color="skyblue" />
                            <Text style={styles.reportBoxText}>400 mm</Text>
                            <Text style={styles.reportBoxTitle}>Rainfall</Text>
                            <Text style={styles.reportBoxTitle}>Level</Text>
                        </View>
                    </View>
                </View>



                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 24.0,
                            longitude: 90.0,
                            latitudeDelta: 10,
                            longitudeDelta: 10,
                        }}
                    >
                        {location && (
                            <Marker
                                coordinate={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                }}
                                title="Your Location"
                            />
                        )}
                    </MapView>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    backgroundImage: {
        position: 'absolute',
        height: '100%',
        width: '100%',
    },
    safeArea: {
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 30,
        padding: 1,
        paddingRight:20,
        margin:20,
    },
    searchInput: {
        paddingLeft: 24,
        height: 56,
        fontSize: 16,
        color: 'white',
        width: '70%',
    },
    searchButton: {
        backgroundColor: theme.bgWhite(0.3),
        borderRadius: 150,
        padding: 10,
        margin: 4,
    },
    reportContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 24,
    },
    reportTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        padding: 16,
        marginVertical: 24,
        backgroundColor: theme.bgWhite(0.15),
        borderRadius: 30,
    },
    dateText: {
        color: 'white',
    },
    reportDetailsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 36,
    },
    reportBox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
        padding: 16,
        backgroundColor: theme.bgWhite(0.15),
        width: 120,
    },
    reportBoxText: {
        color: 'white',
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    reportBoxTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10,
        color: 'white',
        marginRight: 10,
        flex: 1,
    },
    button: {
        backgroundColor: 'skyblue',
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
    },
    mapContainer: {
        width: '100%',
        height: '50%',
    },
    map: {
        height: '100%',
        width: '100%',
    },
});

export default Flood;
