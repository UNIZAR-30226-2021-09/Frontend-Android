import axios from 'axios'
import { AsyncStorage } from 'react-native'


export const register = newUser => {
    return axios.post('https://proyecto-software-09.herokuapp.com/signin', {
        email: newUser.Mail,
        nombreUsuario: newUser.Username,
        contrasena: newUser.Password,
    })
        .then(async (response) => {
            console.log("El response")
            console.log(response.data)
            await AsyncStorage.setItem('userToken', response.data.accessToken)
            await AsyncStorage.setItem('username', newUser.Username)
            return response.data
        })
        .catch(err => {
            console.log("errorrrrrrrrrrrrrrr")
            console.log(err)
            return "error"
        })
}

export const login = newUser => {
    return axios.post('https://proyecto-software-09.herokuapp.com/login', {
        email: newUser.Mail,
        nombreUsuario: newUser.Username,
        contrasena: newUser.Password,
    })
        .then(async (response) => {
            console.log("El response")
            console.log(JSON.stringify(response.data))
            await AsyncStorage.setItem('userToken',response.data.accessToken)
            await AsyncStorage.setItem('username', newUser.Username)
            return response.data
        })
        .catch(err => {
            console.log("errorrrrrrrrrrrrrrr")
            console.log(err)
            return "error"
        })
}


export const getFriendList = (user) => {
    return axios.get('https://proyecto-software-09.herokuapp.com/user/friendList', {
        params: {
            nombreUsuario: user.Username,
            accessToken: user.AccessToken,
        }
    }).then(res => {
        console.log("LISTA AMIGOS")
        console.log(res.data)
        return res
    })
}
export const addfriend = user => {
    return axios.post('https://proyecto-software-09.herokuapp.com/user/addfriend', {
        nombreUsuario: user.Username,
        nombreAmigo: user.Friendname,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("Añadir AMIGOS")
        console.log(res.data)
        return res
    })
}

export const accept = (request) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/user/accept', {
        nombreUsuario: request.Username,
        nombreAmigo: request.Friendname,
        accessToken: request.AccessToken,
    }).then(res => {
        console.log("Aceptar AMIGOS")
        console.log(res.data)
        return res
    })
}
export const dissmiss = (request) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/user/dissmiss', {
        nombreUsuario: request.Username,
        nombreAmigo: request.Friendname,
        accessToken: request.AccessToken,
    }).then(res => {
        console.log("Aceptar AMIGOS")
        console.log(res.data)
        return res
    })
}
//get
export const getIncomingList = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/user/incomingRequests', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("peticiones entrantes")
        console.log(res.data)
        return res
    })
}
//get
export const getOutgoingList = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/user/outgoingRequests', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("peticiones entrantes")
        console.log(res.data)
        return res
    })
}
