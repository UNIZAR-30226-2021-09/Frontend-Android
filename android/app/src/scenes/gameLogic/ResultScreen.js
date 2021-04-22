import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import { checkBox, OCEAN_BOX, TOUCHED_BOX, SUNKEN_BOX, NO_ATACK_BOX } from '_api/gameLogic';
import { Table, TableWrapper, Cell } from 'react-native-table-component'
import { initBoard, getBox, attack, getSolution, initAttack, initShip, initCoord, IAmove, getCoord } from '../../api/gameLogic';
export default class ResultScreen extends Component {
    constructor(props) {
        super(props);
        let result = this.props.navigation.getParam("result");
        this.state = {
            myBoard: {
                victory: result
            },
            IABoard: {
                victory: !result
            },
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cuadroGrande}>
                    <View style={styles.cuadroPequeno}>
                        <Text style={styles.title} > Resultados </Text>
                    </View>
                    <View style={styles.cuadroPequeno}>
                        <Text style={styles.text} > Has ganado la partida contra IA</Text>
                    </View>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Home')}>
                        <View style={styles.button}>
                            <Text style={styles.btnText}> Terminar </Text>
                        </View>
                    </TouchableHighlight>
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
    title: {
        textAlign: 'center',
        color: 'black',
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 38,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20,
    },
    listContainer: {
        height: 50, width: 260, alignSelf: 'center'
    },
    listText: {
        fontSize: 18, justifyContent: 'center', color: 'black'
    },
    button: { alignSelf: 'center', width: 100, height: 30, bottom: 15, backgroundColor: PRIMARY, borderRadius: 50, borderWidth: 0.2 },
    btnText: { textAlign: 'center', color: 'white', paddingTop: 5 },

});

