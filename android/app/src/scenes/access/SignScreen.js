import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, CheckBox, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { WHITE, PRIMARY, SECONDARY } from '../../styles/colors';
import { register } from '_api/user';
import * as Crypto from 'expo-crypto';
import { logMe, getIntoAllGames } from '_api/user/socket';
import i18n from 'i18n-js';

const SignScreen = ({
    navigation,
}) => {
    const [user, onChangeUsername] = React.useState(null);
    const [mail, onChangeEmail] = React.useState("");
    const [pass, onChangePassword] = React.useState(null);
    const [repeatPass, onChangeRepeatPassword] = React.useState(null);
    const [isSelected, setSelection] = React.useState(false);
    /*
    async function digestMessage (message) {
        const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
        const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
        (async () => {
            const digest = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                'Github stars are neat '
            );
            console.log('Digest: ', digest);
        return hashHex;
    }*/

    async function handleSubmitButton () {
        if (!user) {
            alert('Introduzca el nombre de usuario');
            return;
        }
        if (!mail) {
            alert('Introduzca un correo electr�nico');
            return;
        }
        if (!mail.includes('@')) {
            alert('Introduzca un correo electr�nico v�lido');
            return;
        }
        if (!pass) {
            alert('Introduzca una contrase�a');
            return;
        }
        if (pass != repeatPass) {
            alert('Las contrase�as no coinciden');
            return;
        }
        if (!isSelected) {
            alert('Debe aceptar las Condiciones de Uso y la Pol�tica de Privacidad para seguir');
            return;
        }
        const hashPass = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            pass,
            { encoding: 'hex' }
        );
		/*
		if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,}/)) {
			alert("Password is correct");
			return;
		}else{
			alert("Password must have more than 6 characters and be alphanumeric");
			return;
		}*/
        var newUser = {
            Username: user,
            Mail: mail,
            Password: hashPass,
        }
        console.log(newUser);
        register(newUser).then(data => {
            console.log("Data de registro: " + data);
            if (data != "error") {
                navigation.navigate('Home');
                logMe(newUser);
                getIntoAllGames(user);
            } else {
                alert('No se ha podido registrar');
            }

        }).catch(err => {
            console.log("error pantalla register")
            Alert.alert("El usuario o el correo ya existen");
            return "error"
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer} >
                <TouchableOpacity style={styles.gobackbutton} onPress={() => navigation.navigate('Root')}>
                    <Text style={styles.gobacktext}>
                        Volver
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>
                Registrarse
                </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={user}
                placeholder="Nombre de usuario"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={mail}
                placeholder="Correo"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={pass}
                placeholder="Contrase�a"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeRepeatPassword}
                value={repeatPass}
                placeholder="Repetir contrase�a"
                secureTextEntry={true}
            />
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Acepto las Condiciones de Uso y la Pol�tica de Privacidad</Text>

            </View>
            <View style={styles.checkboxContainer} >
                <TouchableOpacity style={styles.button} onPress={() => handleSubmitButton()}>
                    <Text style={styles.text}>
                        Next
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
        flexDirection: "column",
                marginTop: 10

    },
    headerContainer: {
        flexDirection: "row",
        alignContent: 'center',
        justifyContent: 'flex-start',
        marginStart: '5%',
        marginTop: 20,
    },
    title: {
        fontSize: 50,
        alignSelf: 'center',
        color: PRIMARY,
        fontWeight: 'bold',
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignContent: 'center',
        justifyContent: 'center'
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 10,
        fontSize: 11,
    },
    button: {
        height: 46,
        width: 120,
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
        height: 30,
        width: 70,
        backgroundColor: WHITE,
        borderRadius: 50,
        backgroundColor: SECONDARY,
    },
    gobacktext: {
        color: WHITE,
        fontSize: 14,
        fontWeight: "bold",
        textAlignVertical: "center",
    }
});

export default SignScreen;

