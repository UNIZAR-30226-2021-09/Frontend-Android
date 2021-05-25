import axios from 'axios'
import { AsyncStorage } from 'react-native'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { ToastAndroid, Alert} from 'react-native';

export const register = newUser => {
    return axios.post('https://proyecto-software-09.herokuapp.com/signin', {
        email: newUser.Mail,
        nombreUsuario: newUser.Username,
        contrasena: newUser.Password,
    })
        .then(async (response) => {
            console.log("El response LOGIN")
            console.log(response.data)
            await AsyncStorage.setItem('userToken', response.data.accessToken)
            await AsyncStorage.setItem('username', response.data.nombreUsuario)
            var device = await registerForPushNotificationsAsync();
            setToken(newUser.Username, device)
            return response.data
        })
        
}

export const login = newUser => {
   // console.log("----console" + JSON.stringify(newUser))
    return axios.post('https://proyecto-software-09.herokuapp.com/login', {
        email: newUser.Mail,
        nombreUsuario: newUser.Username,
        contrasena: newUser.Password,
    })
        .then(async (response) => {
           // console.log("El response")
            //console.log(response.data.accessToken)
            await AsyncStorage.setItem('userToken',response.data.accessToken)
            await AsyncStorage.setItem('username', response.data.nombreUsuario)
            var device = await registerForPushNotificationsAsync();
            console.log("----DEVICE  "+device)
            setToken(newUser.Username, device)
            return response.data
        })
        .catch(err => {
            console.log("errorrrrrrrrrrrrrrr")
            if (err.response) {
                console.log(err.response.data);
            }
            return "error"
        })
}
const registerForPushNotificationsAsync=async ()=> {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            Alert.alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        //ToastAndroid.show("TOKEN " + token, 1);
    } else {
        Alert.alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    return token;
}
export const setToken = (username, token) => {

    return axios.post('https://proyecto-software-09.herokuapp.com/setToken', {
        nombreUsuario: username,
        token: token,
    })
        .then(async (response) => {
            console.log("setToken")
            console.log(response.data)
            return response.data
        })
        .catch(err => {
            console.log("errorrrrrrrrrrrrrrr")
            if (err.response) {
                console.log(err.response.data);
            }
            return "error"
        })
}

export const getFriendList = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/user/friendList', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("LISTA AMIGOS")
        //console.log(res.data)
        return res.data
    })
}

export const addfriend = user => {
    return axios.post('https://proyecto-software-09.herokuapp.com/user/addfriend', {
        nombreUsuario: user.Username,
        nombreAmigo: user.Friendname,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("Añadir AMIGOS")
        //console.log(res.data)
        return res.data
    })
}

export const accept = (request) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/user/accept', {
        nombreUsuario: request.Username,
        nombreAmigo: request.Friendname,
        accessToken: request.AccessToken,
    }).then(res => {
        console.log("Aceptar AMIGOS")
        //console.log(res.data)
        return res.data
    })
}
export const dismiss = (request) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/user/dismiss', {
        nombreUsuario: request.Username,
        nombreAmigo: request.Friendname,
        accessToken: request.AccessToken,
    }).then(res => {
        console.log("Aceptar AMIGOS")
        //console.log(res.data)
        return res.data
    })
}
//get
export const getIncomingList = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/user/incomingRequests', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("peticiones entrantes")
        //console.log(res.data)
        return res.data
    })
}
//get
export const getOutgoingList = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/user/outgoingRequests', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("peticiones salientes")
        //console.log(res.data)
        return res.data
    })
}

export const getRanking = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/user/ranking', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("rankin ")
        //console.log(res.data)
        return res.data
    })
}

export const getInfo = (user) => {
    console.log("----INFO ")

    //console.log(user);
    return axios.post('https://proyecto-software-09.herokuapp.com/profile', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
       // console.log(res)
        return res.data
    })
}
