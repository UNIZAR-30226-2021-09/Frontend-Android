import 'styles/gameStyle'
import Navigator from '_navigations';
/*
const App = () => <Navigator />;

export default App;*/

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef, AsyncStorage } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import { ToastAndroid } from 'react-native';
import { setToken, getToken} from '_api/user';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export default function App({ navigation }) {
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
         /*registerForPushNotificationsAsync().then(token => {
             //setExpoPushToken(token)
             //setDevice();
        });*/

        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
    return (
        <Navigator />
        );
}


