import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Alert, FlatList, ScrollView, AsyncStorage } from 'react-native';
import { PRIMARY, SECONDARY, BLACK, WHITE, TITLE } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { getHistory } from '_api/game';
import { getInfo } from '_api/user';
import i18n from 'i18n-js';

export default class ProfileScreen extends Component {
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
        let { myInfo } = this.state
        var total = myInfo.partidasGanadas + myInfo.partidasPerdidas;
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.title} > {this.state.username}</Text>
                </View>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.text} > Email: {this.state.username}</Text>
                </View>
                <View style={styles.cuadroPequeno}>
                    <View style={styles.header}>
                        <View style={styles.cuadroPequeno}>
                        <TouchableOpacity style={styles.ranking} onPress={() => this.props.navigation.navigate('Ranking')}>
                            <Text style={styles.rankText} > Ver Clasificacion </Text>
                        </TouchableOpacity>
                        </View>
                        <View style={styles.cuadroPequeno}>
                            <TouchableOpacity style={styles.ranking} onPress={() => this.props.navigation.navigate('ResultList')}>
                                <Text style={styles.rankText} > Historial de partidas </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.cuadroPequeno}>

                </View>
                <View style={styles.cuadroPartidas}>
                    <Text style={styles.infoText} > Partidas jugadas: {total}</Text>
                    <Text style={styles.infoText} > Victorias: {myInfo.partidasGanadas} </Text>
                    <Text style={styles.infoText} > Derrotas: {myInfo.partidasPerdidas}</Text>
                    <Text style={styles.infoText} > Torneos ganados: {myInfo.torneosGanados}</Text>
                    <Text style={styles.infoText} > Ratio de victorias: {total != 0 ? ((myInfo.partidasGanadas / total)*100).toFixed(2) + "%" : "No existen datos para calcular"}</Text>
                    <Text style={styles.infoText} > Puntos :{myInfo.puntos}</Text>
                </View>
                <View style={styles.cuadroBotones}>
                    <View style={styles.cuadroPequeno}>
                        <TouchableOpacity style={styles.shareButton} onPress={() => Alert.alert("Funcionalidad futura")}>
                            <Text style={styles.rankText}>
                                Compartir
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cuadroPequeno}>
                        <TouchableOpacity style={styles.logOutButton} onPress={() => this.props.navigation.navigate('Root')}>
                            <Text style={styles.rankText}>
                                Cerrar Sesi�n
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
        width: 155,
        height: 25,
        backgroundColor: PRIMARY,
        borderRadius: 50,
        alignSelf: 'center',
        marginLeft: 20
    },
    showButton: {
        width: 100,
        height: 20,
        backgroundColor: PRIMARY,
        borderRadius: 50,
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
        flex: 1,
        top:'3%'
    },
    cuadroAmigos: {
        flex: 3,
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center',
        paddingBottom: 80
    },

    friendContainer: {
        flex:6,
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
        marginBottom:5
    },
    logOutButton: {
        width: 120,
        height: 30,
        backgroundColor: 'red',
        borderRadius: 50,
        marginBottom: 5
    },
    title: {
        textAlign: 'center',
        color: TITLE,
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
        textAlign: 'center',
        color: PRIMARY
    },
    infoText: {
        fontSize: 20,
        textAlign: 'left',
        color: SECONDARY

    },
    rankText: {
        fontSize: 15,
        textAlign: 'center',
        color: WHITE,
        top:'10%'
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
        marginBottom:10
    }
});


