import React from 'react';
import { Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { WHITE, PRIMARY, SECONDARY } from '_styles/colors';

const GoBackButton = (sendTo) =>
    <TouchableOpacity style={styles.gobackbutton} onPress={() => sendTo}>
        <Text style={styles.gobacktext}>
            Volver
        </Text>
    </TouchableOpacity>
    ;
export default GoBackButton;



const styles = StyleSheet.create({
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
