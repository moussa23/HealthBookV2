import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Alert, ScrollView } from 'react-native';
import logo from '../assets/logo.png';
import { Entypo } from '@expo/vector-icons';

import AppInput from '../components/textInput';
import AppButton from '../components/button';
import { auth } from '../API/firebase';

export default class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            email: '',
            password: '',
            showPass: true,
        }
    }
    loginUser = () => {
        this.setState({ loading: true });
        //firebase stuff
        const { email } = this.state
        const { password } = this.state
        auth.signInWithEmailAndPassword(email, password)
            .then(() => this.setState({ loading: false }))
            .catch((err) => {
                Alert.alert('Error', err.message)
                this.setState({ loading: false })
            })
    }
    toggleEye = () => {
        const { showPass } = this.state
        this.setState({ showPass: !showPass })
    }

    //life cycle methode
    componentDidMount()
    {

    }
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={styles.logo} source={logo} resizeMode='contain' />
                    </View>
                    <View>
                        <Entypo style={styles.icon} name="email" size={35} color="#439889" />
                        <AppInput
                            placeholder='exemple@gmail.com'
                            padding={40}
                            label='Email'
                            weight='bold'
                            type='email-address'
                            value={this.state.email}
                            onTextChange={email => this.setState({ email: email })}
                        />
                    </View>
                    <View>
                        <Entypo style={styles.icon} name="lock" size={35} color="#439889" />
                        <AppInput
                            padding={40}
                            label='Password'
                            weight='bold'
                            height={60}
                            secure={this.state.showPass}
                            value={this.state.password}
                            onTextChange={password => this.setState({ password: password })}
                            submit={() => this.loginUser()}
                        />
                        <Entypo style={styles.eye}
                            onPress={() => this.toggleEye()}
                            name={this.state.showPass ? 'eye' : 'eye-with-line'}
                            size={35} color="black" />
                    </View>
                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                        <AppButton
                            height={40}
                            onPress={() => this.loginUser()}
                            loading={this.state.loading}
                            title='Se connecter'
                            width='60%'
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    logo: {
        marginTop: '10%',

    },
    icon: {
        position: 'absolute',
        top: '49%',
        left: '2%'
    },
    eye: {
        position: 'absolute',
        right: '5%',
        top: '50%'
    }
})
