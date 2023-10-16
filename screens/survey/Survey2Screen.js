import React, { useState,useEffect } from 'react';
import { View, Text,TouchableOpacity,ActivityIndicator,TextInput } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { BackHandler } from 'react-native';

import makeApiRequest from '../api';
import { SURVEY_URL,CREATE_SURVEY_URL,SURVEY_URL_NEW } from '../apiUrls';
import styles from '../../css/styles';   
import BottomMenu from '../menu/BottomMenu';

import AsyncStorage from '@react-native-async-storage/async-storage';

function Survey2Screen({ navigation }) {
  const [checked, setChecked] = useState('');
  const[data,setData] = useState('');
  const[total_data,setTotalData] = useState('');
  const[survey_item,setSurveItem] = useState(0);
  const[nrandom,setNrandom] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [question, setQuestion] = useState('');
  const [question_id, setQuestionId] = useState('');
  const [radio, setRadio] = useState('');
  
  
  const [validationError, setValidationError] = useState('');
  
  const [field_validate, setFieldValidate] = useState(false);
  const route = useRoute();
  
  const [isLoading, setIsLoading] = useState(false);
  const survey_count = route.params?.survey_count;

  const handleOptionChange = (option) => {
    setChecked(option);
  };
	
	useEffect(() => {
		fetchData(survey_item);
		const backAction = () => {
		  return true; // Returning true will disable the default back button behavior
		};

		const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

		return () => {
		  backHandler.remove(); // Cleanup the event listener when the component unmounts
		};
	}, [survey_item]);
	
	const fetchData = async (survey_item) => {
		const sessionData = await AsyncStorage.getItem('sessionData');	
		
		
		if (sessionData !== null) {
			setChecked('');
			setIsLoading(true)
			setFieldValidate(false);
			const parsedSessionData = JSON.parse(sessionData);
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token,'survey_item':survey_item,'random_no_n':nrandom};
			
			try {
			   console.log("mmm");
			   let response = await makeApiRequest(SURVEY_URL_NEW, 'POST', requestBody);
			   //get survey data
				 //get survey data
				if(response.data){
				    let res_data = response.data;	
					//console.log('ddddres_data'); 
					//console.log(res_data.field_type);
				    setData(res_data);	
				    setValue(res_data.field_type);	
					if(res_data.field_type=="radio"){
						setRadio(res_data.question_value);
					}
					//check for validation
					if(res_data.required){
						setFieldValidate(true);
					}
					if(res_data.question_name){
						setQuestion(res_data.question_name);
					}
					if(res_data.id){
						setQuestionId(res_data.id);
					}
					//console.log(response.random_no); 
					if(response.random_no){
						//await AsyncStorage.removeItem('random_number');
						var ran_no = response.random_no;
						console.log('ran_no');
						console.log(ran_no);
						const existingData = await AsyncStorage.getItem('random_number');
						
						if(existingData===null){
							await AsyncStorage.setItem('random_number', ran_no.toString());
							console.log("ffffffff");
						} else {
							const updatedData = existingData ? `${existingData},${ran_no.toString()}` : null;
							AsyncStorage.setItem('random_number', updatedData);
						
						}						 
					}
			
				}
				//check total count of items
				var random_ndata = await AsyncStorage.getItem('random_number');
				setNrandom(random_ndata);
				console.log('newdata');
				console.log(random_ndata);
				if(response.count){
					setTotalData(response.count);
				}
				
				
			  setIsLoading(false);  
			} catch (error) {
			  console.error('Error fetching data:', error);
			} finally {
			  
			}
		}
		
	};
	
	const addSurvey = async(checked) => {
		setIsLoading(true);
		const sessionData = await AsyncStorage.getItem('sessionData');	
		if (sessionData !== null) {
			const parsedSessionData = JSON.parse(sessionData);
			let requestBody = {"user_id":parsedSessionData.user_id,"user_token":parsedSessionData.user_token,'question':question,'answer':checked,'question_id':question_id};
			
			try {
			   let response = await makeApiRequest(CREATE_SURVEY_URL, 'POST', requestBody);
			   console.log(response);
			   //get survey data
				if(response.message){
				    console.log('Thank you for the survey');
				}				
			  setIsLoading(false);  
			} catch (error) {
			  console.error('Error fetching data:', error);
			} finally {
			  
			}
			
		}
		
	};
	
	const handleItemPress = async(survey_i) => {
		
		if(field_validate){
			if (!checked) {
				setValidationError('Please fill the value');
				return false;
			}
			
		}
		setValidationError('');
		console.log(survey_i);
		var vl = survey_i+1;
		
		//add survey data to database
		
		if (checked!='') {
			addSurvey(checked);
		}
		
		if(vl<total_data){
			setSurveItem(vl);
			return false;
		} else{
			await AsyncStorage.removeItem('random_number');
			navigation.navigate('CreateRequest'); 
		}
		//navigation.navigate('CreatePrayer', { item });
		console.log(survey_item);
	};
	
	const capitalizeFirstLetter = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

  
  
  return (		
	<View style={styles.TopSurveycontainer}>
	
	
			{isLoading ? (
				<View style={styles.activity_container}><ActivityIndicator size="large" color="#0000ff" /></View>
			) :  <>
			  {total_data > 0 ? (
				value === 'text' ? (
					<View>
						{validationError ? (
							<View style={styles.errorContainer}>
							  <Text style={styles.errorText}>{validationError}</Text>
							</View> 	
						) : null}	
						<Text style={styles.surveyTitle}>{data.question_name}</Text>
						<TextInput style={styles.input} placeholder={data.question_name} onChangeText={setChecked}/>
						<TouchableOpacity onPress={() => handleItemPress(survey_item)}>
							<View style={styles.samen1Container}>
								<Text style={styles.linkCancel}>Next</Text>
							</View>
						</TouchableOpacity>
						<View style={styles.samen2Container}>
							<TouchableOpacity onPress={() => navigation.navigate('Logout')}>
								<Text style={styles.linkCancel}>I don’t want to take this survey</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : value === 'radio' ? (
					<View>
						{validationError ? (
							<View style={styles.errorContainer}>
							  <Text style={styles.errorText}>{validationError}</Text>
							</View> 	
						) : null}
					
						<Text style={styles.surveyTitle}>{data.question_name}</Text>
						<RadioButton.Group onValueChange={handleOptionChange} value={checked}>
							<View style={styles.samesurveyContainer}>
								{radio.split(',').map((radio_item, index) => (
									<RadioButton.Item key={index} label={capitalizeFirstLetter(radio_item.trim())} value={radio_item.trim()} />
								))}					
							</View>
						</RadioButton.Group>
						<TouchableOpacity onPress={() => handleItemPress(survey_item)}>
							<View style={styles.samen1Container}>
								<Text style={styles.linkCancel}>Next</Text>
							</View>
						</TouchableOpacity>
						<View style={styles.samen2Container}>
							<TouchableOpacity onPress={() => navigation.navigate('Logout')}>
								<Text style={styles.linkCancel}>I don’t want to take this survey</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : (
				  <>
				   
				  </>
				)
				
			  ) : (
				<Text>No Survey available.</Text>
			  )}
			  
			</> }
		
      
    </View>

  );
}

export default Survey2Screen;
