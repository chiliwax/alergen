import React from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Alert, StatusBar, Image, TouchableHighlight, TextInput, ImageBackground, Keyboard, TouchableWithoutFeedback } from 'react-native';
import NavigationService from '../navigators/NavigationService';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import YNmodale from './CustomComponent/YNmodal'
import Icon from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const { width, height } = Dimensions.get('window')

export default class AddItem extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		image: null,
		isModalVisible2: false,
		uploading: false,
		title: ''
	}

	componentDidMount() {
		this.getPermissionAsync();
		console.log('Camera_ROLL_Perm');
	}
	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
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
	};

	ToogleModal = () => {
		this.setState({ isModalVisible2: !this.state.isModalVisible2 })
	}

	render() {
		const { navigation } = this.props;
		const data = navigation.getParam('data', 'Nothing to show');
		const type = navigation.getParam('type', 'Nothing to show');
		const photo = this.state.image
		return (
			<View style={{ flex: 1 }}>
				<StatusBar barStyle="dark-content" />
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<KeyboardAwareScrollView
						resetScrollToCoords={{ x: 0, y: 0 }}
						scrollEnabled={false}
						automaticallyAdjustContentInsets={false}
					>
						<View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
							{/* <Text>Code Type : {JSON.stringify(type)}</Text>
				<Text>Code Ref : {JSON.stringify(data)}</Text> */}
							{!photo && (
								<View>
									<TouchableHighlight style={{ borderRadius: 10 }} onPress={this.ToogleModal}>
										<ImageBackground source={require('../assets/ProductPhoto.png')} style={{ alignItems: 'center', justifyContent: 'flex-end', width: 240, height: 240, borderRadius: 10 }}>
											<Text style={{ marginBottom: 20, fontWeight: '700', fontSize: 14 }}>Take a photo of the product</Text>
										</ImageBackground>
									</TouchableHighlight>
								</View>
							)}

							{photo && (
								<TouchableHighlight onPress={this.ToogleModal}>
									<Image
										source={{ uri: photo.uri }}
										style={{ width: 240, height: 240, borderRadius: 10 }}
									/>
								</TouchableHighlight>
							)}
							<View style={{ margin: 20, width: '100%', marginTop: 50 }} >
								<TextInput
									returnKeyType='done'
									placeholder="Type the name of product"
									style={{ ...styles.textInput }}
									placeholderTextColor="grey"
									onChangeText={(text) => this.setState({ title: text })}
									value={this.state.title}
								/>
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

					</KeyboardAwareScrollView>
				</TouchableWithoutFeedback >
				<View style={styles.bottom}>
					<TouchableHighlight style={styles.button} onPress={() =>
						NavigationService.navigateH('AddItem2', { data: data, type: type, photo: photo, title: this.state.title })} >
						<Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: 16 }}>Continue</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}




const styles = StyleSheet.create({
	textInput: {
		height: 50,
		borderRadius: 15,
		borderWidth: 0.5,
		marginHorizontal: 20,
		paddingLeft: 10,
		marginVertical: 5,
		borderColor: '#DADADA',
		borderWidth: 2,
	},
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
})