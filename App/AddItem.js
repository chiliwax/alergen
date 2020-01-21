import React from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Alert, StatusBar, Image, TouchableHighlight } from 'react-native';
import NavigationService from '../navigators/NavigationService';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import Modal from "react-native-modal";

const { width, height } = Dimensions.get('window')

export default class AddItem extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		image: null,
		isModalVisible2: false
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
			aspect: [4, 3],
			quality: 1
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
			aspect: [4, 3],
			quality: 1
		})
		console.log(result);

		if (!result.cancelled) {
			this.setState({ image: result });
		}
		this.setState({ isModalVisible2: false })
	};

	ToogleModal = () => {
		this.setState({isModalVisible2:!this.state.isModalVisible2})
	}

	render() {
		const { navigation } = this.props;
		const data = navigation.getParam('data', 'Nothing to show');
		const type = navigation.getParam('type', 'Nothing to show');
		const photo = this.state.image
		return (
			<View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
				<StatusBar barStyle="dark-content" />
				{/* <Text>Code Type : {JSON.stringify(type)}</Text>
				<Text>Code Ref : {JSON.stringify(data)}</Text> */}
				{!photo && (
					<View>
						<Button title="choose photo" onPress={this.ToogleModal} />
					</View>
				)}

				{photo && (
					<TouchableHighlight onPress={this.handleChoosePhoto}>
						<Image
							source={{ uri: photo.uri }}
							style={{ width: 300, height: 300 }}
						/>
					</TouchableHighlight>
				)}
				{photo && (
					<View style={styles.bottom}>
						<Button title="Continue" onPress={() =>
							NavigationService.navigateH('AddItem2', { uu: this.handler })} />
					</View>
				)}
				<View style={styles.bottom}>
					<Text>1/3</Text>
				</View>

				<Modal
                style={{ marginHorizontal: 0, marginTop: height / 1.3, marginBottom: -15 }}
                isVisible={this.state.isModalVisible2}
                onBackdropPress={() => this.setState({ isModalVisible2: false })}
                swipeDirection="down"
                propagateSwipe
            >
                <View style={{
                    flex: 1,
                    marginHorizontal: 0,

                    backgroundColor: 'white',
                    borderRadius: 25,
                    alignItems: 'center',
                    textAlign: 'center',
                    justifyContent: 'space-between',

                }}>
                    <View style={{ ...styles.button_modal, marginTop: -20 }}><Button color='black' title="TAKE PHOTO" onPress={() => 
					{
					this.handleTakePhoto()
					
                    }} /></View>
                    <View style={{ ...styles.button_modal, marginTop: -20,backgroundColor: 'white', }}><Button color='black' title="CAMERA ROLL" onPress={() => 
					{
					this.handleChoosePhoto()
                    }} /></View>
                </View>


            </Modal>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		height: 50,
		width: width / 2,
		textAlign: 'center',
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: 'green',
		marginHorizontal: 20,
		marginVertical: 50,
		borderRadius: 25
	},
	bottom: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 36,
	},
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	button_modal: {
        height: 50,
        width: width / 2,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'red',
        marginHorizontal: 20,
        marginVertical: 50,
        borderRadius: 25,
        shadowOffset: { width: 2, height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
})