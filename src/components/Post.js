import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';
import {Ionicons, Fontisto, FontAwesome,AntDesign} from '@expo/vector-icons'

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qLikes: this.props.dataPost.data.likes.length,
			miLike: false
		};
	}

	componentDidMount() {
		if (this.props.dataPost.data.likes.includes(auth.currentUser.email)) {
			this.setState({
				miLike: true,
			});
		}
	}

	like() {
		db
			.collection('posts')
			.doc(this.props.dataPost.id)
			.update({
				likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email),
			})
			.then(() =>
				this.setState({
					qLikes: this.state.qLikes + 1,
					miLike: true,
				})
			)
			.catch((error) => console.log(error));
	}

	unLike() {
        db
			.collection('posts')
			.doc(this.props.dataPost.id)
			.update({
				likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email),
			})
			.then(() =>
				this.setState({
					qLikes: this.state.qLikes - 1,
					miLike: false,
				})
			)
			.catch((error) => console.log(error));
    }

	render() {
		return (
			<View style={styles.container}>
			
				<Text style={styles.nombrePerfil}>
					<Ionicons name="person" size={20} color='black' />
					{this.props.dataPost.data.owner}
				</Text>
			
				<Image 
                    source={{uri: this.props.dataPost.data.url}}
                    resizeMode="contain"
                    style={styles.image}
                />
			
				{this.state.miLike ? (
					<View style={styles.container1}>
						<Text style={styles.descripcion}>{this.props.dataPost.data.description}</Text>
						<View style={styles.containerIconos}>
							<Text style={styles.iconos}>
								<Fontisto name="like" size={20} color="black" />
								{this.state.qLikes}	
							</Text>
							<TouchableOpacity onPress={() => this.unLike()} style={styles.iconos}>
								<AntDesign name="heart" size={24} color="red" />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.props.navigation.navigate("Comments", {id:this.props.dataPost.id})} style={styles.iconos}>
								<FontAwesome name="comments" size={24} color="black" />
							</TouchableOpacity>
						</View>
					</View>
					
				) : (
					<View style={styles.container1}>
						<Text style={styles.descripcion}>{this.props.dataPost.data.description}</Text>
						<View style={styles.containerIconos}>
							<Text style={styles.iconos}>
								<Fontisto name="like" size={20} color="black" />
								{this.state.qLikes}	
							</Text>
							<TouchableOpacity onPress={() => this.like()} style={styles.iconos}>
								<AntDesign name="hearto" size={24} color="black" />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.props.navigation.navigate("Comments", {id:this.props.dataPost.id})} style={styles.iconos}>
								<FontAwesome name="comments" size={24} color="black" />
							</TouchableOpacity>
						</View>
					</View>
					
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		// alignItems:'flex-start',
		borderBottomColor: '#ddd',
		borderBottomWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 20,
		paddingBottom:10,
		backgroundColor: 'white',
	},
	container1:{
		flexDirection:'row', 
		justifyContent:'space-between'
	},
	containerIconos:{
		flexDirection:'row',
	},
	iconos:{
		marginLeft:10
	},
	descripcion:{
		fontSize:18,
		marginBottom:10
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
		height: 350,
		width: 400,
		alignSelf: 'center',
		resizeMode: 'contain'
	},
	nombrePerfil:{
		fontSize: 20,
      	fontStyle: 'bold',
      	color: 'black',
      	fontWeight:'bold',
		marginTop:15
	},
	textDescripcion:{
		fontSize:16 

	}
});

export default Post;