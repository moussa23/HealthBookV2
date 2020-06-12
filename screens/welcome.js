import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';

//componenets
import AppButton from '../components/button';


//logo
import logo from '../assets/logo.png'

const pulse = {
    0: {
        scale: 1.2,
    },
    0.7: {

        scale: 0.8,
    },

    1: {
        scale: 1.2
    },
};
const zoonIn = {
    0: {
        scale: 0
    },
    0.3: {
        scale: 0.3
    },
    0.5: {
        scale: 0.5
    },

    1: {
        scale: 1
    }

}
export default class welcome extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    handlePress = () => {
        console.log('pressed0')
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Animatable.Image
                        duration={800}
                        source={logo}
                        animation={pulse}
                        easing="ease-out"
                        iterationCount="infinite" />
                </View>
                <Text style={styles.title} > Bienvenue! </Text>
                <Animatable.View
                    duration={1000}
                    animation={zoonIn}
                    easing="linear"
                    style={styles.btnContainer}
                >

                    <TouchableOpacity 
                    onPress={()=>this.props.navigation.push('login')}
                    style={styles.btns}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Se Connecter </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                    onPress={()=>this.props.navigation.push('signup')}
                    style={styles.btns}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Inscrivez-vous </Text>
                    </TouchableOpacity>

                </Animatable.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    logo: {
        marginTop: '30%'
    },
    btnContainer: {
        marginBottom: 90,
        flex: 1,
        justifyContent: 'space-evenly',
    },
    btns: {
        backgroundColor: '#ff7539',
        borderWidth: 1,
        borderRadius: 6,
        width: 200,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,

    },
    title: {
        fontSize: 50,

    }
})
