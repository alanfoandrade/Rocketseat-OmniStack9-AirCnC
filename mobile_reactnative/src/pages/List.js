import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  Text
} from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List({ navigation }) {
  const [techs, setTechs] = useState([]);

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
      <TouchableOpacity onPress={handleLogoff} style={styles.button}>
        <Text style={styles.buttonText}>Logoff</Text>
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

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15
  }
});
