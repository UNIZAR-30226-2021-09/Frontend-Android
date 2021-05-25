import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, CheckBox, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { WHITE, PRIMARY, SECONDARY, GRAY_MEDIUM, GRAY_LIGHT, TITLE } from '../../styles/colors';
import { register,setToken } from '_api/user';
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
            alert(i18n.t('IntNomUsuario'));
            return;
        }
        if (!mail) {
            alert(i18n.t('IntCorreo'));
            return;
        }
        if (!mail.includes('@') || !mail.includes('.')) {
            alert(i18n.t('IntCorreoValido'));
            return;
        }
        if (!pass) {
            alert(i18n.t('IntCont'));
            return;
        }
        if (pass != repeatPass) {
            alert(i18n.t('ContErr'));
            return;
        }
        if (!isSelected) {
            alert(i18n.t('AceptCondErr'));
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
                logMe(newUser);
                getIntoAllGames(user);
                navigation.navigate('Tutorial');
            } else {
                alert('No se ha podido registrar');
            }

        }).catch(err => {
            console.log("error pantalla register")
            Alert.alert("Username or email already exist");
            return "error"
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer} >
                <TouchableOpacity style={styles.gobackbutton} onPress={() => navigation.navigate('Root')}>
                    <Text style={styles.gobacktext}>
                    {i18n.t('Volver')}
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>
            {i18n.t('Registrase')}
                </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeUsername}
                value={user}
                placeholder={i18n.t('NomUsuario')}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeEmail}
                value={mail}
                placeholder={i18n.t('Correo')}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePassword}
                value={pass}
                placeholder={i18n.t('Cont')}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeRepeatPassword}
                value={repeatPass}
                placeholder={i18n.t('RepCont')}
                secureTextEntry={true}
            />
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>{i18n.t('AceptCondi')}</Text>

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
        width: '60%',
        marginStart: '20%',
        borderWidth: 1,
        backgroundColor: GRAY_LIGHT,
        textAlign: 'center',
        borderColor: 'grey',
        borderRadius: 50
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
        marginBottom: 5,
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
        top:'35%'
    },
    gobacktext: {
        color: WHITE,
        fontSize: 14,
        fontWeight: "bold",
        textAlignVertical: "center",
    }
});

export default SignScreen;

