import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Switch, TextInput, Button } from 'react-native-paper';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment'

import logo from '../assets/calendar.png';

import AppButton from '../components/button';

import { db,auth } from '../API/firebase';

export default class appointmets extends Component {
    user = auth.currentUser
    appointRef = db.ref('users/'+this.user.uid+'/appointments')
    constructor() {
        super()
        this.state = {
            isVisible: false,
            Date: 'jj/mm/aaaa',
            time: 'hh:mm',
            mode: '',
            titre: '',
            endroit: '',
            docteur: '',
            specialite: '',
            isSwitchOn: false,
            _isLoading: false,
        }
    }
    handlePicker = (datetime) => {
        if (this.state.mode == 'date') {
            this.setState({
                isVisible: false,
                Date: moment(datetime).format('DD/MM/YYYY')
            })
        }
        else {
            this.setState({
                isVisible: false,
                time: moment(datetime).format('HH:mm')
            })
        }
    }

    showPicker = () => {
        this.setState({
            isVisible: true
        })
    }
    hidePicker = () => {
        this.setState({
            isVisible: false
        })
    }

    _onToggleSwitch = () => this.setState(state => ({ isSwitchOn: !state.isSwitchOn }));

    saveEvent = () => {
        this.setState({ _isLoading: true })
        //Firebase stuf
        let event = {
            title: this.state.titre,
            place: this.state.endroit,
            doc: this.state.docteur,
            specialite: this.state.specialite,
            date: this.state.Date,
            time: this.state.time,
            notif: this.state.isSwitchOn
        };
        this.appointRef.push(event)
            .catch(err => Alert.alert('Error', err))
            .then(() => {
                this.setState({ _isLoading: false })
                this.props.navigation.goBack()
            })
    }
    render() {
        return (
            <ScrollView>
                <DateTimePicker
                    isVisible={this.state.isVisible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode={this.state.mode}
                    is24Hour={true}
                    onChange={() => this.handlePicker}

                />

                <View style={styles.container}>
                    <View style={{ alignItems: 'center' }}>
                        <Image source={logo} width={60}
                        />
                    </View>

                    <View style={styles.dateTimeContainer}>
                        <View style={{ alignItems: 'center' }}>
                            <Text> Date </Text>
                            <TouchableOpacity onPress={() => {
                                this.setState({ mode: 'date' });
                                this.showPicker()
                            }}>
                                <FontAwesome name='calendar' size={35} />
                            </TouchableOpacity>
                            <Text> {this.state.Date}</Text>
                        </View>
                        <View style={{ alignItems: 'center', position: 'absolute', right: 5 }}>
                            <Text> Temps </Text>
                            <TouchableOpacity onPress={() => {
                                this.setState({ mode: 'time' })
                                this.showPicker()
                            }}>
                                <FontAwesome5 name='clock' size={35} />
                            </TouchableOpacity>
                            <Text> {this.state.time}</Text>
                        </View>
                    </View>

                    <View style={styles.notificationCont}>
                        <Text style={{ fontSize: 20 }}> Notifcation </Text>
                        <Switch
                            style={{ scaleX: 1.5, scaleY: 1.5, marginHorizontal: 10 }}
                            color='#28696d'
                            value={this.state.isSwitchOn}
                            onValueChange={this._onToggleSwitch}
                        />
                    </View>
                    <View style={styles.input} >
                        <View style={{ alignItems: 'center', marginBottom: 10, flexDirection: 'row' }}>
                            <TextInput
                                style={styles.txt}
                                mode='flat'
                                label='Titre'
                                theme={{ colors: { primary: '#ff7539' } }}
                                onChangeText={(titre => this.setState({ titre }))}
                            />

                        </View>
                        <View style={{ alignItems: 'center', marginBottom: 10, flexDirection: 'row' }}>
                            <TextInput
                                style={styles.txt}
                                mode='flat'
                                label='Endroit'
                                theme={{ colors: { primary: '#ff7539' } }}
                                onChangeText={(endroit) => { this.setState({ endroit }) }}

                            />
                            <TouchableOpacity style={{ position: 'absolute', right: 15 }} >
                                <FontAwesome name='search' size={35} color='#28696d' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', marginBottom: 10, flexDirection: 'row' }}>
                            <TextInput
                                style={styles.txt}
                                theme={{ colors: { primary: '#ff7539' } }}
                                mode='flat'
                                label='Docteur'
                                onChangeText={(docteur) => this.setState({ docteur })}
                            />
                            <TouchableOpacity style={{ position: 'absolute', right: 15 }} >
                                <FontAwesome name='search' size={35} color='#28696d' />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', marginBottom: 10, flexDirection: 'row' }}>
                            <TextInput
                                style={styles.txt}
                                theme={{ colors: { primary: '#ff7539' } }}
                                mode='flat'
                                label='Specialité'
                                onChangeText={(specialite) => { this.setState({ specialite }) }}
                            />
                            <TouchableOpacity style={styles.searchIcon}>
                                <FontAwesome name='search' size={35} color='#28696d' />
                            </TouchableOpacity>
                        </View>

                        <AppButton
                            title='enregistrer'
                            loading={this.state._isLoading}
                            onPress={() => this.saveEvent()}
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
        justifyContent: 'center',

    },
    dateTimeContainer: {
        flexDirection: 'row',
    },
    notificationCont: {
        flexDirection: 'row',
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    txt: {
        width: '100%',
        height: 50
    },
    searchIcon: {
        position: 'absolute',
        right: 15,
    }
})