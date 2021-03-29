import React from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { WHITE, PRIMARY, SECONDARY,BLACK } from '../styles/colors';


const BarraLateral = ({navigation}) => {
    /*const [user, onChangeUsername] = React.useState(null);
    const [pass, onChangePassword] = React.useState(null);*/

    return (

            <View style={styles.cuadroPequeno}>
                <View style={styles.cuadroPerfil}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
                    <Text style={styles.Perfil}>
                        Perfil
                    </Text>
                </TouchableOpacity>
                </View>
                <View style={styles.cuadroAmigos}>

                </View>
            </View>
    );
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
        //fontFamily: "Cochin",
        alignSelf: 'center',
        color: BLACK,
        //fontWeight: 'bold',
    },
    
    
    
    
});

export default BarraLateral;