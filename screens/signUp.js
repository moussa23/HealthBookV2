import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Alert, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {  TextInput, RadioButton } from 'react-native-paper';
import logo from '../assets/logo.png';
import AppButton from '../components/button';
import {auth,db} from '../API/firebase'
export default class signUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: 'first',
            mail: '',
            password: '',
            nom: '',
            prenom: '',
            date: '',
            tel: '',
            confirmation: '',
            showPass: true,
            loading:false,
        }
    }

    registerUser=()=>{
        this.toggleLoading()
        const {password,confirmation,mail,nom} = this.state
        if(password!=confirmation) Alert.alert('Warning','Le mot de passe ne correspond pas')
        else {
            auth.createUserWithEmailAndPassword(mail.trim(),password)
            .catch((err)=>console.log(err))
            .then((userInfo)=>{
                return userInfo.user.updateProfile({
                    displayName:nom,
                })
            }).then(()=>{
                if(auth.currentUser) {
                    const uid = auth.currentUser.uid
                    db.ref('users/'+uid+"/info").push({
                        lastName:nom,
                        firstName:this.state.prenom,
                        gender:this.state.checked,
                        phone:this.state.tel,
                        birth:this.state.date
                    })
                    this.toggleLoading()
                }
            })

        }
    }

    toggleLoading = ()=>{
        this.setState({loading:!this.state.loading})
    }
    render() {
        const { checked } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                        <Image style={styles.logo} source={logo} resizeMode='contain' />
                    </View>

                    <Text style={{ fontSize: 16, marginTop: 10 }} >
                        <FontAwesome style={{ paddingLeft: 10 }} name='user' size={38} color='#00695c' /> Nom :
                     </Text>
                    <TextInput
                        theme={{
                            colors: { primary: '#ff7539', background: 'rgba(0,0,0,0.1)', placeholder: 'rgba(0,0,0,0.3)' },
                            animation: { scale: 2 },
                        }}
                        style={styles.input}
                        label='Nom'
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                        onChangeText={(nom) => this.setState({ nom })}
                        value={this.state.nom}
                    />

                    <Text style={{ fontSize: 16, marginTop: 10 }} >
                        <FontAwesome style={{ paddingLeft: 10 }} name='user' size={38} color='#00695c' /> Prenom : </Text>
                    <TextInput
                        theme={{
                            colors: { primary: '#ff7539', background: 'rgba(0,0,0,0.1)', placeholder: 'rgba(0,0,0,0.3)' },
                            animation: { scale: 2 },
                        }}
                        label='Prénom'
                        style={styles.input}
                        placeholder=''
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                        onChangeText={(prenom) => this.setState({ prenom })}
                        value={this.state.prenom}
                    />
                    <Text style={{ fontSize: 16, marginTop: 10 }} >
                        <FontAwesome style={{ paddingLeft: 10 }} name='calendar' size={38} color='#00695c' /> Date de naissance : </Text>
                    <TextInput
                        theme={{
                            colors: { primary: '#ff7539', background: 'rgba(0,0,0,0.1)', placeholder: 'rgba(0,0,0,0.3)' },
                            animation: { scale: 2 },
                        }}
                        keyboardType='decimal-pad'
                        label='date de naissance'
                        style={styles.input}
                        placeholder=''
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                        onChangeText={(date) => this.setState({ date })}
                        value={this.state.date}
                    />

                    <Text style={{ fontSize: 16, marginTop: 10 }} >
                        <FontAwesome style={{ paddingLeft: 10 }} name='phone' size={38} color='#00695c' /> Téléphone  : </Text>
                    <TextInput
                        theme={{
                            colors: { primary: '#ff7539', background: 'rgba(0,0,0,0.1)', placeholder: 'rgba(0,0,0,0.3)' },
                            animation: { scale: 2 },
                        }}
                        label='Téléphone'
                        style={styles.input}
                        placeholder=''
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                        onChangeText={(tel) => this.setState({ tel })}
                        value={this.state.ville}
                    />
                    <Text style={{ fontSize: 16, marginTop: 10 }} >
                        <FontAwesome style={{ paddingLeft: 10 }} name='envelope-open' size={38} color='#00695c' /> Email : </Text>
                    <TextInput
                        theme={{
                            colors: { primary: '#ff7539', background: 'rgba(0,0,0,0.1)', placeholder: 'rgba(0,0,0,0.3)' },
                            animation: { scale: 2 },
                        }}
                        label='Email'
                        style={styles.input}
                        placeholder=''
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                        onChangeText={(mail) => this.setState({ mail })}
                        value={this.state.email}
                    />
                    <Text style={{ fontSize: 16, marginTop: 10 }} >
                        <FontAwesome style={{ paddingLeft: 10 }} name='lock' size={38} color='#00695c' /> Mot de passe : </Text>
                    <TextInput
                        theme={{
                            colors: { primary: '#ff7539', background: 'rgba(0,0,0,0.1)', placeholder: 'rgba(0,0,0,0.3)' },
                            animation: { scale: 2 },
                        }}
                        label='Mot de passs'
                        style={styles.input}
                        placeholder=''
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                    />
                    <Text style={{ fontSize: 16, marginTop: 10 }} >
                        <FontAwesome style={{ paddingLeft: 10 }} name='lock' size={38} color='#00695c'/> Confirmation de mot de pass : </Text>
                    <TextInput
                        theme={{
                            colors: { primary: '#ff7539', background: 'rgba(0,0,0,0.1)', placeholder: 'rgba(0,0,0,0.3)' },
                            animation: { scale: 2 },
                        }}
                        style={styles.input}
                        placeholder=''
                        autoCapitalize='none'
                        underlineColorAndroid='transparent'
                        onChangeText={(confirmation) => this.setState({ confirmation })}
                        value={this.state.confirmation}
                    />

                    <View style={{ flexDirection: 'row',alignItems:'center'}} >
                        <RadioButton.Group
                            onValueChange={(v) => { this.setState({ checked: v }) }}>
                           
                            <RadioButton
                                theme={{ colors: { accent: '#ff7539' } }}
                                value="Masculin"
                                status={checked === 'Masculin' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ checked: 'Masculin' }); }}
                            /><Text style={styles.genderText} > Masculin </Text>
                            <RadioButton
                                theme={{ colors: { accent: '#ff7539' } }}
                                value="Feminin"
                                status={checked === 'Feminin' ? 'checked' : 'unchecked'}
                                onPress={() => { this.setState({ checked: 'Feminin' }); }}
                            /><Text style={styles.genderText} > Feminin </Text>
                        </RadioButton.Group>
                    </View>

                    <AppButton
                        height={40}
                        onPress={() =>this.registerUser()}
                        loading={this.state.loading}
                        title='Enregistrer'
                        width='60%'
                        loading={this.state.loading}
                    />

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
    },
    genderText:{
        fontSize:18,

    }
})

