import React from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { WHITE, PRIMARY, SECONDARY } from '../../styles/colors';
import i18n from 'i18n-js';

const RootScreen = ({
    navigation,
}) => {
    const [user, onChangeUsername] = React.useState(null);
    const [pass, onChangePassword] = React.useState(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Battleship Online
            </Text>

            <View style={styles.checkboxContainer} >
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign')}>
                    <Text style={styles.text}>
                    {i18n.t('Registrase')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.text}>
                        {i18n.t('Identificarse')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        width: '100%',
        height: '100%',
        justifyContent: 'space-evenly',
        flexDirection: "column"
    },
    headerContainer: {
        flexDirection: "row",
        alignContent: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 42,
        alignSelf: 'center',
        color: PRIMARY,
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

export default RootScreen;