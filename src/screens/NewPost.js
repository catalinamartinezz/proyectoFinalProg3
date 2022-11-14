import React, { Component } from 'react'

import {View, Text, TouchableOpacity, Image, TextInput, StyleSheet} from 'react-native'

import MyCamera from '../components/MyCamera'

import {db,auth} from '../firebase/config'

import Post from '../components/Post'

export default class NewPost extends Component {
    constructor(props){
        super(props)
        this.state={
            description:'',
            likes:[], 
            comments:[],
            showCamera: true, 
            url:''
        }
    }
    savePost(){
        db.collection('posts').add({
            createdAt:Date.now(),
            owner: auth.currentUser.email,
            description:this.state.description,
            likes:[],
            comments:[], 
            url: this.state.url
        })
        .then((res)=>{
            this.setState({
                description:""
            }, ()=>this.props.navigation.navigate('Home'))
        })
        .catch(error => console.log(error))
    }

    onImageUpload(url){
        this.setState({
            url: url,
            showCamera: false
        })
    }
    render() {
    return (
    <View style={styles.container}>
     {
        this.state.showCamera? 
        <MyCamera style={styles.camera}
            onImageUpload={(url)=> this.onImageUpload(url)}
        /> :
        <View style={styles.containerA}>
            <Text style={styles.titulo}>Add description</Text>
            <TextInput style={styles.descripcion}
                keyboardType='default'
                placeholder='Description'
                onChangeText={(text)=>this.setState({
                    description:text
                })}
                multiline
            />
            <TouchableOpacity
                style={styles.button}
                onPress={()=>this.savePost()}
            >
                <Text style={styles.buttonText}> Save Post</Text>
            </TouchableOpacity>
        </View>

     }
    </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'white',
        borderColor: '#BCCEF8'
      },
    containerA:{
        borderColor: 'black', 
        alignItems: 'center',
        justifyContent:'center',
    },
    descripcion: {
        fontSize: 14,
        fontWeight:'bold',
        color: '#B2B2B2',
        borderColor: '#B2B2B2', 
        borderWidth: 2, 
        borderStyle: 'solid', 
        marginHorizontal: 20,
        marginVertical: 10, 
      },
      button: {
        padding: 8, 
        backgroundColor: '#BCCEF8', 
        borderColor:'#BCCEF8',
        borderRadius: 8, 
        textAlign: 'center', 
        marginHorizontal: 20,
        marginBottom:8,
        
      }, 
      buttonText: {
        fontSize: 15,
        fontStyle: 'bold',
        color: '#FAFAFA',
        fontWeight:'bold'
      },
      camera:{
        height: 50,
        width: 50

      }, 
      titulo:{
        fontWeight:'bold',
        fontSize:30
      }
  })
