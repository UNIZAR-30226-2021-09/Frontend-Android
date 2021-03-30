

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
        backgroundColor: 'steelblue',
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
        //fontFamily: "Cochin",
        alignSelf: 'center',
        color: BLACK,
        //fontWeight: 'bold',
    },
    input: {
        height: '8%',
        width: '70%',
        marginStart: '15%',
        marginEnd: '15%',
        borderWidth: 1,
        borderColor: SECONDARY,
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
        fontSize: 42,
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