import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';


export default class Login extends Component {
  contructor(){
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  loginUser(email, password){
    if (email == ''){
      //completar condicional
    }
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
        <Text>Ingresar</Text>
        <View>
        <TextInput style={styles.field} placeholder="email" keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
					<TextInput style={styles.field} placeholder="password" keyboardType="default" secureTextEntry onChangeText={(text) => this.setState({ password: text })} value={this.state.password} />
					<Text onPress={() => this.loginUser(this.state.email, this.state.password)}>Loguearme</Text>
					<Text onPress={() => this.props.navigation.navigate('Register')}>No tengo cuenta</Text>
        <TouchableOpacity onPress ={() => this.loginUser(this.state.email, this.state,password)}>
          <Text>Iniciar Sesión</Text>
        </TouchableOpacity>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  field: {},
});

