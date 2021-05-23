import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, AsyncStorage, TextInput, TouchableOpacity, FlatList, ToastAndroid } from 'react-native';
import { WHITE, PRIMARY, SECONDARY,BLACK } from '../../styles/colors';
import Modal from 'react-native-modal';
import { getFriendList } from '_api/user';
import { getIncomingList, getOutgoingList, accept, dismiss } from '_api/user';
import { socket, aceptarInvitacionAmigo, aceptarChallenge, joinGame } from '_api/user/socket';
import { acceptFriendGame, dismissFriendGame, gameIncomingRequest, beginTournament } from '_api/game';
import { StackActions } from '@react-navigation/native';
import { BarraLateral } from '_organisms'
import i18n from 'i18n-js';



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
            Amigo1: "",
            Amigo2: "",
            Amigo3: "",
            enable1: false,
            enable2: false,
            enable3: false,
            restantes: 3,
        }
    }

    async componentDidMount() {
        var _username = await AsyncStorage.getItem('username');
        var _accessToken = await AsyncStorage.getItem('userToken');
        this.setState({ username: _username, accessToken: _accessToken });

        await this.updateFriendList();

    }
    
    async updateFriendList() {
        var newUser = {
            Username: this.state.username,
            AccessToken: this.state.accessToken
        };
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

    async primeraSeleccion(item, index) {
        if (!this.state.enable1){
            this.setState({Amigo1:item});
            console.log("Primer amigo " + item);
            this.setState({ enable1: true, restantes:2 });
            var extra=this.state.friendList;
            extra.splice(index, 1);
            this.setState({ friendList: extra});
            console.log("extra es " + extra);
        }else{
            if (!this.state.enable2){
                this.setState({Amigo2:item});
                console.log("Segundo amigo " + item);
                this.setState({ enable2: true, restantes: 1 });
                var extra=this.state.friendList;
                extra.splice(index,1); 
                this.setState({ friendList: extra});
                console.log("extra es "+ extra);
            }else{
                this.setState({Amigo3:item});
                console.log("Tercer amigo " + item);
                this.setState({ enable3: true, restantes: 0 });
                var extra=this.state.friendList;
                extra.splice(index,1); 
                this.setState({ friendList: extra });
                console.log("extra es "+ extra);
            }
        }
    }
    async vaciar() {
        await this.updateFriendList();
        this.setState({
            Amigo1: "",
            Amigo2: "",
            Amigo3: "",
            enable1: false,
            enable2: false,
            enable3: false,
            restantes:3
        })
    }
    async startGame() {
        let { restantes } = this.state
        console.log(restantes+"RESTANTES")
        if (restantes == 0) {
            var newUser = {
                Username: this.state.username,
                participante2: this.state.Amigo1,
                participante3: this.state.Amigo2,
                participante4: this.state.Amigo3,
                AccessToken: this.state.accessToken,
            };
            await beginTournament(newUser).then(data => {
                console.log("Data de tour: " + data);
                if (data != "error") {
                    console.log("No ha habido fallo al comunicarse con el server " + data)
                    //Ahora hacer que muestre un mensaje u otro dependiendo del resultado
                    if (data.mensaje) {
                        //ToastAndroid.show('No hay nadie esperando partida, cuando aparezca un contrincante se añadira la partida a tu lista de partidas', ToastAndroid.SHORT);
                        //this.setState({ textValue: 'No hay nadie esperando partida, cuando aparezca un contrincante se añadira la partida a tu lista de partidas' })
                    } else {
                        //Aqui se ha encontrado partida asi que redirige a la partida 
                        ToastAndroid.show('Se ha añadido una partida', ToastAndroid.SHORT);
                        //this.props.navigation.navigate('Home');
                    }
                } else {
                    alert('Error de tour');
                }
            }).catch(err => {
                console.log("error tour")
                console.log(err)
                return "error"
            });
            //this.props.navigation.navigate('Home');
        } else if (restantes == 1) {
            ToastAndroid.show('Elija ' + restantes + ' amigo más', ToastAndroid.SHORT);
        } else {
            ToastAndroid.show('Elija ' + restantes + ' amigos más', ToastAndroid.SHORT);
        }
    }
    render() {
        let { restantes } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.cuadroGrande}>
                    <View style={styles.cuadroPequeno}>
                        <Text style={styles.titulo}>
                                Torneo
                        </Text>
                    </View>
                    <View style={styles.cuadroContenido}>
                        <View style={styles.cuadroAmigos}>

                            <Text style={styles.seleccionar}>
                                {restantes != 0 ? " Selecciona "+ restantes +" amigos:": "Comienza el torneo"}
                            </Text>
                            <FlatList
                                data={this.state.friendList}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.friend}>
                                    
                                                <View style={styles.connectFriend}>
                                                    <TouchableOpacity
                                                    disabled={this.state.enable3}
                                                    onPress={() => {this.primeraSeleccion(item,index)}}
                                                    >
                                                        <Text style={styles.friendText}>
                                                            {item}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                        </View>
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                style={styles.friendContainer}
                                    />
                        </View>
                        <View style={styles.cuadroTorneo}>
                            <View style={styles.division}>
                                <View style={styles.semifinal}>
                                    <View style={styles.final}>
                                        <Text style={styles.casillaFinal}>
                                        </Text>
                                        <View style={styles.lineaHorizontalEndFinal} />
                                        <Text style={{ top: '15%', color: PRIMARY, fontWeight:'bold' }}>
                                            vs
                                        </Text>
                                    </View>
                                    <View style={styles.lineaVerticalFinal} />
                                </View>
                                <View style={styles.semifinal}>
                                    <View style={styles.final}>
                                        <View style={styles.lineaHorizontalStartFinal} />
                                        <Text style={styles.casillaFinal2}>
                                        </Text>
                                    </View>
                                    <View style={styles.lineaVerticalFinal} />
                                </View>
                            </View>
                            <View style={styles.division}>
                                <View style={styles.semi}>
                                    <View style={styles.lineaHorizontalEnd} />
                                    <View style={styles.lineaVertical} />
                                    <Text style={styles.casilla}>
                                        {this.state.username}
                                    </Text>
                                </View>
                                <View style={styles.semi}>
                                    <View style={styles.lineaHorizontalStart} />
                                    <View style={styles.lineaVertical} />
                                    <Text style={styles.casilla}>
                                        {this.state.Amigo1}
                                    </Text>
                                </View>
                                <View style={styles.semi}>
                                    <View style={styles.lineaHorizontalEnd} />
                                    <View style={styles.lineaVertical} />
                                    <Text style={styles.casilla}>
                                        {this.state.Amigo2}
                                    </Text>
                                </View>
                                <View style={styles.semi}>
                                    <View style={styles.lineaHorizontalStart} />
                                    <View style={styles.lineaVertical} />
                                    <Text style={styles.casilla}>
                                        {this.state.Amigo3}
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={styles.cuadroBoton}>
                        <View style={{ flex: 1 }}>

                            <TouchableHighlight style={styles.button} onPress={() => this.vaciar()}>
                                <Text style={styles.btnText}> Vaciar</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableHighlight style={styles.button} onPress={() => this.startGame()}>
                                <Text style={styles.btnText}> Comenzar</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    </View>

                <BarraLateral navigation={this.props.navigation} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    connectFriend2: {
        width: 220,
        height: 26,
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 1,
        
    },
    division: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        top:'-10%'
    },
    semi: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    semifinal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    final: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    casilla: {
        width: '90%',
        height: '25%',
        backgroundColor: SECONDARY,
        color: PRIMARY,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        borderColor: PRIMARY,
        borderWidth:1
    },
    casillaFinal: {
        width: '50%',
        height: '50%',
        backgroundColor: SECONDARY,
        color: PRIMARY,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        borderColor: PRIMARY,
        borderWidth: 1,
        alignSelf: 'center',
        top: '15%',
        left:'90%'
    },
    casillaFinal2: {
        width: '50%',
        height: '50%',
        backgroundColor: SECONDARY,
        color: PRIMARY,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 14,
        borderColor: PRIMARY,
        borderWidth: 1,
        alignSelf: 'center',
        top: '15%',
        right: '90%'
    },
    lineaVertical: {
        height: '50%',
        width: 1,
        backgroundColor: PRIMARY,
        alignSelf:'center'
    },
    lineaVerticalFinal: {
        height: '50%',
        width: 1,
        backgroundColor: PRIMARY,
        alignSelf: 'center',
        top:'13%'
    },
    lineaHorizontalEnd: {
        height: 1,
        width: '50%',
        backgroundColor: PRIMARY,
        alignSelf: 'flex-end'
    },
    lineaHorizontalStart: {
        height: 1,
        width: '50%',
        backgroundColor: PRIMARY,
        alignSelf: 'flex-start'
    },
    lineaHorizontalEndFinal: {
        height: 1,
        width: '50%',
        backgroundColor: PRIMARY,
        alignSelf: 'flex-end',
        left: '90%'
    },
    lineaHorizontalStartFinal: {
        height: 1,
        width: '50%',
        backgroundColor: PRIMARY,
        alignSelf: 'flex-end',
        right:'70%'
    },
    titulo:{
        flex: 1,
        height: 100,
        fontSize: 25,
        alignSelf: 'center',
    },
    seleccionar: {
        fontSize: 16,
        alignSelf: 'center',
        top:'-4%'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 30,
    },
    cuadroPequeno: {
        flex: 1,
        flexDirection: 'column',
    },
    cuadroGrande: {
        flex: 4,
        borderColor: BLACK,
        borderWidth: 3,
        flexDirection: 'column',
        alignContent: 'center',
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
    cuadroTorneo: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    cuadroContenido: {
        flex: 4,
        flexDirection: 'row'
    },
    cuadroAmigos: {
        flex: 2,
        flexDirection: 'column'
    },
    cuadroBoton: {
        flex: 1,
        flexDirection: 'row'
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
    button: { alignSelf: 'center', width: 100, height: 30, backgroundColor: PRIMARY, borderRadius: 50 },

    btnText: { textAlign: 'center', color: 'white', paddingTop: 5 },
});

