import React, { Component } from 'react'
import { createStackNavigator } from '@react-navigation/stack';



import Login from '../screens/login'
import Welcome from '../screens/welcome'
import SignUp from '../screens/signUp'

const myauthStack = createStackNavigator();

export default class authStack extends Component {
    render() {
        return (
            <myauthStack.Navigator 
                
                headerMode='float'
                screenOptions={{
                    gestureDirection:'horizontal',
                    headerStyle:{
                        backgroundColor: '#00695c',
                    },
                    headerTitleAlign: 'center',
                    headerTintColor: '#fff',
                    headerTitleStyle: {fontWeight: '100'},
    
                }}
            >
                <myauthStack.Screen name='welcome' component={Welcome}  options={{title:'',headerShown:false}} />
                <myauthStack.Screen name='login' component={Login} options={{title:'Connectez-vous'}} />
                <myauthStack.Screen name='signup' component={SignUp} options={{title:'Inscription'}} />
            </myauthStack.Navigator>
        )
    }
}

