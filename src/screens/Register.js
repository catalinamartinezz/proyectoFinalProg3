import React, { Component } from 'react'

import { db, auth } from '../firebase/config';

import { View,Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      email: '',
      password:'',
      nombreUsuario:'',
      errorMensaje:''
    }
  }

  componentDidMount(){
    auth.onAuthStateChanged((user)=>{
      if(user){
        this.props.navigation.navigate('HomeMenu')
      }
    })
  }
  registerUser(email, pass, nombreUsuario) {
		auth
			.createUserWithEmailAndPassword(email, pass)
			.then((res) => {
				db
					.collection('users')
					.add({
						email: email,
						nombreUsuario:nombreUsuario
					})
				.then(res =>{
					this.setState({
						email:'',
						pass:'',
						posteos:[]
					}); 
				})
				this.props.navigation.navigate('HomeMenu')
			})
			.catch(err => this.setState({
				errorMensaje: err.message
			}));
	}
  render() {
    return (
      <>
    <View>
        <Text>Registro</Text>
        <View>
        <TextInput 
				style={styles.campo} 
				placeholder="email" 
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
			placeholder="password" 
			keyboardType="default" 
			secureTextEntry 
			onChangeText={(text) => this.setState({ pass: text })} 
			value={this.state.pass} 
		/>
        <Text onPress={() => this.props.navigation.navigate('Login')}>Ya tengo cuenta</Text>
        
        <TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.pass, this.state.nombreUsuario)} style={styles.button}>
						<Text style={styles.buttonText}>Registrarme</Text>
					</TouchableOpacity>
        </View>
        <Text>{this.state.errorMensaje}</Text>
    </View>
    </>
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