import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, AsyncStorage, TextInput, TouchableOpacity, FlatList, Button, Alert } from 'react-native';
import { WHITE, PRIMARY, SECONDARY,BLACK } from '../../styles/colors';
import Modal from 'react-native-modal';
import { getFriendList } from '_api/user';
import { getIncomingList, getOutgoingList, accept, dismiss } from '_api/user';
import { socket, aceptarInvitacionAmigo } from '_api/user/socket';

export default class BarraLateral extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "User",
            selectedFriend: null,
            estado: true,
            friendList: [],
            show: false,
            showFriend: false,
            showGameRequest: false,
            refreshing: false,
            incomingList: ["cheerful", "sweet", "natured", "cheerful", "sweet", "natured"],
            outcomingList: [],
            accessToken: "",
        }
    }
    setShowFriend() {
        const { showFriend } = this.state
        this.setState ( {
            showFriend: !showFriend
        })

    }
    setShowGameRequest() {
        const { showGameRequest } = this.state
        this.setState({
            showGameRequest: !showGameRequest
        })
        console.log("SHOW" + showGameRequest)
    }

    async componentDidMount() {
        var _username = await AsyncStorage.getItem('username');
        var _accessToken = await AsyncStorage.getItem('userToken');
        this.setState({ username: _username, accessToken: _accessToken });
        var newUser = {
            Username: _username,
            AccessToken: _accessToken
        };
        console.log("USER" + newUser.Username);
        socket.on('llegaInvitacion', () => {
            console.log("-------- Socket llegaInvitacion a " + newUser.Username)
            this.updateIncoming(newUser);
        })
        socket.on('llegaAceptarInvitacionAmigo', () => {
            console.log("--------Socket llegaAceptarInvitacionAmigo a " + newUser.Username)
            this.updateIncoming(newUser);
            this.updateFriendList(newUser);
        });
        console.log("LIST" + this.state.incomingList)
        this.updateFriendList(newUser);
        this.updateIncoming(newUser);
    }
    async updateFriendList(newUser) {
        await getFriendList(newUser).then(data => {
            console.log("Data de barra lateral: " + data);
            if (data != "error") {
                this.setState(
                    { friendList: data }
                )
            } else {
                alert('Error de registro');
            }
        }).catch(err => {
            console.log("error barra lateral")
            console.log(err)
            return "error"
        }); 
    }
    async updateIncoming(newUser) {
        await getIncomingList(newUser).then(data => {
            console.log("Data de getIncomingList: " + data);
            if (data != "error") {
                this.setState(
                    { incomingList: data }
                )
            } else {
                alert('Error de getIncomingList');
            }
        }).catch(err => {
            console.log("error getIncomingList")
            console.log(err)
            return "error"
        });
    }
    async updateOutcoming(newUser) {
        await getOutgoingList(newUser).then(data => {
            console.log("Data de getOutgoingList: " + data);
            if (data != "error") {
                this.setState(
                    { outcomingList: data }
                )
            } else {
                alert('Error de getOutgoingList');
            }
        }).catch(err => {
            console.log("error getOutgoingList")
            console.log(err)
            return "error"
        });
    }
    async acceptRequest(friendname) {
        var newUser = {
            Username: this.state.username,
            AccessToken: this.state.accessToken,
            Friendname: friendname
        };
        console.log(newUser);
        await accept(newUser).then(data => {
            console.log("Data de acceptRequest: " + data);
            if (data != "error") {
                console.log("Aceptado");
                aceptarInvitacionAmigo({ Username: friendname });
            } else {
                alert('Error de acceptRequest');
            }
        }).catch(err => {
            console.log("error acceptRequest")
            console.log(err)
            return "error"
        });
        this.updateIncoming(newUser);
    }

    async dismissRequest(friendname) {
        var newUser = {
            Username: this.state.username,
            AccessToken: this.state.accessToken,
            Friendname: friendname
        };
        console.log(newUser);
        await dismiss(newUser).then(data => {
            console.log("---Data de dismissRequest: " + data);
            if (data != "error") {
                console.log("Rechazado");
            } else {
                alert('Error de dismissRequest');
            }
        }).catch(err => {
            console.log("error dismissRequest")
            console.log(err)
            return "error"
        });
        this.updateIncoming(newUser);
    }

    async cancelRequest(friendname) {
        var newUser = {
            Username: this.state.username,
            AccessToken: this.state.accessToken,
            Friendname: friendname
        };
        console.log(newUser);
        await cancel(newUser).then(data => {
            console.log("Data de cancelRequest: " + data);
            if (data != "error") {
                console.log("Cancelado");
            } else {
                alert('Error de cancelRequest');
            }
        }).catch(err => {
            console.log("error cancelRequest")
            console.log(err)
            return "error"
        });
        this.updateOutcoming(newUser);
    }
    render() {

        return (
            <View style={styles.cuadroPequeno}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.showFriend}
                    onRequestClose={() => {
                        this.setShowFriend();
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.modalHeaderText}>Peticiones de amistad</Text>
                            </View>
                            <View style={styles.friendList2}>
                                {this.state.incomingList.length>0 ? <FlatList
                                    data={this.state.incomingList}
                                    extraData={this.state.showItemIndex}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={styles.friend2}>
                                                <View style={styles.friendItem}>
                                                    <View style={styles.gameItem}>
                                                        <Text style={styles.friendText} > {item}</Text>
                                                    </View>
                                                    <View style={styles.gameButton}>
                                                        <TouchableOpacity style={styles.acceptButton} onPress={() => this.acceptRequest(item)}>
                                                            <Text style={styles.rankText} > Aceptar </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={styles.gameButton}>
                                                        <TouchableOpacity style={styles.rejectButton} onPress={() => this.dismissRequest(item)}>
                                                            <Text style={styles.rankText} > Rechazar </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={styles.friendList2}
                                />: <Text style={styles.noPetitions}>No hay peticiones nuevas</Text>
                                }
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={() => { this.setShowFriend() }}
                                    >
                                        <Text style={styles.textStyle}>Cerrar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.showGameRequest}
                    onRequestClose={() => {
                        this.setShowGameRequest();
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.modalHeaderText}>Peticiones de partidas amistosas</Text>
                            </View>
                            <View style={styles.friendList2}>
                                {this.state.incomingList.length > 0 ? <FlatList
                                    data={this.state.incomingList}
                                    extraData={this.state.showItemIndex}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={styles.friend2}>
                                                <View style={styles.friendItem}>
                                                    <View style={styles.gameItem}>
                                                        <Text style={styles.friendText} > {item}</Text>
                                                    </View>
                                                    <View style={styles.gameButton}>
                                                        <TouchableOpacity style={styles.acceptButton} onPress={() => this.acceptRequest(item)}>
                                                            <Text style={styles.rankText} > Aceptar </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={styles.gameButton}>
                                                        <TouchableOpacity style={styles.rejectButton} onPress={() => this.dismissRequest(item)}>
                                                            <Text style={styles.rankText} > Rechazar </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    }}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={styles.friendList2}
                                /> : <Text style={styles.noPetitions}>No hay peticiones nuevas</Text>
                                }
                            </View>
                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.modalButton}
                                        onPress={() => { this.setShowGameRequest() }}
                                    >
                                        <Text style={styles.textStyle}>Cerrar</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>

                </Modal>
                <View style={styles.cuadroPerfil}>
                    <Text style={styles.userText}>
                        {this.state.username}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Profile')}>
                        <Text style={styles.profileText}>
                            Mi Perfil
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cuadroAmigos}>
                    <View style={styles.cuadroPequeno}>
                        <View style={styles.cuadroAdd}>
                            <TouchableOpacity style={styles.peticion} onPress={() => this.setShowFriend()}>
                                <Text style={styles.peticionText}>
                                    Peticiones de amistad
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.cuadroPequeno}>
                        <View style={styles.cuadroAdd}>
                            <TouchableOpacity style={styles.peticion} onPress={() => this.setShowGameRequest()}>
                                <Text style={styles.peticionText}>
                                    Invitaciones de amigos
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.cuadroPequeno}>
                        <View style={styles.cuadroAdd}>
                            <Text style={styles.text}>
                                {"Mis amigos  "}
                            </Text>
                            <TouchableOpacity style={styles.addButton} onPress={() => this.props.navigation.navigate('AddFriend')}>
                                <Text style={styles.profileText}>
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.cuadroPequeno2}>
                        <FlatList
                            data={this.state.friendList}
                            extraData={this.state.showItemIndex}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.friend}>
                                        {true ?
                                            <View style={styles.connectFriend}>
                                                <Text style={styles.friendText}>
                                                    {item}
                                                </Text>
                                            </View> :
                                            <View style={styles.notConnectFriend}>
                                                <Text style={styles.friendText}>
                                                    {item}
                                                </Text>
                                            </View>
                                        }
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.friendContainer}
                        />
                    </View>
                    
                </View>
                
            </View>
        );
    }
};

