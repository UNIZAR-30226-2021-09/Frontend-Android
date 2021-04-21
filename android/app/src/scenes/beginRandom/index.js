import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_atoms'
import DropDownPicker from 'react-native-dropdown-picker';

export default class BeginRandomScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tourList: [
                { label: 'Torneo 1', value: 'torneo1', },
                { label: 'Torneo 2', value: 'torneo2' },
                { label: 'Torneo 3', value: 'torneo3' },
            ],
            selectedTour: null
        }
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.title} > Partida a ciegas</Text>
                </View>
                <View style={styles.cuadroPequeno}>
                    <Text style={styles.text} > Buscando contrincante...</Text>  
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
});


