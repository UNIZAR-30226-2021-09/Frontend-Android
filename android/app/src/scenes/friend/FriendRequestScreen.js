import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Alert, FlatList, ScrollView } from 'react-native';
import { PRIMARY, SECONDARY, BLACK, WHITE } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
export default class FriendRequestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFriend: null,
            username: "user 1",
            estado:null,
            gameList:
                [
                    { name: 'natured', state: true },
                    { name: 'rollicking', state: true },
                    { name: 'cheerful', state: true },
                    { name: 'amiable', state: true },
                    { name: 'natured', state: true },
                    { name: 'rollicking', state: false },
                    { name: 'cheerful', state: false },
                    { name: 'fun', state: true },
                    { name: 'sweet', state: true },
                    { name: 'fun', state: false },
                    { name: 'sweet', state: false },
                    { name: 'amiable', state: false },
                ],
            show: false,
            point: 0
        }
        
    }
    showFriend() {
        const { show } = this.state

        this.setState({
            show: !show
        })

    }
    selectFriend(friend) {
        this.setState({
            selectedFriend: friend,
            show: false,
            estado:": Seleccionado"
        })
    }
    send() {
        this.setState({
            estado: ": Esperando"
        })
    }
    render() {
        const getFriend = (option) => {

        }
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                        <Text style={styles.title} > Peticiones de amistad</Text>
                </View>
                <View style={styles.cuadroAmigos}>
                    <View style={styles.cuadro}>
                        <View style={styles.friendContainer}>
                            <Text style={styles.text} > Enviadas:</Text>
                        </View>
                        <View style={styles.friendContainer}>
                            <FlatList
                                data={this.state.gameList}
                                extraData={this.state.showItemIndex}
                                renderItem={({ item, index }) => {
                                        return (
                                            <View style={styles.friend}>
                                                <View style={styles.friendItem}>
                                                    <View style={styles.gameItem}>
                                                        <Text style={styles.friendText} > {item.name}</Text>
                                                    </View>
                                                    <View style={styles.gameButton}>
                                                        <TouchableOpacity style={styles.rejectButton} onPress={() => Alert.alert("Funcionalidad futura")}>
                                                            <Text style={styles.rankText} > Cancelar </Text>
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
                            <Text style={styles.text} > Recibidas:</Text>
                        </View>
                        <View style={styles.friendContainer}>
                            <FlatList
                                data={this.state.gameList}
                                extraData={this.state.showItemIndex}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={styles.friend}>
                                            <View style={styles.friendItem}>
                                                <View style={styles.gameItem}>
                                                    <Text style={styles.friendText} > {item.name}</Text>
                                                </View>
                                                <View style={styles.gameButton}>
                                                    <TouchableOpacity style={styles.acceptButton} onPress={() => Alert.alert("Funcionalidad futura")}>
                                                        <Text style={styles.rankText} > Aceptar </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={styles.gameButton}>
                                                    <TouchableOpacity style={styles.rejectButton} onPress={() => Alert.alert("Funcionalidad futura")}>
                                                        <Text style={styles.rankText} > Rechazar </Text>
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
        width: 70,
        height: 20,
        backgroundColor: 'red',
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
    },
    acceptButton: {
        width: 70,
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
        width: 250,
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
        paddingTop: 5,
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
        fontSize: 12,
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


