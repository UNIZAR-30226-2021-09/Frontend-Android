

import React from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { WHITE, PRIMARY, SECONDARY,BLACK } from '../../styles/colors';
import {BarraLateral} from '../../components/atoms'; 

const HomeScreen = ({navigation}) => {
    /*const [user, onChangeUsername] = React.useState(null);
    const [pass, onChangePassword] = React.useState(null);*/

    return (
        <View style={styles.container}>

            <View style={styles.cuadroGrande}>
                <Text style={styles.title}>
                    Juego de barcos
                </Text>
                
                    <TouchableOpacity style={styles.cubito1} onPress={() => navigation.navigate('About')}>
                    <Text style={styles.textoCubito}>
                            Partida a ciegas
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cubito2} onPress={() => navigation.navigate('About')}>
                    <Text style={styles.textoCubito}>
                            Desafiar amigo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cubito3} onPress={() => navigation.navigate('PlaceShips')}>
                    <Text style={styles.textoCubito}>
                            Partida local
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cubito4} onPress={() => navigation.navigate('About')}>
                    <Text style={styles.textoCubito}>
                            Modo torneo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cubito5} onPress={() => navigation.navigate('About')}>
                    <Text style={styles.textoCubito}>
                            Partidas en curso
                        </Text>
                    </TouchableOpacity>
                
                    
                
            </View>
            <BarraLateral navigation={navigation}/>
            {/*<View style={styles.cuadroPequeno}>
                <View style={styles.cuadroPerfil}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
                    <Text style={styles.Perfil}>
                        Perfil
                    </Text>
                </TouchableOpacity>
                </View>
                <View style={styles.cuadroAmigos}>

                </View>
    </View>*/}

           {/*
            <View style={styles.checkboxContainer} >*
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign')}>
                    <Text style={styles.text}>
                        Registrarse
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.text}>
                        Identificarse
                    </Text>
                </TouchableOpacity>
            </View>
            */}
        </View>
    );
};

const styles = StyleSheet.create({
    cuadroGrande: {
        flex: 4,
        borderColor: BLACK,
        borderWidth: 3,

    },
    cuadroPequeno: {
        flex: 1,
        borderColor: BLACK,
        flexDirection: 'column',
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
        top:50, left:60,
        width: 140,
        height:50,
        backgroundColor: PRIMARY,
        borderRadius:50,
        borderWidth: 1,
    },
    cubito4:{
        top:0, left:375,
        width: 140,
        height:50,
        backgroundColor: PRIMARY,
        borderRadius:50,
        borderWidth: 1,
    },
    cubito5:{
        top:-110, left:218,
        width: 140,
        height:50,
        backgroundColor: PRIMARY,
        borderRadius:50,
        borderWidth: 1,
    },
    textoCubito:{
        fontSize: 12,
        alignSelf: 'center',
        color: BLACK,
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
        color: BLACK,
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