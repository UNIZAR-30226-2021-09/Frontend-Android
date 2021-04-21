import React from 'react';
import { SafeAreaView, Text, TouchableHighlight, StyleSheet, View} from 'react-native';
import { PRIMARY, SECONDARY } from '../../styles/colors';

const AboutScreen = ({ navigation }) => (
    <SafeAreaView style={styles.container}>
        <View style={styles.cuadro}>
            <Text style={styles.text}> Page does not exist</Text>
        </View>
        <View style={styles.cuadro}>
            <TouchableHighlight onPress={() => navigation.navigate('Home')}>
                <Text style={styles.text}>Go to home</Text>
            </TouchableHighlight>
        </View>

    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    cuadro: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize:20
    }
})
export default AboutScreen;