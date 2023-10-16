import React, { useState } from 'react';
import { View, Text,Image,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../../css/styles';

function PursuePeaceScreen({ navigation }) {
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
			<Text style={styles.churchHeading}>A Peace-Seeking Prayer</Text>
			<Text style={styles.churchText}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed </Text>
			<TouchableOpacity onPress={() => navigation.navigate('SeekingPrayer')} style={styles.skip}>
				<Text style={styles.loginText}>Skip</Text>
			</TouchableOpacity>
      </View>
    </View>

  );
}

export default PursuePeaceScreen;
