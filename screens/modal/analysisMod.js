import React, { Component } from 'react'
import { Text, StyleSheet, View,TouchableOpacity,Image,TextInput } from 'react-native';
import Modal from 'react-native-modal';

import { Ionicons, Entypo } from '@expo/vector-icons';


export default class analysisMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomanalyse: '',
            prix:''
        } }
    render() {
        return (
            <Modal
            isVisible={this.props.visible}
            animationIn='slideInUp'
            animationOut='slideInDown'
            animationOutTiming={1500}
            coverScreen={true}
            hasBackdrop={true}
            onBackdropPress={this.props.onBackdropPress}
            >
           <View style={styles.container} >
            <View style={{ marginBottom: 50 }} >
            
            </View>
                 <Text> Nom d'analyse : </Text>
             <TextInput
            
             placeholder=''
             autoCapitalize='none'
             underlineColorAndroid='transparent'
             onChangeText={(nomanalyse) => this.setState({nomanalyse})}
             value={this.state.nomanalyse}
         />
          <Text> Prix : </Text>
             <TextInput
             
             placeholder=''
             autoCapitalize='none'
             underlineColorAndroid='transparent'
             onChangeText={(prix) => this.setState({prix})}
             value={this.state.prix}
         />
         <Text> Bilans: </Text>
         <TouchableOpacity onPress={() => this.props.navigation.push('')}>
                        <Ionicons name="md-add-circle" size={70} color="#28696d" />
                    </TouchableOpacity>
                 
                    <TouchableOpacity onPress={this.Analysis}>
                    <Text > Enregistrer </Text>
                </TouchableOpacity>
                 </View>

            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
