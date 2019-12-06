import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from "../App/home";
import AllergApp from "../App/index";
import AddItem from "../App/AddItem";
import AddItem2 from "../App/AddItem2";
import AddItem3 from "../App/AddItem3";
import Icon from 'react-native-vector-icons/Ionicons';
import NavigationService from '../navigators/NavigationService';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AppStackNav = createStackNavigator({
    Login: {
        screen: AllergApp,
        navigationOptions: {
            header: null
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerBackTitle: 'Cancel',
            headerLeft: null,

        }
    },
    AddItem: {
        screen: AddItem,
        navigationOptions: {
            headerTintColor: 'black',
            title: 'Add Item',
            headerBackTitle: 'Back',
            headerStyle: {
                backgroundColor: '#ecedee',
                borderBottomColor: '#ecedee',
            },
            headerRight: () => (
                <TouchableOpacity onPress={() => NavigationService.navigateH('Home')}>
                    <Icon size={25} style={{ marginRight: 10, justifyContent: 'center' }} name="md-close" />
                </TouchableOpacity>
            ),
            // headerTitleStyle: {
            //     color: '#18c063',
            // },
        }
    },
    AddItem2: {
        screen: AddItem2,
        navigationOptions: {
            headerTintColor: 'black',
            title: 'Add Item',
            headerBackTitle: 'Back',
            headerStyle: {
                backgroundColor: '#ecedee',
                borderBottomColor: '#ecedee',
            },
            headerRight: () => (
                <TouchableOpacity onPress={() => NavigationService.navigateH('Home')}>
                    <Icon size={25} style={{ marginRight: 10, justifyContent: 'center' }} name="md-close" />
                </TouchableOpacity>
            ),
        }
    },
    AddItem3: {
        screen: AddItem3,
        navigationOptions: {
            headerTintColor: 'black',
            title: 'Add Item',
            headerBackTitle: 'Back',
            headerStyle: {
                backgroundColor: '#ecedee',
                borderBottomColor: '#ecedee',
            },
            headerRight: () => (
                <TouchableOpacity onPress={() => NavigationService.navigateH('Home')}>
                    <Icon size={25} style={{ marginRight: 10, justifyContent: 'center' }} name="md-close" />
                </TouchableOpacity>
            ),
        }
    }
});

export default createAppContainer(AppStackNav);