import axios from 'axios'
import { AsyncStorage } from 'react-native'

export const beginIA = user => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/ia', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("Begin IA")
        console.log(res.data)
        return res
    })
}

export const beginFriend = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/newGame', {
        nombreUsuario: user.Username,
        nombreAmigo: user.Friendname,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("begin AMIGOS")
        console.log(res.data)
        return res
    })
}

export const beginFromFriend = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/friend', {
        nombreUsuario: user.Username,
        nombreAmigo: user.Friendname,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("accept AMIGOS")
        console.log(res.data)
        return res
    })
}
//get
export const gameIncomingRequest = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/incomingRequests', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("peticiones RECIBIDAS de partidas contra AMIGOS")
        console.log(res.data)
        return res
    })
}
//get
export const gameOutgoingRequest = (request) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/outgoingRequests', {
        nombreUsuario: request.Username,
        accessToken: request.AccessToken,
    }).then(res => {
        console.log("peticiones ENVIADAS de partidas contra AMIGOS")
        console.log(res.data)
        return res
    })
}
//get
export const getGameInProgess = user => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/inProgress', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("listado partidas en curso")
        console.log(res.data)
        return res
    })
}
export const acceptFriendGame = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/accept', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log(" aceptar peticiones de partida contra amigo")
        console.log(res.data)
        return res
    })
}
export const dismissFriendGame = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/dismiss', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("rechazar peticiones de partida contra amigo")
        console.log(res.data)
        return res
    })
}
//get
export const getHistory = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/history', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("peticiones entrantes")
        console.log(res.data)
        return res
    })
}