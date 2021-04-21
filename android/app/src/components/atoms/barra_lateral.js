import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, TextInput, TouchableOpacity, FlatList, Button, Alert } from 'react-native';
import { WHITE, PRIMARY, SECONDARY,BLACK } from '../../styles/colors';
import Modal from 'react-native-modal';
export default class BarraLateral extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "User",
            tourList: [
                { label: 'Torneo 1', value: 'torneo1', },
                { label: 'Torneo 2', value: 'torneo2' },
                { label: 'Torneo 3', value: 'torneo3' },
            ],
            selectedFriend: null,
            username: "user 1",
            estado: true,
            friendList:
                [
                    { name: 'natured', state: true },
                    { name: 'rollicking', state: true },
                    { name: 'cheerful', state: true },
                    { name: 'fun', state: true },
                    { name: 'sweet', state: true },
                    { name: 'amiable', state: true },
                    { name: 'natured', state: true },
                    { name: 'rollicking', state: false },
                    { name: 'cheerful', state: false },
                    { name: 'fun', state: false },
                    { name: 'sweet', state: false },
                    { name: 'amiable', state: false },
                ],
            show: false,
            showSend: false,
            showReceive: false,
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
                                        {item.state ?
                                            <TouchableOpacity style={styles.connectFriend} onPress={() => this.selectFriend(item.name)}>
                                                <Text style={styles.friendText}>
                                                    {item.name}
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
        height: 29,
        width: 60,
        backgroundColor: PRIMARY,
        alignSelf: 'center',
        paddingTop:10,
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

