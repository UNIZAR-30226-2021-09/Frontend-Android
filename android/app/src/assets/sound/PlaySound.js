import { Audio } from 'expo-av';
var sound = new Audio.Sound();
export const playBomb = async () => {
    //stop()
    sound = new Audio.Sound();
    try {
        await sound.loadAsync(require('./src_assets_bomb.mp3'));
        await sound.playAsync();
        // Your sound is playing!

        // Don't forget to unload the sound from memory
        // when you are done using the Sound object
        //await sound.unloadAsync();
    } catch (error) {
        // An error occurred!
        console.log("ERROR sound bomb" + error)

    }
}

export const playDrop = async () => {
    //stop()
    sound = new Audio.Sound();
    try {
        await sound.loadAsync(require('./src_assets_drop.mp3'));
        await sound.playAsync();
        // Your sound is playing!

        // Don't forget to unload the sound from memory
        // when you are done using the Sound object
        //await sound.unloadAsync();
    } catch (error) {
        // An error occurred!
        console.log("ERROR sound drop" + error)
    }
}

export const playWater = async () => {
   // stop()
    sound = new Audio.Sound();
    try {
        await sound.loadAsync(require('./src_assets_water.mp3'));
        await sound.playAsync();
        // Your sound is playing!

        // Don't forget to unload the sound from memory
        // when you are done using the Sound object
        //await sound.unloadAsync();
    } catch (error) {
        // An error occurred!
        console.log("ERROR sound water" + error)

    }
}

export const playHit = async () => {
    //if (sound.getStatusAsync()) stop()
    sound = new Audio.Sound();
    try {
        await sound.loadAsync(require('./src_assets_hit.mp3'));
        await sound.playAsync();
        // Your sound is playing!

        // Don't forget to unload the sound from memory
        // when you are done using the Sound object
        //await sound.unloadAsync();
    } catch (error) {
        console.log("ERROR sound hit" + error)

        // An error occurred!
    }
}

export const stop = async () => {
    try {

        await sound.unloadAsync();
    } catch (error) {
        console.log("ERROR sound h" +error)
    }
}