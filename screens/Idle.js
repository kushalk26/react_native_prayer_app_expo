import React, { useState,useEffect,useRef  } from 'react';
import { View, Text, TextInput, Button,Image,TouchableOpacity,ActivityIndicator,InteractionManager  } from 'react-native';
import {  AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkIfUserLoggedIn } from './utils';
import { LOGIN_URL,Image_URL } from './apiUrls';
import makeApiRequest from './api';
import { HeaderBackButton } from '@react-navigation/stack';

import { BackHandler } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { PanResponder } from "react-native"

import styles from '../css/styles';


const AppIdleCheck = () => {
   const timerId = useRef(false)
  const [timeForInactivityInSecond, setTimeForInactivityInSecond] = useState(
    3600
  )

   useEffect(() => {
    const loadData = () => {
      // Perform data loading logic here
      console.log('Loading data...');
    };

    const interval = setInterval(loadData, 10000); // Load data every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
         console.log('user starts touch');
		  setTimeForInactivityInSecond(timerId.current);
        resetInactivityTimeout()
      },
    })
  ).current

 const resetInactivityTimeout = () => {
    clearTimeout(timerId.current)
	console.log('user dont starts touch');
	console.log(timerId.current);
    timerId.current = setTimeout(() => {
	console.log('user dont starts touch');
      // action after user has been detected idle
      // add your redux dispatch here**

    }, timeForInactivityInSecond * 1000)
  }

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
		<Text>dsdfsdfsdf</Text>
      {/* <YourApp {...props} /> */}
    </View>
  )
};


export default AppIdleCheck;
