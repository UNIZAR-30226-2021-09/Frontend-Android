import React from 'react';
import { SafeAreaView, Text, TouchableHighlight } from 'react-native';
import { PRIMARY, SECONDARY } from '../../styles/colors';

const AboutScreen = ({ navigation }) => (
    <SafeAreaView>
        <Text>Screen: About</Text>

        <TouchableHighlight onPress={() => navigation.navigate('Home')}>
            <Text>Go to home</Text>
        </TouchableHighlight>
    </SafeAreaView>
);

export default AboutScreen;