import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			qLikes: this.props.dataPost.data.likes.length,
			miLike: false,
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
				<Text>Post de: {this.props.dataPost.data.owner}</Text>
				<Text>Texto del Post: {this.props.dataPost.data.description}</Text>
				<Text>Cantidad de likes: {this.state.qLikes}</Text>
				{this.state.miLike ? (
					<TouchableOpacity style={styles.button} onPress={() => this.unLike()}>
						<Text style={styles.buttonText}>Quitar Like</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => this.like()} style={styles.button}>
						<Text style={styles.buttonText}>Like</Text>
					</TouchableOpacity>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		borderBottomColor: '#BCCEF8',
		borderBottomWidth: 1,
		marginBottom: 10,
		paddingHorizontal: 20,
	},
    button: {
      padding: 8, 
      backgroundColor: '#BCCEF8', 
      borderColor:'#BCCEF8',
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
    }
});

export default Post;