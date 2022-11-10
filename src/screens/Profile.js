import React, { Component } from 'react'
import { Text, View } from 'react-native-web';
import {auth,db} from '../firebase/config';


export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{},
      loading:true,
    };
  }
  componentDidMount(){
    db.collection('users')
    .where('email', '==', auth.currentUser.email)
    .onSnapshot((docs)=>{
      let usersFromDb={};
      docs.forEach((doc)=>{
        let user=doc.data();
        console.log(user);
        usersFromDb={
          id:doc.id,
          data:user,
        };
        console.log(usersFromDb);
      });
      this.setState({user: usersFromDb, loading:false});
    });
  }
  render() {

    return (
      <>
      {this.state.loading?<Text>Cargando</Text>:<View>
      <Text>{this.state.user.data.nombreUsuario}</Text>
      <Text>{this.state.user.data.email}</Text>
      <Text>{this.state.user.data.miniBio}</Text>
    </View>}
      </>
    )
  }
}
const styles={
  
}

