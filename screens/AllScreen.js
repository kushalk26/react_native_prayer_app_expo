import React, { useState } from 'react';
import { View, Text, TextInput, Button,Image,TouchableOpacity } from 'react-native';

import styles from '../css/styles';

function AllScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Perform registration logic here
    // You can implement your registration logic, API calls, etc.
    console.log('Registering...');
  };
   
  return (
		<View style={styles.container}>
		
		<View style={styles.boxContainer}>			  
		  
		/*<TouchableOpacity style={styles.loginTest} onPress={() => navigation.navigate('Login')}>
			<Text style={styles.loginTextTest}>Login</Text>
		</TouchableOpacity>
		
		<TouchableOpacity style={styles.loginTest} onPress={() => navigation.navigate('Registration')}>
			<Text style={styles.loginTextTest}>Register</Text>
		</TouchableOpacity>*/
		
		<TouchableOpacity style={styles.loginTest} onPress={() => navigation.navigate('PeaceRequest')}>
			<Text style={styles.loginTextTest}>PeaceRequestScreen</Text>
		</TouchableOpacity>
		
		<TouchableOpacity style={styles.loginTest} onPress={() => navigation.navigate('Survey1')}>
			<Text style={styles.loginTextTest}>Survey</Text>
		</TouchableOpacity>
		
		
		/*<TouchableOpacity style={styles.loginTest} onPress={() => navigation.navigate('CreateRequest')}>
			<Text style={styles.loginTextTest}>Create Request</Text>
		</TouchableOpacity>
		
		<TouchableOpacity style={styles.loginTest} onPress={() => navigation.navigate('Requests')}>
			<Text style={styles.loginTextTest}>Requests</Text>
		</TouchableOpacity>
		
		<TouchableOpacity style={styles.loginTest} onPress={() => navigation.navigate('Prayer')}>
			<Text style={styles.loginTextTest}>Prayers</Text>
		</TouchableOpacity>
		
		<TouchableOpacity style={styles.loginTest} onPress={() => navigation.navigate('CreatePrayer')}>
			<Text style={styles.loginTextTest}>Create Prayer</Text>
		</TouchableOpacity>
		
		<TouchableOpacity style={styles.loginTest} onPress={() => navigation.navigate('Notification')}>
			<Text style={styles.loginTextTest}>Notification</Text>
		</TouchableOpacity>
		
		<TouchableOpacity style={styles.loginTest} onPress={() => navigation.navigate('Profile')}>
			<Text style={styles.loginTextTest}>Profile</Text>
		</TouchableOpacity>
		
		<TouchableOpacity style={styles.loginTest} onPress={() => navigation.navigate('MyAccount')}>
			<Text style={styles.loginTextTest}>My Account</Text>
		</TouchableOpacity>*/

		
	</View>

    </View>
  );
}

export default AllScreen;
