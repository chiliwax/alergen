import React from 'react';
import { Text, View, StyleSheet, Dimensions, Button, Alert, StatusBar } from 'react-native';
//import NavigationService from '../../navigators/NavigationService';

const { width, height } = Dimensions.get('window')

export default class AddItem2 extends React.Component {
    constructor(props) {
		super(props)
	  }
	render() {
        const { navigation } = this.props;  
        const data = navigation.getParam('data','Nothing to show');
		const type = navigation.getParam('type','Nothing to show');
		const uu = navigation.getParam('uu','Nothing to show');
		return (
			<View style={{ flex: 1, alignItems: 'center' }}>
				<StatusBar barStyle="dark-content" />
				<Text>Add Item !</Text>
                <Text>Code Type : {JSON.stringify(type)}</Text>
                <Text>Code Ref : {JSON.stringify(data)}</Text>
				<View style={styles.bottom}>
				<Button title="chk" onPress = {uu} />
					{/* <Button title="Continue" onPress={() => 
						Alert.alert('Go to LOGIN','Are you sure ? ',[{text:'No'},{text:'Yes', onPress:()=> this.resetlogin() & NavigationService.navigate('Login')}
						])
						} /> */}
				</View>
				{/* <View style={styles.button}>
					<Button color='black' title="Sign-In" onPress={() => 
						Alert.alert('Go to LOGIN','Are you sure ? ',[{text:'No'},{text:'Yes', onPress:()=>NavigationService.navigate('Login')}
						])
						} />
				</View> */}
				<View style={styles.bottom}>
					<Text>2/3</Text>
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
		backgroundColor: 'green',
		marginHorizontal: 20,
		marginVertical: 50,
		borderRadius: 25
	},
	
	bottom: {
		flex: 1,
		justifyContent: 'flex-end',
		marginBottom: 36,
	  }
})