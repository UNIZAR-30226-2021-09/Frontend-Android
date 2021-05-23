import React from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, TextInput,TouchableOpacity } from 'react-native';
import { WHITE, PRIMARY, SECONDARY, GRAY_MEDIUM, GRAY_LIGHT, TITLE } from '../../styles/colors';
import { login } from '_api/user';
import { logMe, getIntoAllGames } from '_api/user/socket';
import * as Crypto from 'expo-crypto';
import i18n from 'i18n-js';

const LoginScreen = ({
    navigation,
}) => {
    const [user, onChangeUsername] = React.useState(null);
    const [mail, onChangeMail] = React.useState(null);
    const [pass, onChangePassword] = React.useState(null);

    async function handleSubmitButton() {
        if (!user) {
            alert('Introduzca el nombre de usuario');
            return;
        }
        if (!pass) {
            alert('Introduzca la contrase�a');
            return;
        }
        /*if (!mail) {
            alert('Introduzca el correo electr�nico');
            return;
        }*/
        const hashPass = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            pass,
            { encoding: 'hex' }
        );
        var newUser = {
            Username: user,
            Password: hashPass,
            Mail: mail
        }

        console.log(newUser);
        login(newUser).then(data => {
            console.log("Data de registro: " + data);
            if (data != "error") {
                navigation.navigate('Home')
                logMe(newUser);
                getIntoAllGames(user);
            } else {
                alert('Error de login');
            }
        }).catch(err => {
            console.log("error pantalla register")
            console.log(err)
            return "error"
        });
    };

    return (<View style={styles.container}>
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.gobackbutton} onPress={() => navigation.navigate('Root')}>
                <Text style={styles.gobacktext}>
                    Volver
                    </Text>
            </TouchableOpacity>
        </View>
        <Text style={styles.title}>
            Identificarse
        </Text>
        <TextInput
            style={styles.input}
            onChangeText={onChangeUsername}
            value={user}
            placeholder="Nombre de usuario"
        />
        <TextInput
            style={styles.input}
            onChangeText={onChangeMail}
            value={mail}
            placeholder="Correo"
        />
        <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={pass}
            secureTextEntry={true}
            placeholder="Contrase�a"
        />
        <View style={styles.checkboxContainer}>
            <TouchableOpacity style={styles.button} onPress={() => handleSubmitButton()}>
                <Text style={styles.text}>
                    Next
                    </Text>
            </TouchableOpacity>
        </View>
    </View>);
};

const styles = StyleSheet.create({
    input: {
        height: '8%',
        width: '60%',
        marginStart: '20%',
        borderWidth: 1,
        backgroundColor: GRAY_LIGHT,
        textAlign: 'center',
        borderColor: 'grey',
        borderRadius:50
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
        justifyContent: 'flex-start',
        marginStart: '5%',
        marginTop: 10
    },
    title: {
        fontSize: 40,
        alignSelf: 'center',
        color: TITLE,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },
    checkbox: {
        alignSelf: "flex-start",
    },
    label: {
        margin: 10,
        fontSize: 11,
    },
    button: {
        height: 40,
        width: 100,
        backgroundColor: PRIMARY,
        flexDirection: "row",
        justifyContent: 'center',
        borderRadius: 50,
    },
    text: {
        color: WHITE,
        fontSize: 26,
        fontWeight: 'bold',
        textAlignVertical: "center",
    },
    gobackbutton: {
        flexDirection: "row",
        justifyContent: 'center',
        textAlignVertical: "center",
        height: 30,
        width: 70,
        borderRadius: 50,
        backgroundColor: GRAY_MEDIUM,
        top: '35%'
    },
    gobacktext: {
        color: WHITE,
        fontSize: 14,
        fontWeight: "bold",
        textAlignVertical: "center",
    }
});

export default LoginScreen;

