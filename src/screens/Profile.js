import React, { Component } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native-web';
import {auth,db} from '../firebase/config';


export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{},
      loading:true,
      post:{},
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
    db.collection('posts')
    .where('email', '==', auth.currentUser.email)
    .onSnapshot((docs)=>{
      let postsFromDb=[];
      docs.forEach((doc)=>{
        let posteo= doc.data();
        postsFromDb={
          id: doc.id,
          data:posteo,
        };
        console.log(postsFromDb);
      });
      this.setState({
        posts:postsFromDb,
      });
    });
  }

logOut(){
  auth.signOut();
  this.props.navigation.navigate('Login');
}

  render() {

    return (
      <>
      {this.state.loading?<Text>Cargando</Text>:<View>
      <Text>{this.state.user.data.nombreUsuario}</Text>
      <Text>{this.state.user.data.email}</Text>
      <Text>{this.state.user.data.miniBio}</Text>
      <Text>{this.state.post.length} posteos</Text>
      <TouchableOpacity onPress={()=>this.logOut()}>
        <Text>Cerrar Sesion</Text>
      </TouchableOpacity>
    </View>}
    
      </>

      
    )
  }
}
const styles={
  
}

