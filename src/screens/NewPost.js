import React, { Component } from 'react'
import {View, Text, TouchableOpacity, Image, TextInput, StyleSheet} from 'react-native'
import MyCamera from '../components/MyCamera'
import {db,auth} from '../firebase/config'

export default class NewPost extends Component {
    constructor(props){
        super(props)
        this.state={
            decription:'',
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
    <View>
     {
        this.state.showCamera? 
        <MyCamera
            onImageUpload={url=> this.onImageUpload(url)}
        /> :
        <View>
            <Text>New Post</Text>
            <TextInput
                style={{}}
                keyboardType='default'
                placeholder='Description'
                onChangeText={(text)=>this.setState({
                    description:text
                })}
                multiline
            />
            <TouchableOpacity
                style={{}}
                onPress={()=>this.savePost()}
            >
                <Text> Save Post</Text>
            </TouchableOpacity>
        </View>

     }
    </View>
    )
  }
}

const styles = StyleSheet.create({
    campo: {
    fontSize: 16,
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderStyle: 'solid', 
    borderRadius: 5, 
    marginVertical: 8,
    marginHorizontal: 16,
    marginVertical: 8
  },
  button: {
    padding: 8, 
    backgroundColor: 'pink', 
    borderRadius: 8, 
    textAlign: 'center', 
    marginHorizontal: 16
  }, 
  buttonText: {
    fontSize: 24,
    color: '#FAFAFA'
  }
  });
