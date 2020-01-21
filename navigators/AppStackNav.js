import React from 'react';
import {Button} from 'react-native'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import NavigationService from './NavigationService';
import Camera from "../App/home";
import Profile from "../App/home";
import History from "../App/home";
import AllergApp from "../App/index";
import AddItem from "../App/AddItem";
import AddItem2 from "../App/AddItem2";

const AppStackNav = createStackNavigator({
    Login: {
		screen: AllergApp,
		navigationOptions: {
			header: null
		}
	},
    Camera: {
		screen: Camera,
		navigationOptions: {
            header: null,
            headerBackTitle: 'Cancel',
            headerLeft: null
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
			header: null
        }
    },
    History: {
        screen: History,
        navigationOptions: {
            header: null
        }
    },
    AddItem: {
        screen: AddItem,
        navigationOptions: {
            title: 'ADD ITEM',
            headerLeft: () => (
                <Button
                  onPress={() => NavigationService.navigateH('Camera')}
                  title="Cancel"
                />)
        }
    },
    AddItem2: {
        screen: AddItem2,
        navigationOptions: {
            title: 'ADD ITEM',
            headerBackTitle: 'Back'
        }
    }
	//Dashboard: { screen: Dashboard }
});

export default createAppContainer(AppStackNav);