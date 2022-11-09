import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';
import Register from '../screens/Register'


export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      logueado: false,
    };
  }
  loginUser(email, password){ 
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.props.navigation.navigate('HomeMenu');
      })
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <View>
         {
        this.state.logueado ?
        <Register /> :
        <View>
        <Text>Ingresar</Text>
    
        <TextInput style={styles.field} placeholder="email" keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
					<TextInput style={styles.field} placeholder="password" keyboardType="default" secureTextEntry onChangeText={(text) => this.setState({ password: text })} value={this.state.password} />
					<Text onPress={() => this.loginUser(this.state.email, this.state.password)}>Loguearme</Text>
					<Text onPress={() => this.props.navigation.navigate('Register')}>No tengo cuenta</Text>
        <TouchableOpacity onPress={() => this.loginUser(this.state.email, this.state.password)}>
          <Text onPress ={() => this.props.navigation.navigate('Home')}>Iniciar Sesión</Text>
        </TouchableOpacity>
        </View>
          }
    </View>
    
    );
  }
}

const styles = StyleSheet.create({
  field: {},
});

