import React from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Alert, StatusBar, TouchableHighlight, Image, TouchableWithoutFeedback, Keyboard, TextInput, Modal, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NavigationService from '../navigators/NavigationService';
import * as ImagePicker from 'expo-image-picker';
import YNmodale from './CustomComponent/YNmodal'
import CONSTANT from '../env'

const { width, height } = Dimensions.get('window')

export default class AddItem2 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			uploading: false,
			image: null,
			isModalVisible2: false,
			googleResponse: null,
			cingr: null,
			langue: null,
		}
	}

	handleChoosePhoto = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			//aspect: [4, 3],
			quality: 0,
			base64: true,
		});

		console.log(result);

		if (!result.cancelled) {
			this.setState({ image: result });
		}
		this.setState({ isModalVisible2: false })
		this.submitToGoogle()
	};


	handleTakePhoto = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			//aspect: [4, 3],
			quality: 0,
			base64: true,
		})
		console.log(result);

		if (!result.cancelled) {
			this.setState({ image: result });
		}
		this.setState({ isModalVisible2: false })
		this.submitToGoogle()
	};

	ToogleModal = () => {
		this.setState({ isModalVisible2: !this.state.isModalVisible2 })
	}

	
	submitToGoogle = async () => {
		try {
			console.log("SUBMIT TO GOOGLE API : ")
			this.setState({ uploading: true });
			let body = JSON.stringify({
				requests: [
					{
						features: [
							{
								"type": "TEXT_DETECTION"
							}
						],
						image: {
							"content": this.state.image.base64
						}
					}
				]
			});
			let response = await fetch(
				"https://eu-vision.googleapis.com/v1/images:annotate?key=" + CONSTANT.API.GOOGLE,
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json"
					},
					method: "POST",
					body: body
				}
			);
			let responseJson = await response.json();
			let repFormat = JSON.stringify(responseJson)
			console.log(responseJson.responses[0].textAnnotations[0].locale)
			console.log(responseJson.responses[0].textAnnotations[0].description)
			this.setState({
				googleResponse: responseJson,
				cingr: responseJson.responses[0].textAnnotations[0].description,
				langue: responseJson.responses[0].textAnnotations[0].locale,
				uploading: false
			});
		} catch (error) {
			console.log(error);
		}
	};

	render() {

		const { navigation } = this.props;
		const data = navigation.getParam('data', 'Nothing to show');
		const type = navigation.getParam('type', 'Nothing to show');
		const thumb = navigation.getParam('photo', 'Nothing to show');
		const title = navigation.getParam('title', 'nothing to show');
		const photo = this.state.image
		const ingr = this.state.googleResponse
		const cingr = this.state.cingr
		const langue = this.state.langue
		return (
			<View style={{ flex: 1 }}>
				<StatusBar barStyle="dark-content" />
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<KeyboardAwareScrollView
						resetScrollToCoords={{ x: 0, y: 0 }}
						scrollEnabled={false}
						automaticallyAdjustContentInsets={false}
					>
						<View style={{ alignItems: 'center', marginTop: 50 }}>
							{!photo && (
								<TouchableHighlight style={{ borderRadius: 10 }} onPress={this.ToogleModal}>
									{/* <View style={{ backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center', width: 240, height: 240, borderRadius: 10 }}>
										<Icon name="md-camera" color='rgba(255, 255, 255, 0.75)' size={75} />
										<Text>Take a photo</Text>
										<Text>of ingredients</Text>
									</View> */}
									<ImageBackground source={require('../assets/ProductIngPhoto.png')} style={{ alignItems: 'center', justifyContent: 'flex-end', width: 240, height: 240, borderRadius: 10 }}>
										
										<Text style={{ marginBottom: 20, fontWeight: '700', fontSize: 14 }}>Take a photo of the ingredients</Text>
									</ImageBackground>
								</TouchableHighlight>
							)}

							{photo && (
								<TouchableHighlight style={{ borderRadius: 10 }} onPress={this.ToogleModal}>
									<Image
										source={{ uri: photo.uri }}
										style={{ width: 240, height: 240, borderRadius: 10 }}
									/>
								</TouchableHighlight>
							)}
						</View>
						<View style={{ alignItems: 'center', marginTop: 10, padding: 10, }}>
							{ingr && (
								<View style={{ flex: 1, width: '100%', padding: 10 }}>
									<Text style={{ fontWeight: 'bold', textAlign: 'center' }}>LANGUAGE LABEL</Text>
									<Text style={{ textAlign: 'center' }}>
										{ingr.responses[0].textAnnotations[0].locale}
									</Text>
									<Text style={{ fontWeight: 'bold', textAlign: 'center' }}>INGREDIENT</Text>
									<TextInput
										style={{ ...styles.textInput, textAlign: 'center' }}
										value={cingr}
										onChangeText={text => this.setState({ cingr: text })}
										multiline={true}
									/>
								</View>
							
							)}
						</View>
					</KeyboardAwareScrollView>

				</TouchableWithoutFeedback >

				<View style={styles.bottom}>					
						<TouchableHighlight style={styles.button} onPress={() =>
							NavigationService.navigateH('AddItem3', { thumb: thumb, data: data, title: title, ingr: cingr, langue: langue })} >
							<Text style={{ textAlign: 'center', color:'white',fontWeight: '700', fontSize:16 }}>Continue</Text>
						</TouchableHighlight>
				</View>

				<YNmodale
					isVisible={this.state.isModalVisible2}
					onBackdropPress={() => this.setState({ isModalVisible2: false })}
					onPress1={() => { this.handleTakePhoto() }}
					onPress2={() => { this.handleChoosePhoto() }}
					Text1={'TAKE PHOTO'}
					Text2={'CAMERA ROLL'}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		height: 50,
        width: width - 50,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#18c063',
        marginHorizontal: 20,
        borderRadius: 15,
	},
	bottom: {
		flex: 1,
		alignItems: 'center',
		flexDirection: "column-reverse",
		marginBottom: 36,
	},
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	textInput: {
		//height: 35,
		maxHeight: 150,
		borderRadius: 25,
		borderWidth: 0.5,
		marginHorizontal: 20,
		padding: 10,
		marginVertical: 5,
		borderColor: 'rgba(0,0,0,0.2)'
	},
})