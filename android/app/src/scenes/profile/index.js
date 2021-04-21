import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Image, Alert, FlatList, ScrollView } from 'react-native';
import { PRIMARY, SECONDARY, BLACK, WHITE } from '../../styles/colors';
import { BarraLateral } from '_atoms'
import DropDownPicker from 'react-native-dropdown-picker';
export default class ProfileScreen extends Component {
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
                        <Text style={styles.title} > {this.state.username}</Text>
                </View>
                <View style={styles.cuadroAmigos}>
                    <View style={styles.header}>
                        <Text style={styles.text} > Puntos :{this.state.point}</Text>
                        <TouchableOpacity style={styles.ranking} onPress={() => this.showFriend()}>
                            <Text style={styles.rankText} > Ver Clasificacion </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.friendContainer}>
                        <Text style={styles.text} > Partidas:</Text>
                    </View>
                    <View style={styles.friendContainer}>
                        <FlatList
                            data={this.state.gameList}
                            extraData={this.state.showItemIndex}
                            renderItem={({ item, index }) => {
                                if (item.state) 
                                    return (
                                        <View style={styles.friend}>
                                            <View style={styles.gameVictory}>
                                                <View style={styles.gameItem}>
                                                    <Text style={styles.friendText} > Partida contra {item.name}</Text>
                                                </View>
                                                <View style={styles.gameButton}>
                                                    <TouchableOpacity style={styles.showButton} onPress={() => this.showFriend()}>
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
                                                    <Text style={styles.friendText} > Partida contra {item.name}</Text>
                                                </View>
                                                <View style={styles.gameButton}>
                                                    <TouchableOpacity style={styles.showButton} onPress={() => this.showFriend()}>
                                                        <Text style={styles.rankText} > Ver partida </Text>
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
                    <View style={styles.cuadroCompartir}>
                        <TouchableOpacity style={styles.shareButton} onPress={() => this.props.navigation.navigate('Profile')}>
                            <Text style={styles.rankText}>
                                Compartir
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
        flex:2
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
        width: 300,
        height: 25,

    },
    gameVictory: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignContent: 'center',
        borderWidth: 1,
        color: 'blue',
        backgroundColor: 'green',
        width: 300,
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
        flexDirection: 'column',
        alignSelf: 'center',
        paddingBottom:80
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
});


