import React, { Component } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native-web';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: {},
          loading: true,
          post: [],
        };
      }
      componentDidMount() {
        db.collection('users')
          .where('email', '==', this.props.route.params.owner)
          .onSnapshot((docs) => {
            let usersFromDb = {};
            docs.forEach((doc) => {
              let user = doc.data();
              console.log(user);
              usersFromDb = {
                id: doc.id,
                data: user,
              };
    
            });
            this.setState({ user: usersFromDb, loading: false });
          });
        db.collection('posts')
          .where('owner', '==', this.props.route.params.owner)
          .onSnapshot(docs => {
            let postsFromDb = [];
            docs.forEach(oneDoc => {
              let posteo = oneDoc.data();
              postsFromDb.push({
                id: oneDoc.id,
                data: posteo
              });
              console.log(postsFromDb);
            });
            this.setState({
              post: postsFromDb,
            });
          });
      }
    
  render() {
    return (
        <>
        {this.state.loading ? <Text>Cargando</Text> : <View>
          <Text>{this.state.user.data.nombreUsuario}</Text>
          <Text>{this.state.user.data.email}</Text>
          <Text>{this.state.user.data.miniBio}</Text>
          <Text>{this.state.post.length} posteos</Text>
        </View>}
        {this.state.post.length === 0 ? <Text> Aun no hay posteos </Text>: 
          <FlatList
          data={this.state.post}
          keyExtractor={post => post.id}
          renderItem={({ item }) => <Post dataPost={item}
            {...this.props} />}
        />
        }
      
      </>
    )
  }
}
