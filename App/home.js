import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import ProfilePage from './pages/profile_page'
import CameraPage from './pages/camera_page';
import HistoryPage from './pages/history_page';


class Profile extends React.Component {
    render() { return (<ProfilePage />); }
}

class Camera extends React.Component {
    render() { return (<CameraPage />); }
}

class History extends React.Component {
    render() { return (<HistoryPage />); }
}

const TabBarComponent = props => <BottomTabBar {...props} />;
const TabNavigator = createBottomTabNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-person" color={tintColor} size={25} />
            ),
        }
    },
    Camera: {
        screen: Camera,
        navigationOptions: {
            tabBarLabel: 'Scan',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-barcode" color={tintColor} size={25} />
            ),
            tabBarOptions: {
                style: {
                    backgroundColor:'rgba(50, 50, 50, 0.9)', 
                    borderTopColor: '#323232',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0}
            },
        }
    },
    History: {
        screen: History,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-timer" color={tintColor} size={25} />
            )
        }
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

export default createAppContainer(TabNavigator);