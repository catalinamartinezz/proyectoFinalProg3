import React, { Component } from 'react';
import { db, auth} from '../firebase/config';
import {View, Text, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet} from 'react-native';
import firebase from 'firebase';
import { FlatList } from 'react-native-web';



export default class Comments extends Component {
    constructor(props){
		super(props)
        this.state={
            comments:[],
            comentario:"",
            users:{},
            
        }
	};
   componentDidMount(){
    db.collection('posts')
    .doc(this.props.route.params.id)
    .onSnapshot(doc=>{
      let commentsFromDb =[];
      let comments= doc.data().comments
      commentsFromDb.push({
        id: doc.id,
        data:comments
      })
      this.setState({comments: commentsFromDb})
    })
    
    

    };
    saveComment(){
      db.collection('posts')
      .doc(this.props.route.params.id)
      .update({
        comments:firebase.firestore.FieldValue.arrayUnion(this.state.comentario
        ),
  
      })
      .then(()=>{
        this.props.navigation.navigate('Comments');
      })
      .catch(e=> console.log(e))
  }
   
  render() {
    return (
      <>
      {this.state.comments == ""? <Text>No hay comentarios en este posteo</Text>:
      <View>
      <Text>Comentarios</Text>
      <FlatList
      data={this.state.comments}
      keyExtractor={(item)=>item.id}
      renderItem={({item})=>(
        <View style={styles.comentario}>
          <Text>{item.data}</Text>
        </View>
      )}
      />
      </View>}
      <View>
      <Text>Agregar comentario</Text>
      <TextInput
      keyboardType='default'
      placeholder='Comentario'
      onChangeText={(text)=> this.setState(
        {comentario:text}
      )}
      />
      {this.state.comentario == ""?
       <TouchableOpacity style={styles.buttonFalso} onPress={()=>this.saveComment()}>
       <Text>Subir comentario</Text>
     </TouchableOpacity>:
      <TouchableOpacity  style={styles.buttonText} onPress={()=>this.saveComment()}>
        <Text>Subir comentario</Text>
      </TouchableOpacity>
      }
      <TouchableOpacity style={styles.buttonText} onPress={()=>this.props.navigation.navigate('Home')}>
        <Text>Volver a la pagina principal</Text>
      </TouchableOpacity>
      </View>
      </>
    )
  }
}
const styles = StyleSheet.create({
  comentario: {
    flexDirection:'column'
  },
  buttonText: {
    fontSize: 15,
    fontStyle: 'bold',
    color: '#FAFAFA',
    fontWeight:'bold'
  },
  buttonFalso:{
    padding: 8, 
    backgroundColor: '#B2B2B2', 
    borderColor:'#BCCEF8',
    borderRadius: 8, 
    textAlign: 'center', 
    marginHorizontal: 20,
    marginBottom:8,
  },
  
})