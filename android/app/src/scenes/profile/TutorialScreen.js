import React, { Component } from 'react';

export default class TutorialScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree", // Network image
                require('./assets/images/board.jpg'),          // Local image
            ]
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <SliderBox images={this.state.images} />
            </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 30,
    },
}