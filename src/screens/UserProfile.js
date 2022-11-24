import React, { Component } from 'react'
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native-web';
import { auth, db } from '../firebase/config';
import Post from '../components/Post';
import {Ionicons, Fontisto, FontAwesome,AntDesign, Entypo, MaterialCommunityIcons} from '@expo/vector-icons'

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
        <ScrollView >
        {this.state.loading ? <Text>Cargando</Text> : <View>
          <Text style={styles.nombrePerfil}>
          <Ionicons style={styles.iconos}name="person" size={24} color='black' />
            {this.state.user.data.nombreUsuario}
          </Text>
          <View style={styles.container1}>
            <Text  style={styles.textDescripcion}>
            <Entypo style={styles.iconos} name="email" size={15} color="black" />
              {this.state.user.data.email}
            </Text>
            <Text style={styles.textDescripcion}>
              <MaterialCommunityIcons style={styles.iconos} name="bio" size={20} color="black" />: 
              {this.state.user.data.miniBio}
            </Text>
            <Text style={styles.descripcion}>{this.state.post.length} posteos</Text>
          </View>
          
        </View>}
        {this.state.post.length === 0 ? <Text> Aun no hay posteos </Text>: 
          <FlatList
          data={this.state.post}
          keyExtractor={post => post.id}
          renderItem={({ item }) => <Post dataPost={item}
            {...this.props} />}
        />
        }
      
      </ScrollView>
    )
  }
}

const styles =  {
  container: {
    flex: 1,
		alignItems:'center',
    marginTop: 10,
    backgroundColor:'white'
	},
  container1:{
    alignItems: 'flex-start'
  },
	containerIconos:{
		flexDirection:'row',
	},
	iconos:{
		marginLeft:10,
	},
  descripcion:{
    marginLeft:10,
    marginBottom: 20,
    fontSize: 20
  },
  button: {
    padding: 8, 
    backgroundColor: '#BCCEF8', 
    borderRadius: 8, 
    textAlign: 'center', 
    marginHorizontal: 20,
    marginBottom:8,
  }, 
  buttonText: {
    fontSize: 15,
    color: '#FAFAFA',
    fontWeight:'bold'
  }, 
	image: {
		height: 200,
		width: 200,
		alignSelf: 'center'
	},
	nombrePerfil:{
		fontSize: 30,
    fontStyle: 'bold',
    color: 'black',
    fontWeight:'bold',
    alignSelf:'center',
    marginBottom: 8
	},
	textDescripcion:{
		fontSize:20,
    marginBottom: 5

	}

}

