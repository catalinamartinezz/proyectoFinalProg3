import React, { Component } from 'react'

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
          .where('email', '==', this.props.route.params.id)
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
          .where('owner', '==', this.props.route.params.id)
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
      <div>UserProfile</div>
    )
  }
}
