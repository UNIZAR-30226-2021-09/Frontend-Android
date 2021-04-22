import { createStackNavigator } from 'react-navigation-stack';
import { RootScreen, LoginScreen, SignScreen } from '_scenes/access';
import AboutScreen from '_scenes/about'

const AuthNavigatorConfig = {
    initialRouteName: 'Root',
    header: null,
    headerMode: 'none',
};

const RouteConfigs = {
    Root: RootScreen,
    Login: LoginScreen,
    Sign: SignScreen,
    About: AboutScreen,
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;