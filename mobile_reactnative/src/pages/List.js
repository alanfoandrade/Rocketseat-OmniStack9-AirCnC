import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import socketIoClient from 'socket.io-client';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketIoClient('http://192.168.0.3:3333', {
        query: { user_id }
      });

      socket.on('booking_response', booking => {
        Alert.alert(
          `Sua reserva em ${booking.spot.company} em ${booking.date} foi ${
            booking.approved ? 'APROVADA' : 'REJEITADA'
          }`
        );
      });
    });
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, []);

  async function handleLogoff() {
    await AsyncStorage.setItem('user', '');
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map(tech => (
          <SpotList key={tech} tech={tech} />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={handleLogoff}
        style={[styles.button, styles.buttonLogoff]}
      >
        <Text style={[styles.buttonText, styles.buttonLogoffText]}>Logoff</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10
  },

  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15
  },

  buttonLogoff: {
    height: 30,
    backgroundColor: '#ccc'
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  },

  buttonLogoffText: {
    color: '#000000',
    fontSize: 12
  }
});
