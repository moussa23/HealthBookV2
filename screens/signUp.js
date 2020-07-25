import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Alert, ScrollView } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {Switch,TextInput,Button} from 'react-native-paper';
import logo from '../assets/logo.png';
import { Entypo } from '@expo/vector-icons';
import AppInput from '../components/textInput';
import AppButton from '../components/button';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
export default class signUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
   
            checked: 'first',
            mail: '',
            password: '',
            nom:'',
            prenom:'',
            date:'',
            pays:'',
            ville:'',
            confirmation:'',
            masculin:'',
            feminim:'',
            showPass: true,
        }
    }

    render() {
        const { checked } = this.state;

            return ( <ScrollView>
           
                    <View style={styles.container}>
                        <View style={{ alignItems: 'center' }}>
                            <Image style={styles.logo} source={logo} resizeMode='contain' />
                        </View>
                        
                            <Text style={{ fontSize: 16, marginTop: 10 }} >
                            <FontAwesome style={{ paddingLeft: 10 }} name='user' size={38} color='#2869cd' /> Nom :
                            </Text>
                         
                            <TextInput
                            
             style={styles.input}
             placeholder=''
             autoCapitalize='none'
             underlineColorAndroid='transparent'
             onChangeText={(nom) => this.setState({nom})}
             value={this.state.nom}
             
         />
           
        
         <Text style={{ fontSize: 16, marginTop: 10 }} >
             <FontAwesome style={{ paddingLeft: 10 }} name='user' size={38} color='#2869cd' /> Prenom : </Text>
                            <TextInput
             style={styles.input}
             placeholder=''
             autoCapitalize='none'
             underlineColorAndroid='transparent'
             onChangeText={(prenom) => this.setState({prenom})}
             value={this.state.prenom}
         />
          <Text style={{ fontSize: 16, marginTop: 10 }} >
              <FontAwesome style={{ paddingLeft: 10 }} name='calendar' size={38} color='#2869cd' /> Date de naissance : </Text>
                            <TextInput
             style={styles.input}
             placeholder=''
             autoCapitalize='none'
             underlineColorAndroid='transparent'
             onChangeText={(date) => this.setState({date})}
             value={this.state.date}
         />
        <Text style={{ fontSize: 16, marginTop: 10 }} >
              <FontAwesome style={{ paddingLeft: 10 }} name='flag' size={38} color='#2869cd' /> Pays : </Text>
                            <TextInput
             style={styles.input}
             placeholder=''
             autoCapitalize='none'
             underlineColorAndroid='transparent'
             onChangeText={(pays) => this.setState({pays})}
             value={this.state.pays}
         />
          <Text style={{ fontSize: 16, marginTop: 10 }} >
              <FontAwesome style={{ paddingLeft: 10 }} name='map-marker' size={38} color='#2869cd' /> Ville : </Text>
                            <TextInput
             style={styles.input}
             placeholder=''
             autoCapitalize='none'
             underlineColorAndroid='transparent'
             onChangeText={(ville) => this.setState({ville})}
             value={this.state.ville}
         />
         <Text style={{ fontSize: 16, marginTop: 10 }} >
              <FontAwesome style={{ paddingLeft: 10 }} name='envelope-open' size={38} color='#2869cd' /> Email : </Text>
                            <TextInput
             style={styles.input}
             placeholder=''
             autoCapitalize='none'
             underlineColorAndroid='transparent'
             onChangeText={(email) => this.setState({email})}
             value={this.state.email}
         />
         <Text style={{ fontSize: 16, marginTop: 10 }} >
              <FontAwesome style={{ paddingLeft: 10 }} name='lock' size={38} color='#2869cd' /> Mot de passe : </Text>
                            <TextInput
             style={styles.input}
             placeholder=''
             autoCapitalize='none'
             underlineColorAndroid='transparent'
             onChangeText={(password) => this.setState({password})}
             value={this.state.password}
         />
         <Text style={{ fontSize: 16, marginTop: 10 }} >
               Confirmation : </Text>
                            <TextInput
             style={styles.input}
             placeholder=''
             autoCapitalize='none'
             underlineColorAndroid='transparent'
             onChangeText={(confirmation) => this.setState({confirmation})}
             value={this.state.confirmation}
         />
 <View>
        <RadioGroup
          onValueChange={(v) => {this.setState({checked: v})}}
        >
        <RadioButton
          value="Masculin"
          status={checked === 'Masculin' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'Masculin' }); }}
        />
        <RadioButton
          value="Feminin"
          status={checked === 'Feminin' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'Feminin' }); }}
        />
        </RadioGroup>
      </View>

         <AppButton
                            height={40}
                            onPress={() => this.loginUser()}
                            loading={this.state.loading}
                            title='Enregistrer'
                            width='60%'
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
    }
})

