import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Alert, FlatList, ScrollView, AsyncStorage } from 'react-native';
import { PRIMARY, SECONDARY, BLACK, WHITE } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { getIncomingList, getOutgoingList, accept, dismiss } from '_api/user';
import { socket, aceptarInvitacionAmigo } from '_api/user/socket';
import i18n from 'i18n-js';

export default class FriendRequestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFriend: null,
            username: "user 1",
            accessToken: "",
            estado:null,
            incomingList: [],
            outcomingList: []
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
        console.log(newUser);
        console.log("USER" + newUser.Username);
        socket.on('llegaInvitacion', () => {
            console.log("-------- Socket llegaInvitacion a " + newUser.Username)
            this.updateIncoming(newUser);
        })
        socket.on('llegaAceptarInvitacionAmigo', () => {
            console.log("--------Socket llegaAceptarInvitacionAmigo a " + newUser.Username)
            this.updateOutcoming(newUser);
        });
        this.updateIncoming(newUser);
        this.updateOutcoming(newUser);
        
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
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                        <Text style={styles.title} > {i18n.t('PetAmistad')}</Text>
                </View>
                <View style={styles.cuadroAmigos}>
                    <View style={styles.cuadro}>
                        <View style={styles.friendContainer}>
                            <Text style={styles.text} > {i18n.t('Recibidas')}</Text>
                        </View>
                        <View style={styles.friendContainer}>
                            <FlatList
                                data={this.state.incomingList}
                                extraData={this.state.showItemIndex}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.friend}>
                                            <View style={styles.friendItem}>
                                                <View style={styles.gameItem}>
                                                    <Text style={styles.friendText} > {item}</Text>
                                                </View>
                                                <View style={styles.gameButton}>
                                                    <TouchableOpacity style={styles.acceptButton} onPress={() => this.acceptRequest(item)}>
                                                        <Text style={styles.rankText} > {i18n.t('Aceptar')} </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.gameButton}>
                                                    <TouchableOpacity style={styles.rejectButton} onPress={() => this.dismissRequest(item)}>
                                                        <Text style={styles.rankText} > {i18n.t('Rechazar')} </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                style={styles.friendContainer}
                            />
                        </View>
                    </View>
                    <View style={styles.cuadro}>
                        <View style={styles.friendContainer}>
                            <Text style={styles.text} > {i18n.t('Enviadas')}</Text>
                        </View>
                        <View style={styles.friendContainer}>
                            <FlatList
                                data={this.state.outcomingList}
                                extraData={this.state.showItemIndex}
                                renderItem={({ item, index }) => {
                                        return (
                                            <View style={styles.friend}>
                                                <View style={styles.friendItem}>
                                                    <View style={styles.gameItem}>
                                                        <Text style={styles.friendText} > {item}</Text>
                                                    </View>
                                                    <View style={styles.gameButton}>
                                                        <TouchableOpacity style={styles.rejectButton} onPress={() => this.cancelRequest(item)}>
                                                            <Text style={styles.rankText} > {i18n.t('Cancelar')} </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                style={styles.friendContainer}
                            /> 
                        </View>
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
    cuadro: {
        flex:1
    },
    header: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center'
    },
    gameItem: {
        flex:1
    },
    gameButton: {
        flex: 1,
    },
    cuadroCompartir: {
        flex: 1,
        alignSelf: 'center',
        margin: 1

    },
    ranking: {
        width: 100,
        height: 20,
        backgroundColor: PRIMARY,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
        marginLeft:20
    },
    rejectButton: {
        width: 50,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
        marginRight:40
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
        color: 'blue',
        backgroundColor: PRIMARY,
        width: 200,
        height: 25,
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
        flexDirection: 'row',
        alignSelf: 'center',
        paddingBottom: 80,
        margin:10
    },
    friendContainer: {
        width: '100%',
    },
    friend: {
        paddingTop: 1,
        width: 300,
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
        alignSelf:'center'
    },
    shareButton: {
        width: 100,
        height: 20,
        backgroundColor: PRIMARY,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
    },
    title: {
        textAlign: 'center',
        color: 'black',
        paddingTop: 0,
        fontSize: 38,
        fontWeight: 'bold',
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 20,
    },
    text: {    
        fontSize: 20,
        textAlign: 'center'
    },
    rankText: {
        fontSize:10,
        textAlign: 'center',
        color: WHITE
    },
    friendText: {
        fontSize: 15,
        textAlign: 'center',
        color: WHITE
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


