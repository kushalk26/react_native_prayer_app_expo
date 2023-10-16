import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        navigation.navigate('ProfileScreen');
      } else {
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.log('Error while checking user login status:', error);
      navigation.navigate('LoginScreen');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default AuthLoadingScreen;