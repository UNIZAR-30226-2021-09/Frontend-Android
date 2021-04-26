import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '_scenes/home';
import AboutScreen from '_scenes/about';
import { ProfileScreen, RankingScreen } from '_scenes/profile';
import { AddFriendScreen, FriendRequestScreen } from '_scenes/friend';
import { BeginTournamentScreen, BeginRandomScreen, BeginFriendScreen, OngoingGameScreen }
    from '_scenes/startGame';
import { GameScreen, PlaceShipsScreen, ResultScreen }  from '_scenes/gameLogic';



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
    },
    Result: {
        screen: ResultScreen
    },
    Ranking: {
        screen: RankingScreen
    }
};

const AppNavigator = createStackNavigator(RouteConfigs, AppNavigatorConfig);

export default AppNavigator;