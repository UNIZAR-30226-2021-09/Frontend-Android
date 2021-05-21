import io from 'socket.io-client';
export const socket = io("https://proyecto-software-09.herokuapp.com");

export const logMe = (user) => {
    socket.emit('logMe', { nombreUsuario: user.Username });
    console.log("Socket LogMe " + user.Username + socket.id)
};

export const friendPetition = (user) =>  {
    socket.emit('friendPetition', { nombreUsuario: user.Username });
    console.log("---Socket friendPetition " + user.Username)
};

export const aceptarInvitacionAmigo = (user)  => {
    socket.emit('aceptarInvitacionAmigo', { nombreUsuario: user.Username });
    console.log("---Socket aceptarInvitacionAmigo " + user.Username)
};

export const disparo = (gameId, turno) => {
    socket.emit('movement', { game: gameId, nuevoTurno: turno });
    console.log("---Socket movement " + gameId, turno )
};

export const joinGame = (gameId) => {
    socket.emit('joinGame', gameId);
    console.log("---Socket joinGame " + gameId)
};

export const getIntoAllGames = (username) => {
    socket.emit('getIntoAllGames', { nombreUsuario: username });
    console.log("---Socket getIntoAllGames " + username)
};

export const challenge = (username) => {
    socket.emit('challenge', { nombreUsuario: username });
    console.log("---Socket challenge " + username)
};

export const aceptarChallenge = (data) => {
    socket.emit('aceptarChallenge', { nombreUsuario: data.Username, game: data.GameId});
    console.log("---Socket aceptarChallenge " + data.Username)
};
/*export const receiveFriendRequest = (user) => {
    socket.on('llegaInvitacion', message => {
        console.log("222222 Socket llegaInvitacion a " + user.Username)
    });
};

export const receiveAcceptFriendRequest = () => async dispatch => {
    socket.on('llegaAceptarInvitacionAmigo', message => {
        console.log("Socket llegaAceptarInvitacionAmigo")
    });
};

export const disconnect = () => async dispatch => {
    socket.emit('disconnect', () => {
        console.log("DISCONNECT")
    });
    socket.off();
};
*/