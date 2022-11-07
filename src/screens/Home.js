import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, Stylesheet} from 'react-native';
import {db, auth} from '../firebase/config';
import firebase from 'firebase';
import { FlatList, TouchableNativeFeedback } from 'react-native-web';


export default class Home extends Component {

/*likear(idDelPosteo){
  db
  .collection('posteos')
  .doc(idDelPosteo)
  .update({
    likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
}*/
  render() {
    return (
      <>
      <Text>Home</Text>
      </>
    );

  }
}

