import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, TextInput, TouchableOpacity, AsyncStorage } from 'react-native';
import { WHITE, PRIMARY, SECONDARY,BLACK, TITLE } from '../../styles/colors';
import {BarraLateral} from '_organisms'; 
import { beginIA } from '_api/game';
import { emparejamientoACiegas } from '_api/game';
import i18n from 'i18n-js';

const HomeScreen = ({ navigation }) => {
    async function startGame(mode) {
        var _username = await AsyncStorage.getItem('username');
        var accessToken = await AsyncStorage.getItem('userToken');
        var user = {
            Username: _username,
            AccessToken: accessToken
        };
        console.log(user);
        switch (mode) {
            case "IA":
                await beginIA(user).then(data => {
                    console.log("Data de begin IA3: " + data);
                    if (data != "error") {
                        navigation.navigate('PlaceShips');
                    } else {
                        alert('Error de  begin IA');
                    }
                }).catch(err => {
                    console.log("error  begin IA")
                    console.log(err)
                    return "error"
                });
                break;
            case "Random":
                await emparejamientoACiegas(user).then(data => {
                    console.log("Data de random: " + data);
                    if (data != "error") {
                        navigation.navigate('BeginRandom');
                    } else {
                        alert('Error de  random de partida a ciegas');
                    }
                }).catch(err => {
                    console.log("error random")
                    console.log(err)
                    return "error"
                });
                navigation.navigate('BeginRandom');

                break;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroCuaduple}>
                    <View style={styles.cuadroTitulo}>
                        <Text style={styles.title}>
                            Juego de barcos
                        </Text>
                    </View>
                </View>
                <View style={styles.cuadroCuaduple}>
                    <View style={styles.cuadroBoton}>
                        <TouchableOpacity style={styles.cubito} onPress={() => navigation.navigate('BeginRandom')}>
                            <Text style={styles.textoCubito}>
                                {i18n.t('ParCiegas')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cuadroBoton}>
                        <TouchableOpacity style={styles.cubito} onPress={() => navigation.navigate('BeginFriend')}>
                            <Text style={styles.textoCubito}>
                                    Desafiar amigo
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cuadroCuaduple}>
                    <View style={styles.cuadroBoton}>
                        <TouchableOpacity style={styles.cubito} onPress={() => navigation.navigate('BeginTournament')}>
                            <Text style={styles.textoCubito}>
                                Modo torneo
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cuadroBoton}>
                        <TouchableOpacity style={styles.cubito} onPress={() => navigation.navigate('OngoingGame')}>
                            <Text style={styles.textoCubito}>
                                Partidas en curso
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.cuadroCuaduple}>
                    <View style={styles.cuadroBoton}>
                        <TouchableOpacity style={styles.cubito} onPress={() => startGame("IA")}>
                            <Text style={styles.textoCubito}>
                                Partida contra IA
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <BarraLateral navigation={navigation}/>
        </View>
    );
};

const styles = StyleSheet.create({
    cuadroGrande: {
        flex: 4,
    },
    cuadroPequeno: {
        flex: 1,
        flexDirection: 'column',
    },
    cuadroCuaduple: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
    },
    cuadroBoton: {
        flex: 1,
        width: '50%',
        flexDirection: 'column',
        alignSelf: 'center'
    },
    cubito: {
        width: 140,
        height: 50,
        backgroundColor: PRIMARY,
        borderRadius: 50,
        alignSelf:'center'
    },
    cuadroTitulo: {
        flex: 1,
        alignSelf: 'center'
    },

    cuadroPerfil: {
        flex: 1,
        borderColor: BLACK,
        borderWidth: 3,
    },
    cuadroAmigos: {
        flex: 2,
        borderColor: BLACK,
        borderWidth: 3,
    },
    Perfil: {
        fontSize: 12,
        alignSelf: 'center',
        color: BLACK,
        
    },
 
    cubito1:{
        top:30, left:60,
        width: 140,
        height:50,
        backgroundColor: PRIMARY,
        borderRadius:50,
        borderWidth: 1,
        
    },
    cubito2:{
        top:-20, left:375,
        width: 140,
        height:50,
        backgroundColor: PRIMARY,
        borderRadius:50,
        borderWidth: 1,
    },
    cubito3:{
        top:30, left:60,
        width: 140,
        height:50,
        backgroundColor: PRIMARY,
        borderRadius:50,
        borderWidth: 1,
    },
    cubito4:{
        top:-15, left:375,
        width: 140,
        height:50,
        backgroundColor: PRIMARY,
        borderRadius:50,
        borderWidth: 1,
    },
    cubito5:{
        top:0, left:218,
        width: 140,
        height:50,
        backgroundColor: PRIMARY,
        borderRadius:50,
        borderWidth: 1,
    },
    textoCubito:{
        fontSize: 16,
        alignSelf: 'center',
        color: WHITE,
        marginTop: '10%',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 30,
        //width: '100%',
        //height: '100%',
        //justifyContent: 'space-evenly',
        //flexDirection: "column"
    },
    headerContainer: {
        flexDirection: "row",
        alignContent: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 32,
        alignSelf: 'center',
        color: TITLE,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignContent: 'space-around',
        justifyContent: 'space-around'
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    button: {
        height: 50,
        width: 220,
        backgroundColor: PRIMARY,
        flexDirection: "row",
        justifyContent: 'center',
        borderRadius: 50,
    },
    text: {
        color: WHITE,
        fontSize: 28,
        fontWeight: 'bold',
        textAlignVertical: "center",
    },
    gobackbutton: {
        flexDirection: "row",
        justifyContent: 'center',
        textAlignVertical: "center",
        height: 50,
        width: 70,
        backgroundColor: WHITE,
        position: 'relative',
        top: 1,
        right: 120,
        borderRadius: 50,
        backgroundColor: PRIMARY,
    },
    gobacktext: {
        color: WHITE,
        fontSize: 14,
        fontWeight: "bold",
        textAlignVertical: "center",
    }
});

export default HomeScreen;