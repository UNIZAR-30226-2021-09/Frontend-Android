import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '_scenes/home';
import AboutScreen from '_scenes/about';
import PlaceShipsScreen from '_scenes/placeShips';
import GameScreen from '../scenes/game';
const AppNavigatorConfig = {
    initialRouteName: 'Home',
    header: null,
    headerMode: 'none',
};

const RouteConfigs = {
    Home: {
        screen: HomeScreen,
    },
    About: {
        screen: AboutScreen,
    },
    PlaceShips: {
        screen: PlaceShipsScreen,
    },
    Game: {
        screen: GameScreen,
    }
};

const AppNavigator = createStackNavigator(RouteConfigs, AppNavigatorConfig);

export default AppNavigator;