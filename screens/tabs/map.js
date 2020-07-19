import React, { Component } from 'react'
import MapView from 'react-native-maps';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity,View, Dimensions, TextInput} from 'react-native';
const {width, height} = Dimensions.get('screen');
class Header extends React.Component{
    render(){
        return(
            <Image
            source={require('./location.png')}
            style={{width:30, height: 30}}
            />
        );
    }
}
export default class map extends Component {
    constructor(){
        super()
        this.state = {
            isVisible : false,
            titre:'',
           
        }
    }
    static navigationOptions = {
        headerTitle: null,
    };
    state={
        active:'cab',
    }
   renderHeader(){
    return(
        <View style={styles.header}>
            <View style={{flex:2, flexDirection:'row'}} >
            <View style={styles.settings}>
                <View style={styles.locationIcon}>
                    <FontAwesome name="location-arrow" size={14} color="white"/>
                </View>
                </View>
                <View style={styles.options}>
                <Text style={{fontSize: 14, color:'green', fontWeight:'300'}} >Search</Text>
          <TextInput
          placeholder=''
          autoCapitalize='none'
          underlineColorAndroid='black'
          onChangeText={(titre) => this.setState({titre})}
          value={this.state.titre}
      />
                </View>
                </View>
                <View style={styles.settings}>
                <Ionicons name="ios-settings" size={24} color ="black"/>
               
            </View>
               </View>
      
    )
}
   renderMap(){ 
   return(
<View style={styles.map}>
                <MapView
        style={{flex:1, height: height * 0.5, width}}
        initialRegion={{
            latitude:37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        />
        </View>
        )}

   
   renderTabs(){
       const { active } = this.state;

       return(
           <View style={styles.tabs}>
               <View style={[styles.tab, active === 'cab' ? styles.activeTab: null]}>
                  <Text style={styles.tabTitle, active=== 'cab' ? styles.activeTab : null} onPress={()=> this.setState({active:'cab'})}>Cabinets</Text> 
               </View>
               <View style={[styles.tab, active === 'lab' ? styles.activeTab: null]}>
               <Text style={styles.tabTitle, active=== 'lab' ? styles.activeTab : null} onPress={()=> this.setState({active:'lab'})} >Laboratoires</Text> 
               </View>
               <View style={[styles.tab, active === 'cli' ? styles.activeTab: null]}>
               <Text style={styles.tabTitle, active=== 'cli' ? styles.activeTab : null} onPress={()=> this.setState({active:'cli'})}>Cliniques</Text> 
               </View>
               <View style={[styles.tab, active === 'rad' ? styles.activeTab: null]}>
               <Text style={styles.tabTitle, active=== 'rad' ? styles.activeTab : null} onPress={()=> this.setState({active:'rad'})}>Radiologies</Text> 
               </View>
               <View style={[styles.tab, active === 'urg' ? styles.activeTab: null]}></View>
               <Text style={styles.tabTitle, active=== 'urg' ? styles.activeTab : null} onPress={()=> this.setState({active:'urg'})}>Urgences</Text> 
               </View>
               <View style={[styles.tab, active === 'pha' ? styles.activeTab: null]}>
               <Text style={styles.tabTitle, active=== 'pha' ? styles.activeTab : null} onPress={()=> this.setState({active:'pha'})}>Pharmacies</Text> 
               </View>
           </View>

       )
   }
   renderList(){
       return(
           <View>
               <Text>Hopital Name</Text>
           </View>
       )
   }
    render() {
         return(
        <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {this.renderHeader()}
                {this.renderTabs()}
                {this.renderMap()}
                {this.renderList()}
               
        </ScrollView>
        </View>
    );
      
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',


    },
    header:{
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        height: height * 0.15,
        paddingHorizontal: 14,
    },
    locationIcon:{
     justifyContent:'center',
        height:24,
        width: 24,
        backgroundColor: 'orange',
        borderRadius: 16,
        alignItems:'center',
    },
    settings:{
alignItems:'center',
justifyContent:'center',
    },
    options:{
flex:1,
paddingHorizontal: 14,
    },
    tabs:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        height: height * 0.05,

    },
    tab:{
        marginHorizontal: 10,
        paddingHorizontal: 14,
    },
    activeTab:{
borderBottomColor:'orange',
borderBottomWidth:'3'
    },
    activeTabTitle:{
color:'orange'
    },
    tabTitle:{
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 16,
    },
   map:{
flex:1,
   }
});