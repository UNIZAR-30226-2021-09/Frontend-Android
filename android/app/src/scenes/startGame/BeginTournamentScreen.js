import React, { Component } from 'react';
import { View, Text, TouchableHighlight, TouchableWithoutFeedback, StyleSheet, Image, Alert } from 'react-native';
import { PRIMARY, SECONDARY, BLACK } from '../../styles/colors';
import { BarraLateral } from '_organisms'
import DropDownPicker from 'react-native-dropdown-picker';

export default class BeginTournamentScreen extends Component {
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
        return (<View style={styles.container}>
            <View style={styles.cuadroGrande}>
                <Text style={styles.title} > Torneo</Text>
                <DropDownPicker
                    items={this.state.tourList}
                    defaultValue={this.state.selectedTour}
                    containerStyle={styles.listContainer}
                    labelStyle={styles.listText}
                    onChangeItem={item => this.setState({
                        selectedTour: item.value
                    })}
                    placeholder="  Selecciona un torneo"
                    placeholderStyle={styles.text}
                />
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
    title: {
        textAlign: 'center',
        color: 'black',
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 38,
        fontWeight: 'bold'
    },
    listContainer: {
        height: 50, width: 260, alignSelf: 'center'
    },
    listText: {
        fontSize: 18, justifyContent: 'center', color:'black'
    },
    text: {
        fontSize: 18
    }
});


