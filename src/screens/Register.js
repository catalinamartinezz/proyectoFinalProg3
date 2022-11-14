import React, { Component } from 'react'

import { db, auth } from '../firebase/config';

import { View,Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      email: '',
      pass:'',
      nombreUsuario:'',
      errorConsola:'',
      errorMensaje:'',
      miniBio:''
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged((user)=>{
      if(user){
        this.props.navigation.navigate('HomeMenu')
      }
    })
  }
  registerUser(email, pass, nombreUsuario, miniBio) {
    if(this.state.email === '' || this.state.pass==='' || this.state.nombreUsuario===''){
      this.setState(
        {
          errorMensaje:'Los campos contraseña, email y nombre de usuario son obligatorios'
        }
      )
    }
		auth
			.createUserWithEmailAndPassword(email, pass)
			.then((res) => {
				db
					.collection('users')
					.add({
						email: email,
						nombreUsuario:nombreUsuario,
            miniBio: miniBio
            
					})
				.then(res =>{
					this.setState({
						email:'',
						pass:'',
						posteos:[],
            miniBio:''
					}); 
				})
				this.props.navigation.navigate('HomeMenu')
			})
			.catch(err => this.setState({
				errorConsola: err.message
			}));
	}
  render() {
    return (
    <View style={styles.container}>
    <View >
        <Text style={styles.logo}>GIRLSGRAM</Text>
        <View>
        <TextInput 
				style={styles.campo} 
				placeholder="Email" 
				keyboardType="email-address" 
				onChangeText={(text) => {
					this.setState({ 
					email: text 
					})
				}} 
				value={this.state.email} 
        />
		<TextInput
			style={styles.campo}
			placeholder="Nombre de usuario"
			keyboardType="default"
			onChangeText={(text) => this.setState({ nombreUsuario: text })}
			value={this.state.nombreUsuario}
		/>
    <TextInput
			style={styles.campo}
			placeholder="Mini Bio"
			keyboardType="default"
			onChangeText={(text) => this.setState({ miniBio: text })}
			value={this.state.miniBio}
		/>
 
		<TextInput 
			style={styles.campo} 
			placeholder="Contraseña" 
			keyboardType="default" 
			secureTextEntry 
			onChangeText={(text) => this.setState({ pass: text })} 
			value={this.state.pass} 
		/>
   {
    this.state.email === '' || this.state.pass==='' || this.state.nombreUsuario=== ''?
      <TouchableOpacity  style={styles.buttonFalso} onPress={() => this.registerUser(this.state.email, this.state.pass, this.state.nombreUsuario, this.state.miniBio)}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>: 
      
      <TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.pass, this.state.nombreUsuario, this.state.miniBio)} style={styles.button}>
						<Text style={styles.buttonText}>Registrarme</Text>
			</TouchableOpacity> 
   }
       
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.button}>
          <Text style={styles.buttonText}>Ya tengo cuenta</Text>
        </TouchableOpacity>
        </View>
        <Text style={styles.error}>{this.state.errorConsola}</Text>
        <Text style={styles.error}>{this.state.errorMensaje}</Text>
    </View>
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
logo:{
  fontStyle: 'italic',
  fontWeight:'bold',
  fontSize: 40,
  color: '#000000',
  textAlign: 'center',
  marginBottom: 100
  
}, 
error:{
  textAlign: 'center' ,
 
}
});