import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert, AsyncStorage } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import { checkBox, OCEAN_BOX, TOUCHED_BOX, SUNKEN_BOX, NO_ATACK_BOX } from '_api/match';
import { Table, TableWrapper, Cell } from 'react-native-table-component'
import { infoPartida } from '_api/match';
import i18n from 'i18n-js';
export default class ResultScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ganador: false,
            puntos: 0,
            disparosRealizados: 0,
            disparosAcertados: 0,
            barcosDestruidos:0
        }
    }
    async componentDidMount() {
        var username = await AsyncStorage.getItem('username');
        var accessToken = await AsyncStorage.getItem('userToken');
        var gameId = await AsyncStorage.getItem('gameId');

        await infoPartida(username, accessToken, gameId)
            .then(data => {
                console.log("Data de infoPartida: " + JSON.stringify(data));
                this.setState({
                    ganador: data.ganador,
                    puntos: data.puntos,
                    disparosRealizados: data.disparosRealizados,
                    disparosAcertados: data.disparosAcertados,
                    barcosDestruidos: data.barcosDestruidos,
                })
            })
    }
     

    
    render() {
        let { ganador, puntos, disparosAcertados, disparosRealizados, barcosDestruidos } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.cuadroGrande}>
                    <View style={styles.cuadroPequeno}>
                        <Text style={styles.title} > {ganador ? "Has ganado " : "Has perdido "}la partida</Text>
                    </View>
                    <View style={styles.estadisticas}>
                        <Text style={styles.text} > Puntos obtenidos: {puntos}</Text>
                        <Text style={styles.text} > Disparos realizados: {disparosRealizados} </Text>
                        <Text style={styles.text} > Disparos acertados: {disparosAcertados}</Text>
                        <Text style={styles.text} > Barcos destruidos: {barcosDestruidos}</Text>
                    </View>
                    <View style={styles.cuadroPequeno}>
                        <View style={{ flex: 1 }}>
                            <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
                                    <Text style={styles.btnText}> Terminar </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>

                <BarraLateral navigation={this.props.navigation} />

            </View>);
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 30,
    },
    cuadroGrande: {
        flex: 4,
        borderColor: BLACK,
        borderWidth: 3,
        flexDirection: 'column',
        alignContent: 'center',
    },
    cuadroPequeno: {
        flex: 1,
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    estadisticas: {
        flex: 2,
        borderColor: BLACK,
        flexDirection: 'column',
        alignSelf: 'center'
    },
    title: {
        textAlign: 'center',
        color: 'black',
        paddingTop: 16,
        paddingBottom: 20,
        fontSize: 34,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 24,
    },
    listContainer: {
        height: 50, width: 260, alignSelf: 'center'
    },
    listText: {
        fontSize: 18, justifyContent: 'center', color: 'black'
    },
    button: { alignSelf: 'center', width: 110, height: 40, backgroundColor: PRIMARY, borderRadius: 50, borderWidth: 0.2 },
    btnText: { textAlign: 'center', color: 'white', paddingTop: 5, fontSize:18 },

});

