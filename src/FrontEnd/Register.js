import React,{Component} from 'react';
import {Text, View,TextInput,TouchableHighlight,TouchableOpacity,Button,KeyboardAvoidingView} from 'react-native';
import styles from './style';
import fireBase from '../BackEnd/firebase';
import HomePage from './Main';
import {
  Container,
  Content,
  Body,
  Header,
}from 'native-base';
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
  fireBase.auth().createUserWithEmailAndPassword(this.state.UserEmail,this.state.UserPassword)
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
    headerTintColor: "#0f6abc",
    headerStyle:{
      backgroundColor:"white",
      borderBottomWidth:0,
    },
    headerTintColor: "#0f6abc",
    gesturesEnabled: false,
  };
  render(){
    return(
      <Container style={styles.BackgroundColor}>
        <Content>
          <KeyboardAvoidingView behavior="padding">
          <Body style={styles.marginFromTop}>
              <Hideo
                style={{margin:15}}
                placeholder={'Email'}
                iconClass={Entypo}
                iconName={'users'}
                iconColor={'white'}
                iconSize={20}
                autoCapitalize= {"none"}
                autoFocus = {true}
                multiline={false}
                maxLength ={320}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={"#0f6abc"}
                value = {this.state.UserEmail}
                iconBackgroundColor={'#0f6abc'}
                onChangeText = {(Email) => this.setState({UserEmail: Email})}
                inputStyle={{ borderBottomWidth: 1,borderColor:"#0f6abc" }}
              />
              <Hideo
                style={{margin:15}}
                placeholder={'Password'}
                iconClass={Entypo}
                iconName={'lock'}
                iconColor={'white'}
                iconSize={20}
                autoCapitalize= {"none"}
                multiline={false}
                maxLength ={320}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={"#0f6abc"}
                iconBackgroundColor={'#0f6abc'}
                secureTextEntry={true}
                value = {this.state.UserPassword}
                onChangeText = {(Password) => this.setState({UserPassword: Password})}
                inputStyle={{ borderBottomWidth: 1,borderColor:"#0f6abc" }}
              />
              <View style={styles.marginPercentageFromTop}>
                <TouchableOpacity
                  style={styles.SignUpButton}
                  onPress={this._onSignup}
                  underlayColor={"#0f6abc"}
                  activeOpacity={0.8}
                  >
                  <Text style={styles.signUpCenterText}>Sign up</Text>
                </TouchableOpacity>
              </View>
          </Body>
        </KeyboardAvoidingView>
        </Content>
      </Container>
    );
  }
}
