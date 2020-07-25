import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import { Ionicons, Fontisto, AntDesign } from '@expo/vector-icons';
import AppButton from '../../components/button'
import AppInput from '../../components/textInput'
import Modal from 'react-native-modal';
import { db } from '../../API/firebase';
import IMG from '../../assets/surgery.png';
import moment from 'moment'
import DateTimePicker from 'react-native-modal-datetime-picker';
import Swipeout from 'react-native-swipeout';




export default class surgey extends Component {
    surgeyRef = db.ref('users/UID/surgey')
    constructor() {
        super();
        this.state = {
            showModal: false,
            loading: false,
            showDateTime: false,
            titrechirurgie: '',
            date: '',
            time: '',
            docteur: '',
            mode: '',
            data: [],
        }
    }

    //date time picker operation 
    handlePicker = (datetime) => {
        this.setState({
            time: moment(datetime).format('HH:mm'),
            date: moment(datetime).format('DD/MMM/YYYY')
        })
        this.togglePicker()
    }

    togglePicker = () => this.setState(state => ({ showDateTime: !state.showDateTime }))

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal })

    }

    toggleLoading = () => {
        this.setState({ loading: !this.state.loading })
    }

    //firebase stuff
    submitSurgey = () => {
        this.toggleLoading()
        this.surgeyRef.push({
            title: this.state.titreChirurgie,
            date: this.state.date,
            time: this.state.time,
            doctor: this.state.docteur
        })
            .catch((err) => console.log(err))
            .then(() => {
                this.toggleModal()
                this.toggleLoading()
            })
    }
    componentDidMount() {
        this.surgeyRef.on('value', snap => {
            var items = []
            snap.forEach(c => {
                items.push({
                    ...c.val(),
                    key: c.key
                })
            })
            this.setState({ data: items })
        })
    }
    componentWillUnmount(){
        this.surgeyRef.off()
    }

    removeItem = (key)=>{
        Alert.alert('Warning','Êtes-vous sûr?',[
            {
                text:'Annuler',
                style:'cancel',
            },
            {
                text:'Supprimer',
                onPress:()=> this.surgeyRef.child(key).remove()
            }
        ])
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { this.toggleModal() }} style={styles.addBtn}>
                    <Fontisto name="surgical-knife" size={40} color='black' />
                    <Ionicons style={{ position: 'absolute', left: 0 }} name="md-add" size={29} color="black" />
                </TouchableOpacity>

                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <Swipeout
                            style={{ flex: 1, marginBottom: 8, paddingHorizontal: 3,borderRadius:9 }}
                            right={[
                                {
                                    text: 'Supprimer',
                                    backgroundColor: 'red',
                                    onPress: () => { this.removeItem(item.key) }
                                }
                                , { text: 'Modifier', backgroundColor: 'green' }

                            ]} >
                            <View>
                                <Text style={{ fontSize: 25, fontWeight: "bold",textTransform:'capitalize' }}>{item.title} </Text>
                                <Text style={{ fontSize: 16 }}>Docteur: {item.doctor} </Text>
                                <Text style={{ fontSize: 16, position: 'absolute', bottom: 2, right: 2 }}>{item.date}</Text>
                                <Text style={{ fontSize: 16, position: 'absolute', right: 2,top:5 }}>{item.time}</Text>
                            </View>
                        </Swipeout>
                    )}
                />

                <DateTimePicker
                    isVisible={this.state.showDateTime}
                    onConfirm={this.handlePicker}
                    onCancel={this.togglePicker}
                    mode={this.state.mode}
                    is24Hour={true}
                    onChange={this.handlePicker}
                />
                <Modal
                    onBackdropPress={() => this.toggleModal()}
                    isVisible={this.state.showModal}
                    animationIn='slideInUp'
                    animationOut='slideOutLeft'
                    animationInTiming={700}
                    onModalHide={()=>this.setState({date:'',time:''})}
                >
                    <View style={{ backgroundColor: 'white', padding: 10 }}>
                        <Text style={{ fontSize: 24, alignSelf: 'center' }} > Ajouter un Chirurgie </Text>
                        <Image source={IMG} resizeMode='contain' style={{ alignSelf: 'center', marginTop: 10 }} />
                        <TouchableOpacity
                            onPress={() => { this.toggleModal() }}
                            style={{ position: "absolute", right: 0 }}>
                            <AntDesign name="closesquare" size={30} color="#ff7539" />
                        </TouchableOpacity>
                        <AppInput
                            label='Titre*'
                            onTextChange={(titreChirurgie => this.setState({ titreChirurgie }))}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize: 16, marginTop: 10 }} > Fait le : {this.state.date}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ mode: 'datetime' })
                                    this.togglePicker()
                                }}
                                style={{ marginRight: 20 }} >
                                < AntDesign name="calendar" size={35} color="#ff7539" />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 16, marginTop: 10, marginLeft: 20 }}> à  {this.state.time} </Text>
                        </View>
                        <AppInput
                            label='Nom de docteur*'
                            onTextChange={(docteur => this.setState({ docteur }))}
                        />
                        <AppButton
                            title='Enregistrer'
                            onPress={() => this.submitSurgey()}
                            loading={this.state.loading}
                        />
                    </View>
                </Modal>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding:6,
    },
    addBtn: {
        width: 70,
        height: 70,
        borderColor: 'powderblue',
        borderWidth: 2,
        borderRadius: 50,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 20,
        right: 13,
        backgroundColor: '#ff7539',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 8,
        zIndex:2
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
    }
})