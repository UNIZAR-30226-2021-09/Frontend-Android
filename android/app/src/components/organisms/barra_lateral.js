import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, AsyncStorage, TextInput, TouchableOpacity, FlatList, Button, Alert } from 'react-native';
import { WHITE, PRIMARY, SECONDARY,BLACK } from '../../styles/colors';
import Modal from 'react-native-modal';
import { getFriendList } from '_api/user';

export default class BarraLateral extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "User",
            selectedFriend: null,
            estado: true,
            friendList:
                ["cheerful", "sweet","natured"],
            show: false,
            showSend: false,
            showReceive: false,
            refreshing: false,
        }
    }

    onClick() {
        const loo = 1;
    }
    showSend() {
        const { showSend } = this.state
        this.setState = {
            showSend: !showSend
        }
    }
    showReceive() {
        const { showReceive } = this.state
        this.setState = {
            showReceive: !showReceive
        }
    }

    async componentDidMount() {
        var _username = await AsyncStorage.getItem('username');
        var accessToken = await AsyncStorage.getItem('userToken');
        this.setState( {username: _username});
        var newUser = {
            Username: _username,
            AccessToken: accessToken
        };
        console.log(newUser);
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
    
    render() {

        return (
            <View style={styles.cuadroPequeno}>
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
                            <TouchableOpacity style={styles.peticion} onPress={() => this.props.navigation.navigate('FriendRequest')}>
                                <Text style={styles.peticionText}>
                                    Peticiones de amistad
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
                                            <TouchableOpacity style={styles.connectFriend} onPress={() => this.selectFriend(item)}>
                                                <Text style={styles.friendText}>
                                                    {item}
                                                </Text>
                                            </TouchableOpacity> :
                                            <TouchableOpacity style={styles.notConnectFriend} onPress={() => this.selectFriend(item.name)}>
                                                <Text style={styles.friendText}>
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
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
        paddingTop: 5,
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

    
});

