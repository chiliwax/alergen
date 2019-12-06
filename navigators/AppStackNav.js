import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Camera from "../App/home";
import Profile from "../App/home";
import History from "../App/home";
import AllergApp from "../App/index";

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
			header: null
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
    }
	//Dashboard: { screen: Dashboard }
});

export default createAppContainer(AppStackNav);