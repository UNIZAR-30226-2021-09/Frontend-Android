import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Alert, FlatList, ScrollView, AsyncStorage } from 'react-native';
import { PRIMARY, SECONDARY, BLACK, WHITE } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { getHistory } from '_api/game';

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFriend: null,
            username: "user 1",
            estado: null,
            gameList:
                [
                    { contricante: 'natured', resultado: "victoria", id: 2003 },
                    { contricante: 'aurora', resultado: "derrota", id: 2004 },
                    { contricante: 'natured', resultado: "victoria", id: 2003 },
                    { contricante: 'aurora', resultado: "derrota", id: 2004 },
                    { contricante: 'natured', resultado: "victoria", id: 2003 },
                    { contricante: 'aurora', resultado: "derrota", id: 2004 },
                    { contricante: 'natured', resultado: "victoria", id: 2003 },
                    { contricante: 'aurora', resultado: "derrota", id: 2004 },
                    { contricante: 'natured', resultado: "victoria", id: 2003 },
                    { contricante: 'aurora', resultado: "derrota", id: 2004 },
                    { contricante: 'natured', resultado: "victoria", id: 2003 },
                    { contricante: 'aurora', resultado: "derrota", id: 2004 },
                ],
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
            console.log("Data de getHistory: " + data);
            if (data != "error") {
               /* this.setState(
                    { userList: data }
                )*/
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
    //{item.state?"(Victoria)":"(Derrota)"}
    render() {
        const getFriend = (option) => {

        }
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.title} > {this.state.username}</Text>
                </View>
                <View style={styles.cuadroPequeno}>
                    <View style={styles.header}>
                        <Text style={styles.text} > Puntos :{this.state.myInfo.puntos}</Text>
                        <TouchableOpacity style={styles.ranking} onPress={() => this.props.navigation.navigate('Ranking')}>
                            <Text style={styles.rankText} > Ver Clasificacion </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cuadroPartidas}>
                    <View style={styles.tituloPartida}>
                        <Text style={styles.text} > Partidas:</Text>
                    </View>
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
                                                    <Text style={styles.friendText} > Partida contra {item.contricante} ({item.resultado}) </Text>
                                                </View>
                                                <View style={styles.gameButton}>
                                                    <TouchableOpacity style={styles.showButton} onPress={() => Alert.alert("Funcionalidad futura")}>
                                                        <Text style={styles.rankText} > Ver partida </Text>
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
                                                    <Text style={styles.friendText} > Partida contra {item.contricante} ({item.resultado}) </Text>
                                                </View>
                                                <View style={styles.gameButton}>
                                                    <TouchableOpacity style={styles.showButton} onPress={() => Alert.alert("Funcionalidad futura")}>
                                                        <Text style={styles.rankText} > Ver partida </Text>
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
                <View style={styles.cuadroPequeno}>
                    <TouchableOpacity style={styles.shareButton} onPress={() => Alert.alert("Funcionalidad futura")}>
                        <Text style={styles.rankText}>
                            Compartir
                        </Text>
                    </TouchableOpacity>
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
        borderWidth: 1,
        marginBottom:5
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
        marginBottom:10
    }
});


