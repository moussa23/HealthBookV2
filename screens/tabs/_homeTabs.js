import React, { Component } from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

//tabs
import Appoint from './appoint';
import Analysis from './analysis';
import Radiology from './radiology';
import Surgey from './surgey';


const tabs = createMaterialTopTabNavigator();

export default class _homeTabs extends Component {
    render() {
        return (
      
            <tabs.Navigator>
                <tabs.Screen name='appoint'  component={Appoint} />
                <tabs.Screen name='analy'  component={Analysis} />
                <tabs.Screen name='radio'  component={Radiology} />
                <tabs.Screen name='suregey'  component={Surgey} />
            </tabs.Navigator>
        
        );
        
    }
}
