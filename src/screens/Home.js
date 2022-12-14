import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View,
         FlatList, 
        ScrollView, StyleSheet } from 'react-native';
import Post from '../components/Post';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[]
        }
    }
    
    componentDidMount(){
        db.collection('posts').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts
                })
            }
        )

        
    }


    render(){
        return(
            <ScrollView>
                <View style={styles.container}> 
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post dataPost={item} 
                        {...this.props} />}
                    /> 
                </View>
            </ScrollView>

        )
    }
}
export default Home;

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white'
    }
})