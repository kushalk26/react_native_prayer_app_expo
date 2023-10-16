import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F6F7F8',
  },
  Topcontainer: {
    flex: 1,

    padding: 20,
    backgroundColor: '#F6F7F8',
	
  },
  TopRequestcontainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    backgroundColor: '#F6F7F8',
  },
  TopProfilecontainer: {
    flex: 1,
    backgroundColor: '#F6F7F8',  
  },
  TopAccountcontainer: {
    flex: 1,
    backgroundColor: '#fff',  
  },
  TopSurveycontainer:{ 
	flex: 1,
    padding: 20,
    backgroundColor: '#F6F7F8', 
  },
  boxContainer:{
	backgroundColor: '#fff',
	width: '100%',
    padding: 16,
    borderRadius: 30,
	alignItems: 'center',
	elevation: 15,
  },
  boxContainer:{
	backgroundColor: '#fff',
	width: '100%',
    padding: 16,
    borderRadius: 30,
	elevation: 15,  
  },
  boxContainerNew:{

	width: '100%',
    padding: 16,
    borderRadius: 30,
	alignItems: 'center',
  },
  requestContainer:{
	width: '100%',
    padding: 16,
    borderRadius: 30,
	alignItems: 'center',
  },
  imageContainer:{
	alignItems: 'center',
	padding: 16,  
  },
  title: { 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  title_view_request:{
	fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
	borderColor: '#333',
    //borderBottomWidth: 2,
	alignItems: 'center',
	justifyContent: 'center',
  },
  title_request:{
	fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 22,
    marginTop: 35,
    textAlign: 'center',
	borderColor: '#333',
    
	alignItems: 'center',
	justifyContent: 'center',  
  },
  container_dropdown: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
    container_new: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  selectedOption: {
    backgroundColor: '#e1e1e1',
    borderRadius: 4,
  },
  border: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
	marginTop:10
  },
  border_title:{
	borderColor: '#cccccc',
    borderBottomWidth: 1,
	justifyContent: 'center',
	alignItems: 'center',
	alignSelf: 'auto',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 35,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  login:{
	backgroundColor: '#68370E',
	padding: 10,
	borderRadius: 35,
    alignItems: 'center',
	width:'100%'
  },
  loginText:{
	  color: '#fff',
	  alignItems: 'center',
  },
  registerText: {
    color: '#333333',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  sameContainer:{
	flexDirection: 'row',
	alignItems: 'center',	
	marginTop:20
  },
  sameContainer_testi:{
	flexDirection: 'row',
	marginTop:10,
	marginBottom:30,
	
	justifyContent:'flex-start'
  },
  icon_request:{
	  paddingLeft:5,
	  paddingRight:5
  },
  sameContainer_prayer:{
	justifyContent:'flex-start',
	marginLeft:10,
	marginBottom:10
  },
  prayer_text:{
	fontSize: 12, 
	width:100,
	alignItems: 'center',
	maxHeight: 200
  },
  lrContainer:{
    justifyContent: 'flex-end',
    padding: 10, 
  },
  account_img:{
	  marginTop:25,
	  marginBottom:25
  },
	logo_image: {
	  marginTop: 32,
	  marginBottom: 32,
	},
	registerContainer:{
		justifyContent: 'center',
		alignItems: 'center',
	},
	linkText:{
		color:'#333333',
		fontSize:15,
		fontWeight:'bold',
		justifyContent:'flex-start'
	},
	linkTextRegister:{
		color:'#000',
		fontSize:15,
		fontWeight:'bold'
	},
	linkSubmit:{
		color:'#fff',
		fontSize:15,
		fontWeight:'bold'
	},
	linkCancel:{
		color:'#fff',
		fontSize:15,
		fontWeight:'bold'
	},
	normalText:{
		marginBottom:37,
		alignItems: 'center',
		color:'#616161'
	},
	samen1Container:{
		backgroundColor: '#39BEA9',
		padding: 10,
		borderRadius: 35,
		alignItems: 'center',
		width:'100%',
		marginTop:25
	},
	samen2ContainerView:{
		width:'100%',
	},
	samesurveyContainer:{
		flexDirection: 'row',
	},
	samen2Container:{
		backgroundColor: '#FD1D1D',
		padding: 10,
		borderRadius: 35,
		alignItems: 'center',
		width:'100%',
		marginTop:25
	},
	sameContainer1:{
		backgroundColor: '#39BEA9',
		padding: 10,
		borderRadius: 35,
		alignItems: 'center',
		width:'35%',
	},
	sameContainer2:{
		backgroundColor: '#FD1D1D',
		padding: 10,
		borderRadius: 35,
		alignItems: 'center',
		width:'35%',
		marginLeft:10,
	},
	textInput:{
		borderWidth: 1,
		borderColor: '#B4B4B4',
		backgroundColor:'#fff',
		padding: 10,
		minHeight: 150,
		marginTop:20,
		width:'100%',
		borderRadius: 20,
		textAlignVertical: 'top'
	},
	textInput_testiomonial:{
		borderWidth: 1,
		borderColor: '#B4B4B4',
		backgroundColor:'#fff',
		padding: 10,
		minHeight: 100,
		marginTop:10,
		width:'100%',
		borderRadius: 20,
		textAlignVertical: 'top'
	},
	church_banner:{
		borderRadius: 25,
	},
	church_logo:{
		marginTop:25,
		marginBottom:25,
	},
	churchTitle:{
		color:'#68370E',
		fontWeight:'bold',
		marginBottom:10
	},
	churchHeading:{
		fontWeight:'bold',
		marginBottom:10,
		fontSize:20
	},
	churchText:{
		marginBottom:20,
		marginTop:10,
	},
	skip:{
		marginTop:10,
		backgroundColor: '#68370E',
		paddingLeft: 35,
		paddingRight: 35,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 25,
		alignItems: 'center',
	},
	surveyTitle:{
		color:'#000',
		fontWeight:'bold',
		marginTop:10,
		marginBottom:10,
	},
	samen2ContainerText:{
		flexDirection: 'row',
		alignItems: 'center',	
		justifyContent: 'space-between',
	},
	profileAccountContainer:{
		backgroundColor:'#fff',
		borderRadius:15,
		marginTop:10,
		marginBottom:10
	},
	accountContainerView:{
		backgroundColor:'#F6F7F8',
		padding:12,
		borderRadius:25
	}, 
	profileContainer:{
		flexDirection: 'row',
		backgroundColor:'#68370E',
		borderRadius:10,
		padding:10,
		marginBottom:10,
	},
	profileContainerEdit:{
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	profile_logo:{
		margin:7,
		borderRadius:30,		
		width: 60,
		height: 60,
	},
	profileTitle:{
		marginLeft:7,
		marginTop:13,
		color:'#fff',
		fontWeight:'600' 
	},
	profileEmail:{
		marginLeft:7,
		color:'#fff'
	},
	profileContainerOutsideView:{
		flexDirection: 'row',
		justifyContent:'flex-start',
	},
	accountContainerOutsideView:{
		flexDirection: 'row',
		justifyContent:'flex-start',
		marginTop:0,
		padding:12
	},
	accountTitle:{
		color:'#000',
		fontWeight:600,
		marginLeft:10,
		marginTop:4
	},
	accountDes:{
		color:'gray',
		fontSize:13,
		marginLeft:10
	},
	TextCon:{
		width:'50%'
	},
	TextConPrayer:{
		width:'80%'
	},
	item_testimonial:{
		marginTop:10,
		width:'100%'
	},
	TextInput:{
		width:'100%'
	},
	samenRequestContainer:{
		backgroundColor: '#39BEA9',
		padding: 10,
		borderRadius: 35,
		alignItems: 'center',
		width:'50%'
	},
	textReq:{
		color:'#000',
		fontWeight:'500',
		marginTop:5,
		marginTop:10,
		marginBottom:10
	},
	container: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingLeft:7,
		paddingRight:7
	},
	container_scroll_req: {
		justifyContent: 'flex-start',
		paddingLeft:7,
		paddingRight:7
	},
	containerRequest: {
		justifyContent: 'flex-start',
		width:'100%'
	},
	item: {
		borderBottomColor: 'e0e0e0',
		borderBottomWidth: 1,
		borderRadius: 5,
		marginBottom:15,
		width:'100%',
		justifyContent:'flex-start',
	},
	item_test: {
		borderBottomColor: 'e0e0e0',
		borderBottomWidth: 1,
		borderRadius: 5,
		marginBottom:5,
		width:'100%',
		justifyContent:'flex-start',
	},
	bottomText:{
		marginBottom:25
	},
	itemText:{
		justifyContent:'flex-start',
	},  
	textRequests:{
	  fontWeight:'bold',
	  marginTop:35,
	  borderBottomWidth: 1,
	  padding:10
	},
	user_img:{
		borderRadius: 35,
	},
	user_img_test:{
		borderRadius: 35,
		width:90,
		height:90
	},
	postedTime:{
		fontSize:10,
		color:'#606060',
		marginBottom:10,
		marginLeft:5,
	},
	postedAuthor:{
		fontWeight:'bold',
		marginLeft:5,
		marginTop:7,
	},
	icons_edit:{
		flexDirection: 'row',
		marginTop:10,
		marginBottom:10
	},
	icons_edit_lik:{
		flexDirection: 'row',
		marginTop:2,
		marginBottom:2,
		width:80
	},
	icon_request_green:{
		color:'green',		
	},
	icon_request_black:{
		color:'black',
		marginRight:7
	},
	icon_request_red:{
		color:'red'
	},
	icons:{
		margin:6,
		marginTop:4
	},
	edit_request:{
		width:'100%',
		marginTop:20
	},
	prayerContainer:{
		justifyContent: 'space-between',
	},
	prayerBtn:{
		backgroundColor: '#39BEA9',
		paddingLeft: 25,
		paddingRight: 25,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius:25
	},
	addPrayerText:{color:'#fff',
		fontWeight:'500'
	},
	prayerText:{
		marginBottom:15
	},
	createPrayerText:{
		marginTop:10,
		marginBottom:10,
		color:'#242424'
	},
	notificatonStyle:{
		flexDirection:'row',
		marginTop:10,
		marginBottom:15,
		alignItems: 'flex-start',	
	},
	notiicationContainerTop:{marginTop:10,paddingBottom:0,flex:1},
	notiicationScroll:{
		padding:20
	},
	logoutTitle:{marginTop:75,marginBottom:25},
	logout:{
		backgroundColor: '#68370E',
		padding: 12,
		borderRadius: 35,
		alignItems: 'center',
		width:'100%',
		marginTop:20
	},
	activityIndicator:{
		justifyContent: 'center',
		alignItems: 'center',
		marginTop:10
	},
	errorContainer: {
		backgroundColor: '#F8D7DA',
		padding: 8,
		borderRadius: 8,
		marginBottom: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	errorText: {
		color: 'red',
		fontSize: 14,
		flex: 1,
		marginRight: 8,
	},
	successContainer: {
		backgroundColor: '#90ee90',
		padding: 8,
		borderRadius: 8,
		marginBottom: 16,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	successText: {
		color: '#006400',
		fontSize: 13,
		flex: 1,
		marginRight: 8,
	},
	disabledButton: {
		opacity: 0.6,    
	},
	icons_edit_test:{justifyContent: 'flex-end',}, 
	notificationText:{marginLeft:5,marginTop:3},
	notification:{flexDirection:'row',justifyContent: 'space-between',borderBottomWidth: 1},
	linkTexttest:{marginTop:10},
	loginTextTest:{color:'#fff'},
	paddingContainer:{padding:20,paddingBottom:0},
	radiostyle:{flexDirection: 'row'},
	simple:{marginTop:8},
	simple2:{marginTop:8,marginBottom: 16},
	accountTitle:{fontSize:15,fontWeight:'bold',marginLeft:5},
	loginTest:{backgroundColor: '#68370E', padding: 10, borderRadius: 35, alignItems: 'center', width:'100%',marginTop:20},
	upload_image: {
		width: 90,
		height: 90,
		borderRadius: 100,
		marginBottom: 16,
	},
	placeholderText: {
		fontSize: 16,
		marginBottom: 16,
	},
	uploadimg_button: {
		backgroundColor: '#68370E',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 4,
	},
	buttonText_img: {
		color: '#FFF',
		fontSize: 16,
		fontWeight: 'bold',
	},
	itemContainer:{
		backgroundColor: '#f5f5f5',
		padding: 12,
		marginBottom: 8,
		borderRadius: 8,
	},
	itemText: {
		fontSize: 16
	},
	itemText:{
		marginBottom:10,
		fontSize: 15
	},
	container_prayer_data: {
		flex: 1,
		padding: 66,
		backgroundColor: '#fff',
	},
	footerContainer: {
		paddingVertical: 20,
		alignItems: 'center',
	},
	noMoreDataText: {
		fontSize: 16,
		color: 'gray',
	},
	upload_image_pd:{
		width:50,
		height:50,
		borderRadius: 35,
	},
	upload_image_pd_view:{
		width:50,
		height:50,
		borderRadius: 35,
	},
	upload_image_pd_new:{
		width:80,
		height:80,
		borderRadius: 95,
		alignItems: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop:10
	},
	centerContent:{
		justifyContent: 'center',
		alignItems: 'center',
		marginTop:10
	},
	activity_container:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});


export default styles;