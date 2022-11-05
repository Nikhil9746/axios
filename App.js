import React,{Component, useState} from "react";
import{
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList
  

} from "react-native"

import axios from "axios";



export default class App extends Component{

  constructor(){
    super();
    this.state={
      loader: false,
      DATA : [],
  
    }
  }

  getData(){
    this.setState({loader:true})
    fetch('https://api.sampleapis.com/coffee/hot')
    .then((response)=> response.json())
    .then((response)=>{
      if(response.length>0){
        this.setState({DATA : response})

      }
      this.setState({loader : false})
      //console.log('your response is :',response)
    })
    .catch((error)=>{
      this.setState({loader : false})
      console.log('ERROR IS :',error)
    })
  }



  getAxiosData(){
    this.setState({loader:true})
    axios.get("https://api.sampleapis.com/coffee/hot")
    .then((response)=>{
      this.setState({loader:false})
      console.log("axios reponse", response)
  
    })
    .catch((error)=>{
      this.setState({loader:false})
      console.log("axios:error",error)
    })
  }

  componentDidMount(){
   this.getData()
  }



  render(){
    

    const renderItem = ({item})  => (
      <View style={styles.itemcontainer}>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
      
    )
    return(
      <View style={styles.container}>
        <ActivityIndicator size={50} color='blue' animating={this.state.loader}/>
        <Text onPress={()=> this.getAxiosData()}>
          WELCOME
        </Text>
        <FlatList style={{width:'95%',marginTop:10}}
         data={this.state.DATA}
         renderItem={renderItem}/>
        
      </View>
    )
  }
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },

  itemcontainer:{
    width:'100%',
    padding: 10,
    backgroundColor:'grey',
    elevation:4,
    marginBottom:10
  }
})