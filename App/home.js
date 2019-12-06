import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfilePage from './pages/profile_page'
import CameraPage from './pages/camera_page';
import HistoryPage from './pages/history_page';
import { createStackNavigator } from 'react-navigation-stack';
import {StatusBar} from 'react-native'


class Profile extends React.Component {
    componentWillMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('dark-content');
          });
    }
    componentWillUnmount() {
        this._navListener.remove();
      }    
    render() { return (<ProfilePage />); }
}

class Camera extends React.Component {
    componentWillMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
          });
    }
    componentWillUnmount() {
        this._navListener.remove();
      }    
    render() { return (<CameraPage />); }
}

class History extends React.Component {
    componentWillMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('dark-content');
          });
    }
    componentWillUnmount() {
        this._navListener.remove();
      }    
    render() { return (<HistoryPage />); }
}

const TabBarComponent = props => <BottomTabBar {...props} />;

const CameraOption = createStackNavigator({
    Camera: {
        screen: Camera,
        navigationOptions: {
            header: null,
        }
    }
})

const HistoryOption = createStackNavigator({
    Camera: {
        screen: History,
        navigationOptions: {
            headerTitle: 'History',
            headerStyle: {
                backgroundColor: '#ecedee',
                borderBottomColor: '#ecedee',
            },
        }
    }
})

const ProfileOption = createStackNavigator({
    Camera: {
        screen: Profile,
        navigationOptions: {
            header: null,
        }
    }
})

export default TabNavigator = createBottomTabNavigator({
    Profile: {
        screen: ProfileOption,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-person" color={tintColor} size={30} />
            ),
            tabBarOptions: {
                activeTintColor:'#18c063',
            }
        }
    },
    Camera: {
        screen: CameraOption,
        navigationOptions: {
            tabBarLabel: 'Scan',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-barcode" color={tintColor} size={30} />
            ),
            tabBarOptions: {
                activeTintColor:'#18c063',
                style: {
                    backgroundColor: 'rgba(50, 50, 50, 0.9)',
                    borderTopColor: '#323232',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                }
            },
        }
    },
    History: {
        screen: HistoryOption,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-timer" color={tintColor} size={30} />
            ),
            tabBarOptions: {
                activeTintColor:'#18c063',
            }
        },

    }
},
    {
        initialRouteName: 'Camera'
    },
    {
        tabBarComponent: props => (
            <TabBarComponent {...props} style={{ borderTopColor: '#605F60' }} />
        ),
    }
);

TabNavigator.navigationOptions = { header: null }

