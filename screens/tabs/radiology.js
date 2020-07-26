import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList,Alert } from 'react-native'
import { Ionicons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper'
import { db, storage,auth } from '../../API/firebase'
import * as ImagePicker from 'expo-image-picker';
import Swipeout from 'react-native-swipeout';
import IMG from '../../assets/radiology.png'

import Modal from 'react-native-modal';
import AppButton from '../../components/button'
import AppInput from '../../components/textInput'

export default class radiology extends Component {
    user=auth.currentUser
    radiologyRef = db.ref('users/'+this.user.uid+'/radiology')

    constructor() {
        super()
        this.state = {
            showModal: false,
            titre: '',
            loading: false,
            data: [],
            source: '',
            uri:'',
        }
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }
    toggleImageModal(uri){
        this.setState({
            showModalImage:true,
            uri:uri})
    }

    toggleLoading = () => {
        this.setState({ loading: !this.state.loading })
    }

    submitRadiology = async () => {
        this.toggleLoading();
        this.radiologyRef.push({
            title: this.state.titre,
            img: this.state.source,
        }).then(() => {
            this.toggleLoading();
            this.toggleModal()
        })

    }

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,

            });
            if (!result.cancelled) {
                this.setState({ source: result.uri })
                const imageNameStartIndex = result.uri.search('ImagePicker') + 12;
                const imageNameEndIndex = result.uri.length
                const imgName = result.uri.slice(imageNameStartIndex, imageNameEndIndex)
                this.uploadImg(result.uri, imgName)
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

    uploadImg = async (uri, imgName) => {
        this.toggleLoading();
        const response = await fetch(uri);
        const blob = await response.blob()
        var ref = storage.ref().child('UID/radiology/' + imgName)
        ref.put(blob)
            .then(() => {
                ref.getDownloadURL().then((url) => {
                    this.setState({
                        source: url
                    })
                    this.toggleLoading()
                }).catch((err) => console.log(err))
            })
    }

    loadRadiologies = () => {
        this.radiologyRef.on('value', snap => {
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
    componentDidMount() {
        this.loadRadiologies();
    }
    componentWillUnmount() {
        this.radiologyRef.off();
    }

    removeItem = (key)=>{
        Alert.alert('Warning','Êtes-vous sûr?',[
            {
                text:'Annuler',
                style:'cancel',
            },
            {
                text:'Supprimer',
                onPress:()=> this.radiologyRef.child(key).remove()
            }
        ])
       
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => this.toggleModal()}
                    style={styles.addBtn}>
                    <FontAwesome5 style={{ paddingLeft: 10 }} name="x-ray" size={30} color={'black'} />
                    <Ionicons style={{ position: 'absolute', left: 2 }} name="md-add" size={29} color="black" />
                </TouchableOpacity>
                <Modal
                    onModalHide={() => this.setState({ source: '' })}
                    onBackdropPress={() => this.toggleModal()}
                    isVisible={this.state.showModal}
                    animationIn='slideInUp'
                    animationOut='slideOutLeft'
                    animationInTiming={700}

                >
                    <View style={{ backgroundColor: 'white', padding: 10 }}>
                        <Text style={{ fontSize: 24, alignSelf: 'center' }} > Ajouter un Radiologie </Text>
                        {this.state.source.length > 0 ?
                            <Image source={{ uri: this.state.source }} style={{ width: 200, height: 200, alignSelf: 'center' }} />
                            : <Image source={IMG} style={{ alignSelf: 'center' }} />}
                        <TouchableOpacity
                            onPress={() => this.toggleModal()}
                            style={{ position: "absolute", right: 0 }}>
                            <AntDesign name="closesquare" size={30} color="#ff7539" />
                        </TouchableOpacity>
                        <AppInput
                            label='Titre'
                            onTextChange={(titre => this.setState({ titre }))}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <Text style={{ fontSize: 16, marginTop: 10 }} > Résultat </Text>
                            <TouchableOpacity onPress={this._pickImage} >
                                <Ionicons name="md-add-circle" size={40} color="#28696d" />
                            </TouchableOpacity>
                        </View>
                        <AppButton
                            title='Enregistrer'
                            onPress={() => this.submitRadiology()}
                            loading={this.state.loading}
                            loading={this.state.loading}
                        />
                    </View>
                </Modal>
                <FlatList
                    data={this.state.data}
                    keyExtractor={item => item.key}
                    renderItem={({ item }) => (
                        <Swipeout
                            style={styles.swipeoutItem}
                            right={[
                                {
                                    text: 'Supprimer',
                                    backgroundColor: 'red',
                                    onPress: () => { this.removeItem(item.key) }
                                }
                                , { text: 'Modifier', backgroundColor: 'green' }

                            ]} >
                            <View style={{ flexDirection: 'row' }} >
                                <TouchableOpacity onPress={()=> this.toggleImageModal(item.img) } >
                                    <Avatar.Image size={90} source={{ uri: item.img }} />
                                </TouchableOpacity>
                                <View style={{ justifyContent: 'center', marginHorizontal: 18 }}  >
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                                        Titre : {item.title}
                                    </Text>
                                </View>

                            </View>
                        </Swipeout>
                    )}
                />
                <Modal
                    isVisible={this.state.showModalImage}
                    hasBackdrop
                    onBackdropPress={()=>this.setState({showModalImage:false})}
                    animationIn='zoomIn'
                    animationOut='zoomOut'
                    animationInTiming={600}
                >
                    <View style={{backgroundColor:'white'}} >
                        <Image source={{ uri: this.state.uri }} resizeMode='stretch' style={{width:360,height:360,alignSelf:'center'}} />
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
        padding: 6
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
        zIndex: 2
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
    },
    swipeoutItem: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flex: 1,
        marginBottom: 8,
        paddingHorizontal: 3,
    
        borderRadius: 9
    }
})