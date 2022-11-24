import React, { Component } from 'react';
import { db, auth} from '../firebase/config';
import {View, Text, TouchableOpacity, ScrollView, Image, TextInput, StyleSheet, FlatList} from 'react-native';
import firebase from 'firebase';
import {Ionicons, Fontisto} from '@expo/vector-icons'



export default class Comments extends Component {
    constructor(props){
		super(props)
        this.state={
            comments:[],
            comentario:"",  
        }
	};
   componentDidMount(){
    db.collection('posts')
    .doc(this.props.route.params.id)
    .onSnapshot(doc=>{
      this.setState({comments: doc.data().comments})
    })
    };
    saveComment(){
      db.collection('posts')
      .doc(this.props.route.params.id)
      .update({
        comments:firebase.firestore.FieldValue.arrayUnion({
          owner:auth.currentUser.email,
          description: this.state.comentario
        }
        ),
  
      })
      .then(()=>{
        this.props.navigation.navigate('Comments');
      })
      .catch(e=> console.log(e))
  }
   
  render() {
    return (
      <View style={styles.grande}>
      <View style={styles.container}>
      {this.state.comments.length == 0? <Text >No hay comentarios en este posteo</Text>:
      <ScrollView>
      <FlatList 
        data={this.state.comments}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <View style={styles.comentario}>
            <Text  style={styles.nombrePerfil} >
              <Ionicons name="person" size={20} color='black' />
                 {item.owner}
            </Text>
            <Text>
              <Fontisto name="comment" size={15} color="black" />
                 {item.description}
            </Text>
            
         </View>
      )}
      />
      </ScrollView>}
      
      <View style={styles.containerComentario}>
      
      <TextInput style={styles.descripcion}
      keyboardType='default'
      placeholder='Agrega un comentario'
      onChangeText={(text)=> this.setState(
        {comentario:text}
      )}
      />
      {this.state.comentario == ""?
       <TouchableOpacity style={styles.buttonFalso} onPress={()=>this.saveComment()}>
       <Text style={styles.buttonText}>Publicar</Text>
     </TouchableOpacity>:
      <TouchableOpacity  style={styles.button} onPress={()=>this.saveComment()}>
        <Text style={styles.buttonText}>Publicar</Text>
      </TouchableOpacity>
      }
      <TouchableOpacity style={styles.button} onPress={()=>this.props.navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Volver a la pagina principal</Text>
      </TouchableOpacity>
      </View>
      </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  grande:{
    backgroundColor:'white'
  },
  comentario: {
    flexDirection:'column',
    borderColor:'#ddd',
    borderBottomWidth: 2,
    backgroundColor:'white',
    padding: 10
  },
  containerComentario:{
    flex: 3
 
  },
  button: {
    padding: 8, 
    backgroundColor: '#FF66C4', 
    borderColor:'#FF66C4',
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
  buttonFalso:{
    padding: 8, 
    backgroundColor: '#FFD384', 
    borderColor:'#BCCEF8',
    borderRadius: 8, 
    textAlign: 'center', 
    marginHorizontal: 20,
    marginBottom:8,
  },
  titulo:{
    fontWeight:'bold',
    fontSize:20, 
    borderBottomColor:'#ddd',
    borderBottomWidth: 1,
    textAlign:'center'
  },
  titulo2:{
    fontWeight:'bold',
    fontSize:20, 
    textAlign:'center'
  },
  descripcion: {
    fontSize: 14,
    color: 'black',
    borderColor: '#FF66C4', 
    borderWidth: 2, 
    borderStyle: 'solid', 
    borderRadius: 5, 
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    paddingEnd:90, 
  },
  nombrePerfil:{
		fontSize: 15,
    fontStyle: 'bold',
    color: 'black',
    fontWeight:'bold',
    alignSelf:'flex-start',
	},
  
})