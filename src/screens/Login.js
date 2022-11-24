import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { auth } from '../firebase/config';



export default class Login extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      errorConsola:'',
      errorMensaje:'',
      
    };
  }

  loginUser(email, password){ 
    if(this.state.email === '' || this.state.password===''){
      this.setState(
        {
          errorMensaje:'Los campos contraseña y email son obligatorios'
        }
      )
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.props.navigation.navigate('Home');
      })
      .catch(err => this.setState({
				errorConsola: err.message
			}));
  }

  render() {
    return (
      this.state.loading?<Text>Cargando</Text>:
      <View style = {styles.container}>
         <Image
          style={styles.image}
          source={require("../../assets/logoo.png")}
          resizeMode="contain"
        />
        
        <View>
    
        <TextInput style={styles.campo} placeholder="email" keyboardType="email-address" onChangeText={(text) => this.setState({ email: text })} value={this.state.email} />
					<TextInput style={styles.campo} placeholder="password" keyboardType="default" secureTextEntry onChangeText={(text) => this.setState({ password: text })} value={this.state.password} />
					
          {
        this.state.email == '' || this.state.password == '' ?
        <TouchableOpacity onPress={() => this.loginUser(this.state.email, this.state.password)} style = {styles.buttonFalso}>
        <Text style = {styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity> :
        <TouchableOpacity onPress={() => this.loginUser(this.state.email, this.state.password)} style = {styles.button}>
          <Text onPress ={() => this.loginUser(this.state.email, this.state.password)} style = {styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
          }
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style = {styles.button}>
          <Text style = {styles.buttonText} >No tengo cuenta</Text>
          </TouchableOpacity>
          <Text style={styles.error}>{this.state.errorConsola}</Text>
        <Text style={styles.error}>{this.state.errorMensaje}</Text>
        </View>   
    </View>
    
    );
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
    fontSize: 15,
    color: '#FF66C4',
    borderColor: '#FF66C4', 
    borderWidth: 2, 
    borderStyle: 'solid', 
    borderRadius: 5, 
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 10,
    paddingEnd:80, 
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
error:{
  fontWeight:'bold',
  color: 'red',
  textAlign:'center',
  marginVertical: 8,
  marginHorizontal: 20,
},
image:{
  height: 150,
  width: 800
}
});