const styles = StyleSheet.create({
    cuadroPequeno: {
        flex: 1,
        borderColor: BLACK,
        flexDirection: 'column',
    },
    cuadroPequeno2: {
        flex: 6,
        borderColor: BLACK,
        flexDirection: 'column',
    },
    cuadroAdd: {
        flex: 1,
        borderColor: BLACK,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    peticion: {
        height: 20,
        width: 110,
        backgroundColor: PRIMARY,
        alignSelf: 'center',
        paddingTop: 10,
        borderRadius: 50,
    },
    peticionText: {
        fontSize: 10,
        color: WHITE,
        left: 5,
        bottom: 6
    },
    button: {
        height: 20,
        width: 60,
        backgroundColor: PRIMARY,
        alignSelf: 'center',
        borderRadius: 50,
    },
    addButton: {
        height: 20,
        width: 20,
        backgroundColor: PRIMARY,
        alignSelf: 'center',
        borderRadius: 50,
    },
    cuadroPerfil: {
        flex: 1,
        borderColor: BLACK,
        borderWidth: 2,
    },
    cuadroAmigos: {
        flex: 4,
        borderColor: BLACK,
        borderWidth: 2,
    },
    text: {
        fontSize: 12,
        alignSelf: 'center',
        color: BLACK,
    },
    profileText: {
        fontSize: 12,
        alignSelf: 'center',
        color: WHITE,
        
    },
    userText: {
        fontSize: 12,
        alignSelf: 'center',
        color: BLACK,
        padding: 2
    },
    friendContainer: {
        width:'100%'
    },
    friend: {
        paddingTop: 1,
    },
    connectFriend: {
        width: 120,
        height: 26,
        backgroundColor: PRIMARY,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
    },
    notConnectFriend: {
        width: 120,
        height: 26,
        backgroundColor: 'red',
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
    },
    friendText: {
        fontSize: 15,
        textAlign: 'center',
        color: WHITE
    },
    centeredView: {
        width: '100%',
        height:'100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'transparent',
    },
    modalView: {
        backgroundColor: 'white',
        height: '100%',
        width: '80%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection: 'column'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center",
    },
    modalHeaderText: {
        textAlign: "center",
        color: 'black',
        fontWeight: 'bold',
        fontSize:20
    },
    noPetitions: {
        textAlign: "center",
        color: 'grey',
        fontSize: 15
    },
    modalButton: {
        height: 26,
        width: 80,
        backgroundColor: PRIMARY,
        flexDirection: "row",
        justifyContent: 'center',
        borderRadius: 50,
        top:10
    },
    gameItem: {
        flex: 1
    },
    gameButton: {
        flex: 1,
    },
    rejectButton: {
        width: 50,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
        marginRight: 40
    },
    acceptButton: {
        width: 40,
        height: 20,
        backgroundColor: 'green',
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
    },

    gameLose: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center',
        borderWidth: 1,
        color: 'blue',
        backgroundColor: 'red',
        width: 300,
        height: 25,

    },
    friendItem: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: PRIMARY,
        width: 400,
        height: 25,
    },
    friend2: {
        paddingTop: 1,
        width: 400,
        height: 25,
    },
    friendButton: {
        width: 100,
        height: 20,
        backgroundColor: SECONDARY,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
    },
    confirmButton: {
        top: 30,
        width: 180,
        height: 40,
        backgroundColor: PRIMARY,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center'
    },
    friendList2: {
        alignSelf: 'center',
        flex: 2,
        top: -10,
    },
    rankText: {
        fontSize: 10,
        textAlign: 'center',
        color: WHITE
    },
});

