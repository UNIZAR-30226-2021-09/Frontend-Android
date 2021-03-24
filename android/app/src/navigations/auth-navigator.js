import { createStackNavigator } from 'react-navigation-stack';

import RootScreen from '_scenes/root';
import LoginScreen from '_scenes/login';
import SignScreen from '_scenes/sign';

const AuthNavigatorConfig = {
    initialRouteName: 'Root',
    header: null,
    headerMode: 'none',
};

const RouteConfigs = {
    Root: RootScreen,
    Login: LoginScreen,
    Sign: SignScreen,
};

const AuthNavigator = createStackNavigator(RouteConfigs, AuthNavigatorConfig);

export default AuthNavigator;