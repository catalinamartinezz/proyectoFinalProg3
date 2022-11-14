import React, {Component} from 'react';
import { db } from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity, 
         StyleSheet, 
         FlatList } from 'react-native';

class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            resultado:[],
            users:[],
            busqueda:'',
        }
    }
    componentDidMount(){
        db.collection('users').onSnapshot(
            users => {
                let usersFromDb = [];
                users.forEach( (user) => {
                    usersFromDb.push({
                        id: user.id,
                        data: user.data()
                    })
                })
                this.setState(
                    {
                        users:usersFromDb
                        
                    }
                )
    })}
    search(){  
        if(this.state.busqueda.length>0){

            let nuevoArray = this.state.users.filter((user) => {
                
                return user.data.nombreUsuario.includes(this.state.busqueda)
                
            })
            
            this.setState({
                resultado:nuevoArray
            })

        }
    }
                    
    
    render(){
        return(
                <View style={styles.container}>
                
                    <Text style= {styles.titulo}>User search</Text>
                     <View >
                        <TextInput 
                            style={styles.campo}
                            keyboardType='default'
                            placeholder='Insert user name'
                            value={this.state.filterBy}
                            onChangeText={(text) => {this.setState({busqueda:text})}}
                        />  
                        <TouchableOpacity
                            style={styles.button} 
                            onPress={()=>this.search()}
                            >
                            <Text style={ styles.text}>Search</Text>
                        </TouchableOpacity>                         
                    </View>
                    <FlatList 
                       data={this.state.resultado}
                       keyExtractor={(item) => item.id}
                       renderItem={({ item }) => (
                           <View> 
                               <Text> {item.data.nombreUsuario}</Text>
                            </View> )}
                    />
                </View>
        )}}

const styles = StyleSheet.create({

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'white',
      },
      campo: {
        fontSize: 14,
        fontWeight:'bold',
        color: '#B2B2B2',
        borderColor: '#B2B2B2', 
        borderWidth: 2, 
        borderStyle: 'solid', 
        borderRadius: 5, 
        marginVertical: 8,
        marginHorizontal: 20,
        marginVertical: 10,   
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
    },
    buttonFalso:{
      padding: 8, 
      backgroundColor: '#B2B2B2', 
      borderColor:'#BCCEF8',
      borderRadius: 8, 
      textAlign: 'center', 
      marginHorizontal: 20,
      marginBottom:8,
    },
    logo:{
      fontStyle: 'italic',
      fontWeight:'bold',
      fontSize: 40,
      color: '#000000',
      textAlign: 'center',
      marginBottom: 100
      
    }, 
    error:{
      textAlign: 'center' ,
     
    }
    });

export default Search;