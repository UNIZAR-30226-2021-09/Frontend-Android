import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Alert, FlatList, ScrollView, AsyncStorage, ToastAndroid } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { getFriendList } from '_api/user';
import { beginFriend, beginRandom } from '_api/game';

const ELEGIR = "Invita a un amigo";
const INVITAR = "Vas a invitar a";
const CAMBIAR = "Elegir a otro";
const DESAFIADO = "Has desafiado a ";
const ANYADIDO = "Se ha añadido la partida a tu lista de partidas";

export default class BeginFriendScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tourList: [
                { label: 'Torneo 1', value: 'torneo1', },
                { label: 'Torneo 2', value: 'torneo2' },
                { label: 'Torneo 3', value: 'torneo3' },
            ],
            selectedFriend: '',
            username: '',
            estado: ELEGIR,
            friendList: ["cheerful", "sweet", "natured", "cheerful", "sweet", "natured"],
            show: true,
        }

    }
    async componentDidMount() {
        var _username = await AsyncStorage.getItem('username');
        var _accessToken = await AsyncStorage.getItem('userToken');
        this.setState({ username: _username, accessToken: _accessToken });
        var newUser = {
            Username: _username,
            AccessToken: _accessToken
        };
        this.updateFriendList(newUser);
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
    showFriend() {
        const { show, estado } = this.state
        let nuevoEstado = (estado == ELEGIR ? CAMBIAR : ELEGIR)
        this.setState({
            show: !show,
            estado: nuevoEstado
        })
    }
    selectFriend(friend) {
        this.setState({
            selectedFriend: friend,
            show: false,
            estado: CAMBIAR
        })
    }
    async send() {
        let { selectedFriend, username, accessToken } = this.state
        /*this.setState({
            show: true,
            estado: ELEGIR
        })*/
        var user = {
            Username: username,
            Friendname: selectedFriend,
            AccessToken: accessToken
        };
        console.log(DESAFIADO + selectedFriend + ". " + ANYADIDO )

        await beginFriend(user).then(data => {
            console.log("Data de friend: " + JSON.stringify(data));
            if (data != "error") {
                console.log("No ha habido fallo al comunicarse con el server")
                ToastAndroid.show(DESAFIADO + selectedFriend + ". " + ANYADIDO, ToastAndroid.LONG)
            } else {
                alert('Error de friendGame');
            }
        }).catch(err => {
            console.log("error random")
            console.log(err)
            return "error"
        });
        //this.props.navigation.navigate('Home');

    }

    render() {
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.title} > Desafiar amigo</Text>
                </View>
                <View style={styles.cuadroAmigos}>
                    {/*<View style={styles.friendContainer}>
                        <Text style={styles.text} > {this.state.username}: Listo </Text>
                    </View>*/}
                    {this.state.estado != ELEGIR ?
                        <View style={styles.friendContainer}>
                            <TouchableOpacity style={styles.friendContainer} onPress={() => this.showFriend()}>
                                <Text style={styles.messageText} > {this.state.estado} </Text>
                            </TouchableOpacity>
                        </View> :
                        <View style={styles.friendContainer}>
                                <Text style={styles.messageText} > {this.state.estado} </Text>
                        </View>
                    }
                    <View style={styles.friendContainer}>
                        {this.state.show ? <FlatList
                            data={this.state.friendList}
                            extraData={this.state.showItemIndex}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.friend}>
                                        <TouchableOpacity style={styles.friendButton} onPress={() => this.selectFriend(item)}>
                                            <Text style={styles.friendText}>
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.friendContainer}
                        /> : <View style={styles.friendContainer}>
                                <Text style={styles.text} >{INVITAR}: {this.state.selectedFriend}</Text>
                                <TouchableOpacity style={styles.confirmButton} onPress={() => this.send()}>
                                    <Text style={styles.buttonText}>
                                        Enviar peticion
                                    </Text>
                                </TouchableOpacity>
                            </View>}
                    </View>
                    
                </View>
                
            </View>
            <BarraLateral navigation={this.props.navigation} />

        </View>);
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 30,
    },
    cuadroGrande: {
        flex: 4,
        borderColor: BLACK,
        borderWidth: 3,
        flexDirection: 'column',
        alignContent: 'center',
    },
    cuadroPequeno: {
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    cuadroAmigos: {
        flex: 3,
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center',
        paddingBottom:80
    },
    friendContainer: {
        paddingTop: 5,
    },
    friend: {
        paddingTop: 1,
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
        alignSelf:'center'
    },
    title: {
        textAlign: 'center',
        color: 'black',
        paddingTop: 20,
        fontSize: 38,
        fontWeight: 'bold',
    },
    buttonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
    },
    text: {    
        fontSize: 25,
        textAlign: 'center'
    },
    friendText: {
        fontSize: 15,
        textAlign: 'center',
        color: PRIMARY
    },
    messageText: {
        fontSize: 17,
        textAlign: 'center',
        color: 'grey'
    },
    listContainer: {
        height: 50, width: 260, alignSelf: 'center'
    },
    listText: {
        fontSize: 18, justifyContent: 'center', color: 'black'
    },
});


