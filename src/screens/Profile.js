import React, { Component } from 'react'
import { Text, View } from 'react-native-web';
import {auth,db} from '../firebase/config';


export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      users:[],
    };
  }
  componentDidMount(){
    db.collection("users")
    .where('email', '==', auth.currentUser.email)
    .onSnapshot((docs)=>{
      let usersFromDb=[];
      docs.forEach((doc)=>{
        usersFromDb.push({
          email: doc.email,
          nombre: doc.nombreDeUsuario(),
        });
      });
      this.setState({users: usersFromDb});
    });
  }
  render() {
    return (
      <View>
        <Text>{auth.currentUser.nombreDeUsuario}</Text>
        <Text>{auth.currentUser.email}</Text>
      </View>
    )
  }
}
