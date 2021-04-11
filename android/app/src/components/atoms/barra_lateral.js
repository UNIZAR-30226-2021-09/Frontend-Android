import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { WHITE, PRIMARY, SECONDARY,BLACK } from '../../styles/colors';

export default class BarraLateral extends Component {
    /*const [user, onChangeUsername] = React.useState(null);
    const [pass, onChangePassword] = React.useState(null);*/
    render() {
        return (
            <View style={styles.cuadroPequeno}>
                <View style={styles.cuadroPerfil}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('About')}>
                        <Text style={styles.Perfil}>
                            Perfil
                    </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.cuadroAmigos}>

                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
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
        
        marginTop: '25%',
        
        
    },
    
    
    
    
});

