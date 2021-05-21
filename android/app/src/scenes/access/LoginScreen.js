import React from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, StyleSheet, TextInput,TouchableOpacity } from 'react-native';
import { WHITE, PRIMARY, SECONDARY } from '../../styles/colors';
import { login } from '_api/user';
import { logMe, getIntoAllGames } from '_api/user/socket';
import * as Crypto from 'expo-crypto';

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
            alert('Introduzca la contraseña');
            return;
        }
        /*if (!mail) {
            alert('Introduzca el correo electrónico');
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
            placeholder="Contraseña"
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
        justifyContent: 'flex-start',
        marginStart: '5%',
        marginTop: 10
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
        alignSelf: "flex-start",
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

export default LoginScreen;

