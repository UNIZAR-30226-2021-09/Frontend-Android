import axios from 'axios'

export const beginRandom = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/random', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("Begin Random")
        console.log(res.data)
        return res.data
    })

}

export const beginIA = user => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/ia', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("Begin IA")
        console.log(res.data)
        return res.data
    })
}

export const beginTournament = user => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/torneo', {
        nombreUsuario: user.Username,
        participante2: user.participante2,
        participante3: user.participante3,
        participante4: user.participante4,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("Begin Tournament")
        console.log(res.data)
        return res
    }).catch(error => {
        console.log("errorrrrrrrrrrrrrrr")
        if (error.response) {
            console.log(error.response.data);
        }
        return { error: "error", tipo: error.response.data };
    })
}
export const beginFriend = user => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/newGame', {
        nombreUsuario: user.Username,
        nombreAmigo: user.Friendname,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("begin AMIGOS")
        console.log(res.data)
        return res.data
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
       // console.log("peticiones RECIBIDAS de partidas contra AMIGOS")
        //console.log(res.data)
        return res.data
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
        return res.data
    })
}
//get
export const getGameInProgess = user => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/inProgress', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("listado partidas en curso")
        //console.log(res.data)
        return res.data
    })
}
export const acceptFriendGame = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/accept', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
        gameid: user.GameId
    }).then(res => {
        console.log(" aceptar peticiones de partida contra amigo")
        console.log(res.data)
        return res.data
    })
}

export const dismissFriendGame = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/game/dismiss', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
        gameid: user.GameId
    }).then(res => {
        console.log("rechazar peticiones de partida contra amigo")
        console.log(res.data)
        return res.data
    })
}
//get
export const getHistory = (user) => {
    return axios.post('https://proyecto-software-09.herokuapp.com/history', {
        nombreUsuario: user.Username,
        accessToken: user.AccessToken,
    }).then(res => {
        console.log("getHistory")
        console.log(res.data)
        return res.data
    }).catch(error => {
        console.log("errorrrrrrrrrrrrrrr")
        if (error.response) {
            console.log(error.response.data);
        }
        return { error: "error", tipo: error.response.data };
    })
}

