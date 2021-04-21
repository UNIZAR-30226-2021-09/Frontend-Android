import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '_scenes/home';
import AboutScreen from '_scenes/about';
import PlaceShipsScreen from '_scenes/placeShips';
import GameScreen from '_scenes/game';
import BeginTournamentScreen from '_scenes/beginTournament';
import BeginRandomScreen from '_scenes/beginRandom';
import BeginFriendScreen from '_scenes/beginFriend';
import OngoingGameScreen from '_scenes/ongoingGame';
import ProfileScreen from '_scenes/profile';
import AddFriendScreen from '_scenes/addFriend';
import FriendRequestScreen from '_scenes/friendRequest'

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
    },
    BeginTournament: {
        screen: BeginTournamentScreen,
    },
    BeginRandom: {
        screen: BeginRandomScreen,
    },
    BeginFriend: {
        screen: BeginFriendScreen,
    },
    OngoingGame: {
        screen: OngoingGameScreen,
    },
    Profile: {
        screen: ProfileScreen
    },
    AddFriend: {
        screen: AddFriendScreen
    },
    FriendRequest: {
        screen: FriendRequestScreen
    }
    
};

const AppNavigator = createStackNavigator(RouteConfigs, AppNavigatorConfig);

export default AppNavigator;