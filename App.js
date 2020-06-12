import React, { Component } from 'react'
import {StatusBar} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import {auth} from './API/firebase';

import Auth from './navigation/authStack';
import Main from './navigation/drawer';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      isAuth: true,

    }
    auth.onAuthStateChanged(this.userChanged)

  }
  userChanged = (user) => {
    this.setState({ isAuth: !!user });
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar barStyle='light-content' backgroundColor='#003d33'/>
        {this.state.isAuth? <Main/>:<Auth/> }
        
      </NavigationContainer>
    )
  }
}




