import React, { Component } from 'react'

import {View, Text, TouchableOpacity, Image, TextInput, StyleSheet} from 'react-native'

import MyCamera from '../components/MyCamera'

import {db,auth} from '../firebase/config'

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
            decription:this.state.description,
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
        <MyCamera
            onImageUpload={url=> this.onImageUpload(url)}
        /> :
        <View style={styles.container}>
            <Text>New Post</Text>
            <TextInput
                style={styles.campo}
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
      },
campo: {
        fontSize: 14,
        fontWeight:'bold',
        color: '#B2B2B2',
        borderColor: '#B2B2B2', 
        borderWidth: 2, 
        borderStyle: 'solid', 
        borderRadius: 5, 
        marginVertical: 8,
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
      }
  });
