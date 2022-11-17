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
      <View style={styles.container}>
      {this.state.comments.length == 0? <Text >No hay comentarios en este posteo</Text>:
      <View>
        {/* <Text style={styles.titulo}>Comentarios del posteo</Text> */}
      
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
      </View>}
      
      <View style={styles.containerComentario}>
      {/* <Text style={styles.titulo2}>Agregar comentario</Text> */}
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
    )
  }
}
const styles = StyleSheet.create({
  comentario: {
    flexDirection:'column',
    borderBottomColor: '#ddd',
		borderBottomWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 0,
  },
  containerComentario:{
 
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
  buttonFalso:{
    padding: 8, 
    backgroundColor: '#B2B2B2', 
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
    fontWeight:'bold',
    color: '#B2B2B2',
    borderColor: '#B2B2B2', 
    borderWidth: 2, 
    borderStyle: 'solid', 
    marginHorizontal: 20,
    marginVertical: 10, 
  },
  nombrePerfil:{
		fontSize: 15,
    fontStyle: 'bold',
    color: 'black',
    fontWeight:'bold',
    alignSelf:'flex-start',
	},
  
})