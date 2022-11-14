import React, { Component } from 'react'
import { db } from '../firebase/config'

export default class Comments extends Component {
    constructor(props){
		super(props);
        this.state={
            
        }
	}
    componentDidMount(){
        db.collection("posts"
        .doc(this.props.route.params.id)
        .onSnapshot
        )
    }
  render() {
    console.log(this.props.route.params,id)
    return (
      <div>Comments</div>
    )
  }
}
