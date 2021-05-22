/*import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert,  AsyncStorage,TextInput, TouchableOpacity, FlatList, Button} from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { getFriendList } from '_api/user';
import {Picker} from '@react-native-picker/picker';
import i18n from 'i18n-js';
*/

/*export default class BeginTournamentScreen extends Component {
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
            challengeList: [],
            accessToken: "",
            newPetition: 0,
            newRequest: 0,
            //listaAmigosDDP: [{label:"", nombre:""}],
        }
    }*/
    /*async crearLabels(){
        for(const elemento in this.state.listaAmigos){
            this.state.listaAmigosDDP.push({label: elemento,nombre: elemento});
            console.log("Nueva lista cread: " + this.state.listaAmigosDDP);
        }
    }*/
    
/*
<Picker
                style={styles.dp1}
                labelStyle={styles.listText}
                placeholderStyle={styles.text}
                selectedValue={this.state.listaAmigos}
                mode="dropdown"
                enabled={this.state.enable1}
                onPress={(e)=>this.pickerActivity(e)}
                itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
                onValueChange={(itemValue)=>{this.setState({Amigo1:itemValue}),
                console.log("Primer amigo "+this.state.Amigo1)
                }}>
                {this.state.listaAmigos.map((item, index) => {
                    return (<Picker.Item label={item} value={item} key={item}/>) 
                })}
                
            </Picker>
*/
/*
    async componentDidMount() {
        var _username = await AsyncStorage.getItem('username');
        var accessToken = await AsyncStorage.getItem('userToken');
        var user = {
            Username: _username,
            AccessToken: accessToken
        };
        console.log(user);
        await getFriendList(user).then(data => {
            console.log("Data de getFriendList: " + data);
            if (data != "error") {
                this.setState(
                    { friendList: data }
                )
            } else {
                alert('Error de getFriendList');
            }
        }).catch(err => {
            console.log("error getFriendList")
            console.log(err)
            return "error"
        });        
    }

    async pickerActivity(e){
        this.setState({enable1:false, Amigo1:e});
    }


    

    render() {
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
            <Text style={styles.title}>
                Selecciona 3 amigos
            </Text>
            <View style={styles.cuadroPequeno2}>
                        <FlatList
                            data={this.state.friendList}
                            extraData={true}
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
            <BarraLateral navigation={this.props.navigation} />

        </View>);
    }
};*/



import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, AsyncStorage, TextInput, TouchableOpacity, FlatList, Button, Alert, Image } from 'react-native';
import { WHITE, PRIMARY, SECONDARY,BLACK } from '../../styles/colors';
import Modal from 'react-native-modal';
import { getFriendList } from '_api/user';
import { getIncomingList, getOutgoingList, accept, dismiss } from '_api/user';
import { socket, aceptarInvitacionAmigo, aceptarChallenge, joinGame } from '_api/user/socket';
import { acceptFriendGame, dismissFriendGame, gameIncomingRequest } from '_api/game';
import { StackActions } from '@react-navigation/native';

export default class BeginTournamentScreen extends Component {

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
            challengeList: [],
            accessToken: "",
            newPetition: 0,
            newRequest: 0,
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
        await socket.on('llegaInvitacion', () => {
            console.log("-------- Socket llegaInvitacion2 a " + newUser.Username)
            this.updateIncoming(newUser);

        })
        await socket.on('llegaAceptarInvitacionAmigo',  () => {
            console.log("--------Socket llegaAceptarInvitacionAmigo a " + newUser.Username)
            this.updateIncoming(newUser);
            this.updateFriendList(newUser);
        });
        await socket.on('llegaChallenge', () => {
            console.log("--------Socket llegaChallenge a " + newUser.Username)
            this.updateChallengeList(newUser);
        });

        /*await socket.on('llegaAceptarChallenge', gameid => {
            console.log("--------Socket llegaAceptarChallenge a " + newUser.Username + "GAME: " + gameid)
            joinGame(gameid)
        });*/
        //console.log("LIST" + this.state.incomingList)
        await this.updateFriendList(newUser);
        await this.updateIncoming(newUser);
        await this.updateChallengeList(newUser);
    }
    
    async updateFriendList(newUser) {
        await getFriendList(newUser).then(data => {
            console.log("Data de barra lateral: " + data);
            if (data != "error") {
                this.setState(
                    {
                        friendList: data,
                    }
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
                    {
                        incomingList: data,
                        newPetition: data.length
                    }
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
    async updateChallengeList(newUser) {
        await gameIncomingRequest(newUser).then(data => {
            console.log("Data de updateChallengeList: " + JSON.stringify(data));
            if (data != "error") {
                this.setState(
                    {
                        challengeList: data,
                        newRequest: data.length
                    }
                )
                console.log("Data de challengeList: " + JSON.stringify(this.state.challengeList));

            } else {
                alert('Error de updateChallengeList');
            }
        }).catch(err => {
            console.log("error updateChallengeList")
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
    async acceptGame(gameID, contrincante) {
        var newUser = {
            Username: this.state.username,
            AccessToken: this.state.accessToken,
            GameId: gameID
        };
        console.log(newUser);
        await acceptFriendGame(newUser).then(data => {
            console.log("Data de acceptRequest: " + data);
            if (data != "error") {
                console.log("Aceptado");
                aceptarChallenge({ Username: contrincante, GameId: gameID });
                joinGame(gameID);
            } else {
                alert('Error de acceptRequest');
            }
        }).catch(err => {
            console.log("error acceptRequest")
            console.log(err)
            return "error"
        });
        this.updateChallengeList(newUser);
    }

    async dismissGame(gameID) {
        var newUser = {
            Username: this.state.username,
            AccessToken: this.state.accessToken,
            GameId: gameID
        };
        console.log(newUser);
        await dismissFriendGame(newUser).then(data => {
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
        this.updateChallengeList(newUser);
    }

    render() {

        return (
            <View style={styles.cuadroPequeno}>
                <View>
                    <Text style={styles.titulo}>
                        Selecciona tres amigos
                    </Text>
                </View>
                <View style={styles.cuadroAmigos}>
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
    titulo: {
        flex: 1,
        fontSize: 10,
    },
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
        alignSelf: 'center',
        padding:2
    },
    peticion: {
        height: 20,
        width: '100%',
        backgroundColor: PRIMARY,
        borderRadius: 50,
        flexDirection: 'row',
        padding:1
    },
    peticionText: {
        fontSize: 10,
        color: WHITE,
        textAlign: 'center'
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
    circle: {
        backgroundColor: 'red',
        borderRadius: 50,
        width: 12,
        height: 12
    },
    icon: {
        borderRadius: 50,
        width: 20,
        height: 20,
        alignSelf: 'center'
    },
    image: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        resizeMode: 'center',
    },
});