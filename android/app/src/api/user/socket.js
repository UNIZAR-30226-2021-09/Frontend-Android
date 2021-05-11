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

export const receiveFriendRequest = (user) => {
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
