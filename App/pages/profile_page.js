import React from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Alert, StatusBar, AsyncStorage } from 'react-native';
import NavigationService from '../../navigators/NavigationService';

const { width, height } = Dimensions.get('window')

export default class ProfilePage extends React.Component {

	async resetlogin() {
		await AsyncStorage.setItem("@MySuperStore:key", "false");
	}

	render() {
		return (

			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<StatusBar barStyle="dark-content" />
				<Text>Profile !</Text>
				<View style={styles.button}>
					<Button color='black' title="Sign-In" onPress={() => 
						Alert.alert('Go to LOGIN','Are you sure ? ',[{text:'No'},{text:'Yes', onPress:()=> this.resetlogin() & NavigationService.navigate('Login')}
						])
						} />
				</View>
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
		backgroundColor: 'red',
		marginHorizontal: 20,
		marginVertical: 50,
		borderRadius: 25
	},
})