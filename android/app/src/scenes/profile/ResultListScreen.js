import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Alert, FlatList, ScrollView, AsyncStorage } from 'react-native';
import { PRIMARY, SECONDARY, BLACK, WHITE } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { getHistory } from '_api/game';
import { getInfo } from '_api/user';
import i18n from 'i18n-js';

export default class ResultListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFriend: null,
            username: "user 1",
            estado: null,
            gameList: [],
            show: false,
            myInfo: []
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
        await getHistory(newUser).then(data => {
            console.log("Data de getHistory: " + JSON.stringify(data));
            if (data != "error") {
                this.setState(
                    { gameList: data }
                )
            } else {
                alert('Error de getHistory');
            }
        }).catch(err => {
            console.log("error getHistory")
            console.log(err)
            return "error"
        });
        await getInfo(newUser).then(data => {
            console.log("Data de getInfo: " + JSON.stringify(data));
            if (data != "error") {
                this.setState(
                    { myInfo: data }
                )
            } else {
                alert('Error de getInfo');
            }
        }).catch(err => {
            console.log("error getInfo")
            console.log(err)
            return "error"
        });
    }
    async goToResult(id) {
        await AsyncStorage.setItem('gameId', id);
        this.props.navigation.navigate("BoardResult");
    }
    //{item.state?"(Victoria)":"(Derrota)"}
    render() {
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.title} > {i18n.t('PartidasFinalizadas')} </Text>
                </View>
                <View style={styles.cuadroPartidas}>
                    <View style={styles.itemPartida}>
                        <FlatList
                            data={this.state.gameList}
                            extraData={this.state.showItemIndex}
                            renderItem={({ item, index }) => {
                                if (item.resultado == 'victoria')
                                    return (
                                        <View style={styles.friend}>
                                            <View style={styles.gameVictory}>
                                                <View style={styles.gameItem}>
                                                    <Text style={styles.friendText} > {i18n.t('PartidaContra')} {item.contrincante} ({item.resultado}) </Text>
                                                </View>
                                                <View style={styles.gameButton}>
                                                    <TouchableOpacity style={styles.showButton} onPress={() => this.goToResult(item.id)}>
                                                        <Text style={styles.rankText} > {i18n.t('VerPartida')} </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                else
                                    return (
                                        <View style={styles.friend}>
                                            <View style={styles.gameLose}>
                                                <View style={styles.gameItem}>
                                                    <Text style={styles.friendText} > {i18n.t('PartidaContra')} {item.contrincante} ({item.resultado}) </Text>
                                                </View>
                                                <View style={styles.gameButton}>
                                                    <TouchableOpacity style={styles.showButton} onPress={() => this.goToResult(item.id)}>
                                                        <Text style={styles.rankText} > {i18n.t('VerPartida')} </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.listaPartidas}
                        />
                    </View>
                </View>
                <View style={styles.cuadroBotones}>
                    <View style={styles.cuadroPequeno}>
                        <TouchableOpacity style={styles.shareButton} onPress={() => Alert.alert("Funcionalidad futura")}>
                            <Text style={styles.rankText}>
                            {i18n.t('Compartir')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cuadroPequeno}>
                        <TouchableOpacity style={styles.logOutButton} onPress={() => this.props.navigation.navigate('Root')}>
                            <Text style={styles.rankText}>
                            {i18n.t('CerrarSesion')}
                            </Text>
                        </TouchableOpacity>
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
    header: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center'
    },
    gameItem: {
        flex: 2,
    },
    gameButton: {
        flex: 1,
    },
    cuadroCompartir: {
        flex: 1,
        alignSelf: 'center',
    },
    ranking: {
        width: 140,
        height: 20,
        backgroundColor: PRIMARY,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf: 'center',
        marginLeft: 20
    },
    showButton: {
        width: 100,
        height: 20,
        backgroundColor: PRIMARY,
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
        width: 360,
        height: 25,

    },
    gameVictory: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center',
        borderWidth: 1,
        color: 'blue',
        backgroundColor: 'green',
        width: 360,
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
        alignSelf: 'center',
    },
    cuadroBotones: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    itemPartida: {
        flex: 4
    },
    tituloPartida: {
    },
    cuadroPartidas: {
        alignSelf: 'center',
        flex: 1
    },
    cuadroAmigos: {
        flex: 3,
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center',
        paddingBottom: 80
    },

    friendContainer: {
        flex: 6,
        paddingTop: 5,
        alignSelf: 'center',
    },
    buttonContainer: {
        flex: 1,
        paddingTop: 5,
        alignSelf: 'center',
    },
    friend: {
        paddingTop: 1,
        width: '100%',
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
    shareButton: {
        width: 100,
        height: 30,
        backgroundColor: PRIMARY,
        borderRadius: 50,
        borderWidth: 1,
        marginBottom: 5
    },
    logOutButton: {
        width: 120,
        height: 30,
        backgroundColor: 'red',
        borderRadius: 50,
        borderWidth: 1,
        marginBottom: 5
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
        fontSize: 15,
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
    listaPartidas: {
        marginBottom: 10
    }
});


