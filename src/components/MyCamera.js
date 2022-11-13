import React, { Component } from 'react'
import  { Camera } from 'expo-camera'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {storage} from '../firebase/config'

export default class MyCamera extends Component {
  constructor(props){
    super(props)
    this.state={
        permission: false, 
        showCamera: true, 
        uri: ""
    }
    this.metodosDeCamara=''
  }

  componentDidMount(){
    Camera.requestCameraPermissionsAsync()
    .then(()=>this.setState({
        permission: true
    }))
    .catch(err=>console.log(err))
  }

  takePicture(){
    this.metodosDeCamara.takePictureAsync()
    .then(photo => this.setState({
        uri: photo.uri,
        showCamera:false
    }))
    .catch(err=>console.log(err))
  }
  
  savePicture(){
    fetch(this.state.uri)
    .then(res=>res.blob())
    .then(image => {
        const ref= storage.ref(`photo/${Date.now()}.jpg`)
        ref.put(image)
            .then(()=>{
                ref.getDownloadURL()
                .then((uri)=>{
                    this.props.onImageUpload(uri)
                })
            })
    })
    .catch(err => console.log(err))
  }
  clearPicture(){
    this.setState({
        uri:'',
        showCamera:true
    })
  }
    render() {
    return (
    <View style={styles.container}>
    <View style={styles.camera}>
        {this.state.permission?
            this.state.showCamera?
            <View style={styles.camera}>
              <Text style={styles.titulo}> Smile</Text>
                <Camera
                    style={styles.camera}
                    type={Camera.Constants.Type.back}
                    ref={(metodosDeCamara)=> this.metodosDeCamara= metodosDeCamara}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=> this.takePicture()}
                >
                    <Text style={styles.buttonText}>Take Picture</Text>
                </TouchableOpacity>
            </View> :
            <View style={styles.camera}>
              <Text style={styles.titulo}>Save or delete Picture</Text>
                <Image
                    style={styles.preview}
                    source={{uri:this.state.uri}}      
                    resizeMode='cover' 
                />
                <TouchableOpacity
                 style={styles.button}
                 onPress={()=> this.savePicture()}
                >
                    <Text style={styles.buttonText}>Save Picture</Text>
                </TouchableOpacity>

                <TouchableOpacity
                 style={styles.button}
                 onPress={()=> this.clearPicture()}
                 >
                <Text style={styles.buttonText}>Delete Picture</Text>
                </TouchableOpacity>
            </View>:
            <Text style={styles.titulo}>Camera is not available</Text>
        }
    </View>    
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'white',
    borderColor: '#BCCEF8',
    height:'100%',
    width:'100%',
  },
  camera:{
    height:500,
    width:500,
    alignItems: 'center',
    justifyContent:'center',
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
  preview:{
    height:'50%',
    width: '50%',
    justifyContent:'center',
    marginBottom: 10,
    marginTop:10
  },
  titulo:{
    fontWeight:'bold',
    fontSize:30
  }
});