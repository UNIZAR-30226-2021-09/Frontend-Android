import 'react-native-gesture-handler';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

//import { RootStackParamList } from '../types';


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
        <NavigationContainer
            theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

import { RootScreen, LoginScreen, SignScreen } from '_scenes/access';
import AboutScreen from '_scenes/about'
import HomeScreen from '_scenes/home';
import { ProfileScreen, RankingScreen, SettingScreen } from '_scenes/profile';
import { AddFriendScreen, FriendRequestScreen } from '_scenes/friend';
import { BeginTournamentScreen, BeginRandomScreen, BeginFriendScreen, OngoingGameScreen }
    from '_scenes/startGame';
import { GameScreen, PlaceShipsScreen, ResultScreen } from '_scenes/gameLogic';

function RootNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={RootScreen} />
            <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Oops!' }} />
            <Stack.Screen name="Sign" component={SignScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Ranking" component={RankingScreen} />
            <Stack.Screen name="AddFriend" component={AddFriendScreen} />
            <Stack.Screen name="FriendRequest" component={FriendRequestScreen} />
            <Stack.Screen name="BeginTournament" component={BeginTournamentScreen} />
            <Stack.Screen name="BeginRandom" component={BeginRandomScreen} />
            <Stack.Screen name="BeginFriend" component={BeginFriendScreen} />
            <Stack.Screen name="OngoingGame" component={OngoingGameScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="PlaceShips" component={PlaceShipsScreen} />
            <Stack.Screen name="Result" component={ResultScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
    );
}
