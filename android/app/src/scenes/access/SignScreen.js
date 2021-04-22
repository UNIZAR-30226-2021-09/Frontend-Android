import React from 'react';
import { SafeAreaView, View, Text, TouchableHighlight, CheckBox, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { WHITE, PRIMARY, SECONDARY } from '../../styles/colors';
import { register } from '_api/user';

const SignScreen = ({
    navigation,
}) => {
    const [user, onChangeUsername] = React.useState(null);
    const [mail, onChangeEmail] = React.useState("");
    const [pass, onChangePassword] = React.useState(null);
    const [repeatPass, onChangeRepeatPassword] = React.useState(null);
    const [isSelected, setSelection] = React.useState(false);
    const handleSubmitButton = () => {
        if (!user) {
            alert('Introduzca el nombre de usuario');
            return;
        }
        if (!mail) {
            alert('Introduzca un correo electrónico');
            return;
        }
        if (!mail.includes('@')) {
            alert('Introduzca un correo electrónico válido');
            return;
        }
        if (!pass) {
            alert('Introduzca una contraseña');
            return;
        }
        if (pass != repeatPass) {
            alert('Las contraseñas no coinciden');
            return;
        }
        if (!isSelected) {
            alert('Debe aceptar las Condiciones de Uso y la Política de Privacidad para seguir');
            return;
        }
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
            Password: pass,
        }
        console.log(newUser);
        register(newUser).then(data => {
            console.log("Data de registro: " + data);
            if (data != "error") {
                navigation.navigate('Home');
            } else {
                alert('No se ha podido registrar');
            }
        }).catch(err => {
            console.log("error pantalla register")
            console.log(err)
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
                placeholder="Contraseña"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeRepeatPassword}
                value={repeatPass}
                placeholder="Repetir contraseña"
                secureTextEntry={true}
            />
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={styles.label}>Acepto las Condiciones de Uso y la Política de Privacidad</Text>

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

