import React,{Component} from 'react';
import {Text, View,TextInput, TouchableHighlight,Button } from 'react-native';
import styles from './style';
import FB from '../BackEnd/firebase';
import HomePage from './Main';
import {Entypo} from '@expo/vector-icons';


export default class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      UserEmail: '',
      UserPassword: '',
    };

    this._onSignup = this._onSignup.bind(this);
  }
_onSignup(){
  const { goBack } = this.props.navigation;
  FB.auth().createUserWithEmailAndPassword(this.state.UserEmail,this.state.UserPassword)
  .then(()=>{
    alert("Your account has been created");
    goBack();
  }).catch((error)=>{
    if(error){
      alert(error.message);
    }
  });
}
  static navigationOptions = {
    title:"Registeration",
    headerTintColor: "white",
    headerStyle:{
      backgroundColor:"#535353",
    },
    headerTintColor: "#00a79d",

  };
  render(){
    return(
      <View style={styles.container}>
        <View style={styles.inputRow}>
          <Entypo  name="user" size={20} color={"#00a79d"} style={styles.iconStyle}/>
          <TextInput
            value = {this.state.UserEmail}
            onChangeText = {(Email) => this.setState({UserEmail: Email})}
            autoFocus = {true}
            style = {styles.inputStyle}
            placeholder = {'Email'}
            autoCapitalize= {"none"}
            multiline={false}
            maxLength ={320}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={"white"}

          />
        </View>
        <View style={styles.inputRow}>
          <Entypo  name="lock" size={20} color={"#00a79d"} style={styles.iconStyle}/>
          <TextInput
            onChangeText = {(Password) => this.setState({UserPassword: Password})}
            value = {this.state.UserPassword}
            style = {styles.inputStyle}
            placeholder = {'Password'}
            autoCapitalize= {"none"}
            multiline={false}
            maxLength ={320}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={"white"}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.marginTopButtons}>
          <TouchableHighlight
            style={styles.SignUpButton}
            onPress={this._onSignup}
            underlayColor={"#00a79d"}
            activeOpacity={1}
            >
            <Text style={styles.signUpCenterText}>Sign up</Text>
          </TouchableHighlight>
        </View>
      </View>

    );
  }
}