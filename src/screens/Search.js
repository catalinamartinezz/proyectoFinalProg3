import React, {Component} from 'react';
import { db } from '../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity, 
         StyleSheet, 
         FlatList } from 'react-native';
import {FontAwesome} from '@expo/vector-icons'

class Search extends Component{
    constructor(props){
        super(props);
        this.state={
            resultado: true,
            users:[],
            busqueda:'',
        }
    }
    componentDidMount(){
        db.collection('users').onSnapshot(
            users => {
                let usersFromDb = [];
                users.forEach( (user) => {
                    let userData = user.data();
                    usersFromDb.push({
                        id: user.id,
                        data: userData,
                    })
                })
                this.setState(
                    {
                        users:usersFromDb
                        
                    }
                )
    })}
    search(){  
        if(this.state.busqueda){

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
                
                    <Text style= {styles.titulo}>Buscar...</Text>
                     <View style={styles.buscador}>
                        <TextInput 
                            style={styles.campo}
                            keyboardType='default'
                            placeholder='Insertar Nombre'
                            value={this.state.filterBy}
                            onChangeText={(text) => {this.setState({busqueda:text})}}
                        />  
                        <TouchableOpacity
                            onPress={()=>this.search()}
                            >
                            <Text style={styles.hola}><FontAwesome name="search" size={50} color="#FF66C4" /></Text>
                        </TouchableOpacity>                         
                    </View>

                    { this.state.resultado == false ?
                     <Text> No se encontraron resultados de búsqueda.</Text> :
                    <FlatList 
                       data={this.state.resultado}
                       keyExtractor={(item) => item.id}
                       renderItem={({ item }) => (
                           <View>
                            <TouchableOpacity   onPress={() => this.props.navigation.navigate("UserProfile", {owner:item.data.email})} >
                                <Text> {item.data.nombreUsuario}</Text>
                            </TouchableOpacity>
                            </View> )}
                    />
                       }
                </View>
        )}}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'white',
    },
    buscador:{
        flexDirection:'row'
    },
    hola:{
        alignItems:'flex-end'
    },
    campo: {
        fontSize: 14,
        color: 'black',
        borderColor: '#FF66C4', 
        borderWidth: 2, 
        borderStyle: 'solid', 
        borderRadius: 5, 
        marginVertical: 10,
        marginHorizontal: 20,
        padding: 10,
        paddingEnd:90, 
    },
    buttonText: {
      fontSize: 15,
      fontStyle: 'bold',
      color: '#FAFAFA',
      fontWeight:'bold'
    },
    titulo:{
        fontWeight:'bold',
        fontSize:30,
        alignSelf:'flex-start'
    }
    
    });

export default Search;