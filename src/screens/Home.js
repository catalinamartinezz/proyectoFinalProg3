import React, { Component } from 'react'
import {View, Text, TextInput, TouchableOpacity, Stylesheet} from 'react-native';
import {db, auth} from '../firebase/config';
import firebase from 'firebase';
import { FlatList, TouchableNativeFeedback } from 'react-native-web';


export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      users:[],
      posts:[],
      description:'',
      likes:[],
      comments:[],
    };
  }
componentDidMount(){
  db
  .collection('posts')
  .limit(2)
  .onSnapshot((docs) => {
    let postsFromDb = [];
    docs.forEach((doc) => {
      let post = doc.data();
      postsFromDb.push({ id: doc.id, data: post });
    });
    console.log(postsFromDb);

    this.setState({ posts: postsFromDb });
  });
}


likear(idDelPosteo){
  db
  .collection('posts')
  .doc(idDelPosteo)
  .update({
    likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
}
  render() {
    return (
      <>
      <Text>Home</Text>
      <FlatList
					data={this.state.posts}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View>
							<Text>{item.data.description}</Text>
							<TouchableOpacity onPress={() => this.likear(item.id)}>
								<Text>Like</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
      </>
    );

  }
}

