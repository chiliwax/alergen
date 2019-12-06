import React from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Alert } from 'react-native';
import NavigationService from '../../navigators/NavigationService';

const { width, height } = Dimensions.get('window')

export default class ProfilePage extends React.Component {
	render() {
		return (

			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Profile !</Text>
				<View style={styles.button}>
					<Button color='black' title="Sign-In" onPress={() => 
						Alert.alert('Go to LOGIN','Are you sure ? ',[{text:'No'},{text:'Yes', onPress:()=>NavigationService.navigate('Login')}
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