import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Alert, FlatList, ScrollView, AsyncStorage } from 'react-native';
import { PRIMARY, SECONDARY, BLACK, WHITE } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';
import { getRanking, getInfo } from '_api/user';
import i18n from 'i18n-js';
export default class FriendRequestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFriend: null,
            username: "user 1",
            accessToken: "",
            estado: null,
            userList: [],
            myInfo: [],
            myPosition:0,
            listId:1,
        }

    }
    async componentDidMount() {
        var _username = await AsyncStorage.getItem('username');
        var _accessToken = await AsyncStorage.getItem('userToken');
        this.setState({ username: _username, accessToken: _accessToken, listId:1 });
        var newUser = {
            Username: _username,
            AccessToken: _accessToken
        };
        console.log(newUser);
        await getRanking(newUser).then(data => {
            console.log("Data de getRanking: " + JSON.stringify(data.me));
            if (data != "error") {
                this.setState(
                    { userList: data.ranking, myPosition: data.me.posicion }
                )
            } else {
                alert('Error de getRanking');
            }
        }).catch(err => {
            console.log("error getRanking")
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

    render() {
        let { myInfo } = this.state
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.title} > Ranking </Text>
                </View>
                <View style={styles.cuadroAmigos}>
                    <View style={styles.cuadroCabecera}>  
                        <View style={styles.friendItem}>
                            <View style={styles.nameInfo}>
                                <Text style={styles.rankUsername} > Nombre </Text>
                            </View>
                            <View style={styles.rankInfo}>
                                <Text style={styles.rankScore2} > Puntos </Text>
                            </View>
                            <View style={styles.rankInfo}>
                                <Text style={styles.rankScore2} > Partidas perdidas </Text>
                            </View>
                            <View style={styles.rankInfo}>
                                <Text style={styles.rankScore2} > Partidas ganadas </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cuadroRanking}>                     

                    <FlatList
                        data={this.state.userList}
                            extraData={this.state.showItemIndex}
                            renderItem={({ item, index }) => {
                                if (item.nombreUsuario == this.state.username) {
                                    return (
                                        <View style={styles.friend}>
                                            <View style={styles.positionItem}>
                                                <View style={styles.nameInfo}>
                                                    <Text style={styles.rankUsername} > {index + 1}. {item.nombreUsuario} </Text>
                                                </View>
                                                <View style={styles.rankInfo}>
                                                    <Text style={styles.rankScore} > {item.puntos} </Text>
                                                </View>
                                                <View style={styles.rankInfo}>
                                                    <Text style={styles.rankScore} > {item.partidasPerdidas} </Text>
                                                </View>
                                                <View style={styles.rankInfo}>
                                                    <Text style={styles.rankScore} > {item.partidasGanadas} </Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                                } else 
                                    return (
                                        <View style={styles.friend}>
                                            <View style={styles.friendItem}>
                                                <View style={styles.nameInfo}>
                                                    <Text style={styles.rankUsername} > {index + 1}. {item.nombreUsuario} </Text>
                                                </View>
                                                <View style={styles.rankInfo}>
                                                    <Text style={styles.rankScore} > {item.puntos} </Text>
                                                </View>
                                                <View style={styles.rankInfo}>
                                                    <Text style={styles.rankScore} > {item.partidasPerdidas} </Text>
                                                </View>
                                                <View style={styles.rankInfo}>
                                                    <Text style={styles.rankScore} > {item.partidasGanadas} </Text>
                                                </View>
                                            </View>
                                        </View>
                                    );
                            }}
                            keyExtractor={(item, index) => index.toString()}
                            style={styles.friendContainer}
                            />
                    </View>
                    <View style={styles.cuadroCabecera}>
                        <View style={styles.positionItem}>
                            <View style={styles.nameInfo}>
                                <Text style={styles.rankUsername} > {this.state.myPosition}. {this.state.myInfo.nombreUsuario}  </Text>
                            </View>
                            <View style={styles.rankInfo}>
                                <Text style={styles.rankScore} > {myInfo.puntos} </Text>
                            </View>
                            <View style={styles.rankInfo}>
                                <Text style={styles.rankScore} >  {myInfo.partidasPerdidas}</Text>
                            </View>
                            <View style={styles.rankInfo}>
                                <Text style={styles.rankScore} > {myInfo.partidasGanadas } </Text>
                            </View>
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
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center'
    },
    gameItem: {
        flex: 1,
        flexDirection: 'row',
    },
    rankInfo: {
        flex: 2,
    },
    nameInfo: {
        flex:4
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
        marginLeft: 20
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
        borderWidth: 0.5,
        color: 'blue',
        backgroundColor: PRIMARY,
        width: 500,
        height: 25,
    },
    positionItem: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center',
        borderWidth: 0.5,
        color: 'blue',
        backgroundColor: SECONDARY,
        width: 500,
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
        flex: 4,
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center',
        margin: 10
    },
    cuadroRanking: {
        flex:4
    },
    cuadroCabecera: {
        flex: 1,
        
    },
    friendContainer: {
        width: '100%',
        flex: 1,
        alignSelf:'center'
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
    },
    rankText: {
        fontSize: 10,
        textAlign: 'center',
        color: WHITE
    },
    rankScore: {
        fontSize: 15,
        color: WHITE,
        alignSelf: 'center'
    },
    rankScore2: {
        fontSize: 12,
        color: WHITE,
        alignSelf: 'center'
    },
    rankUsername: {
        fontSize: 14,
        color: WHITE,
        alignSelf: 'flex-start',
        paddingStart:30
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


