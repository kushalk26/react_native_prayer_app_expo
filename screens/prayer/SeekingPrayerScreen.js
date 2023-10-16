import React, { useState } from 'react';
import { View, Text,Image,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../css/styles';

function SeekingPrayerScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    // You can implement your authentication logic, API calls, etc.
    console.log('Logging in...');
  };
   
  return (
    <View style={styles.Topcontainer}>	
		<Image source={require('../../assets/logo-church.png')} style={styles.church_logo} />
		
		<Image source={require('../../assets/church.png')} style={styles.church_banner} />
		<View style={styles.requestContainer}>
			<Text style={styles.churchTitle}>Pray for Health</Text>
			<Text style={styles.churchHeading}>A Request for Peace</Text>
			<Text style={styles.churchText}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</Text>
			<TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.skip}>
				<Text style={styles.loginText}>Skip</Text>
			</TouchableOpacity>
      </View>
    </View>

  );
}

export default SeekingPrayerScreen;
