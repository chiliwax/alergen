import React from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Alert, StatusBar, AsyncStorage, TouchableHighlight } from 'react-native';
import NavigationService from '../../navigators/NavigationService';

const { width, height } = Dimensions.get('window')

export default class ProfilePage extends React.Component {

	async resetlogin() {
		await AsyncStorage.setItem("@MySuperStore:key", "false");
	}

	render() {
		return (

			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Profile !</Text>
				<TouchableHighlight style={styles.button} onPress={() => 
						Alert.alert('Go to LOGIN','Are you sure ? ',[{text:'No'},{text:'Yes', onPress:()=> this.resetlogin() & NavigationService.navigate('Login')}
						])
						}>
					<Text style={{textAlign: 'center'}}>Sign-In</Text>
				</TouchableHighlight>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		height: 50,
		width: width / 2,
		justifyContent: 'center',
		alignContent: 'center',
		backgroundColor: 'red',
		marginHorizontal: 20,
		marginVertical: 50,
		borderRadius: 25
	},
})